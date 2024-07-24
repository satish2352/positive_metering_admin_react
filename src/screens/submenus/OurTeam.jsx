////sos
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useSearchExport } from "../../context/SearchExportContext";
import { ShowContext } from "../../context/ShowContext";
import NewResuableForm from "../../components/form/NewResuableForm";
import ReusableTable from "../../components/table/ReusableTable";
import SearchInput from "../../components/search/SearchInput";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TablePagination from "../../components/pagination/TablePagination";
import instance from "../../api/AxiosInstance";

const OurTeam = () => {
  const { searchQuery, handleSearch, handleExport, setData, filteredData } =
    useSearchExport();
  const { shows, toggleForm, toggleShow } = React.useContext(ShowContext);
  const [team, setTeam] = useState([]);
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

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
    { key: "name", label: "Name" },
    { key: "designation", label: "Designation" },
    { key: "description", label: "Description" },
    { key: "position_no", label: "Position No" },

  ];

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    
    try {
      const response = await instance.get("team/get-teammembers", {
        headers: {
     
          "Content-Type": "application/json",
        },
      });
      setTeam(response.data.responseData);
      setData(response.data.responseData);
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

    if (!formData.name?.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!formData.designation?.trim()) {
      errors.designation = "Designation is required";
      isValid = false;
    }
    if (!formData.description?.trim()) {
      errors.description = "Description is required";
      isValid = false;
    }
    if (!formData.position_no?.trim()) {
      errors.position_no = "Position no is required";
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
            `team/update-teammember/${editingId}`,
            data,
            {
              headers: {
                Authorization: "Bearer " + accessToken,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          toast.success("Data Updated Successfully");
        } else {
          await instance.post("team/create-teammember", data, {
            headers: {
              Authorization: "Bearer " + accessToken,
              "Content-Type": "multipart/form-data",
            },
          });
          toast.success("Data Submitted Successfully");
        }
        fetchTeam();
        toggleForm();
        toggleShow();
        setEditMode(false);
        setFormData({});
      } catch (error) {
        console.error("Error handling form submission:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    const accessToken = localStorage.getItem("accessToken"); // Retrieve access token
    try {
      await instance.patch(
        `team/isdelete-teammember/${id}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Data Deleted Successfully");
      fetchTeam();
    } catch (error) {
      console.error("Error deleting team member:", error);
      toast.error("Error submitting data");
    }
  };

  const handleIsActive = async (id, isVisible) => {
    const accessToken = localStorage.getItem("accessToken"); // Retrieve access token
    try {
      await instance.patch(
        `team/isactive-teammember/${id}`,
        { isVisible },
        {
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Data Hide/Show Successfully");
      fetchTeam();
    } catch (error) {
      console.error("Error Hide/Show team member:", error);
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
      setFormData(memberToEdit);
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
              onShow={handleIsActive}
            />
          ) : (
            <Card className="p-4">
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
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
                      label={"Name"}
                      placeholder={"Enter Name"}
                      name={"name"}
                      type={"text"}
                      onChange={handleChange}
                      initialData={formData}
                    />
                    {errors.name && (
                      <p className="text-danger">{errors.name}</p>
                    )}
                  </Col>
                  <Col md={6}>
                    <NewResuableForm
                      label={"Designation "}
                      placeholder={"Enter Designation"}
                      name={"designation"}
                      type={"text"}
                      onChange={handleChange}
                      initialData={formData}
                    
                    />
                    {errors.designation && (
                      <p className="text-danger">{errors.designation}</p>
                    )}
                  </Col>
                  <Col md={6}>
                    <NewResuableForm
                      label={"Description "}
                      placeholder={"Enter Description "}
                      name={"description"}
                      type={"text"}
                      onChange={handleChange}
                      initialData={formData}
                      textarea
                   
                    />
                    {errors.description && (
                      <p className="text-danger">{errors.description}</p>
                    )}
                  </Col>
                  <Col md={6}>
                    <NewResuableForm
                      label={"Position No"}
                      placeholder={"Enter Position No "}
                      name={"position_no"}
                      type={"number"}
                      onChange={handleChange}
                      initialData={formData}
                      
                   
                    />
                    {errors.position_no && (
                      <p className="text-danger">{errors.position_no}</p>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col className="d-flex justify-content-end">
                    <Button
                      type="button"
                      variant="secondary"
                      className="me-2"
                      onClick={() => {
                        setFormData({});
                        toggleForm();
                        toggleShow();
                        setEditMode(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" variant="primary">
                      {editMode ? "Update" : "Submit"}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card>
          )}
        </Col>
      </Row>

      {!shows && !editMode && (
        <Row>
          <Col>
            <TablePagination data={searchQuery.trim() ? filteredData : team} />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default OurTeam;











