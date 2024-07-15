////using shubham sir code...
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useSearchExport } from "../../context/SearchExportContext";
import { ShowContext } from "../../context/ShowContext";
import NewReusableForm from "../../components/form/NewResuableForm";
import ReusableTable from "../../components/table/ReusableTable";
import SearchInput from "../../components/search/SearchInput";
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import TablePagination from "../../components/pagination/TablePagination";

const Testemonial = () => {
  const {
    searchQuery,
    handleSearch,
    handleExport,
    setData,
    filteredData,
  } = useSearchExport();

  const { shows, toggleForm, toggleShow } = React.useContext(ShowContext);

  const [team, setTeam] = useState([]);
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

  const tableColumns = [
    { key: "imageupload", label: "Image" },
    { key: "title", label: "Title" },
    { key: "review", label: "Review" },
    { key: "star", label: "Star" },
  ];

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const response = await axios.get("http://localhost:5000/testemonial");
      setTeam(response.data);
      setData(response.data); // Update the context data
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

    // Validate Image URL
    if (!formData.imageupload?.trim()) {
      errors.imageupload = "Image URL is required";
      isValid = false;
    }

    // Validate Title
    if (!formData.title?.trim()) {
      errors.title = "Title is required";
      isValid = false;
    }

    // Validate Review
    if (!formData.review?.trim()) {
      errors.review = "Review is required";
      isValid = false;
    }

    // Validate Star
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
      try {
        if (editMode) {
          await axios.put(
            `http://localhost:5000/testemonial/${editingId}`,
            formData
          );
          toast.success("Data Updated Successfully");
        } else {
          await axios.post("http://localhost:5000/testemonial", formData);
          toast.success("Data Submitted Successfully");
        }
        fetchTeam();
        toggleForm();
        toggleShow();
        setEditMode(false);
        setFormData({}); // Reset form data after submission
      } catch (error) {
        console.error("Error handling form submission:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/testemonial/${id}`);
      toast.success("Data Deleted Successfully");
      fetchTeam();
    } catch (error) {
      console.error("Error deleting team member:", error);
      toast.error("Error submitting data");
    }
  };

  const toggleEdit = (leaderId) => {
    const memberToEdit = team.find((item) => item.id === leaderId);
    if (memberToEdit) {
      setEditingId(leaderId);
      setEditMode(true);
      toggleForm();
      toggleShow();
      setFormData(memberToEdit); // Set initial form data for editing
    }
  };

  useEffect(() => {
    if (shows) {
      setEditMode(false);
      setEditingId(null);
      setFormData({});
    }
  }, [shows]);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Container>
      <Row>
        <Col>
          <SearchInput
            searchQuery={searchQuery}
            onSearch={handleSearch}
            onExport={handleExport}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          {!shows && !editMode ? (
            <ReusableTable
              columns={tableColumns}
              data={searchQuery.trim() ? filteredData : team}
              onEdit={toggleEdit}
              onDelete={handleDelete}
            />
          ) : (
            <Card className="p-4">
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <NewReusableForm
                      label={"Image"}
                      placeholder={"Upload Image"}
                      type={"file"}
                      name={"imageupload"}
                      onChange={handleChange}
                      initialData={formData}
                    />
                    {errors.imageupload && (
                      <span className="error text-danger">
                        {errors.imageupload}
                      </span>
                    )}
                  </Col>

                  <Col md={6}>
                    <NewReusableForm
                      label={"Title"}
                      placeholder={"Enter Title"}
                      type={"text"}
                      name={"title"}
                      onChange={handleChange}
                      initialData={formData}
                    />
                    {errors.title && (
                      <span className="error text-danger">{errors.title}</span>
                    )}
                  </Col>
                  <Col md={6}>
                    <NewReusableForm
                      label={"Review"}
                      placeholder={"Enter Review"}
                      type={"text"}
                      name={"review"}
                      min={"0"}
                      max={"5"}
                      step={"0.1"}
                      textarea={true}
                      useJodit={true} 
                      onChange={handleChange}
                      initialData={formData}
                    />
                    {errors.review && (
                      <span className="error text-danger">{errors.review}</span>
                    )}
                  </Col>
                  <Col md={6}>
                    <NewReusableForm
                      label={"Star"}
                      placeholder={"Enter Star 0 to 5 (decimal allows)"}
                      type={"text"}
                      name={"star"}
                      onChange={handleChange}
                      initialData={formData}
                    />
                    {errors.star && (
                      <span className="error text-danger">{errors.star}</span>
                    )}
                  </Col>
                  <div className="mt-3">
                    <Button type="submit" variant="primary">
                      {editMode ? "Update" : "Submit"}
                    </Button>
                    <Button
                      onClick={() => setEditMode(false)}
                      variant="secondary"
                      className="ms-2"
                    >
                      Cancel
                    </Button>
                  </div>
                </Row>
              </Form>
            </Card>
          )}
        </Col>
      </Row>
      <Row>
     <Col>
     <TablePagination />
     </Col>
      </Row>
    </Container>
  );
};

export default Testemonial;

////
