import React, { useContext, useState, useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import axios from "axios";
import { ShowContext } from "../../context/ShowContext";
import { FaEdit, FaTrash } from "react-icons/fa";

const Slider = () => {
  const { shows, toggleForm, toggleShow } = useContext(ShowContext);
  const [team, setTeam] = useState([]);
  const [imageupload, setImageUpload] = useState("");

  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const response = await axios.get("http://localhost:5000/slider");
      setTeam(response.data);
    } catch (error) {
      console.error("Error fetching team:", error);
    }
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!imageupload.trim()) {
      errors.imageupload = "Image  is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newMember = { imageupload };
      try {
        await axios.post("http://localhost:5000/slider", newMember);
        alert("Data Submitted Successfully");
        fetchTeam();
        resetForm();
        toggleForm();
        toggleShow();
        setEditMode(false);
      } catch (error) {
        console.error("Error adding team member:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/slider/${id}`);
      alert("Data Deleted Successfully");
      fetchTeam();
    } catch (error) {
      console.error("Error deleting team member:", error);
    }
  };

  const handleEditing = async () => {
    const updatedMember = { imageupload };
    try {
      await axios.put(
        `http://localhost:5000/slider/${editingId}`,
        updatedMember
      );
      alert("Data Updated Successfully");
      fetchTeam();
      resetForm();
      toggleForm();
      toggleShow();
      setEditMode(false);
    } catch (error) {
      console.error("Error updating team member:", error);
    }
  };

  const resetForm = () => {
    setImageUpload("");
    setErrors({});
  };

  //   const toggleEdit = (memberId) => {
  //     setEditMode(true);
  //     setEditingId(memberId);
  //     toggleForm();
  //     toggleShow();
  //   };

  //   useEffect(() => {
  //     if (shows) {
  //       setEditMode(false);
  //     }
  //   }, [shows]);

  // const toggleEdit = (memberId) => {
  //   const memberToEdit = team.find((item) => item.id === memberId);
  //   if (memberToEdit) {
  //     setName(memberToEdit.name);
  //     setTitle(memberToEdit.title);
  //     setDescription(memberToEdit.description);
  //     setImageUpload(memberToEdit.imageupload);
  //     setFacebook(memberToEdit.facebook);
  //     setInstagram(memberToEdit.instagram);
  //     setLinkedin(memberToEdit.linkedin);
  //     setEditingId(memberId);
  //     setEditMode(true);
  //     toggleForm();
  //     toggleShow();
  //   }
  // };

  // useEffect(() => {
  //   if (!shows) {
  //     resetForm();
  //     setEditMode(false);
  //     setEditingId(null);
  //   }
  // }, [shows]);

  return (
    <Container>
      {!shows && !editMode ? (
        <Row>
          <Table striped bordered hover responsive className="bg-white">
            <thead className="bg-dark text-white">
              <tr>
                <th>#</th>
                <th>Image </th>

                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {team.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.imageupload}</td>

                  <td>
                    <div className="d-flex">
                      <Button
                        variant="warning"
                        className="ms-1"
                        onClick={() => toggleEdit(item.id)}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="danger"
                        className="ms-1"
                        onClick={() => handleDelete(item.id)}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
      ) : (
        <Card className="p-4">
          <Form onSubmit={editMode ? handleEditing : handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formImage1">
                  <Form.Label>Upload Image </Form.Label>
                  <Form.Control
                    type="file"
                    placeholder="Upload image"
                    value={imageupload}
                    onChange={(e) => setImageUpload(e.target.value)}
                  />
                  {errors.imageupload1 && (
                    <span className="error text-danger">
                      {errors.imageupload1}
                    </span>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Button type="submit" variant="outline-success">
              {editMode ? "Update" : "Submit"}
            </Button>
          </Form>
        </Card>
      )}
    </Container>
  );
};

export default Slider;
