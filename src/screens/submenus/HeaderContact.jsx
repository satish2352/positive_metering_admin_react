///////sos
// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Button,
//   Form,
//   Table,
// } from "react-bootstrap";
// import { useSearchExport } from "../../context/SearchExportContext";
// import { ShowContext } from "../../context/ShowContext";
// import NewReusableForm from "../../components/form/NewResuableForm";
// import SearchInput from "../../components/search/SearchInput";
// import { toast } from "react-toastify";
// import TablePagination from "../../components/pagination/TablePagination";
// import instance from "../../api/AxiosInstance";
// import { FaEdit, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";
// import { confirmAlert } from "react-confirm-alert";
// import "react-confirm-alert/src/react-confirm-alert.css";
// const HeaderContact = () => {
//   const { searchQuery, handleSearch, handleExport, setData, filteredData } =
//     useSearchExport();
//   const { shows, toggleShows } = React.useContext(ShowContext);

//   const [team, setTeam] = useState([]);
//   const [errors, setErrors] = useState({});
//   const [editMode, setEditMode] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [formData, setFormData] = useState({});
//   const [eyeVisibilityById, setEyeVisibilityById] = useState({});

//   const tableColumns = [
//     { key: "phone1", label: "Phone 1" },
//     { key: "phone2", label: "Phone 2" },
  
//   ];

//   useEffect(() => {
//     fetchTeam();
//   }, []);

//   const fetchTeam = async () => {
//     const accessToken = localStorage.getItem("accessToken");
//     try {
//       const response = await instance.get("header-contact/findheaderContacts", {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       });
//       const reversedData = response.data.responseData.reverse();
//       setTeam(reversedData);
//       setData(reversedData);
//     } catch (error) {
//       console.error("Error fetching team:", error);
//       toast.error("Failed to fetch data");
//     }
//   };

//   const validateForm = (formData) => {
//     let errors = {};
//     let isValid = true;

//     if (!formData.phone1?.trim()) {
//       errors.phone1 = "Mobile number is required";
//       isValid = false;
//     } else if (!/^\d{10}$/.test(formData.phone1)) {
//       errors.phone1 = "Mobile number must be exactly 10 digits";
//       isValid = false;
//     }
//     if (!formData.phone2?.trim()) {
//       errors.phone2 = "Mobile number is required";
//       isValid = false;
//     } else if (!/^\d{10}$/.test(formData.phone2)) {
//       errors.phone2 = "Mobile number must be exactly 10 digits";
//       isValid = false;
//     }

//     setErrors(errors);
//     return isValid;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm(formData)) {
//       const accessToken = localStorage.getItem("accessToken");
//       try {
//         if (editMode) {
//           await instance.put(
//             `header-contact/headercontact/${editingId}`,
//             formData,
//             { headers: { Authorization: `Bearer ${accessToken}` } }
//           );
//           toast.success("Data Updated Successfully");

//           // Update the specific entry in the team array
//           const updatedTeam = team.map((member) =>
//             member.id === editingId ? formData : member
//           );
//           setTeam(updatedTeam);
//         } else {
//           const response = await instance.post(
//             "header-contact/createheadercontact",
//             formData,
//             { headers: { Authorization: `Bearer ${accessToken}` } }
//           );
//           toast.success("Data Submitted Successfully");
//         }

//         setEditMode(false);
//         fetchTeam();
//         setFormData({});
//         toggleShows(); // Redirect to table view
//       } catch (error) {
//         console.error("Error handling form submission:", error);
//         toast.error("Error submitting data");
//       }
//     }
//   };


//   const toggleEdit = (leaderId) => {
//     const memberToEdit = team.find((item) => item.id === leaderId);
//     if (memberToEdit) {
//       setEditingId(leaderId);
//       setEditMode(true);
//       setFormData(memberToEdit);
//       toggleShows(); // Redirect to form view
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
//     if (!shows) {
//       setEditMode(false);
//       setEditingId(null);
//       setFormData({});
//     }
//   }, [shows]);

