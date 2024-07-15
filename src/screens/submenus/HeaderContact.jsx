
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
const HeaderContact = () => {
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
    { key: "imageupload1", label: "Image" },
    { key: "title", label: "Title" },
    { key: "description", label: "Description" },
  ];

  useEffect(() => {
    fetchTeam();
  }, []);

  const formFields = [
    {
      name: "imageupload1",
      label: "Upload Image",
      type: "file",
      placeholder: "Upload image",
      col: 6,
    },
    {
      name: "title",
      label: "Title",
      type: "text",
      placeholder: "Enter title",
      col: 6,
    },
    {
      name: "description",
      label: "Description",
      as: "textarea",
      rows: 3,
      placeholder: "Enter description",
      col: 12,
    },
  ];



  const fetchTeam = async () => {
    try {
      const response = await axios.get("http://localhost:5000/headercontact");
      setTeam(response.data);
      setData(response.data); // Update the context data
    } catch (error) {
      console.error("Error fetching team:", error);
    }
  };

  const validateForm = (formData) => {
    let errors = {};
    let isValid = true;

    if (!formData.title?.trim()) {
      errors.title = "Title is required";
      isValid = false;
    }

    if (!formData.description?.trim()) {
      errors.description = "Description is required";
      isValid = false;
    }

    if (!formData.imageupload1?.trim()) {
      errors.imageupload1 = "Image is required";
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
            `http://localhost:5000/headercontact/${editingId}`,
            formData
          );
          toast.success("Data Updated Successfully");
        } else {
          await axios.post("http://localhost:5000/headercontact", formData);
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
      await axios.delete(`http://localhost:5000/headercontact/${id}`);
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
                      name={"imageupload1"}
                      onChange={handleChange}
                      initialData={formData}
                    />
                    {errors.imageupload1 && (
                      <span className="error text-danger">
                        {errors.imageupload1}
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
                      label={"Description"}
                      placeholder={"Enter Description"}
                      type={"text"}
                      name={"description"}
                      onChange={handleChange}
                      initialData={formData}
                    />
                    {errors.description && (
                      <span className="error text-danger">{errors.description}</span>
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

export default HeaderContact;
