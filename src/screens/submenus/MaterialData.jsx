
// ////made post and put independent properly
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

// const MaterialData = () => {
//   const { searchQuery, handleSearch, handleExport, setData, filteredData } = useSearchExport();
//   const { shows, toggleForm, toggleShow } = useContext(ShowContext);
//   const [team, setTeam] = useState([]);
//   const [errors, setErrors] = useState({});
//   const [editMode, setEditMode] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [formData, setFormData] = useState({});
//   const [eyeVisibilityById, setEyeVisibilityById] = useState({});

  // const tableColumns = [
  //   { key: "productName", label: "Product Name" },
  //   { key: "materialDescription", label: "Technical Description" },
  // ];

//   useEffect(() => {
//     fetchTeam();
//   }, []);

//   const fetchTeam = async () => {
//     const accessToken = localStorage.getItem("accessToken");
//     try {
//       const response = await instance.get("materialData/get-materialData", {
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

//     if (!formData.img) {
//       errors.img = "Image is required";
//       isValid = false;
//     }

//     if (!formData.productName?.trim()) {
//       errors.productName = "Product Name is required";
//       isValid = false;
//     }

//     if (!formData.materialDescription?.trim()) {
//       errors.materialDescription = "Technical Description is required";
//       isValid = false;
//     }

//     setErrors(errors);
//     return isValid;
//   };

//   const handlePost = async () => {
//     if (validateForm(formData)) {
//       const accessToken = localStorage.getItem("accessToken");
//       const data = new FormData();
//       for (const key in formData) {
//         data.append(key, formData[key]);
//       }

//       try {
//         await instance.post("materialData/create-materialData", data, {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
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
//           `materialData/update-materialData/${editingId}`,
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
//         `materialData/delete-material/${id}`,
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
//         `productdetails/isactive-productdetails/${id}`,
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
                  // <Col md={6}>
                  //   <ReusableDropdown
                  //     label="Product Name"
                  //     name="productName"
                  //     onChange={handleChange}
                  //     initialData={formData}
                  //   />
                  //   {errors.productName && (
                  //     <p className="text-danger">{errors.productName}</p>
                  //   )}
                  // </Col>
                  // <Col md={6}>
                  //   <NewResuableForm
                  //     label="materialDescription"
                  //     placeholder="Enter materialDescription"
                  //     name="materialDescription"
                  //     type="text"
                  //     onChange={handleChange}
                  //     initialData={formData}
                  //     textarea
                  //     useJodit={true}
                  //   />
                  //   {errors.materialDescription && (
                  //     <p className="text-danger">{errors.materialDescription}</p>
                  //   )}
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

// export default MaterialData;





////
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

const MaterialData = () => {
  const { searchQuery, handleSearch, handleExport, setData, filteredData } = useSearchExport();
  const { shows, toggleForm, toggleShow } = useContext(ShowContext);
  const [team, setTeam] = useState([]);
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [eyeVisibilityById, setEyeVisibilityById] = useState({});

  const tableColumns = [
    { key: "productName", label: "Product Name" },
    { key: "materialDescription", label: "Technical Description" },
  ];

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await instance.get("materialData/get-materialdata", {
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

  const validateForm = (formData) => {
    let errors = {};
    let isValid = true;

    if (!formData.productName?.trim()) {
      errors.productName = "Product Name is required";
      isValid = false;
    }

    if (!formData.materialDescription?.trim()) {
      errors.materialDescription = "Technical Description is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handlePost = async () => {
    if (validateForm(formData)) {
      const accessToken = localStorage.getItem("accessToken");
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }

      try {
        await instance.post("materialData/create-materialdata", data, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/form-data",
          },
        });
        toast.success("Data Submitted Successfully");
        fetchTeam();
        toggleForm();
        toggleShow();
        setFormData({});
      } catch (error) {
        console.error("Error handling form submission:", error);
        toast.error("Error handling form submission");
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
          `materialData/update-materialdata/${editingId}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/form-data",
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
        toast.error("Error handling form update");
      }
    }
  };

  const handleDelete = async (id) => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      await instance.patch(
        `materialData/delete-material/${id}`,
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
      console.error("Error deleting product:", error);
      toast.error("Error deleting product");
    }
  };

  const handleIsActive = async (id, isVisible) => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      await instance.patch(
        `materialData/isactive-materialData/${id}`,
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
                    <ReusableDropdown
                      label="Product Name"
                      name="productName"
                      onChange={handleChange}
                      initialData={formData}
                    />
                    {errors.productName && (
                      <p className="text-danger">{errors.productName}</p>
                    )}
                  </Col>
                  <Col md={6}>
                    <NewResuableForm
                      label="materialDescription"
                      placeholder="Enter materialDescription"
                      name="materialDescription"
                      type="text"
                      onChange={handleChange}
                      initialData={formData}
                      textarea
                      useJodit={true}
                    />
                    {errors.materialDescription && (
                      <p className="text-danger">{errors.materialDescription}</p>
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

export default MaterialData;