//   const handleChange = (name, value) => {
//     setFormData({ ...formData, [name]: value });
//   };

//   const exportData = () => {
//     const dataToExport = searchQuery.trim() ? filteredData : team;
//     handleExport(dataToExport);
//   };

//   return (
//     <Container>
//       <Row>
//         <Col>
//           {!shows && !editMode && (
//             <SearchInput
//               searchQuery={searchQuery}
//               onSearch={handleSearch}
//               onExport={exportData}
//             />
//           )}
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
//                     <td>{item.phone1}</td>
//                     <td>{item.phone2}</td>
                 
//                     <td>
//                       <div className="d-flex">
//                         <Button
//                           className="ms-1"
//                           onClick={() => toggleEdit(item.id)}
//                         >
//                           <FaEdit />
//                         </Button>
                
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           ) : (
//             <Card className="p-4">
//               <Form onSubmit={handleSubmit}>
//                 <Row>
//                   <Col md={6}>
//                     <NewReusableForm
//                       label={"Phone 1"}
//                       placeholder={"Enter first phone number"}
//                       type={"number"}
//                       name={"phone1"}
//                       onChange={handleChange}
//                       initialData={formData}
//                     />
//                     {errors.phone1 && (
//                       <span className="error text-danger">{errors.phone1}</span>
//                     )}
//                   </Col>
                  
//                   <Col md={6}>
//                     <NewReusableForm
//                       label={"Phone 2"}
//                       placeholder={"Enter second phone number"}
//                       type={"number"}
//                       name={"phone2"}
//                       onChange={handleChange}
//                       initialData={formData}
//                     />
//                     {errors.phone2 && (
//                       <span className="error text-danger">{errors.phone2}</span>
//                     )}
//                   </Col>
//                   <div className="mt-3 d-flex justify-content-end">
//                     <Button
//                       type="submit"
//                       variant={editMode ? "success" : "primary"}
//                     >
//                       {editMode ? "Update" : "Submit"}
//                     </Button>
//                   </div>
//                 </Row>
//               </Form>
//             </Card>
//           )}
//         </Col>
//       </Row>

//        <Row>
//         {!shows && !editMode && (
//           <Col className="mt-3">
//             <TablePagination />
//           </Col>
//         )}
//       </Row>
//     </Container>
//   );
// };
// export default HeaderContact;







////v1
// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Button,
//   Form,
//   Table,
// } from "react-bootstrap";
// import { useSearchExport } from "../../context/SearchExportContext";
// import { ShowContext } from "../../context/ShowContext";
// import NewReusableForm from "../../components/form/NewResuableForm";
// import SearchInput from "../../components/search/SearchInput";
// import { toast } from "react-toastify";
// import TablePagination from "../../components/pagination/TablePagination";
// import instance from "../../api/AxiosInstance";
// import { FaEdit } from "react-icons/fa";
// import "react-confirm-alert/src/react-confirm-alert.css";

// const HeaderContact = () => {
//   const { searchQuery, handleSearch, handleExport, setData, filteredData } =
//     useSearchExport();
//   const { shows, toggleShows } = React.useContext(ShowContext);

//   const [team, setTeam] = useState([]);
//   const [errors, setErrors] = useState({});
//   const [editMode, setEditMode] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [formData, setFormData] = useState({});

//   const tableColumns = [
//     { key: "phone1", label: "Phone 1" },
//     { key: "phone2", label: "Phone 2" },
//   ];

//   useEffect(() => {
//     fetchTeam();
//   }, []);

//   const fetchTeam = async () => {
//     const accessToken = localStorage.getItem("accessToken");
//     try {
//       const response = await instance.get("header-contact/findheaderContacts", {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       });
//       const reversedData = response.data.responseData.reverse();
//       setTeam(reversedData);
//       setData(reversedData);
//     } catch (error) {
//       console.error("Error fetching team:", error);
//       toast.error("Failed to fetch data");
//     }
//   };

//   const validateForm = (formData) => {
//     let errors = {};
//     let isValid = true;

//     if (!formData.phone1?.trim()) {
//       errors.phone1 = "Mobile number is required";
//       isValid = false;
//     } else if (!/^\d{10}$/.test(formData.phone1)) {
//       errors.phone1 = "Mobile number must be exactly 10 digits";
//       isValid = false;
//     }
//     if (!formData.phone2?.trim()) {
//       errors.phone2 = "Mobile number is required";
//       isValid = false;
//     } else if (!/^\d{10}$/.test(formData.phone2)) {
//       errors.phone2 = "Mobile number must be exactly 10 digits";
//       isValid = false;
//     }

//     setErrors(errors);
//     return isValid;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm(formData)) {
//       const accessToken = localStorage.getItem("accessToken");
//       try {
//         await instance.put(
//           `header-contact/headercontact/${editingId}`,
//           formData,
//           { headers: { Authorization: `Bearer ${accessToken}` } }
//         );
//         toast.success("Data Updated Successfully");

//         // Update the specific entry in the team array
//         const updatedTeam = team.map((member) =>
//           member.id === editingId ? formData : member
//         );
//         setTeam(updatedTeam);

//         setEditMode(false);
//         setEditingId(null);
//         setFormData({});
//         toggleShows(); // Redirect to table view
//       } catch (error) {
//         console.error("Error handling form submission:", error);
//         toast.error("Error submitting data");
//       }
//     }
//   };

//   const toggleEdit = (leaderId) => {
//     const memberToEdit = team.find((item) => item.id === leaderId);
//     if (memberToEdit) {
//       setEditingId(leaderId);
//       setEditMode(true);
//       setFormData(memberToEdit);
//       toggleShows(); // Redirect to form view
//     }
//   };

//   const handleCancel = () => {
//     setEditMode(false);
//     setEditingId(null);
//     setFormData({});
//     toggleShows(); // Redirect to table view
//   };

//   useEffect(() => {
//     if (!shows) {
//       setEditMode(false);
//       setEditingId(null);
//       setFormData({});
//     }
//   }, [shows]);

//   const handleChange = (name, value) => {
//     setFormData({ ...formData, [name]: value });
//   };

//   const exportData = () => {
//     const dataToExport = searchQuery.trim() ? filteredData : team;
//     handleExport(dataToExport);
//   };

//   return (
//     <Container>
//       <Row>
//         <Col>
//           {!shows && !editMode && (
//             <SearchInput
//               searchQuery={searchQuery}
//               onSearch={handleSearch}
//               onExport={exportData}
//             />
//           )}
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
//                     <td>{item.phone1}</td>
//                     <td>{item.phone2}</td>
//                     <td>
//                       <div className="d-flex">
//                         <Button
//                           className="ms-1"
//                           onClick={() => toggleEdit(item.id)}
//                         >
//                           <FaEdit />
//                         </Button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           ) : (
//             <Card className="p-4">
//               <Form onSubmit={handleSubmit}>
//                 <Row>
//                   <Col md={6}>
//                     <NewReusableForm
//                       label={"Phone 1"}
//                       placeholder={"Enter first phone number"}
//                       type={"number"}
//                       name={"phone1"}
//                       onChange={handleChange}
//                       initialData={formData}
//                     />
//                     {errors.phone1 && (
//                       <span className="error text-danger">{errors.phone1}</span>
//                     )}
//                   </Col>
                  
//                   <Col md={6}>
//                     <NewReusableForm
//                       label={"Phone 2"}
//                       placeholder={"Enter second phone number"}
//                       type={"number"}
//                       name={"phone2"}
//                       onChange={handleChange}
//                       initialData={formData}
//                     />
//                     {errors.phone2 && (
//                       <span className="error text-danger">{errors.phone2}</span>
//                     )}
//                   </Col>
//                   <div className="mt-3 d-flex justify-content-end">
//                     <Button
//                       type="submit"
//                       variant="success"
//                       className="me-2"
//                     >
//                       Update
//                     </Button>
//                     <Button
//                       type="button"
//                       variant="secondary"
//                       onClick={handleCancel}
//                     >
//                       Cancel
//                     </Button>
//                   </div>
//                 </Row>
//               </Form>
//             </Card>
//           )}
//         </Col>
//       </Row>

//       <Row>
//         {!shows && !editMode && (
//           <Col className="mt-3">
//             <TablePagination />
//           </Col>
//         )}
//       </Row>
//     </Container>
//   );
// };

// export default HeaderContact;







////v2
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Table,
} from "react-bootstrap";
import { useSearchExport } from "../../context/SearchExportContext";
import { ShowContext } from "../../context/ShowContext";
import NewReusableForm from "../../components/form/NewResuableForm";
import SearchInput from "../../components/search/SearchInput";
import { toast } from "react-toastify";
import TablePagination from "../../components/pagination/TablePagination";
import instance from "../../api/AxiosInstance";
import { FaEdit } from "react-icons/fa";
import "react-confirm-alert/src/react-confirm-alert.css";

