// ////works only for title field

// import React, { createContext, useContext, useState } from "react";
// import { utils, writeFile } from "xlsx";

// const SearchExportContext = createContext();

// export const useSearchExport = () => useContext(SearchExportContext);

// export const SearchExportProvider = ({ children }) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);

//   const handleSearch = (query) => {
//     setSearchQuery(query);

//     const filtered = data.filter((item) =>
//       item.title.toLowerCase().includes(query.toLowerCase())
//     );
//     setFilteredData(filtered);
//   };

//   const handleExport = () => {
//     const worksheet = utils.json_to_sheet(filteredData);
//     const workbook = utils.book_new();
//     utils.book_append_sheet(workbook, worksheet, "Sheet1");
//     writeFile(workbook, "data.xlsx");
//   };

//   return (
//     <SearchExportContext.Provider
//       value={{
//         searchQuery,
//         handleSearch,
//         handleExport,
//         setData,
//         data,
//         filteredData,
//       }}
//     >
//       {children}
//     </SearchExportContext.Provider>
//   );
// };





////dymanic search 
import React, { createContext, useContext, useState } from "react";
import { utils, writeFile } from "xlsx";

const SearchExportContext = createContext();

export const useSearchExport = () => useContext(SearchExportContext);

export const SearchExportProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = data.filter((item) =>
      Object.values(item).some(value =>
        value.toString().toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const handleExport = (dataToExport) => {
    const worksheet = utils.json_to_sheet(dataToExport);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Sheet1");
    writeFile(workbook, "data.xlsx");
  };

  return (
    <SearchExportContext.Provider
      value={{
        searchQuery,
        handleSearch,
        handleExport,
        setData,
        data,
        filteredData,
      }}
    >
      {children}
    </SearchExportContext.Provider>
  );
};

