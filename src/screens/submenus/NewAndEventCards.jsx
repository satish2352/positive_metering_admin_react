

// ////
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import axios from "../../api/AxiosInstance";
import { useSearchExport } from "../../context/SearchExportContext";
import { ShowContext } from "../../context/ShowContext";
import NewReusableForm from "../../components/form/NewResuableForm";
import ReusableTable from "../../components/table/ReusableTable";
import SearchInput from "../../components/search/SearchInput";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TablePagination from "../../components/pagination/TablePagination";

const NewsAndEventCards = () => {
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
  const [formData, setFormData] = useState({ name: "", email: "", mobile: "", message: "" });

  const tableColumns = [
    { key: "shortdescription", label: "Short Description" },
    { key: "longdescription", label: "Long Description" },
    { key: "image", label: "Image" },

  ];

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const response = await axios.get("http://localhost:5000/newsevents");
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

    // Validate Name
    if (!formData.shortdescription?.trim()) {
      errors.shortdescription = "Short Description is required";
      isValid = false;
    }

    if (!formData.longdescription?.trim()) {
      errors.longdescription = "Long Description is required";
      isValid = false;
    }

    // Validate Message
    if (!formData.image?.trim()) {
      errors.image = "Image is required";
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
            `http://localhost:5000/newsevents/${editingId}`,
            formData
          );
          toast.success("Data Updated Successfully");
        } else {
          await axios.post("http://localhost:5000/newsevents", formData);
          toast.success("Data Submitted Successfully");
        }
        fetchTeam();
        toggleForm();
        toggleShow();
        setEditMode(false);
        setFormData({ shortdescription: "", longdescription: "", image: "", }); // Reset form data after submission
      } catch (error) {
        console.error("Error handling form submission:", error);
       
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/newsevents/${id}`);
      toast.success("Data Deleted Successfully");
      fetchTeam();
    } catch (error) {
      console.error("Error deleting team member:", error);
      toast.error("Error deleting data");
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
      setFormData({  shortdescription: "", longdescription: "", image: "",});
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
                      label={"Short Description"}
                      placeholder={"Enter Short Description"}
                      type={"text"}
                      name={"shortdescription"}
                      textarea={true}
                      onChange={handleChange}
                      initialData={formData}
                    />
                    {errors.shortdescription && (
                      <span className="error text-danger">{errors.shortdescription}</span>
                    )}
                  </Col>

                  <Col md={6}>
                    <NewReusableForm
                      label={"Long Description"}
                      placeholder={"Enter Long Description"}
                      type={"text"}
                      name={"longdescription"}
                      textarea={true}
                      onChange={handleChange}
                      initialData={formData}
                    />
                    {errors.longdescription && (
                      <span className="error text-danger">{errors.longdescription}</span>
                    )}
                  </Col>

         

                  <Col md={6}>
                    <NewReusableForm
                      label={"Image"}
                      placeholder={"Add Image"}
                      type={"file"}
                      name={"image"}
                      onChange={handleChange}
                      initialData={formData}
                    />
                    {errors.image && (
                      <span className="error text-danger">{errors.image}</span>
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

export default NewsAndEventCards;