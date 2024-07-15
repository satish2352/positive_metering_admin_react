// import React, { useState } from "react";
// import { Button, Table } from "react-bootstrap";
// import { FaEdit, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";

// const ReusableTable = ({ columns, data, onEdit, onDelete, onShow }) => {
//   const [eyevisibilitybyid, seteyevisibilitybyid] = useState({});

//   const toggleVisibility = (id) => {
//     const updatedeyevisibilitybyid = {
//       ...eyevisibilitybyid,
//       [id]: !eyevisibilitybyid[id]
//     };
//     seteyevisibilitybyid(updatedeyevisibilitybyid);
//   };

//   return (
//     <Table striped bordered hover responsive>
//       <thead>
//         <tr>
//           {columns.map((col) => (
//             <th key={col.key}>{col.label}</th>
//           ))}
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((item, index) => (
//           <tr key={item.id}>
//             {columns.map((col) => (
//               <td key={col.key}>{item[col.key]}</td>
//             ))}
//             <td>
//               <div className="d-flex">
//                 <Button
//                   className="ms-1"
//                   onClick={() => onEdit(item.id)}
//                 >
//                   <FaEdit />
//                 </Button>
//                 <Button
//                   className="ms-1"
//                   onClick={() => onDelete(item.id)}
//                 >
//                   <FaTrash />
//                 </Button>
//                 <Button
                 
//                   className="ms-1"
//                   onClick={() => {
//                     toggleVisibility(item.id);
//                     onShow(item.id, !eyevisibilitybyid[item.id]);
//                   }}
//                 >
//                   {eyevisibilitybyid[item.id] ? <FaEyeSlash /> : <FaEye />}
//                 </Button>
//               </div>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </Table>
//   );
// };

// export default ReusableTable;









import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaEdit, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";

const ReusableTable = ({ columns, data, onEdit, onDelete, onShow }) => {
  const [eyevisibilitybyid, seteyevisibilitybyid] = useState({});

  const toggleVisibility = (id) => {
    const updatedeyevisibilitybyid = {
      ...eyevisibilitybyid,
      [id]: !eyevisibilitybyid[id]
    };
    seteyevisibilitybyid(updatedeyevisibilitybyid);
  };

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#</th>
          {columns.map((col) => (
            <th key={col.key}>{col.label}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.id}>
            <td>{index + 1}</td>
            {columns.map((col) => (
              <td key={col.key}>{item[col.key]}</td>
            ))}
            <td>
              <div className="d-flex">
                <Button
                  className="ms-1"
                  onClick={() => onEdit(item.id)}
                >
                  <FaEdit />
                </Button>
                <Button
                  className="ms-1"
                  onClick={() => onDelete(item.id)}
                >
                  <FaTrash />
                </Button>
                <Button
                 
                  className="ms-1"
                  onClick={() => {
                    toggleVisibility(item.id);
                    onShow(item.id, !eyevisibilitybyid[item.id]);
                  }}
                >
                  {eyevisibilitybyid[item.id] ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ReusableTable;
