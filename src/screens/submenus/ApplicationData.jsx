//// sos
import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Table,
} from "react-bootstrap";
import { FaEdit, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";
import { useSearchExport } from "../../context/SearchExportContext";
import { ShowContext } from "../../context/ShowContext";
import SearchInput from "../../components/search/SearchInput";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TablePagination from "../../components/pagination/TablePagination";
import instance from "../../api/AxiosInstance";
import NewResuableForm from "../../components/form/NewResuableForm";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
const ApplicationData = () => {
  const { searchQuery, handleSearch, handleExport, setData, filteredData } =
    useSearchExport();
  const { shows, toggleShows } = useContext(ShowContext);
  const [team, setTeam] = useState([]);
  const [products, setProducts] = useState([]); // New state for product names
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [eyeVisibilityById, setEyeVisibilityById] = useState({});

  const tableColumns = [
    {
      key: "srNo",
      label: "Sr. No.",
      render: (value, index) => index + 1, // Adding serial number starting from 1
    },
    { key: "productName", label: "Product Name" },
    { key: "applicationDescription", label: "Application Description" },
  ];

  useEffect(() => {
    fetchTeam();
    fetchProducts(); // Fetch products when the component mounts
  }, []);

  const fetchTeam = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await instance.get(
        "applicationData/get-applicationData",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      const reversedData = response.data.responseData.reverse();
      setTeam(reversedData);
      setData(reversedData);
    } catch (error) {
      console.error("Error fetching technical data:", error);
    }
  };

  const fetchProducts = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await instance.get("productdetails/get-productnames", {
        // Adjust the endpoint to fetch product names
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      setProducts(response.data.responseData); // Assuming responseData contains product names
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const validateForm = (formData) => {
    let errors = {};
    let isValid = true;

    if (!formData.productName?.trim()) {
      errors.productName = "Product Name is required";
      isValid = false;
    }

    if (!formData.applicationDescription?.trim()) {
      errors.applicationDescription = "Technical Description is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handlePost = async () => {
    console.log("Form data before submission:", formData); // Debug log
    try {
      if (validateForm(formData)) {
        const accessToken = localStorage.getItem("accessToken");
        const response = await instance.post(
          "applicationData/create-applicationData",
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          toast.success("Data Submitted Successfully");

          fetchTeam();
          toggleShows();
          setFormData({});
        } else {
          toast.error("Failed to submit data");
        }
      }
    } catch (error) {
      console.error("Error handling form submission:", error);
    }
  };

  const handlePut = async () => {
    console.log("Updating form data:", formData);
    if (validateForm(formData)) {
      const accessToken = localStorage.getItem("accessToken");

      try {
        const response = await instance.put(
          `applicationData/update-applicationData/${editingId}`,
          formData, // Send formData directly
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("PUT response:", response); // Debug log

        if (response.status === 200) {
          toast.success("Data Updated Successfully");
          // Update the specific entry in the team array
          const updatedTeam = team.map((member) =>
            member.id === editingId ? formData : member
          );
          setTeam(updatedTeam);
          fetchTeam();
          toggleShows();
          setEditMode(false);
          setFormData({});
        } else {
          toast.error("Failed to update data");
        }
      } catch (error) {
        console.error("Error handling form update:", error);
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
                const accessToken = localStorage.getItem("accessToken");
                try {
                  await instance.delete(
                    `applicationData/delete-technical/${id}`,
                    {
                      headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                      },
                    }
                  );
                  toast.success("Data Deleted Successfully");
                  fetchTeam();
                } catch (error) {
                  console.error("Error deleting data:", error);
                  toast.error("Error deleting data");
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
                const accessToken = localStorage.getItem("accessToken");
                try {
                  await instance.put(
                    `applicationData/isactive-applicationData/${id}`,
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
    const itemToEdit = team.find((item) => item.id === id);
    if (itemToEdit) {
      setEditingId(id);
      setEditMode(true);
      toggleShows();
      setFormData(itemToEdit); // Ensure this correctly sets `applicationDescription`
    }
  };

  useEffect(() => {
    if (!shows) {
      setEditMode(false);
      setEditingId(null);
      setFormData({});
    }
  }, [shows]);

  const handleChange = (name, value) => {
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Container>
      <Row>
        <Col>
          {!shows && !editMode && (
            <SearchInput
              searchQuery={searchQuery}
              onSearch={handleSearch}
              onExport={handleExport}
              showExportButton={false}
            />
          )}
        </Col>
      </Row>

      <Row>
        <Col>
          {!shows && !editMode ? (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  {tableColumns.map((col) => (
                    <th key={col.key}>{col.label}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {(searchQuery.trim() ? filteredData : team).map(
                  (item, index) => (
                    <tr key={item.id}>
                      {tableColumns.map((col) => (
                        <td key={col.key}>
                          {col.key === "srNo"
                            ? index + 1
                            : col.render
                            ? col.render(item[col.key], index)
                            : item[col.key]}
                        </td>
                      ))}
                      <td>
                        <div className="d-flex">
                          <Button
                            className="ms-1"
                            onClick={() => toggleEdit(item.id)}
                          >
                            <FaEdit />
                          </Button>
                          <Button
                            className="ms-1"
                            onClick={() => handleDelete(item.id)}
                          >
                            <FaTrash />
                          </Button>
                          <Button
                            className="ms-1"
                            onClick={() =>
                              handleIsActive(
                                item.id,
                                !eyeVisibilityById[item.id]
                              )
                            }
                          >
                            {eyeVisibilityById[item.id] ? (
                              <FaEyeSlash />
                            ) : (
                              <FaEye />
                            )}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>
          ) : (
            <Form onSubmit={handlePost}>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="productName">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                      as="select"
                      value={formData.productName || ""}
                      onChange={(e) =>
                        handleChange("productName", e.target.value)
                      }
                      isInvalid={!!errors.productName}
                    >
                      <option value="">Select Product Name</option>
                      {products.map((product) => (
                        <option key={product.id} value={product.productName}>
                          {product.productName}
                        </option>
                      ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.productName}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <NewResuableForm
                    label="Application Description"
                    placeholder="Enter Application Description"
                    name="applicationDescription"
                    type="text"
                    initialData={formData}
                    textarea
                    useJodit={true}
                    error={errors.applicationDescription}
                  />
                </Col>
              </Row>

              <Col className="d-flex justify-content-end">
                {!editMode && (
                  <Button type="button" variant="primary" onClick={handlePost}>
                    Submit
                  </Button>
                )}
                {editMode && (
                  <Button type="button" variant="success" onClick={handlePut}>
                    Update
                  </Button>
                )}
              </Col>
            </Form>
          )}
        </Col>
      </Row>
      <Row>
        <Row>
          {!shows && !editMode && (
            <Col className="mt-3">
              <TablePagination />
            </Col>
          )}
        </Row>
      </Row>
    </Container>
  );
};

export default ApplicationData;