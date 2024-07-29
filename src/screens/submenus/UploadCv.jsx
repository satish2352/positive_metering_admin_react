////sos working success

import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { FaTrash, FaDownload } from "react-icons/fa";
import { useSearchExport } from "../../context/SearchExportContext";
import { ShowContext } from "../../context/ShowContext";
import SearchInput from "../../components/search/SearchInput";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TablePagination from "../../components/pagination/TablePagination";
import instance from "../../api/AxiosInstance";

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

  const tableColumns = [
    {
      key: "cv",
      label: "Docs",
      render: (value) => (
        <a href={value} target="_blank" rel="noopener noreferrer">
          View CV
        </a>
      ),
    },
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
      const response = await instance.get("uploadcv/find-uploadcv", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      setTeam(response.data.responseData);
      setData(response.data.responseData);
    } catch (error) {
      console.error("Error fetching team data:", error);
    }
  };



  const exportData = () => {
    const dataToExport = searchQuery.trim() ? filteredData : team;
    handleExport(dataToExport);
  };

  const downloadCV = async (cvUrl) => {
    try {
      const response = await fetch(cvUrl);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', cvUrl.split('/').pop());
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.error('There was an error downloading the file:', error);
      toast.error('Error downloading the file');
    }
  };

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
                      <Button size="sm" onClick={() => downloadCV(item.cv)}>
                        <FaDownload className="ms-1 me-1" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Row>
        <Col className="mt-3">
          <TablePagination />
        </Col>
      </Row>
    </Container>
  );
};

export default UploadCv;