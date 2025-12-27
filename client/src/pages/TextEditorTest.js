import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function TextEditorTest() {
  const [content, setContent] = useState("");

  return (
    <div style={{
      maxWidth: "700px",
      margin: "40px auto",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      background: "#fff"
    }}>
      <h2 style={{ textAlign: "center", color: "#2c3e50" }}>Rich Text Editor Test</h2>
      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        placeholder="Type your formatted message here..."
        style={{ height: "200px", marginBottom: "30px" }}
      />
      <h3>Preview:</h3>
      <div
        style={{
          minHeight: "100px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          background: "#fafafa",
          overflowY: "auto",
        }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}

export default TextEditorTest;
