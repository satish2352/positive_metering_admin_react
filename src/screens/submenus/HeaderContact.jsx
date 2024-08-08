


// ////sos final
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
// import { ThreeDots  } from 'react-loader-spinner'; 
// const HeaderContact = () => {
//   const { searchQuery, handleSearch, handleExport, setData, filteredData } =
//     useSearchExport();
//   const { shows, toggleShows } = React.useContext(ShowContext);

//   const [team, setTeam] = useState([]);
//   const [errors, setErrors] = useState({});
//   const [editMode, setEditMode] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [formData, setFormData] = useState({});
//   const [loading, setLoading] = useState(false);
 

//   const tableColumns = [
//     { key: "srNo", label: "Sr No" },  // Add this line
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

//     // if (!formData.phone1?.trim()) {
//     //   errors.phone1 = "Mobile number is required";
//     //   isValid = false;
//     // } else if (!/^\d{10}$/.test(formData.phone1)) {
//     //   errors.phone1 = "Mobile number must be exactly 10 digits";
//     //   isValid = false;
//     // }
//     if (!formData.phone1?.trim()) {
//       errors.phone1 = "Mobile number is required";
//       isValid = false;
//     } else if (!/^\d+$/.test(formData.phone1)) {
//       errors.phone1 = "Mobile number must contain only digits";
//       isValid = false;
//     } else if (formData.phone1.length !== 10) {
//       errors.phone1 = "Mobile number must be exactly 10 digits";
//       isValid = false;
//     }

//     // if (!formData.phone2?.trim()) {
//     //   errors.phone2 = "Mobile number is required";
//     //   isValid = false;
//     // } else if (!/^\d{10}$/.test(formData.phone2)) {
//     //   errors.phone2 = "Mobile number must be exactly 10 digits";
//     //   isValid = false;
//     // }

//     if (!formData.phone2?.trim()) {
//       errors.phone2 = "Mobile number is required";
//       isValid = false;
//     } else if (!/^\d+$/.test(formData.phone2)) {
//       errors.phone2 = "Mobile number must contain only digits";
//       isValid = false;
//     } else if (formData.phone2.length !== 10) {
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
//               showExportButton={false}
//             />
//           )}
//         </Col>
//       </Row>
//       <Row>
//         <Col>
//           {!shows && !editMode ? (
//             <>
//               <Table striped bordered hover responsive>
//                 <thead>
//                   <tr>
//                     {tableColumns.map((col) => (
//                       <th key={col.key}>{col.label}</th>
//                     ))}
//                     <th>Actions</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//   {(searchQuery.trim() ? filteredData : team).map((item, index) => (
//     <tr key={item.id}>
//       <td>{index + 1}</td>  {/* Add this line */}
//       <td>{item.phone1}</td>
//       <td>{item.phone2}</td>
//       <td>
//         <div className="d-flex">
//           <Button
//             className="ms-1"
//             onClick={() => toggleEdit(item.id)}
//           >
//             <FaEdit />
//           </Button>
//         </div>
//       </td>
//     </tr>
//   ))}
// </tbody>
//               </Table>
       
//             </>
//           ) : (
//             <Card className="p-4">
//               <Form onSubmit={handleSubmit}>
//                 <Row>
//                   <Col md={6}>
//                     <NewReusableForm
//                       label={"Phone 1"}
//                       placeholder={"Enter first phone number"}
//                       type={"text"}
//                       name={"phone1"}
//                       onChange={handleChange}
//                       initialData={formData}
//                       error={errors.phone1} 
//                     />
    
//                   </Col>
                  
//                   <Col md={6}>
//                     <NewReusableForm
//                       label={"Phone 2"}
//                       placeholder={"Enter second phone number"}
//                       type={"text"}
//                       name={"phone2"}
//                       onChange={handleChange}
//                       initialData={formData}
//                       error={errors.phone2} 
//                     />
     
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
//     </Container>
//   );
// };

// export default HeaderContact;


////final
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useSearchExport } from "../../context/SearchExportContext";
import NewResuableForm from "../../components/form/NewResuableForm";
import SearchInput from "../../components/search/SearchInput";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import instance from "../../api/AxiosInstance";
import { FaEdit } from "react-icons/fa";
import { ThreeDots } from 'react-loader-spinner';
import "../../App.scss";

const HeaderContact = () => {
  const { searchQuery, handleSearch, setData, filteredData } = useSearchExport();
  const [team, setTeam] = useState([]);
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [showTable, setShowTable] = useState(true);
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
      name: <CustomHeader name="Phone Number 1" />,
      cell: (row) => <span>{row.phone1}</span>,
    },
    {
      name: <CustomHeader name="Phone Number 2" />,
      cell: (row) => <span>{row.phone2}</span>,
    },
    {
      name: <CustomHeader name="Actions" />,
      cell: (row) => (
        <div className="d-flex">
          <Button className="ms-1" onClick={() => toggleEdit(row.id)}>
            <FaEdit />
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    setLoading(true);
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await instance.get("header-contact/findheaderContacts", {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      });
      const reversedData = response.data.responseData.reverse();
      setTeam(reversedData);
      setData(reversedData);
    } catch (error) {
      console.error("Error fetching team:", error.response || error.message || error);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (formData) => {
    let errors = {};
    let isValid = true;

    if (!formData.phone1?.trim()) {
      errors.phone1 = "Mobile number is required";
      isValid = false;
    } else if (!/^\d+$/.test(formData.phone1)) {
      errors.phone1 = "Mobile number must contain only digits";
      isValid = false;
    } else if (formData.phone1.length !== 10) {
      errors.phone1 = "Mobile number must be exactly 10 digits";
      isValid = false;
    }

    if (!formData.phone2?.trim()) {
      errors.phone2 = "Mobile number is required";
      isValid = false;
    } else if (!/^\d+$/.test(formData.phone2)) {
      errors.phone2 = "Mobile number must contain only digits";
      isValid = false;
    } else if (formData.phone2.length !== 10) {
      errors.phone2 = "Mobile number must be exactly 10 digits";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleChange = (name, value) => {
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
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
        await instance.put(`header-contact/headercontact/${editingId}`, data, {
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
        fetchTeam();
        setEditMode(false);
        setFormData({});
        setShowTable(true);
      } catch (error) {
        console.error("Error handling form submission:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const toggleEdit = (id) => {
    const selectedMember = team.find((member) => member.id === id);
    setEditingId(id);
    setFormData(selectedMember);
    setEditMode(true);
    setShowTable(false);
  };

  const handleCancel = () => {
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
                <Col className="d-flex justify-content-end align-items-center">
                  {showTable && (
                    <SearchInput
                      searchQuery={searchQuery}
                      onSearch={handleSearch}
                      showExportButton={false}
                    />
                  )}
                </Col>
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
                />
              ) : (
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <NewResuableForm
                        label={"Phone 1"}
                        placeholder={"Enter first phone number"}
                        type={"text"}
                        name={"phone1"}
                        onChange={handleChange}
                        initialData={formData}
                        error={errors.phone1}
                      />
                    </Col>
                    <Col md={6}>
                      <NewResuableForm
                        label={"Phone 2"}
                        placeholder={"Enter second phone number"}
                        type={"text"}
                        name={"phone2"}
                        onChange={handleChange}
                        initialData={formData}
                        error={errors.phone2}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <div className="mt-3 d-flex justify-content-end">
                      <Button type="submit" variant="success">
                        Update
                      </Button>
                      <Button
                        variant="secondary"
                        className="ms-2"
                        onClick={handleCancel}
                      >
                        Cancel
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

export default HeaderContact;
