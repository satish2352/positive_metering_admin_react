// //// sos
// import React, { useState, useEffect, useContext } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Button,
//   Form,
//   Table,
// } from "react-bootstrap";
// import { FaEdit, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";
// import { useSearchExport } from "../../context/SearchExportContext";
// import { ShowContext } from "../../context/ShowContext";
// import SearchInput from "../../components/search/SearchInput";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import TablePagination from "../../components/pagination/TablePagination";
// import instance from "../../api/AxiosInstance";
// import NewResuableForm from "../../components/form/NewResuableForm";
// import { confirmAlert } from "react-confirm-alert";
// import "react-confirm-alert/src/react-confirm-alert.css";
// const ApplicationData = () => {
//   const { searchQuery, handleSearch, handleExport, setData, filteredData } =
//     useSearchExport();
//   const { shows, toggleShows } = useContext(ShowContext);
//   const [team, setTeam] = useState([]);
//   const [products, setProducts] = useState([]); // New state for product names
//   const [errors, setErrors] = useState({});
//   const [editMode, setEditMode] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [formData, setFormData] = useState({});
//   const [eyeVisibilityById, setEyeVisibilityById] = useState({});

//   const tableColumns = [
//     {
//       key: "srNo",
//       label: "Sr. No.",
//       render: (value, index) => index + 1, // Adding serial number starting from 1
//     },
//     { key: "productName", label: "Product Name" },
//     { key: "applicationDescription", label: "Application Description" },
//   ];

//   useEffect(() => {
//     fetchTeam();
//     fetchProducts(); // Fetch products when the component mounts
//   }, []);

//   const fetchTeam = async () => {
//     const accessToken = localStorage.getItem("accessToken");
//     try {
//       const response = await instance.get(
//         "applicationData/get-applicationData",
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       const reversedData = response.data.responseData.reverse();
//       setTeam(reversedData);
//       setData(reversedData);
//     } catch (error) {
//       console.error("Error fetching technical data:", error);
//     }
//   };

