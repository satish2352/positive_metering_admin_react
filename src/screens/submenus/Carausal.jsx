////base page
// import React, { useState, useEffect } from "react";
// import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
// import axios from "axios";
// import { useSearchExport } from "../../context/SearchExportContext";
// import { ShowContext } from "../../context/ShowContext";
// import NewResuableForm from "../../components/form/NewResuableForm";
// import ReusableTable from "../../components/table/ReusableTable";
// import SearchInput from "../../components/search/SearchInput";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import TablePagination from "../../components/pagination/TablePagination";
// const Carousal = () => {
//   const {
//     searchQuery,
//     handleSearch,
//     handleExport,
//     data,
//     setData,
//     filteredData,
//   } = useSearchExport();

//   const { shows, toggleForm, toggleShow } = React.useContext(ShowContext); // Ensure toggleForm is correctly obtained

//   const [team, setTeam] = useState([]);
//   const [errors, setErrors] = useState({});
//   const [editMode, setEditMode] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [formData, setFormData] = useState({});

//   const tableColumns = [
//     { key: "imageupload1", label: "Image" },
//     { key: "title", label: "Title" },
//     { key: "description", label: "Description" },
//   ];

//   useEffect(() => {
//     fetchTeam();
//   }, []);

//   const fetchTeam = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/carousal");
//       setTeam(response.data);
//       setData(response.data); // Update the context data
//     } catch (error) {
//       console.error("Error fetching team:", error);
//     }
//   };

//   const validateForm = (formData) => {
//     let errors = {};
//     let isValid = true;

//     if (!formData.title?.trim()) {
//       errors.title = "Title is required";
//       isValid = false;
//     }

//     if (!formData.description?.trim()) {
//       errors.description = "Description is required";
//       isValid = false;
//     }

//     if (!formData.imageupload1?.trim()) {
//       errors.imageupload1 = "Image is required";
//       isValid = false;
//     }

