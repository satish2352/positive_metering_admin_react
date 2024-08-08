// // ////sos
// import React, { useState, useEffect, useContext } from "react";
// import { Container, Row, Col, Table, Button } from "react-bootstrap";
// import { FaDownload } from "react-icons/fa";
// import { useSearchExport } from "../../context/SearchExportContext";
// import { ShowContext } from "../../context/ShowContext";
// import SearchInput from "../../components/search/SearchInput";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import TablePagination from "../../components/pagination/TablePagination";
// import instance from "../../api/AxiosInstance";

// const UploadCv = () => {
//   const {
//     searchQuery,
//     handleSearch,
//     handleExport,
//     setData,
//     filteredData,
//     data,
//   } = useSearchExport();
//   const { shows } = useContext(ShowContext);
//   const [team, setTeam] = useState([]);
//   const tableColumns = [
//     {
//       key: "srNo",
//       label: "Sr. No.",
//       render: (value, index) => index + 1, // Adding serial number starting from 1
//     },
 
 
//     { key: "name", label: "Name" },
//     { key: "phone", label: "Phone No" },
//     { key: "subject", label: "Subject" },
//     { key: "message", label: "Message" },
//     {
//       key: "cv",
//       label: "Docs",
//       render: (value) => (
//         <a href={value} target="_blank" rel="noopener noreferrer">
//           View CV
//         </a>
//       ),
//     },
//   ];

//   useEffect(() => {
//     fetchTeam();
//   }, []);

//   const fetchTeam = async () => {
//     const accessToken = localStorage.getItem("accessToken");
//     try {
//       const response = await instance.get("uploadcv/find-uploadcv", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//       });
//       const reversedData = response.data.responseData.reverse();
//       setTeam(reversedData);
//       setData(reversedData);
//     } catch (error) {
//       console.error("Error fetching team data:", error);
//       toast.error('Error fetching team data');
//     }
//   };

//   const exportData = () => {
//     const dataToExport = searchQuery.trim() ? filteredData : team;
//     handleExport(dataToExport, tableColumns, "CvList");
//   };

//   const downloadCV = async (cvUrl) => {
//     try {
//       const response = await fetch(`${encodeURIComponent(cvUrl)}`);
//       if (!response.ok) {
//         throw new Error(`Network response was not ok: ${response.statusText}`);
//       }
//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', cvUrl.split('/').pop());
//       document.body.appendChild(link);
//       link.click();
//       link.parentNode.removeChild(link);
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error('Error downloading the file:', error);
//       toast.error('Error downloading the file');
//     }
//   };

//   return (
//     <Container>
//       <Row>
//         <Col>
//           <SearchInput
//             searchQuery={searchQuery}
//             onSearch={handleSearch}
//             onExport={exportData}
//           />
//         </Col>
//       </Row>

//       <Row>
//         <Col>
//           <Table striped bordered hover responsive>
//             <thead>
//               <tr>
//                 {tableColumns.map((col) => (
//                   <th key={col.key}>{col.label}</th>
//                 ))}
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//             {(searchQuery.trim() ? filteredData : team).map(
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
//                   <td>
//                     <div className="d-flex">
//                       <Button size="sm" onClick={() => downloadCV(item.cv)}>
//                         <FaDownload className="ms-1 me-1" />
//                       </Button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Col>
//       </Row>

//       {/* <Row>
//         <Col className="mt-3">
//           <TablePagination />
//         </Col>
//       </Row> */}
//     </Container>
//   );
// };

// export default UploadCv;









////final

import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaDownload } from "react-icons/fa";
import { useSearchExport } from "../../context/SearchExportContext";
import { ShowContext } from "../../context/ShowContext";
import SearchInput from "../../components/search/SearchInput";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import instance from "../../api/AxiosInstance";
import DataTable from "react-data-table-component";
import { ThreeDots } from "react-loader-spinner";

const UploadCv = () => {
  const {
    searchQuery,
    handleSearch,
    handleExport,
    setData,
    filteredData,
    data,
  } = useSearchExport();
  const { shows } = useContext(ShowContext);
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await instance.get("uploadcv/find-uploadcv", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      const reversedData = response.data.responseData.reverse();
      setTeam(reversedData);
      setData(reversedData);
    } catch (error) {
      console.error("Error fetching team data:", error);
      toast.error('Error fetching team data');
    } finally {
      setLoading(false);
    }
  };

  const exportData = () => {
    const dataToExport = searchQuery.trim() ? filteredData : team;
    handleExport(dataToExport, tableColumns, "CvList");
  };

  const downloadCV = async (cvUrl) => {
    try {
      const response = await fetch(cvUrl, {
        headers: {
          "Content-Type": "application/octet-stream",
        },
      });
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', cvUrl.split('/').pop());
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading the file:', error);
      toast.error('Error downloading the file');
    }
  };

  const CustomHeader = ({ name }) => (
    <div style={{ fontWeight: "bold", color: "black", fontSize: "16px" }}>
      {name}
    </div>
  );

  const tableColumns = [
    {
      name: <CustomHeader name="Sr. No." />,
      selector: (row, index) => (currentPage - 1) * rowsPerPage + index + 1,
      key: "srNo",
    },
    {
      name: <CustomHeader name="Name" />,
      selector: (row) => row.name,
      key: "name",
    },
    {
      name: <CustomHeader name="Phone" />,
      selector: (row) => row.phone,
      key: "phone",
    },
    {
      name: <CustomHeader name="Subject" />,
      selector: (row) => row.subject,
      key: "subject",
    },
    {
      name: <CustomHeader name="Message" />,
      selector: (row) => row.message,
      key: "message",
    },
    {
      name: <CustomHeader name="Docs" />,
      cell: (row) => (
        <a href={row.cv} target="_blank" rel="noopener noreferrer">
          View CV
        </a>
      ),
      key: "cv",
    },

  ];

  return (
    <Container>
      <Row>
        <Col>
          <SearchInput
            searchQuery={searchQuery}
            onSearch={handleSearch}
            onExport={exportData}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          {loading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "100px" }}
            >
              <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#000"
                ariaLabel="three-dots-loading"
                visible={true}
              />
            </div>
          ) : (
            <DataTable
              columns={tableColumns}
              data={filteredData.length > 0 ? filteredData : team}
              pagination
              paginationServer
              paginationTotalRows={filteredData.length > 0 ? filteredData.length : team.length}
              onChangePage={(page) => setCurrentPage(page)}
              onChangeRowsPerPage={(newRowsPerPage) =>
                setRowsPerPage(newRowsPerPage)
              }
              paginationPerPage={rowsPerPage}
              responsive
              striped
              noDataComponent="No Data Available"
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UploadCv;
