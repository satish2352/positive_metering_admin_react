





// //////
// import React, { useState, useEffect } from "react";
// import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
// import { useSearchExport } from "../../context/SearchExportContext";
// import { ShowContext } from "../../context/ShowContext";
// import NewResuableForm from "../../components/form/NewResuableForm";
// import ReusableTable from "../../components/table/ReusableTable";
// import SearchInput from "../../components/search/SearchInput";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import TablePagination from "../../components/pagination/TablePagination";
// import instance from "../../api/AxiosInstance";

// const CarousalForm = () => {
//   const { searchQuery, handleSearch, handleExport, setData, filteredData } = useSearchExport();
//   const { shows, toggleForm, toggleShow } = React.useContext(ShowContext);
//   const [team, setTeam] = useState([]);
//   const [errors, setErrors] = useState({});
//   const [editMode, setEditMode] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [formData, setFormData] = useState({});

  // const tableColumns = [
  //   { key: "name", label: "Name" },
  //   { key: "email", label: "Email" },
  //   { key: "mobile", label: "Mobile" },
  //   { key: "message", label: "Message" },
  // ];

//   useEffect(() => {
//     fetchTeam();
//   }, []);

//   const fetchTeam = async () => {
//     const accessToken = localStorage.getItem("accessToken");
//     try {
//       const response = await instance.get("carousal-form/find-carousalform", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//       });
//       setTeam(response.data.responseData);
//       setData(response.data.responseData);
//     } catch (error) {
//       console.error("Error fetching team:", error);
//       toast.error("Error fetching team data.");
//     }
//   };

  // const validateForm = (data) => {
  //   let errors = {};
  //   let isValid = true;

  //   if (!data.name?.trim()) {
  //     errors.name = "Name is required";
  //     isValid = false;
  //   }

  //   if (!data.email?.trim()) {
  //     errors.email = "Email is required";
  //     isValid = false;
  //   } else if (!/\S+@\S+\.\S+/.test(data.email)) {
  //     errors.email = "Invalid email address";
  //     isValid = false;
  //   }

  //   if (!data.mobile?.trim()) {
  //     errors.mobile = "Mobile number is required";
  //     isValid = false;
  //   } else if (!/^\d{10}$/.test(data.mobile)) {
  //     errors.mobile = "Mobile number must be exactly 10 digits";
  //     isValid = false;
  //   }

  //   if (!data.message?.trim()) {
  //     errors.message = "Message is required";
  //     isValid = false;
  //   }

  //   setErrors(errors);
  //   return isValid;
  // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm(formData)) {
//       const accessToken = localStorage.getItem("accessToken");
//       const data = new FormData();
//       for (const key in formData) {
//         data.append(key, formData[key]);
//       }

//       try {
//         if (editMode) {
//           await instance.put(
//             `carousal-form/update/${editingId}`,
//             data,
//             {
//               headers: {
//                 Authorization: `Bearer ${accessToken}`,
//                 "Content-Type": "multipart/form-data",
//               },
//             }
//           );
//           toast.success("Data Updated Successfully");
//         } else {
//           await instance.post("carousal-form/addcarousalform", data, {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//               "Content-Type": "multipart/form-data",
//             },
//           });
//           toast.success("Data Submitted Successfully");
//         }
//         fetchTeam();
//         toggleForm();
//         toggleShow();
//         setEditMode(false);
//         setFormData({});
//       } catch (error) {
//         console.error("Error handling form submission:", error);
//         toast.error("Error submitting data.");
//       }
//     }
//   };

//   const handleDelete = async (id) => {
//     const accessToken = localStorage.getItem("accessToken");
//     try {
//       await instance.patch(
//         `carousal-form/delete/${id}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       toast.success("Data Deleted Successfully");
//       fetchTeam();
//     } catch (error) {
//       console.error("Error deleting team member:", error);
//       toast.error("Error deleting data.");
//     }
//   };