//     setErrors(errors);
//     return isValid;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm(formData)) {
//       try {
//         if (editMode) {
//           await axios.put(
//             `http://localhost:5000/carousal/${editingId}`,
//             formData
//           );
//           toast.success("Data Updated Successfully");
//         } else {
//           await axios.post("http://localhost:5000/carousal", formData);
//           toast.success("Data Submitted Successfully");
//         }
//         fetchTeam();
//         toggleForm();
//         toggleShow();
//         setEditMode(false);
//         setFormData({}); // Reset form data after submission
//       } catch (error) {
//         console.error("Error handling form submission:", error);
//         toast.error("Error in Sumbit", error);
//       }
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/carousal/${id}`);
//       toast.success("Data Deleted Successfully");
//       fetchTeam();
//     } catch (error) {
//       console.error("Error deleting team member:", error);
//       toast.error("Error submitting data");
//     }
//   };

//   const toggleEdit = (leaderId) => {
//     const memberToEdit = team.find((item) => item.id === leaderId);
//     if (memberToEdit) {
//       setEditingId(leaderId);
//       setEditMode(true);
//       toggleForm();
//       toggleShow();
//       setFormData(memberToEdit); // Set initial form data for editing
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
//             <ReusableTable
//               columns={tableColumns}
//               data={searchQuery.trim() ? filteredData : team}
//               onEdit={toggleEdit}
//               onDelete={handleDelete}
//             />
//           ) : (
//             <Card className="p-4">
//               <Form onSubmit={handleSubmit}>
//                 <Row>
//                   <Col md={6}>
//                     <NewResuableForm
//                       label={"Title"}
//                       placeholder={"Enter Title"}
//                       type={"text"}
//                       name={"title"}
//                       onChange={handleChange}
//                       initialData={formData}
//                     />
//                     {errors.title && (
//                       <span className="error text-danger">{errors.title}</span>
//                     )}
//                   </Col>
//                   <Col md={6}>
//                     <NewResuableForm
//                       label={"Description"}
//                       placeholder={"Enter Description"}
//                       type={"text"}
//                       name={"description"}
//                       textarea={true}
//                       useJodit={true}
//                       onChange={handleChange}
//                       initialData={formData}
//                     />
//                     {errors.description && (
//                       <span className="error text-danger">
//                         {errors.description}
//                       </span>
//                     )}
//                   </Col>
//                   <Col md={6}>
//                     <NewResuableForm
//                       label={"Image"}
//                       placeholder={"Add Image"}
//                       type={"file"}
//                       name={"imageupload1"}
//                       onChange={handleChange}
//                       initialData={formData}
//                     />
//                     {errors.imageupload1 && (
//                       <span className="error text-danger">
//                         {errors.imageupload1}
//                       </span>
//                     )}
//                   </Col>
//                   <div className="mt-3">
//                     <Button type="submit" variant="primary">
//                       {editMode ? "Update" : "Submit"}
//                     </Button>
//                     <Button
//                       onClick={() => setEditMode(false)}
//                       variant="secondary"
//                       className="ms-2"
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
//         <Col>
//           <TablePagination />
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Carousal;






















// // // // Carousal.js
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import axios from "axios";
import ReusableTable from "../../components/table/ReusableTable";
import SearchInput from "../../components/search/SearchInput";
import { toast } from "react-toastify";
import TablePagination from "../../components/pagination/TablePagination";
import NewResuableForm from "../../components/form/NewResuableForm";

import {
  PaginationProvider,
  usePagination,
} from "../../context/PaginationContext";
import { useSearchExport } from "../../context/SearchExportContext";
import { ShowContext } from "../../context/ShowContext";

const Carousal = () => {
  const {
    searchQuery,
    handleSearch,
    handleExport,
    data,
    setData,
    filteredData,
  } = useSearchExport();
  const { shows, toggleForm, toggleShow } = React.useContext(ShowContext);

  const [team, setTeam] = useState([]);
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const currentPage = usePagination();

  const tableColumns = [
    { key: "imageupload1", label: "Image" },
    { key: "title", label: "Title" },
    { key: "description", label: "Description" },
  ];

  useEffect(() => {
    fetchTeam();
  }, [currentPage]);

  const fetchTeam = async () => {
    try {
      const response = await axios.get("http://localhost:5000/carousal");
      setTeam(response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching team:", error);
    }
  };

  const validateForm = (formData) => {
    let errors = {};
    let isValid = true;

    if (!formData.title?.trim()) {
      errors.title = "Title is required";
      isValid = false;
    }

    if (!formData.description?.trim()) {
      errors.description = "Description is required";
      isValid = false;
    }

    if (!formData.imageupload1?.trim()) {
      errors.imageupload1 = "Image is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm(formData)) {
      try {
        if (editMode) {
          await axios.put(
            `http://localhost:5000/carousal/${editingId}`,
            formData
          );
          toast.success("Data Updated Successfully");
        } else {
          await axios.post("http://localhost:5000/carousal", formData);
          toast.success("Data Submitted Successfully");
        }
        fetchTeam();
        toggleForm();
        toggleShow();
        setEditMode(false);
        setFormData({});
      } catch (error) {
        console.error("Error handling form submission:", error);
        toast.error("Error in Submit", error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/carousal/${id}`);
      toast.success("Data Deleted Successfully");
      fetchTeam();
    } catch (error) {
      console.error("Error deleting team member:", error);
      toast.error("Error deleting data");
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

  const handlePageClick = (data) => {
    goToPage(data.selected);
  };

  return (
    <PaginationProvider>
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
              <React.Fragment>
                <ReusableTable
                  columns={tableColumns}
                  data={
                    searchQuery.trim()
                      ? filteredData
                      : team.slice(currentPage * 10, (currentPage + 1) * 10)
                  }
                  onEdit={toggleEdit}
                  onDelete={handleDelete}
                  onShow={(id, visible) => {
                    console.log(`Item ${id} visibility changed to ${visible}`);
                  }}
                />
                {team.length > 10 && (
                  <TablePagination
                    totalPages={Math.ceil(team.length / 10)}
                    handlePageClick={handlePageClick}
                  />
                )}
              </React.Fragment>
            ) : (
              <Card className="p-4">
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <NewResuableForm
                        label={"Title"}
                        placeholder={"Enter Title"}
                        type={"text"}
                        name={"title"}
                        onChange={handleChange}
                        initialData={formData}
                      />
                      {errors.title && (
                        <span className="error text-danger">
                          {errors.title}
                        </span>
                      )}
                    </Col>
                    <Col md={6}>
                      <NewResuableForm
                        label={"Description"}
                        placeholder={"Enter Description"}
                        type={"text"}
                        name={"description"}
                        textarea={true}
                        useJodit={true}
                        onChange={handleChange}
                        initialData={formData}
                      />
                      {errors.description && (
                        <span className="error text-danger">
                          {errors.description}
                        </span>
                      )}
                    </Col>
                    <Col md={6}>
                      <NewResuableForm
                        label={"Image"}
                        placeholder={"Add Image"}
                        type={"file"}
                        name={"imageupload1"}
                        onChange={handleChange}
                        initialData={formData}
                      />
                      {errors.imageupload1 && (
                        <span className="error text-danger">
                          {errors.imageupload1}
                        </span>
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
      </Container>
    </PaginationProvider>
  );
};

export default Carousal;
