
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












//////addmin jodit editor me
import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import JoditEditor from 'jodit-react'; 

const NewReusableForm = ({
  label,
  name,
  placeholder,
  type,
  textarea,
  min,
  max,
  step,
  useJodit,
  onChange,
  initialData,
}) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (onChange) {
      onChange(name, value);
    }
  };

  return (
    <Form.Group className="mb-3" controlId={`form${name}`}>
      <Form.Label>{label}</Form.Label>
      {type === "file" ? (
        <Form.Control
          type="file"
          name={name}
          onChange={handleChange}
          placeholder={placeholder}
          accept="image/*"
        />
      ) : (
        <>
          {textarea && useJodit ? (
            <JoditEditor
              value={formData[name] || ""}
              onChange={(value) => handleChange({ target: { name, value } })}
            />
          ) : (
            <Form.Control
              type={type}
              name={name}
              value={formData[name] || ""}
              onChange={handleChange}
              placeholder={placeholder}
              min={min}
              max={max}
              step={step}
              as={textarea ? "textarea" : undefined}
            />
          )}
        </>
      )}
    </Form.Group>
  );
};

export default NewReusableForm;