const HeaderContact = () => {
  const { searchQuery, handleSearch, handleExport, setData, filteredData } =
    useSearchExport();
  const { shows, toggleShows } = React.useContext(ShowContext);

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
      const reversedData = response.data.responseData.reverse();
      setTeam(reversedData);
      setData(reversedData);
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
        await instance.put(
          `header-contact/headercontact/${editingId}`,
          formData,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        toast.success("Data Updated Successfully");

        // Update the specific entry in the team array
        const updatedTeam = team.map((member) =>
          member.id === editingId ? formData : member
        );
        setTeam(updatedTeam);

        setEditMode(false);
        setEditingId(null);
        setFormData({});
        toggleShows(); // Redirect to table view
      } catch (error) {
        console.error("Error handling form submission:", error);
        toast.error("Error submitting data");
      }
    }
  };

  const toggleEdit = (leaderId) => {
    const memberToEdit = team.find((item) => item.id === leaderId);
    if (memberToEdit) {
      setEditingId(leaderId);
      setEditMode(true);
      setFormData(memberToEdit);
      toggleShows(); // Redirect to form view
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditingId(null);
    setFormData({});
    toggleShows(); // Redirect to table view
  };

  useEffect(() => {
    if (!shows) {
      setEditMode(false);
      setEditingId(null);
      setFormData({});
    }
  }, [shows]);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const exportData = () => {
    const dataToExport = searchQuery.trim() ? filteredData : team;
    handleExport(dataToExport);
  };

  return (
    <Container>
      <Row>
        <Col>
          {!shows && !editMode && (
            <SearchInput
              searchQuery={searchQuery}
              onSearch={handleSearch}
              onExport={exportData}
            />
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          {!shows && !editMode ? (
            <>
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
                      <td>{item.phone1}</td>
                      <td>{item.phone2}</td>
                      <td>
                        <div className="d-flex">
                          <Button
                            className="ms-1"
                            onClick={() => toggleEdit(item.id)}
                          >
                            <FaEdit />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {/* <Row>
                <Col className="mt-3">
                  <TablePagination />
                </Col>
              </Row> */}
            </>
          ) : (
            <Card className="p-4">
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <NewReusableForm
                      label={"Phone 1"}
                      placeholder={"Enter first phone number"}
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
                      placeholder={"Enter second phone number"}
                      type={"number"}
                      name={"phone2"}
                      onChange={handleChange}
                      initialData={formData}
                    />
                    {errors.phone2 && (
                      <span className="error text-danger">{errors.phone2}</span>
                    )}
                  </Col>
                  <div className="mt-3 d-flex justify-content-end">
                    <Button
                      type="submit"
                      variant="success"
                      className="me-2"
                    >
                      Update
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleCancel}
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
    </Container>
  );
};

export default HeaderContact;