//   const handleIsActive = async (id, isVisible) => {
//     const accessToken = localStorage.getItem("accessToken");
//     try {
//       await instance.patch(
//         `testimonials/isactive-testimonial/${id}`,
//         { isVisible },
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       toast.success("Data visibility updated successfully");
//       fetchTeam();
//     } catch (error) {
//       console.error("Error updating visibility:", error);
//       toast.error("Error updating visibility.");
//     }
//   };

//   const toggleEdit = (leaderId) => {
//     const memberToEdit = team.find((item) => item.id === leaderId);
//     if (memberToEdit) {
//       setEditingId(leaderId);
//       setEditMode(true);
//       toggleForm();
//       toggleShow();
//       setFormData(memberToEdit);
//     }
//   };

//   useEffect(() => {
//     if (shows) {
//       setEditMode(false);
//       setEditingId(null);
//       setFormData({});
//     }
//   }, [shows]);

//   const handleChange = (name, value) => {
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   return (
//     <Container>
//       <Row>
//         <Col>
//           <SearchInput
//             searchQuery={searchQuery}
//             onSearch={handleSearch}
//             onExport={handleExport}
//           />
//         </Col>
//       </Row>

//       <Row>
//         <Col>
//           {!shows && !editMode ? (
//             <ReusableTable
//               columns={tableColumns}
//               data={searchQuery.trim() ? filteredData : team}
//               onEdit={toggleEdit}
//               onDelete={handleDelete}
//               onShow={handleIsActive}
//             />
//           ) : (
//             <Card className="p-4">
//               <Form onSubmit={handleSubmit}>
//                 <Row>
                  // <Col md={6}>
                  //   <NewResuableForm
                  //     label={"Name"}
                  //     placeholder={"Enter Name"}
                  //     type={"text"}
                  //     name={"name"}
                  //     onChange={handleChange}
                  //     initialData={formData}
                  //   />
                  //   {errors.name && <span className="error text-danger">{errors.name}</span>}
                  // </Col>
                  // <Col md={6}>
                  //   <NewResuableForm
                  //     label={"Email"}
                  //     placeholder={"Enter Email"}
                  //     type={"text"}
                  //     name={"email"}
                  //     onChange={handleChange}
                  //     initialData={formData}
                  //   />
                  //   {errors.email && <span className="error text-danger">{errors.email}</span>}
                  // </Col>
                  // <Col md={6}>
                  //   <NewResuableForm
                  //     label={"Mobile"}
                  //     placeholder={"Enter Mobile"}
                  //     type={"number"}
                  //     name={"mobile"}
                  //     onChange={handleChange}
                  //     initialData={formData}
                  //   />
                  //   {errors.mobile && <span className="error text-danger">{errors.mobile}</span>}
                  // </Col>
                  // <Col md={6}>
                  //   <NewResuableForm
                  //     label={"Message"}
                  //     placeholder={"Enter Message"}
                  //     type={"text"}
                  //     name={"message"}
                  //     onChange={handleChange}
                  //     initialData={formData}
                  //   />
                  //   {errors.message && <span className="error text-danger">{errors.message}</span>}
                  // </Col>
//                 </Row>
//                 <Row>
//                   <Col className="d-flex justify-content-end">
//                     <Button
//                       type="button"
//                       variant="secondary"
//                       className="me-2"
//                       onClick={() => {
//                         setFormData({});
//                         toggleForm();
//                         toggleShow();
//                         setEditMode(false);
//                       }}
//                     >
//                       Cancel
//                     </Button>
//                     <Button type="submit" variant="primary">
//                       {editMode ? "Update" : "Submit"}
//                     </Button>
//                   </Col>
//                 </Row>
//               </Form>
//             </Card>
//           )}
//         </Col>
//       </Row>

//       {!shows && !editMode && (
//         <Row>
//           <Col>
//             <TablePagination data={searchQuery.trim() ? filteredData : team} />
//           </Col>
//         </Row>
//       )}
//     </Container>
//   );
// };

// export default CarousalForm;









////eor
import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Card, Button, Form, Table } from "react-bootstrap";
import { FaEdit, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";
import { useSearchExport } from "../../context/SearchExportContext";
import { ShowContext } from "../../context/ShowContext";
import NewResuableForm from "../../components/form/NewResuableForm";
import SearchInput from "../../components/search/SearchInput";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TablePagination from "../../components/pagination/TablePagination";
import ReusableDropdown from "../../components/dropdown/ReusableDropdown";
import instance from "../../api/AxiosInstance";

const CarousalForm = () => {
  const { searchQuery, handleSearch, handleExport, setData, filteredData } = useSearchExport();
  const { shows, toggleForm, toggleShow } = useContext(ShowContext);
  const [team, setTeam] = useState([]);
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [eyeVisibilityById, setEyeVisibilityById] = useState({});

  const tableColumns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "mobile", label: "Mobile" },
    { key: "message", label: "Message" },
  ];

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await instance.get("carousal-form/find-carousalform", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      setTeam(response.data.responseData);
      setData(response.data.responseData);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const validateForm = (data) => {
    let errors = {};
    let isValid = true;

    if (!data.name?.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!data.email?.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Invalid email address";
      isValid = false;
    }

    if (!data.mobile?.trim()) {
      errors.mobile = "Mobile number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(data.mobile)) {
      errors.mobile = "Mobile number must be exactly 10 digits";
      isValid = false;
    }

    if (!data.message?.trim()) {
      errors.message = "Message is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handlePost = async () => {
    if (validateForm(formData)) {
  
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }

      try {
        await instance.post("carousal-form/addcarousalform", data, {
          headers: {
      
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Data Submitted Successfully");
        fetchTeam();
        toggleForm(); 
        toggleShow();
        setFormData({});
      } catch (error) {
        console.error("Error handling form submission:", error);
      }
    }
  };

  const handlePut = async () => {
    if (validateForm(formData)) {
      const accessToken = localStorage.getItem("accessToken");
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }

      try {
        await instance.put(
          `carousal-form/update/${editingId}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Data Updated Successfully");
        fetchTeam();
        toggleForm();
        toggleShow();
        setEditMode(false);
        setFormData({});
      } catch (error) {
        console.error("Error handling form update:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      await instance.delete(
        `carousal-form/delete/${id}`,
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
  };


  const handleIsActive = async (id, isVisible) => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      await instance.patch(
        `uploadcv/isactive-uploadcv/${id}`,
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
            <Card className="p-4">
              <Form>
                <Row>
                <Col md={6}>
                    <NewResuableForm
                      label={"Name"}
                      placeholder={"Enter Name"}
                      type={"text"}
                      name={"name"}
                      onChange={handleChange}
                      initialData={formData}
                    />
                    {errors.name && <span className="error text-danger">{errors.name}</span>}
                  </Col>
                  <Col md={6}>
                    <NewResuableForm
                      label={"Email"}
                      placeholder={"Enter Email"}
                      type={"text"}
                      name={"email"}
                      onChange={handleChange}
                      initialData={formData}
                    />
                    {errors.email && <span className="error text-danger">{errors.email}</span>}
                  </Col>
                  <Col md={6}>
                    <NewResuableForm
                      label={"Mobile"}
                      placeholder={"Enter Mobile"}
                      type={"number"}
                      name={"mobile"}
                      onChange={handleChange}
                      initialData={formData}
                    />
                    {errors.mobile && <span className="error text-danger">{errors.mobile}</span>}
                  </Col>
                  <Col md={6}>
                    <NewResuableForm
                      label={"Message"}
                      placeholder={"Enter Message"}
                      type={"text"}
                      name={"message"}
                      onChange={handleChange}
                      initialData={formData}
                    />
                    {errors.message && <span className="error text-danger">{errors.message}</span>}
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
                    {!editMode && (
                      <Button type="button" variant="primary" onClick={handlePost}>
                        Submit
                      </Button>
                    )}
                    {editMode && (
                      <Button type="button" variant="primary" onClick={handlePut}>
                        Update
                      </Button>
                    )}
                  </Col>
                </Row>
              </Form>
            </Card>
          )}
        </Col>
      </Row>

      {!shows && !editMode && <TablePagination />}
    </Container>
  );
};

export default CarousalForm;