//   const fetchProducts = async () => {
//     const accessToken = localStorage.getItem("accessToken");
//     try {
//       const response = await instance.get("productdetails/get-productnames", {
//         // Adjust the endpoint to fetch product names
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//       });
//       setProducts(response.data.responseData); // Assuming responseData contains product names
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   const validateForm = (formData) => {
//     let errors = {};
//     let isValid = true;

//     if (!formData.productName?.trim()) {
//       errors.productName = "Product Name is required";
//       isValid = false;
//     }

//     if (!formData.applicationDescription?.trim()) {
//       errors.applicationDescription = "Application Description is required";
//       isValid = false;
//     }

//     setErrors(errors);
//     return isValid;
//   };

//   const handlePost = async () => {
//     console.log("Form data before submission:", formData); // Debug log
//     try {
//       if (validateForm(formData)) {
//         const accessToken = localStorage.getItem("accessToken");
//         const response = await instance.post(
//           "applicationData/create-applicationData",
//           formData,
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (response.status === 200) {
//           toast.success("Data Submitted Successfully");

//           fetchTeam();
//           toggleShows();
//           setFormData({});
//         } else {
//           toast.error("Failed to submit data");
//         }
//       }
//     } catch (error) {
//       console.error("Error handling form submission:", error);
//     }
//   };

//   const handlePut = async () => {
//     console.log("Updating form data:", formData);
//     if (validateForm(formData)) {
//       const accessToken = localStorage.getItem("accessToken");

//       try {
//         const response = await instance.put(
//           `applicationData/update-applicationData/${editingId}`,
//           formData, // Send formData directly
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         console.log("PUT response:", response); // Debug log

//         if (response.status === 200) {
//           toast.success("Data Updated Successfully");
//           // Update the specific entry in the team array
//           const updatedTeam = team.map((member) =>
//             member.id === editingId ? formData : member
//           );
//           setTeam(updatedTeam);
//           fetchTeam();
//           toggleShows();
//           setEditMode(false);
//           setFormData({});
//         } else {
//           toast.error("Failed to update data");
//         }
//       } catch (error) {
//         console.error("Error handling form update:", error);
//       }
//     }
//   };

//   const handleDelete = async (id) => {
//     confirmAlert({
//       title: "Confirm to delete",
//       message: "Are you sure you want to delete this data?",
//       customUI: ({ onClose }) => (
//         <div
//           style={{
//             textAlign: "left",
//             padding: "20px",
//             backgroundColor: "white",
//             borderRadius: "8px",
//             boxShadow: "0 4px 8px rgba(5, 5, 5, 0.2)",
//             maxWidth: "400px",
//             margin: "0 auto",
//           }}
//         >
//           <h2>Confirm to delete</h2>
//           <p>Are you sure you want to delete this data?</p>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "flex-end",
//               marginTop: "20px",
//             }}
//           >
//             <button
//               style={{ marginRight: "10px" }}
//               className="btn btn-primary"
//               onClick={async () => {
//                 const accessToken = localStorage.getItem("accessToken");
//                 try {
//                   await instance.delete(
//                     `applicationData/delete-technical/${id}`,
//                     {
//                       headers: {
//                         Authorization: `Bearer ${accessToken}`,
//                         "Content-Type": "application/json",
//                       },
//                     }
//                   );
//                   toast.success("Data Deleted Successfully");
//                   fetchTeam();
//                 } catch (error) {
//                   console.error("Error deleting data:", error);
//                   toast.error("Error deleting data");
//                 }
//                 onClose();
//               }}
//             >
//               Yes
//             </button>
//             <button className="btn btn-secondary" onClick={() => onClose()}>
//               No
//             </button>
//           </div>
//         </div>
//       ),
//     });
//   };

//   const handleIsActive = async (id, isVisible) => {
//     confirmAlert({
//       title: "Confirm to change visibility",
//       customUI: ({ onClose }) => (
//         <div
//           style={{
//             textAlign: "left",
//             padding: "20px",
//             backgroundColor: "white",
//             borderRadius: "8px",
//             boxShadow: "0 4px 8px rgba(5, 5, 5, 0.2)",
//             maxWidth: "400px",
//             margin: "0 auto",
//           }}
//         >
//           <h2>Confirm to change visibility</h2>
//           <p>
//             Are you sure you want to {isVisible ? "hide" : "show"} this data?
//           </p>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "flex-end",
//               marginTop: "20px",
//             }}
//           >
//             <button
//               style={{ marginRight: "10px" }}
//               className="btn btn-primary"
//               onClick={async () => {
//                 const accessToken = localStorage.getItem("accessToken");
//                 try {
//                   await instance.put(
//                     `applicationData/isactive-applicationData/${id}`,
//                     { isVisible },
//                     {
//                       headers: {
//                         Authorization: `Bearer ${accessToken}`,
//                         "Content-Type": "application/json",
//                       },
//                     }
//                   );
//                   toast.success(
//                     `Data ${isVisible ? "hidden" : "shown"} successfully`
//                   );
//                   setEyeVisibilityById((prev) => ({
//                     ...prev,

//                     [id]: isVisible,
//                   }));
//                   fetchTeam();
//                 } catch (error) {
//                   console.error("Error updating visibility:", error);
//                   toast.error("Error updating visibility");
//                 }
//                 onClose();
//               }}
//             >
//               Yes
//             </button>
//             <button className="btn btn-secondary" onClick={() => onClose()}>
//               No
//             </button>
//           </div>
//         </div>
//       ),
//     });
//   };

//   const toggleEdit = (id) => {
//     const itemToEdit = team.find((item) => item.id === id);
//     if (itemToEdit) {
//       setEditingId(id);
//       setEditMode(true);
//       toggleShows();
//       setFormData(itemToEdit); // Ensure this correctly sets `applicationDescription`
//     }
//   };

//   useEffect(() => {
//     if (!shows) {
//       setEditMode(false);
//       setEditingId(null);
//       setFormData({});
//     }
//   }, [shows]);

//   const handleChange = (name, value) => {
//     setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
//     if (errors[name]) {
//       setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
//     }
//     setFormData({ ...formData, [name]: value });
//   };

//   return (
//     <Container>
//       <Row>
//         <Col>
//           {!shows && !editMode && (
//             <SearchInput
//               searchQuery={searchQuery}
//               onSearch={handleSearch}
//               onExport={handleExport}
//               showExportButton={false}
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
//                 {(searchQuery.trim() ? filteredData : team).map(
//                   (item, index) => (
//                     <tr key={item.id}>
//                       {tableColumns.map((col) => (
//                         <td key={col.key}>
//                           {col.key === "srNo"
//                             ? index + 1
//                             : col.render
//                             ? col.render(item[col.key], index)
//                             : item[col.key]}
//                         </td>
//                       ))}
//                       <td>
//                         <div className="d-flex">
//                           <Button
//                             className="ms-1"
//                             onClick={() => toggleEdit(item.id)}
//                           >
//                             <FaEdit />
//                           </Button>
//                           {/* <Button
//                             className="ms-1"
//                             onClick={() => handleDelete(item.id)}
//                           >
//                             <FaTrash />
//                           </Button> */}
//                           {/* <Button
//                             className="ms-1"
//                             onClick={() =>
//                               handleIsActive(
//                                 item.id,
//                                 !eyeVisibilityById[item.id]
//                               )
//                             }
//                           >
//                             {eyeVisibilityById[item.id] ? (
//                               <FaEyeSlash />
//                             ) : (
//                               <FaEye />
//                             )}
//                           </Button> */}
//                         </div>
//                       </td>
//                     </tr>
//                   )
//                 )}
//               </tbody>
//             </Table>
//           ) : (
//             <Form onSubmit={handlePost}>
//               <Row>
//                 <Col md={6}>
//                   <Form.Group controlId="productName">
//                     <Form.Label>Product Name</Form.Label>
//                     <Form.Control
//                       as="select"
//                       value={formData.productName || ""}
//                       onChange={(e) =>
//                         handleChange("productName", e.target.value)
//                       }
//                       isInvalid={!!errors.productName}
//                     >
//                       <option value="">Select Product Name</option>
//                       {products.map((product) => (
//                         <option key={product.id} value={product.productName}>
//                           {product.productName}
//                         </option>
//                       ))}
//                     </Form.Control>
//                     <Form.Control.Feedback type="invalid">
//                       {errors.productName}
//                     </Form.Control.Feedback>
//                   </Form.Group>
//                 </Col>

                // <Col md={12}>
                //   <NewResuableForm
                //     label="Application Description"
                //     placeholder="Enter Application Description"
                //     name="applicationDescription"
                //     type="text"
                //     initialData={formData}
                //     textarea
                //     useJodit={true}
                //     error={errors.applicationDescription}
                //     onChange={handleChange}
                //   />
                // </Col>
//               </Row>

//               <Col className="d-flex justify-content-end">
//                 {!editMode && (
//                   <Button type="button" variant="primary" onClick={handlePost}>
//                     Submit
//                   </Button>
//                 )}
//                 {editMode && (
//                   <Button type="button" variant="success" onClick={handlePut}>
//                     Update
//                   </Button>
//                 )}
//               </Col>
//             </Form>
//           )}
//         </Col>
//       </Row>
//       <Row>
//         {/* <Row>
//           {!shows && !editMode && (
//             <Col className="mt-3">
//               <TablePagination />
//             </Col>
//           )}
//         </Row> */}
//       </Row>
//     </Container>
//   );
// };

// export default ApplicationData;













// ////final
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
import DataTable from "react-data-table-component";
import { useSearchExport } from "../../context/SearchExportContext";
import { ShowContext } from "../../context/ShowContext";
import NewResuableForm from "../../components/form/NewResuableForm";
import SearchInput from "../../components/search/SearchInput";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import instance from "../../api/AxiosInstance";
import { FaEdit, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ThreeDots  } from 'react-loader-spinner'; 
import { Tooltip, OverlayTrigger,  } from 'react-bootstrap';
import "../../App.scss";
const ApplicationData = () => {
  const { searchQuery, handleSearch, handleExport, setData, filteredData } = useSearchExport();


  const [team, setTeam] = useState([]);
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [eyeVisibilityById, setEyeVisibilityById] = useState({});
  const [imagePreview, setImagePreview] = useState("");
  const [showTable, setShowTable] = useState(true); // New state for toggling form and table view
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const CustomHeader = ({ name }) => (
    <div style={{ fontWeight: "bold", color: "black", fontSize: "16px" }}>
      {name}
    </div>
  );



  const tableColumns = (currentPage, rowsPerPage) => [
    {
      name: <CustomHeader name="Sr. No." />,
      selector: (row, index) => (currentPage - 1) * rowsPerPage + index + 1,
    },

    {
      name: <CustomHeader name="Product Name" />,
      cell: (row) => <span>{row.productName}</span>,
    },
    {
      name: <CustomHeader name="Application Description" />,
      cell: (row) => <span>{row.applicationDescription}</span>,
    },
    {
      name: <CustomHeader name="Actions" />,
      cell: (row) => (
        <div className="d-flex">
          <Button className="ms-1" onClick={() => toggleEdit(row.id)}>
            <FaEdit />
          </Button>
          <Button className="ms-1" style={{backgroundColor:"red",color:"white",borderColor:"red"}} onClick={() => handleDelete(row.id)}>
            <FaTrash />
          </Button>
          {/* <Button
            className="ms-1"
            onClick={() => handleIsActive(row.id, !eyeVisibilityById[row.id])}
          >
            {eyeVisibilityById[row.id] ? <FaEyeSlash /> : <FaEye />}
          </Button>  */}
        </div>
  
      ),
    },

 
  ];

  useEffect(() => {
    fetchTeam();
    fetchProducts();
  }, []);

  const fetchTeam = async () => {
    setLoading(true);
    const accessToken = localStorage.getItem("accessToken"); // Retrieve access token
    try {
      const response = await instance.get("applicationData/get-applicationData", {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      });
      const reversedData = response.data.responseData.reverse();
      setTeam(reversedData);
      setData(reversedData);
    } catch (error) {
      console.error(
        "Error fetching team:",
        error.response || error.message || error
      );
    }    finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await instance.get("productdetails/get-productnames", {
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

    if (!formData.applicationDescription?.trim()) {
      errors.applicationDescription = "Application Description is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

 
  const handleChange = async (name, value) => {
    if (name === "img" && value instanceof File) {
      try {
        await validateImageSize(value);
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, img: "" }));
      } catch (error) {
        setErrors((prevErrors) => ({ ...prevErrors, img: error }));
        setImagePreview("");
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm(formData)) {
      setLoading(true);
      const accessToken = localStorage.getItem("accessToken"); // Retrieve access token
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }

      try {
        if (editMode) {
          await instance.put(`applicationData/update-applicationData/${editingId}`, data, {
            headers: {
              Authorization: "Bearer " + accessToken,
              "Content-Type": "application/json",
            },
          });
          toast.success("Data Updated Successfully");
          const updatedTeam = team.map((member) =>
            member.id === editingId ? formData : member
          );
          setTeam(updatedTeam);
        } else {
          await instance.post("applicationData/create-applicationData", data, {
            headers: {
              Authorization: "Bearer " + accessToken,
              "Content-Type": "application/json",
            },
          });
          toast.success("Data Submitted Successfully");
        }
        fetchTeam();

        setEditMode(false);
        setFormData({});
        setImagePreview("");
        setShowTable(true); // Switch back to table view after submission
      } catch (error) {
        console.error("Error handling form submission:", error);
      } finally {
        setLoading(false); // Set loading to false
      }
    }
  };

  const handleDelete = async (id) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete this data?",
      customUI: ({ onClose }) => (
        <div
          style={{
            textAlign: "left",
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(5, 5, 5, 0.2)",
            maxWidth: "400px",
            margin: "0 auto",
          }}
        >
          <h2>Confirm to delete</h2>
          <p>Are you sure you want to delete this data?</p>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "20px",
            }}
          >
            <button
              style={{ marginRight: "10px" }}
              className="btn btn-primary"
              onClick={async () => {
                setLoading(true);
                const accessToken = localStorage.getItem("accessToken");
                try {
                  await instance.delete(`applicationData/delete-applicationData/${id}`, {
                    headers: {
                      Authorization: `Bearer ${accessToken}`,
                      "Content-Type": "application/json",
                    },
                  });
                  toast.success("Data Deleted Successfully");
                  fetchTeam();
                } catch (error) {
                  console.error("Error deleting data:", error);
                  toast.error("Error deleting data");
                } finally {
        setLoading(false); 
      }
                onClose();
              }}
            >
              Yes
            </button>
            <button className="btn btn-secondary" onClick={() => onClose()}>
              No
            </button>
          </div>
        </div>
      ),
    });
  };

  const handleIsActive = async (id, isVisible) => {
    confirmAlert({
      title: "Confirm to change visibility",
      customUI: ({ onClose }) => (
        <div
          style={{
            textAlign: "left",
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(5, 5, 5, 0.2)",
            maxWidth: "400px",
            margin: "0 auto",
          }}
        >
          <h2>Confirm to change visibility</h2>
          <p>
            Are you sure you want to {isVisible ? "hide" : "show"} this data?
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "20px",
            }}
          >
            <button
              style={{ marginRight: "10px" }}
              className="btn btn-primary"
              onClick={async () => {
                setLoading(true);
                const accessToken = localStorage.getItem("accessToken");
                try {
                  await instance.put(
                    `applicationData/isactive-applicationData/${id}`,
                    { isVisible },
                    {
                      headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                      },
                    }
                  );
                  toast.success(
                    `Data ${isVisible ? "hidden" : "shown"} successfully`
                  );
                  setEyeVisibilityById((prev) => ({
                    ...prev,
                    [id]: isVisible,
                  }));
                  fetchTeam();
                } catch (error) {
                  console.error("Error updating visibility:", error);
                  toast.error("Error updating visibility");
                } finally {
        setLoading(false); // Set loading to false
      }
                onClose();
              }}
            >
              Yes
            </button>
            <button className="btn btn-secondary" onClick={() => onClose()}>
              No
            </button>
          </div>
        </div>
      ),
    });
  };

  const toggleEdit = (id) => {
    const selectedMember = team.find((member) => member.id === id);
    setEditingId(id);
    setFormData(selectedMember);
    setEditMode(true);
    setShowTable(false); // Switch to form view when editing
  };

  const handleAdd = () => {
    setFormData({});
    setEditMode(false);
    setShowTable(false); // Switch to form view when adding new item
  };

  const handleView = () => {
    setFormData({});
    setEditMode(false);
    setShowTable(true); // Switch to table view
  };

  return (
  

    <Container fluid>
    <Row>
      <Col>
        <Card>
          <Card.Header>
            <Row>
              {showTable ? (
                <Col className="d-flex justify-content-end align-items-center">
                <SearchInput
              searchQuery={searchQuery}
              onSearch={handleSearch}
            
              showExportButton={false} 
            />
                  <Button
                    variant="outline-success"
                    onClick={handleAdd}
                    className="ms-2 mb-3"
                  >
                    Add
                  </Button>
                </Col>
              ) : (
                <Col className="d-flex justify-content-end align-items-center">
                  <Button   variant="outline-secondary" onClick={handleView}>
                    View
                  </Button>
                </Col>
              )}
            </Row>
          </Card.Header>

          <Card.Body>
            {loading ? ( // Check loading state
              <div className="d-flex justify-content-center align-items-center" style={{ height: '100px' }}>
                <ThreeDots  
                  height="80"
                  width="80"
                  radius="9"
                  color="#000"
                  ariaLabel="three-dots-loading"
            
                  visible={true}
                />
              </div>
            ) : showTable ? (
              <DataTable
                columns={tableColumns(currentPage, rowsPerPage)}
                data={filteredData.length > 0 ? filteredData : team}
                pagination
                responsive
                striped
                noDataComponent="No Data Available"
                onChangePage={(page) => setCurrentPage(page)}
                onChangeRowsPerPage={(rowsPerPage) =>
                  setRowsPerPage(rowsPerPage)
                }
                customStyles={{
                    rows: {
                      style: {
                        alignItems: "flex-start", // Aligns text to the top-left corner
                      },
                    },
                    cells: {
                      style: {
                        textAlign: "left", // Ensures text is aligned to the left
                      },
                    },
                  }}
              />
            ) : (
              <Form onSubmit={handleSubmit}>
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
     
                <Col md={12}>
                  <NewResuableForm
                    label="Application Description"
                    placeholder="Enter Application Description"
                    name="applicationDescription"
                    type="text"
                    initialData={formData}
                    textarea
                    useJodit={true}
                    error={errors.applicationDescription}
                    onChange={handleChange}
                  />
                </Col>
                </Row>
                <Row>
                  <div className="mt-3 d-flex justify-content-end">
                    <Button
                      type="submit"
                      variant={editMode ? "success" : "primary"}
                    >
                      {editMode ? "Update" : "Submit"}
                    </Button>
                  </div>
                </Row>
              </Form>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
  );
};

export default ApplicationData;