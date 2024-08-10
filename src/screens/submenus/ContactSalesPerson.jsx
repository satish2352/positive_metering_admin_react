

// // // // ////final sos 

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
// import { useSearchExport } from "../../context/SearchExportContext";
// import { ShowContext } from "../../context/ShowContext";
// import NewResuableForm from "../../components/form/NewResuableForm";
// import SearchInput from "../../components/search/SearchInput";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import TablePagination from "../../components/pagination/TablePagination";
// import instance from "../../api/AxiosInstance";
// import { FaEdit, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";
// import { confirmAlert } from "react-confirm-alert";
// import "react-confirm-alert/src/react-confirm-alert.css";

// const ContactSalesPerson = () => {
//   const { searchQuery, handleSearch, handleExport, setData, filteredData } =
//     useSearchExport();
//   const { shows, toggleShows } = useContext(ShowContext);
//   const [team, setTeam] = useState([]);
//   const [errors, setErrors] = useState({});
//   const [editMode, setEditMode] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [eyeVisibilityById, setEyeVisibilityById] = useState({});
//   const [formData, setFormData] = useState({});
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
//           alt="Office"
//           style={{ width: "100px", height: "auto" }}
//         />
//       ),
//     },
//     { key: "title", label: "Title" },
//     { key: "person_name", label: "Person Name" },
//     { key: "phone", label: "Phone" },
//     { key: "email", label: "Email" },
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
//       const response = await instance.get("contactperson/find-contactpersons", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//       });
//       const reversedData = response.data.responseData.reverse();
//       setTeam(reversedData);
//       setData(reversedData);
//     } catch (error) {
//       console.error("Error fetching office data:", error);
//       toast.error("Error fetching data");
//     }
//   };

//   const validateForm = (formData) => {
//     let errors = {};
//     let isValid = true;

//     if (!formData.img) {
//       errors.img = "Image is required with 596x394 pixels";
//       isValid = false;
//     } else if (formData.img instanceof File && !validateImageSize(formData.img)) {
//       errors.img = "Image is not 596x394 pixels";
//       isValid = false;
//     }
//     if (!formData.title?.trim()) {
//       errors.title = "Title is required";
//       isValid = false;
//     }

//     if (!formData.person_name?.trim()) {
//       errors.person_name = "Person name is required";
//       isValid = false;
//     }

    // if (!formData.email?.trim()) {
    //   errors.email = "Email is required";
    //   isValid = false;
    // } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    //   errors.email = "Invalid email person_name";
    //   isValid = false;
    // }

    // if (!formData.phone?.trim()) {
    //   errors.phone = "Phone number is required";
    //   isValid = false;
    // } else if (!/^\d{10}$/.test(formData.phone)) {
    //   errors.phone = "Phone number must be exactly 10 digits";
    //   isValid = false;
    // }

//     setErrors(errors);
//     return isValid;
//   };

//   const validateImageSize = (file) => {
//     return new Promise((resolve, reject) => {
//       const img = new Image();
//       img.onload = () => {
//         if (img.width === 596 && img.height === 394) {
//           resolve();
//         } else {
//           reject("Image must be 596x394 pixels");
//         }
//       };
//       img.onerror = () => reject("Error loading image");
//       img.src = URL.createObjectURL(file);
//     });
//   };

//   const handleChange = async (name, value) => {
//     if (name === "img" && value instanceof File) {
//       try {
//         await validateImageSize(value);
//         setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
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
//             `contactperson/update-contactperson/${editingId}`,
//             data,
//             {
//               headers: {
//                 Authorization: `Bearer ${accessToken}`,
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
//           await instance.post("contactperson/create-contactperson", data, {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//               "Content-Type": "multipart/form-data",
//             },
//           });
//           toast.success("Data Submitted Successfully");
//           // Add the new entry to the top of the team array
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
//                     `contactperson/isdelete-contactperson/${id}`,
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
//                     `contactperson/isactive-contactperson/${id}`,
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
//       toggleShows();
//       setFormData(memberToEdit);
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
//         <Col>
//           <SearchInput
//             searchQuery={searchQuery}
//             onSearch={handleSearch}
//             onExport={handleExport}
//             showExportButton={false}
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
//                   <Col md={6}>
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
//                     <NewResuableForm
//                       label="Upload Contact Sales person Image"
//                       placeholder="Upload Image"
//                       name="img"
//                       type="file"
//                       onChange={handleChange}
//                       initialData={formData}
//                       imageDimensiion="Image must be 596x394 pixels" 
//                       error={errors.img}
//                     />
                  
//                   </Col>
//                   <Col md={6}>
//                     <NewResuableForm
//                       label="Title"
//                       placeholder="Enter Title"
//                       name="title"
//                       type="text"
//                       onChange={handleChange}
//                       initialData={formData}
//                       error={errors.title}
//                     />
               
//                   </Col>
//                   <Col md={6}>
//                     <NewResuableForm
//                       label="Person Name"
//                       placeholder="Enter person name"
//                       name="person_name"
//                       type="text"
//                       onChange={handleChange}
//                       initialData={formData}
//                       error={errors.person_name}
//                     />
         
//                   </Col>
//                   <Col md={6}>
//                     <NewResuableForm
//                       label="Phone"
//                       placeholder="Enter Phone Number"
//                       type="number"
//                       name="phone"
//                       onChange={handleChange}
//                       initialData={formData}
//                       error={errors.phone}
//                     />
           
