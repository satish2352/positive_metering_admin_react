// ////sos

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
// import "react-toastify/dist/ReactToastify.css";
// import TablePagination from "../../components/pagination/TablePagination";
// import instance from "../../api/AxiosInstance";
// import { FaEdit, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";
// import { confirmAlert } from "react-confirm-alert";
// import "react-confirm-alert/src/react-confirm-alert.css";
// const Carousal = () => {
  // const { searchQuery, handleSearch, handleExport, setData, filteredData } =
  //   useSearchExport();
//   const { shows, toggleShows } = React.useContext(ShowContext);
//   const [team, setTeam] = useState([]);
//   const [errors, setErrors] = useState({});
//   const [editMode, setEditMode] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [formData, setFormData] = useState({});
//   const [eyeVisibilityById, setEyeVisibilityById] = useState({});
//   const [imagePreview, setImagePreview] = useState("");
//   const tableColumns = [
//     {
//       key: "srNo",
//       label: "Sr. No.",
//       render: (value, index) => index + 1, // Adding serial number starting from 1
//     },
//     {
//       key: "img",
//       label: "Image",
//       render: (value) => (
//         <img
//           src={value}
//           alt="Carousel"
//           style={{ width: "100px", height: "auto" }}
//         />
//       ),
//     },
    // {
    //   key: "view",
    //   label: "View",
    //   render: (value) => <span>{value}</span>,
    // },
//   ];

//   useEffect(() => {
//     fetchTeam();
//   }, []);
//   useEffect(() => {
//     if (formData.img && formData.img instanceof File) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(formData.img);
//     } else if (formData.img && typeof formData.img === "string") {
//       setImagePreview(formData.img);
//     } else {
//       setImagePreview("");
//     }
//   }, [formData.img]);

//   const fetchTeam = async () => {
//     const accessToken = localStorage.getItem("accessToken");
//     try {
//       const response = await instance.get("homeslider/find-homeslider", {
//         headers: {
//           Authorization: "Bearer " + accessToken,
//           "Content-Type": "application/json",
//         },
//       });
//       const reversedData = response.data.responseData.reverse();
//       setTeam(reversedData);
//       setData(reversedData);
//     } catch (error) {
//       console.error("Error fetching team:", error);
//       toast.error("Error fetching data");
//     }
//   };

//   // const validateForm = (formData) => {
//   //   let errors = {};
//   //   let isValid = true;

//   //   if (!formData.img) {
//   //     errors.img = "Image is required with 259*195 pixels";
//   //     isValid = false;
//   //   }

//   //   if (!formData.view) {
//   //     errors.view = "View selection is required";
//   //     isValid = false;
//   //   }

//   //   setErrors(errors);
//   //   return isValid;
//   // };


  // const validateForm = (formData) => {
  //   let errors = {};
  //   let isValid = true;
  
  //   if (!formData.img) {
  //     errors.img = `Image is required with ${
  //       formData.view === "Desktop" ? "2548*1018" : "1307*1018"
  //     } pixels`;
  //     isValid = false;
  //   }
  
  //   if (!formData.view) {
  //     errors.view = "View selection is required";
  //     isValid = false;
  //   }
  
  //   setErrors(errors);
  //   return isValid;
  // };


  // const validateImageSize = (file, view) => {
  //   return new Promise((resolve, reject) => {
  //     const img = new Image();
  //     img.onload = () => {
  //       const dimensions = {
  //         Desktop: { width: 2548, height: 1018, message: "Uploaded image is not 2548*1018 pixels for Desktop view." },
  //         Mobile: { width: 1307, height: 1018, message: "Uploaded image is not 1307*1018 pixels for Mobile view." }
  //       };
        
  //       const { width, height, message } = dimensions[view] || {};
        
  //       if (img.width === width && img.height === height) {
  //         resolve();
  //       } else {
  //         reject(message);
  //       }
  //     };
  //     img.onerror = () => reject("Error loading image");
  //     img.src = URL.createObjectURL(file);
  //   });
  // };
  


