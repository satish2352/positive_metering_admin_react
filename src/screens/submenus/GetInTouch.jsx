



// /////
import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Card, Button, Form, Table } from "react-bootstrap";
import { FaEdit, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";
import { useSearchExport } from "../../context/SearchExportContext";
import { ShowContext } from "../../context/ShowContext";
import NewResuableForm from "../../components/form/NewResuableForm";
import SearchInput from "../../components/search/SearchInput";
import { toast } from "react-toastify";
import TablePagination from "../../components/pagination/TablePagination";
import instance from "../../api/AxiosInstance";

const GetInTouch = () => {
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
    { key: "phone", label: "Phone" },
    { key: "subject", label: "Subject" },
    { key: "message", label: "Message" },
  ];

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await instance.get("getintouch/find-getintouch", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      setTeam(response.data.responseData);
      setData(response.data.responseData);
    } catch (error) {
      console.error("Error fetching getintouch data:", error);
    }
  };

  const validateForm = (formData) => {
    let errors = {};
    let isValid = true;

    if (!formData.name?.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email?.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format";
      isValid = false;
    }

    if (!formData.phone?.trim()) {
      errors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Phone number must be exactly 10 digits";
      isValid = false;
    }

    if (!formData.subject?.trim()) {
      errors.subject = "Subject is required";
      isValid = false;
    }

    if (!formData.message?.trim()) {
      errors.message = "Message is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handlePostSubmit = async (data) => {
    // const accessToken = localStorage.getItem("accessToken");
    try {
      await instance.post("getintouch/add-getintouch", data, {
        headers: {
          // Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      toast.success("Data Submitted Successfully");
      fetchTeam();
      toggleForm();
      toggleShow();
      setEditMode(false);
      setFormData({});
    } catch (error) {
      console.error("Error handling form submission:", error);
    }
  };

  const handleDelete = async (id) => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      await instance.patch(`getintouch/delete/${id}`,
        {},
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
      toast.error("Deletion failed. Please try again.");
    }
  };

  const handlePutSubmit = async (data) => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      await instance.put(`getintouch/update/${editingId}`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      toast.success("Data Updated Successfully");
      fetchTeam();
      toggleForm();
      toggleShow();
      setEditMode(false);
      setFormData({});
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm(formData)) {
      const data = { ...formData };
      if (editMode) {
        handlePutSubmit(data);
      } else {
        handlePostSubmit(data);
      }
    }
  };

  const toggleEdit = (id) => {
    const memberToEdit = team.find((item) => item.id === id);
    if (memberToEdit) {
      setEditingId(id);
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

  const toggleVisibility = (id) => {
    const updatedEyeVisibilityById = {
      ...eyeVisibilityById,
      [id]: !eyeVisibilityById[id],
    };
    setEyeVisibilityById(updatedEyeVisibilityById);
  };

  return (
    <Container>
      <Row>
        <Col>
          <SearchInput searchQuery={searchQuery} onSearch={handleSearch} onExport={handleExport} />
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
                      <td key={col.key}>{item[col.key]}</td>
                    ))}
                    <td>
                      <div className="d-flex">
                        <Button className="ms-1" onClick={() => toggleEdit(item.id)}>
                          <FaEdit />
                        </Button>
                        <Button className="ms-1" onClick={() => handleDelete(item.id)}>
                          <FaTrash />
                        </Button>
                        <Button className="ms-1" onClick={() => toggleVisibility(item.id)}>
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
                    <NewResuableForm
                      label="Name"
                      placeholder="Enter Name"
                      type="text"
                      name="name"
                      onChange={handleChange}
                      initialData={formData}
                    />
                    {errors.name && (
                      <span className="error text-danger">{errors.name}</span>
                    )}
                  </Col>
                  <Col md={6}>
                    <NewResuableForm
                      label="Email"
                      placeholder="Enter Email"
                      type="text"
                      name="email"
                      onChange={handleChange}
                      initialData={formData}
                    />
                    {errors.email && (
                      <span className="error text-danger">{errors.email}</span>
                    )}
                  </Col>
                  <Col md={6}>
                    <NewResuableForm
                      label="Phone"
                      placeholder="Enter Phone No"
                      type="text"
                      name="phone"
                      onChange={handleChange}
                      initialData={formData}
                    />
                    {errors.phone && (
                      <span className="error text-danger">{errors.phone}</span>
                    )}
                  </Col>
                  <Col md={6}>
                    <NewResuableForm
                      label="Subject"
                      placeholder="Enter Subject"
                      type="text"
                      name="subject"
                      onChange={handleChange}
                      initialData={formData}
                    />
                    {errors.subject && (
                      <span className="error text-danger">{errors.subject}</span>
                    )}
                  </Col>
                  <Col md={6}>
                    <NewResuableForm
                      label="Message"
                      placeholder="Enter Message"
                      type="text"
                      name="message"
                      onChange={handleChange}
                      initialData={formData}
                    />
                    {errors.message && (
                      <span className="error text-danger">{errors.message}</span>
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

export default GetInTouch;






















/////new error
// import React, { useState, useEffect, useContext } from "react";
// import { Container, Row, Col, Card, Button, Form, Table } from "react-bootstrap";
// import { FaEdit, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";
// import { useSearchExport } from "../../context/SearchExportContext";
// import { ShowContext } from "../../context/ShowContext";
// import NewResuableForm from "../../components/form/NewResuableForm";
// import SearchInput from "../../components/search/SearchInput";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import TablePagination from "../../components/pagination/TablePagination";
// import ReusableDropdown from "../../components/dropdown/ReusableDropdown";
// import instance from "../../api/AxiosInstance";

// const GetInTouch = () => {
//   const { searchQuery, handleSearch, handleExport, setData, filteredData } = useSearchExport();
//   const { shows, toggleForm, toggleShow } = useContext(ShowContext);
//   const [team, setTeam] = useState([]);
//   const [errors, setErrors] = useState({});
//   const [editMode, setEditMode] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [formData, setFormData] = useState({});
//   const [eyeVisibilityById, setEyeVisibilityById] = useState({});

//   const tableColumns = [
//     { key: "name", label: "Name" },
//     { key: "email", label: "Email" },
//     { key: "phone", label: "Phone" },
//     { key: "subject", label: "Subject" },
//     { key: "message", label: "Message" },
//   ];

//   useEffect(() => {
//     fetchTeam();
//   }, []);

//   const fetchTeam = async () => {
//     const accessToken = localStorage.getItem("accessToken");
//     try {
//       const response = await instance.get("getintouch/find-getintouch", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//       });
//       setTeam(response.data.responseData);
//       setData(response.data.responseData);
//     } catch (error) {
//       console.error("Error fetching product data:", error);
//     }
//   };

//   const validateForm = (formData) => {
//     let errors = {};
//     let isValid = true;

//     if (!formData.cv) {
//       errors.cv = "Cv is required";
//       isValid = false;
//     }

//     if (!formData.name?.trim()) {
//       errors.name = "Name is required";
//       isValid = false;
//     }

//     if (!formData.email?.trim()) {
//       errors.email = "Email is required";
//       isValid = false;
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       errors.email = "Invalid email address";
//       isValid = false;
//     }

//     if (!formData.phone?.trim()) {
//       errors.phone = "Phone number is required";
//       isValid = false;
//     } else if (!/^\d{10}$/.test(formData.phone)) {
//       errors.phone = "Phone number must be exactly 10 digits";
//       isValid = false;
//     }
//     if (!formData.subject?.trim()) {
//       errors.subject = "Subject is required";
//       isValid = false;
//     }
//     if (!formData.message?.trim()) {
//       errors.message = "Message is required";
//       isValid = false;
//     }

//     setErrors(errors);
//     return isValid;
//   };

//   const handlePost = async () => {
//     if (validateForm(formData)) {

//       const data = new FormData();
//       for (const key in formData) {
//         data.append(key, formData[key]);
//       }

//       try {
//         await instance.post("getintouch/add-getintouch", data, {
//           headers: {
      
//             "Content-Type": "multipart/form-data",
//           },
//         });
//         toast.success("Data Submitted Successfully");
//         fetchTeam();
//         toggleForm();
//         toggleShow();
//         setFormData({});
//       } catch (error) {
//         console.error("Error handling form submission:", error);
//       }
//     }
//   };



 


//   const handlePut = async () => {
//     if (validateForm(formData)) {
//       const accessToken = localStorage.getItem("accessToken");
//       const data = new FormData();
//       for (const key in formData) {
//         data.append(key, formData[key]);
//       }

//       try {
//         await instance.put(
//           `getintouch/update/${editingId}`,
//           data,
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );
//         toast.success("Data Updated Successfully");
//         fetchTeam();
//         toggleForm();
//         toggleShow();
//         setEditMode(false);
//         setFormData({});
//       } catch (error) {
//         console.error("Error handling form update:", error);
//       }
//     }
//   };

//   const handleDelete = async (id) => {
//     const accessToken = localStorage.getItem("accessToken");
//     try {
//       await instance.patch(
//         `getintouch/delete/${id}`,
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
//       console.error("Error deleting product:", error);
//     }
//   };

//   const handleIsActive = async (id, isVisible) => {
//     const accessToken = localStorage.getItem("accessToken");
//     try {
//       await instance.patch(
//         `getintouch/isactive-getintouch/${id}`,
//         { isVisible },
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       toast.success("Visibility Changed Successfully");
//       fetchTeam();
//     } catch (error) {
//       console.error("Error changing visibility:", error);
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

//   const toggleVisibility = (id) => {
//     const updatedEyeVisibilityById = {
//       ...eyeVisibilityById,
//       [id]: !eyeVisibilityById[id],
//     };
//     setEyeVisibilityById(updatedEyeVisibilityById);
//   };

//   useEffect(() => {
//     if (shows) {
//       setEditMode(false);
//       setEditingId(null);
//       setFormData({});
//     }
//   }, [shows]);

//   const handleChange = (name, value) => {
//     setFormData({ ...formData, [name]: value });
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
//             <Table striped bordered hover responsive>
//               <thead>
//                 <tr>
//                   {tableColumns.map((col) => (
//                     <th key={col.key}>{col.label}</th>
//                   ))}
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {(searchQuery.trim() ? filteredData : team).map((item) => (
//                   <tr key={item.id}>
//                     {tableColumns.map((col) => (
//                       <td key={col.key}>
//                         {col.render ? col.render(item[col.key]) : item[col.key]}
//                       </td>
//                     ))}
//                     <td>
//                       <div className="d-flex">
//                         <Button className="ms-1" onClick={() => toggleEdit(item.id)}>
//                           <FaEdit />
//                         </Button>
//                         <Button className="ms-1" onClick={() => handleDelete(item.id)}>
//                           <FaTrash />
//                         </Button>
//                         <Button
//                           className="ms-1"
//                           onClick={() => {
//                             toggleVisibility(item.id);
//                             handleIsActive(item.id, !eyeVisibilityById[item.id]);
//                           }}
//                         >
//                           {eyeVisibilityById[item.id] ? <FaEyeSlash /> : <FaEye />}
//                         </Button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           ) : (
//             <Card className="p-4">
//               <Form>
//                 <Row>
//                 <Col md={6}>
//                     <NewResuableForm
//                       label="Name"
//                       placeholder="Enter Name"
//                       type="text"
//                       name="name"
//                       onChange={handleChange}
//                       initialData={formData}
//                     />
//                     {errors.name && (
//                       <span className="error text-danger">{errors.name}</span>
//                     )}
//                   </Col>
//                   <Col md={6}>
//                     <NewResuableForm
//                       label="Email"
//                       placeholder="Enter Email"
//                       type="text"
//                       name="email"
//                       onChange={handleChange}
//                       initialData={formData}
//                     />
//                     {errors.email && (
//                       <span className="error text-danger">{errors.email}</span>
//                     )}
//                   </Col>
//                   <Col md={6}>
//                     <NewResuableForm
//                       label="Phone"
//                       placeholder="Enter Phone No"
//                       type="number"
//                       name="phone"
//                       onChange={handleChange}
//                       initialData={formData}
//                     />
//                     {errors.phone && (
//                       <span className="error text-danger">{errors.phone}</span>
//                     )}
//                   </Col>
//                   <Col md={6}>
//                     <NewResuableForm
//                       label="Subject"
//                       placeholder="Enter Subject"
//                       type="text"
//                       name="subject"
//                       onChange={handleChange}
//                       initialData={formData}
//                     />
//                     {errors.subject && (
//                       <span className="error text-danger">{errors.subject}</span>
//                     )}
//                   </Col>
//                   <Col md={6}>
//                     <NewResuableForm
//                       label="Message"
//                       placeholder="Enter Message"
//                       type="text"
//                       name="message"
//                       onChange={handleChange}
//                       initialData={formData}
//                     />
//                     {errors.message && (
//                       <span className="error text-danger">{errors.message}</span>
//                     )}
//                   </Col>
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
//                     {!editMode && (
//                       <Button type="button" variant="primary" onClick={handlePost}>
//                         Submit
//                       </Button>
//                     )}
//                     {editMode && (
//                       <Button type="button" variant="primary" onClick={handlePut}>
//                         Update
//                       </Button>
//                     )}
//                   </Col>
//                 </Row>
//               </Form>
//             </Card>
//           )}
//         </Col>
//       </Row>

//       {!shows && !editMode && <TablePagination />}
//     </Container>
//   );
// };

// export default GetInTouch;