//                   </Col>
   
//                   <Col md={6}>
//                     <NewResuableForm
//                       label="Email"
//                       placeholder="Enter Email person_name"
//                       type="text"
//                       name="email"
//                       onChange={handleChange}
//                       initialData={formData}
//                       error={errors.email}
//                     />
           
//                   </Col>
//                 </Row>
//                 <Row>
//                   <Col className="d-flex justify-content-end">
//                     <div className="mt-3 d-flex justify-content-end">
//                       <Button
//                         type="submit"
//                         variant={editMode ? "success" : "primary"}
//                       >
//                         {editMode ? "Update" : "Submit"}
//                       </Button>
//                     </div>
//                   </Col>
//                 </Row>
//               </Form>
//             </Card>
//           )}
//         </Col>
//       </Row>

//     </Container>
//   );
// };

// export default ContactSalesPerson;












////error in put only 
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
const ContactSalesPerson = () => {
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
      width:"150px"
    },
  
    {
      name: <CustomHeader name="Title" />,
      cell: (row) => <span>{row.title}</span>,
    },
    {
      name: <CustomHeader name="Person Name" />,
      cell: (row) => <span>{row.person_name}</span>,
    },
    {
      name: <CustomHeader name="Phone Number" />,
      cell: (row) => <span>{row.phone}</span>,
    },
    {
      name: <CustomHeader name="Email" />,
      cell: (row) => <span>{row.email}</span>,
    },
    {
      name: <CustomHeader name="Image" />,
      cell: (row) => (
        <img
          src={row.img}
          alt="ContactSalesPerson"
          style={{ width: "100px", height: "auto" }}
        />
      ),
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
      const response = await instance.get("contactperson/find-contactpersons", {
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
      errors.img = "Image is required with 627x430 pixels";
      isValid = false;
    } else if (
      formData.img instanceof File &&
      !validateImageSize(formData.img)
    ) {
      errors.img = "Image is not 627x430 pixels";
      isValid = false;
    }


    // if (editMode && !formData.img && formData.img !== "") {
    //   // Only validate image size during create mode or if a new image is uploaded
    //   if (formData.img instanceof File && !validateImageSize(formData.img)) {
    //     errors.img = "Image is not 627x430 pixels";
    //     isValid = false;
    //   }
    // }

    if (!formData.title?.trim()) {
      errors.title = "Title is required";
    }

    if (!formData.person_name?.trim()) {
      errors.person_name = "Person name is required";
    }
    if (!formData.email?.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email person_name";
      isValid = false;
    }

    if (!formData.phone?.trim()) {
      errors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Phone number must be exactly 10 digits";
      isValid = false;
    }
    setErrors(errors);
    return isValid;
  };

  const validateImageSize = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        if (img.width === 627 && img.height === 430) {
          resolve();
        } else {
          reject("Image must be 627x430 pixels");
        }
      };
      img.onerror = () => reject("Error loading image");
      img.src = URL.createObjectURL(file);
    });
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
      const accessToken = localStorage.getItem("accessToken"); 
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }

      try {
        if (editMode) {
          await instance.put(`contactperson/update-contactperson/${editingId}`, data, {
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
          await instance.post("contactperson/create-contactperson", data, {
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
        setShowTable(true);
      } catch (error) {
        console.error("Error handling form submission:", error);
      } finally {
        setLoading(false); 
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
                  await instance.delete(`contactperson/isdelete-contactperson/${id}`, {
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
                    `contactperson/isactive-contactperson/${id}`,
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

  const toggleEdit = (id) => {
    const selectedMember = team.find((member) => member.id === id);
    setEditingId(id);
    setFormData(selectedMember);
    setEditMode(true);
    setShowTable(false); 
  };

  const handleAdd = () => {
    setFormData({});
    setEditMode(false);
    setShowTable(false); 
  };

  const handleView = () => {
    setFormData({});
    setEditMode(false);
    setShowTable(true); 
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
            {loading ? ( 
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
                      label="Upload Contact Sales person Image"
                      placeholder="Upload Image"
                      name="img"
                      type="file"
                      onChange={(name, value) => {
                        const file = value;
                        if (file) {
                          handleChange(name, file);
                        }
                      }}
                      initialData={formData}
                      error={errors.img} 
                      imageDimensiion="Image must be 627*430 pixels" 
                    />
                 
                  </Col>
                  <Col md={6}>
                    <NewResuableForm
                      label="Title"
                      placeholder="Enter Title"
                      name="title"
                      type="text"
                      onChange={handleChange}
                      initialData={formData}
                      error={errors.title}
                    />
                  
                  </Col>
                  <Col md={6}>
                    <NewResuableForm
                      label="Person Name"
                      placeholder="Enter person name"
                      name="person_name"
                      type="text"
                      onChange={handleChange}
                      initialData={formData}
              
                      error={errors.person_name}
                    />
                  
                  </Col>
                  <Col md={6}>
                    <NewResuableForm
                      label="Phone No"
                      placeholder="Enter Phone No"
                      type="number"
                      name="phone"
                      onChange={handleChange}
                      initialData={formData}
                      error={errors.phone}
                    />
              
                  </Col>
                  <Col md={6}>
                    <NewResuableForm
                      label="Email"
                      placeholder="Enter Email address"
                      type="email"
                      name="email"
                      onChange={handleChange}
                      initialData={formData}
                      error={errors.email}
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

export default ContactSalesPerson;
