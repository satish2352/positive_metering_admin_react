
// import React, { useState, useEffect } from "react";
// import { Form } from "react-bootstrap";
// import JoditEditor from "jodit-react";

// const NewReusableForm = ({
//   label,
//   name,
//   placeholder,
//   type,
//   textarea,
//   useJodit,
//   onChange,
//   initialData,
//   error,
//   imageDimensiion,
//   charLimit,
//   onSubmit,
// }) => {
//   const [value, setValue] = useState(initialData[name] || "");
//   const [charError, setCharError] = useState("");

//   const config = {
//     buttons: [
//       "source", "bold", "italic", "underline", "strikethrough", "|",
//       "superscript", "subscript", "|", "ul", "ol", "paragraph", "|",
//       "fontsize", "image", "table", "link", "|",
//       "align", "outdent", "indent", "|",
//       "undo", "redo", "hr", "eraser", "copyformat", "|",
//       "fullsize", "print", "about"
//     ],    
//     uploader: { insertImageAsBase64URI: true }, // Enables local image insertion without API
//     height: "auto", 
//     imageDefaultWidth: 300,
//   };


//   useEffect(() => {
//     setValue(initialData[name] || "");
//   }, [initialData, name]);

//   const handleChange = (e) => {
//     const { value, files } = e.target;
//     const newValue = type === "file" ? files[0] : value;

//     if (charLimit && newValue.length > charLimit) {
//       setCharError(`Character limit of ${charLimit} exceeded`);
//     } else {
//       setCharError("");
//       setValue(newValue);
//       onChange(name, newValue);
//     }
//   };

//   const handleEditorChange = (newContent) => {
//     if (charLimit && newContent.length > charLimit) {
//       setCharError(`Character limit of ${charLimit} exceeded`);
//     } else {
//       setCharError("");
//       setValue(newContent);
//       onChange(name, newContent);
//     }
//   };

//   return (
//     <Form.Group>
//       <Form.Label>{label}</Form.Label>
//       {imageDimensiion && (
//         <span className="form-text text-danger ms-2">
//           ({imageDimensiion})
//         </span>
//       )}
//       {charLimit && (
//         <span className="form-text text-danger ms-2">
//           (Max {charLimit} characters)
//         </span>
//       )}
//       {type === "file" ? (
//         <>
//           <Form.Control
//             type={type}
//             accept="image/*,.pdf,.doc,.docx, video/*"
//             onChange={handleChange}
//             isInvalid={!!error || !!charError}
//           />
//           {(error || charError) && (
//             <div className="invalid-feedback d-block">
//               {error || charError}
//             </div>
//           )}
//         </>
//       ) : useJodit ? (
//         <>
//           <JoditEditor
//             value={value}
//             config={config}
//             onChange={handleEditorChange}
//           />
//           {(error || charError) && (
//             <div className="invalid-feedback d-block">
//               {error || charError}
//             </div>
//           )}
//           {charLimit && (
//             <div className="text-muted">
//               {value.length}/{charLimit}
//             </div>
//           )}
//         </>
//       ) : textarea ? (
//         <>
//           <Form.Control
//             as="textarea"
//             placeholder={placeholder}
//             value={value}
//             onChange={handleChange}
//             isInvalid={!!error || !!charError}
//           />
//           {charLimit && (
//             <div className="text-muted">
//               {value.length}/{charLimit}
//             </div>
//           )}
//           {(error || charError) && (
//             <Form.Control.Feedback type="invalid">
//               {error || charError}
//             </Form.Control.Feedback>
//           )}
//         </>
//       ) : (
//         <>
//           <Form.Control
//             type={type}
//             placeholder={placeholder}
//             value={value}
//             onChange={handleChange}
//             isInvalid={!!error || !!charError}
//           />
//           {charLimit && (
//             <div className="text-muted">
//               {value.length}/{charLimit}
//             </div>
//           )}
//           {(error || charError) && (
//             <Form.Control.Feedback type="invalid">
//               {error || charError}
//             </Form.Control.Feedback>
//           )}
//         </>
//       )}
//     </Form.Group>
//   );
// };

