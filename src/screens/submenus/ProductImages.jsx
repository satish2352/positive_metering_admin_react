import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Table,
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useSearchExport } from "../../context/SearchExportContext";
import { ShowContext } from "../../context/ShowContext";
import NewReusableForm from "../../components/form/NewResuableForm";
import SearchInput from "../../components/search/SearchInput";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import instance from "../../api/AxiosInstance";
import { FaEdit, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ThreeDots  } from 'react-loader-spinner'; 
import { Tooltip, OverlayTrigger,  } from 'react-bootstrap';
import "../../App.scss";
const ProductImages = () => {
  const { searchQuery, handleSearch, handleExport, setData, filteredData } =
    useSearchExport();

  const [team, setTeam] = useState([]);
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [eyeVisibilityById, setEyeVisibilityById] = useState({});
  const [imagePreview, setImagePreview] = useState("");
  const [showTable, setShowTable] = useState(true); // New state for toggling form and table view
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const CustomHeader = ({ name }) => (
    <div style={{ fontWeight: "bold", color: "black", fontSize: "16px" }}>
      {name}
    </div>
  );



  const tableColumns = (currentPage, rowsPerPage) => [
    {
      name: <CustomHeader name="Sr. No." />,
      selector: (row, index) => (currentPage - 1) * rowsPerPage + index + 1,
    },
    {
      name: <CustomHeader name="Image" />,
      cell: (row) => (
        <img
          src={row.img}
          alt="Event"
          style={{ width: "100px", height: "auto" }}
        />
      ),
    },
    {
      name: <CustomHeader name="Product Name" />,
      cell: (row) => <span>{row.productName}</span>,
    },
    {
      name: <CustomHeader name="Application" />,
      cell: (row) => <span>{row.application}</span>,
    },
    {
      name: <CustomHeader name="Actions" />,
      cell: (row) => (
        <div className="d-flex">
          <Button className="ms-1" onClick={() => toggleEdit(row.id)}>
            <FaEdit />
          </Button>
          <Button className="ms-1" onClick={() => handleDelete(row.id)}>
            <FaTrash />
          </Button>
          <Button
            className="ms-1"
            onClick={() => handleIsActive(row.id, !eyeVisibilityById[row.id])}
          >
            {eyeVisibilityById[row.id] ? <FaEyeSlash /> : <FaEye />}
          </Button>
        </div>
  
      ),
    },

 
  ];

  useEffect(() => {
    fetchTeam();
  }, []);

  useEffect(() => {
    if (formData.img && formData.img instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(formData.img);
    } else if (formData.img && typeof formData.img === "string") {
      setImagePreview(formData.img);
    } else {
      setImagePreview("");
    }
  }, [formData.img]);

  const fetchTeam = async () => {
    setLoading(true);
    const accessToken = localStorage.getItem("accessToken"); // Retrieve access token
    try {
      const response = await instance.get("productImages/get-productImages", {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      });
      const reversedData = response.data.responseData.reverse();
      setTeam(reversedData);
      setData(reversedData);
    } catch (error) {
      console.error(
        "Error fetching team:",
        error.response || error.message || error
      );
    }    finally {
      setLoading(false);
    }
  };

  const validateForm = (formData) => {
    let errors = {};
    let isValid = true;

    if (!formData.img) {
      errors.img = "Image is required with 612x408 pixels";
      isValid = false;
    } else if (formData.img instanceof File && !validateImageSize(formData.img)) {
      errors.img = "Image is not 612x408 pixels";
      isValid = false;
    }
    if (!formData.productName?.trim()) {
      errors.productName = "Product Name is required";
      isValid = false;
    }

  

    if (!formData.application?.trim()) {
      errors.application = "Product Description is required";
      isValid = false;
    } else if (formData.application.length > 1000) {
      errors.application = "Product Description must be 1000 characters or less";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const validateImageSize = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        if (img.width === 612 && img.height === 408) {
          resolve();
        } else {
          reject("Image must be 612x408 pixels");
        }
      };
      img.onerror = () => reject("Error loading image");
      img.src = URL.createObjectURL(file);
    });
  };

  const handleChange = async (name, value) => {
    if (name === "img" && value instanceof File) {
      try {
        await validateImageSize(value);
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, img: "" }));
      } catch (error) {
        setErrors((prevErrors) => ({ ...prevErrors, img: error }));
        setImagePreview("");
      }
    } else if (name === "application") {
      const charLimit = 1000; // Set your character limit here
      if (value.length > charLimit) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          application: `Character limit of ${charLimit} exceeded`,
        }));
      } else {
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, application: "" }));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm(formData)) {
      setLoading(true);
      const accessToken = localStorage.getItem("accessToken"); // Retrieve access token
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }

      try {
        if (editMode) {
          await instance.put(`productImages/update-productimage/${editingId}`, data, {
            headers: {
              Authorization: "Bearer " + accessToken,
              "Content-Type": "multipart/form-data",
            },
          });
          toast.success("Data Updated Successfully");
          const updatedTeam = team.map((member) =>
            member.id === editingId ? formData : member
          );
          setTeam(updatedTeam);
        } else {
          await instance.post("productImages/create-productimage", data, {
            headers: {
              Authorization: "Bearer " + accessToken,
              "Content-Type": "multipart/form-data",
            },
          });
          toast.success("Data Submitted Successfully");
        }
        fetchTeam();

        setEditMode(false);
        setFormData({});
        setImagePreview("");
        setShowTable(true); // Switch back to table view after submission
      } catch (error) {
        console.error("Error handling form submission:", error);
        toast.error(response.data.message);
      } finally {
        setLoading(false); // Set loading to false
      }
    }
  };

  const handleDelete = async (id) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete this data?",
      customUI: ({ onClose }) => (
        <div
          style={{
            textAlign: "left",
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(5, 5, 5, 0.2)",
            maxWidth: "400px",
            margin: "0 auto",
          }}
        >
          <h2>Confirm to delete</h2>
          <p>Are you sure you want to delete this data?</p>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "20px",
            }}
          >
            <button
              style={{ marginRight: "10px" }}
              className="btn btn-primary"
              onClick={async () => {
                setLoading(true);
                const accessToken = localStorage.getItem("accessToken");
                try {
                  await instance.delete(`productImages/delete-productimage/${id}`, {
                    headers: {
                      Authorization: `Bearer ${accessToken}`,
                      "Content-Type": "application/json",
                    },
                  });
                  toast.success("Data Deleted Successfully");
                  fetchTeam();
                } catch (error) {
                  console.error("Error deleting data:", error);
                  toast.error("Error deleting data");
                } finally {
        setLoading(false); 
      }
                onClose();
              }}
            >
              Yes
            </button>
            <button className="btn btn-secondary" onClick={() => onClose()}>
              No
            </button>
          </div>
        </div>
      ),
    });
  };

  const handleIsActive = async (id, isVisible) => {
    confirmAlert({
      title: "Confirm to change visibility",
      customUI: ({ onClose }) => (
        <div
          style={{
            textAlign: "left",
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(5, 5, 5, 0.2)",
            maxWidth: "400px",
            margin: "0 auto",
          }}
        >
          <h2>Confirm to change visibility</h2>
          <p>
            Are you sure you want to {isVisible ? "hide" : "show"} this data?
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "20px",
            }}
          >
            <button
              style={{ marginRight: "10px" }}
              className="btn btn-primary"
              onClick={async () => {
                setLoading(true);
                const accessToken = localStorage.getItem("accessToken");
                try {
                  await instance.put(
                    `productImages/isactive-productImages/${id}`,
                    { isVisible },
                    {
                      headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                      },
                    }
                  );
                  toast.success(
                    `Data ${isVisible ? "hidden" : "shown"} successfully`
                  );
                  setEyeVisibilityById((prev) => ({
                    ...prev,
                    [id]: isVisible,
                  }));
                  fetchTeam();
                } catch (error) {
                  console.error("Error updating visibility:", error);
                  toast.error("Error updating visibility");
                } finally {
        setLoading(false); // Set loading to false
      }
                onClose();
              }}
            >
              Yes
            </button>
            <button className="btn btn-secondary" onClick={() => onClose()}>
              No
            </button>
          </div>
        </div>
      ),
    });
  };

  const toggleEdit = (id) => {
    const selectedMember = team.find((member) => member.id === id);
    setEditingId(id);
    setFormData(selectedMember);
    setEditMode(true);
    setShowTable(false); // Switch to form view when editing
  };

  const handleAdd = () => {
    setFormData({});
    setEditMode(false);
    setShowTable(false); // Switch to form view when adding new item
  };

  const handleView = () => {
    setFormData({});
    setEditMode(false);
    setShowTable(true); // Switch to table view
  };

  return (
  

    <Container fluid>
    <Row>
      <Col>
        <Card>
          <Card.Header>
            <Row>
              {showTable ? (
                <Col className="d-flex justify-content-end align-items-center">
                <SearchInput
              searchQuery={searchQuery}
              onSearch={handleSearch}
      
              showExportButton={false}
            />
                  <Button
                    variant="outline-success"
                    onClick={handleAdd}
                    className="ms-2 mb-3"
                  >
                    Add
                  </Button>
                </Col>
              ) : (
                <Col className="d-flex justify-content-end align-items-center">
                  <Button   variant="outline-secondary" onClick={handleView}>
                    View
                  </Button>
                </Col>
              )}
            </Row>
          </Card.Header>

          <Card.Body>
            {loading ? ( // Check loading state
              <div className="d-flex justify-content-center align-items-center" style={{ height: '100px' }}>
                <ThreeDots  
                  height="80"
                  width="80"
                  radius="9"
                  color="#000"
                  ariaLabel="three-dots-loading"
            
                  visible={true}
                />
              </div>
            ) : showTable ? (
              <DataTable
                columns={tableColumns(currentPage, rowsPerPage)}
                data={filteredData.length > 0 ? filteredData : team}
                pagination
                responsive
                striped
                noDataComponent="No Data Available"
                onChangePage={(page) => setCurrentPage(page)}
                onChangeRowsPerPage={(rowsPerPage) =>
                  setRowsPerPage(rowsPerPage)
                }
              />
            ) : (
              <Form onSubmit={handleSubmit}>
                <Row>
                <Col md={12}>
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Selected Preview"
                        style={{
                          width: "100px",
                          height: "auto",
                          marginBottom: "10px",
                        }}
                      />
                    )}

                    <NewReusableForm
                      label={"Upload Product Image"}
                      placeholder={"Upload Image"}
                      name={"img"}
                      type={"file"}
                      onChange={handleChange}
                      initialData={formData}
                      error={errors.img}
                      imageDimensiion="Image must be 612*408 pixels" 
                    />
                  </Col>
                  <Col md={6}>
                    <NewReusableForm
                      label="Product Name"
                      placeholder="Enter Product Name"
                      name="productName"
                      type="text"
                      onChange={handleChange}
                      initialData={formData}
                      error={errors.productName}
                    />
                  </Col>
                  <Col md={12}>
                    <NewReusableForm
                      label="Product Description"
                      placeholder="Enter Application"
                      name="application"
                      type="text"
                      onChange={handleChange}
                      initialData={formData}
                      textarea
                      useJodit={true}
                      error={errors.application}
                      charLimit={1000}
                    />
                  </Col>
                </Row>
                <Row>
                  <div className="mt-3 d-flex justify-content-end">
                    <Button
                      type="submit"
                      variant={editMode ? "success" : "primary"}
                    >
                      {editMode ? "Update" : "Submit"}
                    </Button>
                  </div>
                </Row>
              </Form>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
  );
};

export default ProductImages;
