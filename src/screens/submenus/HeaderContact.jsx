

/////sos
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useSearchExport } from "../../context/SearchExportContext";
import { ShowContext } from "../../context/ShowContext";
import NewReusableForm from "../../components/form/NewResuableForm";
import ReusableTable from "../../components/table/ReusableTable";
import SearchInput from "../../components/search/SearchInput";
import { toast } from "react-toastify";

import TablePagination from "../../components/pagination/TablePagination";
import instance from "../../api/AxiosInstance";

const HeaderContact = () => {
  const { searchQuery, handleSearch, handleExport, setData, filteredData } =
    useSearchExport();

  const { shows, toggleForm, toggleShow } = React.useContext(ShowContext);

  const [team, setTeam] = useState([]);
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

  const tableColumns = [
    { key: "phone1", label: "Phone 1" },
    { key: "phone2", label: "Phone 2" },
  ];

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await instance.get("header-contact/findheaderContacts", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setTeam(response.data.responseData);
      setData(response.data.responseData);
    } catch (error) {
      console.error("Error fetching team:", error);
      toast.error("Failed to fetch data");
    }
  };

  const validateForm = (formData) => {
    let errors = {};
    let isValid = true;

    if (!formData.phone1?.trim()) {
      errors.phone1 = "Mobile number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phone1)) {
      errors.phone1 = "Mobile number must be exactly 10 digits";
      isValid = false;
    }
    if (!formData.phone2?.trim()) {
      errors.phone2 = "Mobile number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phone2)) {
      errors.phone2 = "Mobile number must be exactly 10 digits";
      isValid = false;
    }
    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm(formData)) {
      const accessToken = localStorage.getItem("accessToken");
      try {
        if (editMode) {
          await instance.put(
            `header-contact/headercontact/${editingId}`,
            formData,
            { headers: { Authorization: `Bearer ${accessToken}` } }
          );
          toast.success("Data Updated Successfully");
        } else {
          await instance.post("header-contact/createheadercontact", formData, {
            headers: { Authorization: `Bearer ${accessToken}` },
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
    const accessToken = localStorage.getItem("accessToken");
    try {
      await instance.patch(`header-contact/isdelete/${id}`, {}, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      toast.success("Data Deleted Successfully");
      fetchTeam();
    } catch (error) {
      console.error("Error deleting team member:", error);
      toast.error("Error deleting data");
    }
  };

  const handleIsActive = async (id, isVisible) => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      await instance.patch(`header-contact/isactive/${id}`, { isVisible }, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      toast.success("Data Hide/Show Successfully");
      fetchTeam();
    } catch (error) {
      console.error("Error Hide/Show team member:", error);
      toast.error("Error updating visibility");
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
                    <NewReusableForm
                      label={"Phone 1"}
                      placeholder={"Enter Phone 1"}
                      type={"number"}
                      name={"phone1"}
                      onChange={handleChange}
                      initialData={formData}
                    />
                    {errors.phone1 && (
                      <span className="error text-danger">{errors.phone1}</span>
                    )}
                  </Col>
                  <Col md={6}>
                    <NewReusableForm
                      label={"Phone 2"}
                      placeholder={"Enter Phone 2"}
                      type={"number"}
                      name={"phone2"}
                      onChange={handleChange}
                      initialData={formData}
                    />
                    {errors.phone2 && (
                      <span className="error text-danger">{errors.phone2}</span>
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













