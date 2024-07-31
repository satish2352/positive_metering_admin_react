// ////sos
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form ,Table} from "react-bootstrap";
import { useSearchExport } from "../../context/SearchExportContext";
import { ShowContext } from "../../context/ShowContext";
import NewResuableForm from "../../components/form/NewResuableForm";

import SearchInput from "../../components/search/SearchInput";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TablePagination from "../../components/pagination/TablePagination";
import instance from "../../api/AxiosInstance";
import { FaEdit, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
const Testimonial = () => {
  const { searchQuery, handleSearch, handleExport, setData, filteredData } =
    useSearchExport();
  const { shows,toggleShows } = React.useContext(ShowContext);
  const [team, setTeam] = useState([]);
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [eyeVisibilityById, setEyeVisibilityById] = useState({});
  const [imagePreview, setImagePreview] = useState("");
  const tableColumns = [
    {
      key: "img",
      label: "Image",
      render: (value) => (
        <img
          src={value}
          alt="Testimonial"
          style={{ width: "100px", height: "auto" }}
        />
      ),
    },
    { key: "title", label: "Title" },
    { key: "review", label: "Review" },
    { key: "star", label: "Star" },
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
    } else if (formData.img && typeof formData.img === 'string') {
      setImagePreview(formData.img);
    } else {
      setImagePreview("");
    }
  }, [formData.img]);

  const fetchTeam = async () => {
    const accessToken = localStorage.getItem("accessToken"); // Retrieve access token
    try {
      const response = await instance.get("testimonials/get-testimonials", {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      });
      const reversedData = response.data.responseData.reverse();
      setTeam(reversedData);
      setData(reversedData);
      // setTeam(response.data.responseData);
      // setData(response.data.responseData);
    } catch (error) {
      console.error(
        "Error fetching team:",
        error.response || error.message || error
      );
    }
  };

  const validateForm = (formData) => {
    let errors = {};
    let isValid = true;

    if (!formData.img) {
      errors.img = "Image is required";
      isValid = false;
    }

    if (!formData.title?.trim()) {
      errors.title = "Title is required";
      isValid = false;
    }

    if (!formData.review?.trim()) {
      errors.review = "Review is required";
      isValid = false;
    }

    const starValue = parseFloat(formData.star);
    if (isNaN(starValue) || starValue < 0 || starValue > 5) {
      errors.star = "Star should be a number between 0 and 5";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm(formData)) {
      const accessToken = localStorage.getItem("accessToken"); // Retrieve access token
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }

      try {
        if (editMode) {
          await instance.put(
            `testimonials/update-testimonials/${editingId}`,
            data,
            {
              headers: {
                Authorization: "Bearer " + accessToken,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          toast.success("Data Updated Successfully");
              // Update the specific entry in the team array
              const updatedTeam = team.map((member) =>
                member.id === editingId ? formData : member
              );
              setTeam(updatedTeam);
        } else {
          await instance.post("testimonials/create-testimonials", data, {
            headers: {
              Authorization: "Bearer " + accessToken,
              "Content-Type": "multipart/form-data",
            },
          });
          toast.success("Data Submitted Successfully");

        }
        fetchTeam();
        toggleShows(); 
        setEditMode(false);
        setFormData({});
        setImagePreview(""); 
      } catch (error) {
        console.error("Error handling form submission:", error);
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
                  await instance.delete(`testimonials/isdelete-testimonial/${id}`, {
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
                }
                onClose();
              }}
            >
              Yes
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => onClose()}
            >
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
          <p>Are you sure you want to {isVisible ? "hide" : "show"} this data?</p>
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
                    `testimonials/isactive-testimonial/${id}`,
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
            <button
              className="btn btn-secondary"
              onClick={() => onClose()}
            >
              No
            </button>
          </div>
        </div>
      ),
    });
  };



  const toggleEdit = (leaderId) => {
    const memberToEdit = team.find((item) => item.id === leaderId);
    if (memberToEdit) {
      setEditingId(leaderId);
      setEditMode(true);
      toggleShows(); 
      setFormData(memberToEdit);
    }
  };
  const toggleVisibility = (id) => {
    const updatedEyeVisibilityById = {
      ...eyeVisibilityById,
      [id]: !eyeVisibilityById[id],
    };
    setEyeVisibilityById(updatedEyeVisibilityById);
  };
  useEffect(() => {
    if (!shows) {
      setEditMode(false);
      setEditingId(null);
      setFormData({});
      setImagePreview("");
    }
  }, [shows]);


  const handleChange = (name, value) => {
    if (name === "img") {
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
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
                {(searchQuery.trim() ? filteredData : team).map((item) => (
                  <tr key={item.id}>
                    {tableColumns.map((col) => (
                      <td key={col.key}>
                        {col.render ? col.render(item[col.key]) : item[col.key]}
                      </td>
                    ))}
                    <td>
                      <div className="d-flex">
                        <Button className="ms-1" onClick={() => toggleEdit(item.id)}>
                          <FaEdit />
                        </Button>
                        <Button className="ms-1" onClick={() => handleDelete(item.id)}>
                          <FaTrash />
                        </Button>
                        <Button
                          className="ms-1"
                          onClick={() => {
                            toggleVisibility(item.id);
                            handleIsActive(item.id, !eyeVisibilityById[item.id]);
                          }}
                        >
                          {eyeVisibilityById[item.id] ? <FaEyeSlash /> : <FaEye />}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Card className="p-4">
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                  {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Selected Preview"
                        style={{ width: "100px", height: "auto", marginBottom: '10px' }}
                      />
                    )}
                    <NewResuableForm
                      label={"Image Upload"}
                      placeholder={"Upload Image"}
                      name={"img"}
                      type={"file"}
                      onChange={handleChange}
                      initialData={formData}
                    />
                    {errors.img && (
                      <p className="text-danger">{errors.img}</p>
                    )}
                  </Col>
                  <Col md={6}>
                    <NewResuableForm
                      label={"Title"}
                      placeholder={"Enter Title"}
                      name={"title"}
                      type={"text"}
                      onChange={handleChange}
                      initialData={formData}
                    />
                    {errors.title && (
                      <p className="text-danger">{errors.title}</p>
                    )}
                  </Col>
                  <Col md={6}>
                    <NewResuableForm
                      label={"Review"}
                      placeholder={"Enter Review"}
                      name={"review"}
                      type={"text"}
                      onChange={handleChange}
                      initialData={formData}
                      textarea
                   
                    />
                    {errors.review && (
                      <p className="text-danger">{errors.review}</p>
                    )}
                  </Col>
                  <Col md={6}>
                    <NewResuableForm
                      label={"Star"}
                      placeholder={"Enter Star (0-5)"}
                      name={"star"}
                      type={"number"}
                      onChange={handleChange}
                      initialData={formData}
                      min={0}
                      max={5}
                      step={0.1}
                    />
                    {errors.star && (
                      <p className="text-danger">{errors.star}</p>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col className="d-flex justify-content-end">
              
                   
                  <div className="mt-3 d-flex justify-content-end">
                    <Button
                      type="submit"
                      variant={editMode ? "success" : "primary"}
                    >
                      {editMode ? "Update" : "Submit"}
                    </Button>
                  </div>
                  </Col>
                </Row>
              </Form>
            </Card>
          )}
        </Col>
      </Row>


      <Row>
        {!shows && !editMode && (
          <Col className="mt-3">
            <TablePagination />
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Testimonial;




