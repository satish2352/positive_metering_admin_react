// ////sos
// import React, { useState, useEffect, useContext } from "react";
// import { Container, Row, Col, Table, Button, Form } from "react-bootstrap";
// import { FaTrash } from "react-icons/fa";
// import { useSearchExport } from "../../context/SearchExportContext";
// import { ShowContext } from "../../context/ShowContext";
// import SearchInput from "../../components/search/SearchInput";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import TablePagination from "../../components/pagination/TablePagination";
// import instance from "../../api/AxiosInstance";

// const CarousalForm = () => {
//   const { searchQuery, handleSearch, handleExport, setData, filteredData } =
//     useSearchExport();
//   const { shows, } = useContext(ShowContext);
//   const [team, setTeam] = useState([]);

//   const tableColumns = [
//     {
//       key: "srNo",
//       label: "Sr. No.",
//       render: (value, index) => index + 1, // Adding serial number starting from 1
//     },
//     { key: "name", label: "Name" },
//     { key: "email", label: "Email" },
//     { key: "mobile", label: "Mobile" },
//     { key: "message", label: "Message" },
//   ];

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
//       const reversedData = response.data.responseData.reverse();
//       setTeam(reversedData);
//       setData(reversedData);
//     } catch (error) {
//       console.error("Error fetching team data:", error);
//     }
//   };

//   useEffect(() => {
//     if (shows) {
//     }
//   }, [shows]);


//   const exportData = () => {
//     const dataToExport = searchQuery.trim() ? filteredData : team;
//     handleExport(dataToExport, tableColumns, "UserData");
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

// export default CarousalForm;

















//// final
import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSearchExport } from "../../context/SearchExportContext";
import { ShowContext } from "../../context/ShowContext";
import SearchInput from "../../components/search/SearchInput";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import instance from "../../api/AxiosInstance";
import DataTable from "react-data-table-component";
import { ThreeDots } from "react-loader-spinner";

const CarousalForm = () => {
  const {
    searchQuery,
    handleSearch,
    handleExport,
    setData,
    filteredData,
  } = useSearchExport();
  const { shows } = useContext(ShowContext);
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Default to 10 rows per page
  const [totalRows, setTotalRows] = useState(0);

  useEffect(() => {
    fetchTeam(currentPage, rowsPerPage);
  }, [currentPage, rowsPerPage]);

  const fetchTeam = async (page, limit) => {
    const accessToken = localStorage.getItem("accessToken");
    setLoading(true);
    try {
      const response = await instance.get("carousal-form/find-carousalform", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        params: {
          page,
          limit,
        },
      });
      const reversedData = response.data.responseData.reverse();
      setTeam(reversedData);
      setData(reversedData);
      setTotalRows(response.data.totalCount || reversedData.length); // Set total rows
    } catch (error) {
      console.error("Error fetching team data:", error);
      toast.error("Error fetching team data");
    } finally {
      setLoading(false);
    }
  };

  const exportData = () => {
    const dataToExport = searchQuery.trim() ? filteredData : team;
    handleExport(dataToExport, tableColumns, "UserData");
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
      name: <CustomHeader name="Email" />,
      selector: (row) => row.email,
      key: "email",
    },
    {
      name: <CustomHeader name="Mobile No" />,
      selector: (row) => row.mobile,
      key: "mobile",
    },
    {
      name: <CustomHeader name="Message" />,
      selector: (row) => row.message,
      key: "message",
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
              paginationTotalRows={totalRows}
              paginationDefaultPage={currentPage}
              paginationPerPage={rowsPerPage} // Ensure this is set
              onChangePage={(page) => setCurrentPage(page)}
              onChangeRowsPerPage={(newRowsPerPage) => setRowsPerPage(newRowsPerPage)}
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

export default CarousalForm;