//   const handleChange = async (name, value) => {
//     if (name === "img" && value instanceof File) {
//       try {
//         await validateImageSize(value, formData.view);
//         setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
//         if (errors[name]) {
//           setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
//         }
//         setFormData({ ...formData, [name]: value });
//         setErrors((prevErrors) => ({ ...prevErrors, img: "" }));
//       } catch (error) {
//         setErrors((prevErrors) => ({ ...prevErrors, img: error }));
//         setImagePreview("");
//       }
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

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
//             `homeslider/update-homeslider/${editingId}`,
//             data,
//             {
//               headers: {
//                 Authorization: "Bearer " + accessToken,
//                 "Content-Type": "multipart/form-data",
//               },
//             }
//           );
//           toast.success("Data Updated Successfully");
//           // Update the specific entry in the team array
//           const updatedTeam = team.map((member) =>
//             member.id === editingId ? formData : member
//           );
//           setTeam(updatedTeam);
//         } else {
//           await instance.post("homeslider/create-homeslider", data, {
//             headers: {
//               Authorization: "Bearer " + accessToken,
//               "Content-Type": "multipart/form-data",
//             },
//           });
//           toast.success("Data Submitted Successfully");
//         }
//         fetchTeam();
//         toggleShows();
//         setEditMode(false);
//         setFormData({});
//         setImagePreview("");
//       } catch (error) {
//         console.error("Error handling form submission:", error);
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
//                     `homeslider/isdelete-homeslider/${id}`,
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
//                     `homeslider/isactive-homeslider/${id}`,
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

//   const toggleEdit = (leaderId) => {
//     const memberToEdit = team.find((item) => item.id === leaderId);
//     if (memberToEdit) {
//       setEditingId(leaderId);
//       setEditMode(true);

//       setFormData(memberToEdit);
//       toggleShows(); // Redirect to form view
//     }
//   };

//   useEffect(() => {
//     if (!shows) {
//       setEditMode(false);
//       setEditingId(null);
//       setFormData({});
//       setImagePreview("");
//     }
//   }, [shows]);

//   return (
//     <Container>
//       <Row>
//         {!shows && !editMode && (
          // <SearchInput
          //   searchQuery={searchQuery}
          //   onSearch={handleSearch}
          //   onExport={handleExport}
          //   showExportButton={false}
          // />
//         )}
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
//                           <Button
//                             className="ms-1"
//                             onClick={() => handleDelete(item.id)}
//                           >
//                             <FaTrash />
//                           </Button>

//                           <Button
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
//                           </Button>
//                         </div>
//                       </td>
//                     </tr>
//                   )
//                 )}
//               </tbody>
//             </Table>
//           ) : (
//             <Card className="p-4">
//               <Form onSubmit={handleSubmit}>
//                 <Row>
//                   <Col md={8}>
//                     {imagePreview && (
//                       <img
//                         src={imagePreview}
//                         alt="Selected Preview"
//                         style={{
//                           width: "100px",
//                           height: "auto",
//                           marginBottom: "10px",
//                         }}
//                       />
//                     )}

//                     <NewReusableForm
//                       label={"Upload Carousal Image"}
//                       placeholder={"Upload Image"}
//                       name={"img"}
//                       type={"file"}
//                       onChange={handleChange}
//                       initialData={formData}
//                       error={errors.img}
//                       imageDimensiion="Image size: 2548x1018 for Desktop view, 1307x1018 for Mobile view."
//                     />
//                   </Col>

                  // <Col md={4}>
                  //   <Form.Group controlId="formView">
                  //     <Form.Label>View</Form.Label>
                  //     <Form.Control
                  //       as="select"
                  //       name="view"
                  //       value={formData.view || ""}
                  //       onChange={(e) =>
                  //         handleChange(e.target.name, e.target.value)
                  //       }
                  //     >
                  //       <option value="">Select View</option>
                  //       <option value="Mobile">Mobile</option>
                  //       <option value="Desktop">Desktop</option>
                  //     </Form.Control>
                  //     {errors.view && (
                  //       <p className="text-danger">{errors.view}</p>
                  //     )}
                  //   </Form.Group>
                  // </Col>
//                 </Row>
//                 <Row>
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
//       {/* {!shows && !editMode && (
//         <TablePagination data={searchQuery.trim() ? filteredData : team} />
//       )} */}
//     </Container>
//   );
// };

// export default Carousal;






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
import { useSearchExport  } from "../../context/SearchExportContext";

import NewResuableForm from "../../components/form/NewResuableForm";
import SearchInput from "../../components/search/SearchInput";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import instance from "../../api/AxiosInstance";
import { FaEdit, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ThreeDots  } from 'react-loader-spinner'; 

