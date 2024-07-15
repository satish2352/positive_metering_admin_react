// import React, { useState, useEffect } from "react";
// import { Button, Card, Col, Form, Row } from "react-bootstrap";

// const ResuableForm = ({ fields, initialData, onSubmit, errors }) => {
//   const [formData, setFormData] = useState(initialData || {});

//   useEffect(() => {
//     setFormData(initialData || {});
//   }, [initialData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <Card className="p-4">
//       <Form onSubmit={handleSubmit}>
//         <Row>
//           {fields.map((field) => (
//             <Col md={field.col || 12} key={field.name}>
//               <Form.Group className="mb-3" controlId={`form${field.name}`}>
//                 <Form.Label>{field.label}</Form.Label>
//                 <Form.Control
//                   type={field.type}
//                   name={field.name}
//                   placeholder={field.placeholder}
//                   value={formData[field.name] || ""}
//                   onChange={handleChange}
//                   as={field.as}
//                   rows={field.rows}
//                 />
//                 {errors[field.name] && (
//                   <span className="error text-danger">
//                     {errors[field.name]}
//                   </span>
//                 )}
//               </Form.Group>
//             </Col>
//           ))}
//         </Row>
//         <Button type="submit" variant="outline-success">
//           {initialData ? "Update" : "Submit"}
//         </Button>
//       </Form>
//     </Card>
//   );
// };

// export default ResuableForm;











////jodit work best
import React, { useState, useEffect } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import JoditEditor from 'jodit-react'; // Import JoditEditor

const ReusableForm = ({ fields, initialData, onSubmit, errors, useJodit }) => {
  const [formData, setFormData] = useState(initialData || {});

  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="p-4">
      <Form onSubmit={handleSubmit}>
        <Row>
          {fields.map((field) => (
            <Col md={field.col || 12} key={field.name}>
              <Form.Group className="mb-3" controlId={`form${field.name}`}>
                <Form.Label>{field.label}</Form.Label>
                {field.as === 'textarea' && !useJodit ? (
                  <Form.Control
                    as={field.as}
                    rows={field.rows}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                  />
                ) : field.as === 'jodit' && useJodit ? (
                  <JoditEditor
                    value={formData[field.name] || ''}
                    onBlur={(newContent) => setFormData({ ...formData, [field.name]: newContent })}
                    tabIndex={1}
                  />
                ) : (
                  <Form.Control
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                  />
                )}
                {errors[field.name] && (
                  <span className="error text-danger">
                    {errors[field.name]}
                  </span>
                )}
              </Form.Group>
            </Col>
          ))}
        </Row>
        <Button type="submit" variant="outline-success">
          {initialData ? "Update" : "Submit"}
        </Button>
      </Form>
    </Card>
  );
};

export default ReusableForm;

