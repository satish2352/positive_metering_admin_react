
// // //  sir form
// import React, { useState, useEffect } from "react";
// import { Form } from "react-bootstrap";
// import JoditEditor from 'jodit-react'; // Import JoditEditor
// const NewReusableForm = ({
//   label,
//   name,
//   placeholder,
//   type,
//   textarea,
//   min,
//   max,
//   step,
//   onChange,
//   initialData,
// }) => {
//   const [formData, setFormData] = useState({});

//   useEffect(() => {
//     setFormData(initialData || {});
//   }, [initialData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     if (onChange) {
//       onChange(name, value);
//     }
//   };

//   return (
   
//       <Form.Group className="mb-3" controlId={`form${name}`}>
//         <Form.Label>{label}</Form.Label>
//         {type === "file" ? (
//           <Form.Control
//             type="file"
//             name={name}
//             onChange={handleChange}
//             placeholder={placeholder}
//             accept="image/*"
//           />
//         ) : (
//           <Form.Control
//             type={type}
//             name={name}
//             value={formData[name] || ""}
//             onChange={handleChange}
//             placeholder={placeholder}
//             min={min}
//             max={max}
//             step={step}
//             as={textarea ? "textarea" : undefined}
//           />
//         )}
//       </Form.Group>
  
//   );
// };

// export default NewReusableForm;













//////////  sos 
import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import JoditEditor from "jodit-react";

const NewReusableForm = ({
  label,
  name,
  placeholder,
  type,
  textarea,
  useJodit, // use this editor as prop
  onChange,
  initialData,
}) => {
  const [value, setValue] = useState(initialData[name] || "");

  useEffect(() => {
    setValue(initialData[name] || "");
  }, [initialData, name]);

  const handleChange = (e) => {
    const { value, files } = e.target;
    setValue(type === "file" ? files[0] : value);
    onChange(name, type === "file" ? files[0] : value);
  };

  return (
  
    <Form.Group>
    <Form.Label>{label}</Form.Label>



      {type === "file" ? (
        <Form.Control
          type={type}
          accept="image/*,.pdf,.doc,.docx" 
          onChange={handleChange}
          required
        />
    ) : useJodit ? (
      <JoditEditor
        value={value}
        onChange={(newContent) => {
          setValue(newContent);
          onChange(name, newContent);
        }}
      />
    ) : textarea ? ( 
      <Form.Control
        as="textarea"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
      />
    ) : (
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
      />
    )}
  </Form.Group>
  );
};

export default NewReusableForm;