import "../../App.scss";
import { Label } from "recharts";
const Carousal = () => {
  // const {  setData, filteredData } =
  //   useSearchExport();
  const { searchQuery, handleSearch, handleExport, setData, filteredData } =
  useSearchExport();
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
      name: <CustomHeader name="Image" />,
      cell: (row) => (
        <img
          src={row.img}
          alt="Event"
          style={{ width: "100px", height: "auto" }}
        />
      ),
    },
    {
      name: <CustomHeader name="View" />,
      cell: (row) => <span>{row.view}</span>,
    },
    {
      name: <CustomHeader name="Actions" />,
      cell: (row) => (
        <div className="d-flex">
          <Button className="ms-1"  onClick={() => toggleEdit(row.id)}>
            <FaEdit />
          </Button>
          <Button className="ms-1" style={{backgroundColor:"red",color:"white",borderColor:"red"}} onClick={() => handleDelete(row.id)}>
            <FaTrash />
          </Button>
          <Button
  className="ms-1"
  style={{
    backgroundColor: eyeVisibilityById[row.id] ? 'red' : 'green',
    borderColor: eyeVisibilityById[row.id] ? 'red' : 'green',
    color: 'white', // This ensures the icon color contrasts well with the background
  }}
  onClick={() => handleIsActive(row.id, !eyeVisibilityById[row.id])}
>
  {eyeVisibilityById[row.id] ? <FaEyeSlash /> : <FaEye />}
</Button>
        </div>
  
      ),
    },

 
  ];

  useEffect(() => {
    fetchTeam();
  }, []);

  useEffect(() => {
    if (formData.img && formData.img instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(formData.img);
    } else if (formData.img && typeof formData.img === "string") {
      setImagePreview(formData.img);
    } else {
      setImagePreview("");
    }
  }, [formData.img]);

  const fetchTeam = async () => {
    setLoading(true);
    const accessToken = localStorage.getItem("accessToken"); // Retrieve access token
    try {
      const response = await instance.get("homeslider/find-homeslider", {
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

  const validateForm = (formData) => {
    let errors = {};
    let isValid = true;
  
 
    if (!formData.img) {
      errors.img = "Image is required with 2548*1018 for Desktop and 1307*1018 pixels for mobile";
      isValid = false;
    } else if (
      formData.img instanceof File &&
      !validateImageSize(formData.img)
    ) {
      errors.img = "Image is not 2548*1018 for Desktop and 1307*1018 pixels for mobile";
      isValid = false;
    }
    if (!formData.view) {
      errors.view = "View selection is required";
      isValid = false;
    }
  
    setErrors(errors);
    return isValid;
  };

 
  const validateImageSize = (file, view) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const dimensions = {
          Desktop: { width: 2548, height: 1018, message: "Uploaded image is not 2548*1018 pixels for Desktop view." },
          Mobile: { width: 1307, height: 1018, message: "Uploaded image is not 1307*1018 pixels for Mobile view." }
        };
        
        const { width, height, message } = dimensions[view] || {};
        
        if (img.width === width && img.height === height) {
          resolve();
        } else {
          reject(message);
        }
      };
      img.onerror = () => reject("Error loading image");
      img.src = URL.createObjectURL(file);
    });
  };
  


  const handleChange = async (name, value) => {
    if (name === "img" && value instanceof File) {
      try {
        await validateImageSize(value, formData.view);
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
        if (errors[name]) {
          setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
        }
        setFormData({ ...formData, [name]: value });
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
          await instance.put(`homeslider/update-homeslider/${editingId}`, data, {
            headers: {
              Authorization: "Bearer " + accessToken,
              "Content-Type": "multipart/form-data",
            },
          });
          toast.success("Data Updated Successfully");
          const updatedTeam = team.map((member) =>
            member.id === editingId ? formData : member
          );
          setTeam(updatedTeam);
        } else {
          await instance.post("homeslider/create-homeslider", data, {
            headers: {
              Authorization: "Bearer " + accessToken,
              "Content-Type": "multipart/form-data",
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
                  await instance.delete(`homeslider/isdelete-homeslider/${id}`, {
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
                    `homeslider/isactive-homeslider/${id}`,
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
              />
            ) : (
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={12}>
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Selected Preview"
                        style={{
                          width: "100px",
                          height: "auto",
                          marginBottom: "10px",
                        }}
                      />
                    )}
                    <NewResuableForm
                      label={"Upload Home Sliding Image"}
                      placeholder={"Upload Image"}
                      name={"img"}
                      type={"file"}
                      onChange={(name, value) => {
                        const file = value;
                        if (file) {
                          handleChange(name, file);
                        }
                      }}
                      initialData={formData}
                      error={errors.img}
                      imageDimensiion="Image size: 2548x1018 for Desktop view, 1307x1018 for Mobile view."
                    />
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="formView">
                      <Form.Label>View</Form.Label>
                      <Form.Control
                        as="select"
                        name="view"
                        value={formData.view || ""}
                        onChange={(e) =>
                          handleChange(e.target.name, e.target.value)
                        }
                      >
                        <option value="">Select View</option>
                        <option value="Mobile">Mobile</option>
                        <option value="Desktop">Desktop</option>
                      </Form.Control>
                      {errors.view && (
                        <p className="text-danger">{errors.view}</p>
                      )}
                    </Form.Group>
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

export default Carousal;
