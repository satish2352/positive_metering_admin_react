////works sos

import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Card, Button, Form, Table } from "react-bootstrap";
import { FaEdit, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";
import { useSearchExport } from "../../context/SearchExportContext";
import { ShowContext } from "../../context/ShowContext";
import SearchInput from "../../components/search/SearchInput";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TablePagination from "../../components/pagination/TablePagination";
import instance from "../../api/AxiosInstance";

const OptionsData = () => {
  const { searchQuery, handleSearch, handleExport, setData, filteredData } = useSearchExport();
  const { shows, toggleForm, toggleShow } = useContext(ShowContext);
  const [team, setTeam] = useState([]);
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [eyeVisibilityById, setEyeVisibilityById] = useState({});

  const tableColumns = [
    { key: "productName", label: "Product Name" },
    { key: "optionsDescription", label: "Option Description" },
  ];

  useEffect(() => {
    fetchTeam();
    fetchProducts();
  }, []);

  const fetchTeam = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await instance.get("optionsData/get-optionsData", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      setTeam(response.data.responseData);
      setData(response.data.responseData);
    } catch (error) {
      console.error("Error fetching Option data:", error);
    }
  };

  const fetchProducts = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await instance.get("productname/find-productnames", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      setProducts(response.data.responseData);
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

    if (!formData.optionsDescription?.trim()) {
      errors.optionsDescription = "Option Description is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handlePost = async () => {
    console.log("Form data before submission:", formData);
    try {
      if (validateForm(formData)) {
        const accessToken = localStorage.getItem("accessToken");
        const response = await instance.post("optionsData/create-optionsData", formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          toast.success("Data Submitted Successfully");
          fetchTeam();
          toggleForm();
          toggleShow();
          setFormData({});
        } else {
          toast.error("Failed to submit data");
        }
      }
    } catch (error) {
      console.error("Error handling form submission:", error);
      toast.error("Error handling form submission");
    }
  };

  const handlePut = async () => {
    console.log("Updating form data:", formData);
    if (validateForm(formData)) {
      const accessToken = localStorage.getItem("accessToken");

      try {
        const response = await instance.put(
          `optionsData/update-optionsData/${editingId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("PUT response:", response);

        if (response.status === 200) {
          toast.success("Data Updated Successfully");
          fetchTeam();
          toggleForm();
          toggleShow();
          setEditMode(false);
          setFormData({});
        } else {
          toast.error("Failed to update data");
        }
      } catch (error) {
        console.error("Error handling form update:", error);
        toast.error("Error handling form update");
      }
    }
  };

  const handleDelete = async (id) => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await instance.delete(
        `optionsData/delete-optionsdata/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Data Deleted Successfully");
        fetchTeam();
      } else {
        toast.error("Failed to delete data");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      toast.error("Error deleting data");
    }
  };

  const handleIsActive = async (id, isVisible) => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      await instance.patch(
        `optionsData/isactive-optionsData/${id}`,
        { isVisible },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Visibility Changed Successfully");
      fetchTeam();
    } catch (error) {
      console.error("Error changing visibility:", error);
      toast.error("Error changing visibility");
    }
  };

  const toggleEdit = (id) => {
    const itemToEdit = team.find((item) => item.id === id);
    if (itemToEdit) {
      setEditingId(id);
      setEditMode(true);
      toggleForm();
      toggleShow();
      setFormData(itemToEdit);
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
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="productName">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                      as="select"
                      value={formData.productName || ""}
                      onChange={(e) => handleChange("productName", e.target.value)}
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
                <Col md={6}>
                  <Form.Group controlId="optionsDescription">
                    <Form.Label>Option Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={formData.optionsDescription || ""}
                      onChange={(e) =>
                        handleChange("optionsDescription", e.target.value)
                      }
                      isInvalid={!!errors.optionsDescription}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.optionsDescription}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Button className="mt-3" onClick={editMode ? handlePut : handlePost}>
                {editMode ? "Update" : "Submit"}
              </Button>
            </Form>
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

export default OptionsData;
