////sos
import React from "react";
import { Button, Form } from "react-bootstrap";
import { FaDownload  } from "react-icons/fa";

const SearchInput = ({ searchQuery, onSearch, onExport ,showExportButton = true }) => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <Form.Control
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
        className="me-2"
      />

      {showExportButton && (
        <Button onClick={onExport} size="sm">
          <FaDownload />
        </Button>
      )}
    </div>
  );
};

export default SearchInput;