// export default NewReusableForm;



import React, { useState, useEffect, useRef, useMemo } from "react";
import { Form } from "react-bootstrap";
import JoditEditor from "jodit-react";

const NewReusableForm = ({
  label,
  name,
  placeholder,
  type,
  textarea,
  useJodit,
  onChange,
  initialData,
  error,
  imageDimensiion,
  charLimit,
  onSubmit,
}) => {
  const [value, setValue] = useState(initialData[name] || "");
  const [charError, setCharError] = useState("");
  const editorRef = useRef(null);
  // ✅ memoize config so editor doesn't re-init

  const config = useMemo(

    () => ({

      buttons: [

        "source",

        "bold",

        "italic",

        "underline",

        "strikethrough",

        "|",

        "superscript",

        "subscript",

        "|",

        "ul",

        "ol",

        "paragraph",

        "|",

        "fontsize",

        "image",

        "table",

        "link",

        "|",

        "align",

        "outdent",

        "indent",

        "|",

        "undo",

        "redo",

        "hr",

        "eraser",

        "copyformat",

        "|",

        "fullsize",

        "print",

        "about",

      ],

      uploader: { insertImageAsBase64URI: true }, // local image insert

      height: "auto",

      imageDefaultWidth: 300,

    }),

    []

  );


  useEffect(() => {
    setValue(initialData[name] || "");
  }, [initialData, name]);

  const handleChange = (e) => {
    const { value, files } = e.target;
    const newValue = type === "file" ? files[0] : value;

    if (charLimit && newValue.length > charLimit) {
      setCharError(`Character limit of ${charLimit} exceeded`);
    } else {
      setCharError("");
      setValue(newValue);
      onChange(name, newValue);
    }
  };

  const handleEditorChange = (newContent) => {
    if (charLimit && newContent.length > charLimit) {
      setCharError(`Character limit of ${charLimit} exceeded`);
    } else {
      setCharError("");
      setValue(newContent);
      onChange(name, newContent);
    }
  };

  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      {imageDimensiion && (
        <span className="form-text text-danger ms-2">
          ({imageDimensiion})
        </span>
      )}
      {charLimit && (
        <span className="form-text text-danger ms-2">
          (Max {charLimit} characters)
        </span>
      )}
      {type === "file" ? (
        <>
          <Form.Control
            type={type}
            accept="image/*,.pdf,.doc,.docx, video/*"
            onChange={handleChange}
            isInvalid={!!error || !!charError}
          />
          {(error || charError) && (
            <div className="invalid-feedback d-block">
              {error || charError}
            </div>
          )}
        </>
      ) : useJodit ? (
        <>
          <JoditEditor

            ref={editorRef}

            value={value} // ✅ keep controlled but with memoized config

            config={config}

            onBlur={(newContent) => handleEditorChange(newContent)} // commit on blur

            onChange={handleEditorChange} // live updates (typing + paste works)

          />
          {(error || charError) && (
            <div className="invalid-feedback d-block">
              {error || charError}
            </div>
          )}
          {charLimit && (
            <div className="text-muted">
              {value.length}/{charLimit}
            </div>
          )}
        </>
      ) : textarea ? (
        <>
          <Form.Control
            as="textarea"
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            isInvalid={!!error || !!charError}
          />
          {charLimit && (
            <div className="text-muted">
              {value.length}/{charLimit}
            </div>
          )}
          {(error || charError) && (
            <Form.Control.Feedback type="invalid">
              {error || charError}
            </Form.Control.Feedback>
          )}
        </>
      ) : (
        <>
          <Form.Control
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            isInvalid={!!error || !!charError}
          />
          {charLimit && (
            <div className="text-muted">
              {value.length}/{charLimit}
            </div>
          )}
          {(error || charError) && (
            <Form.Control.Feedback type="invalid">
              {error || charError}
            </Form.Control.Feedback>
          )}
        </>
      )}
    </Form.Group>
  );
};

export default NewReusableForm;