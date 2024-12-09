import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logout from "../components/Logout";

const DocumentClassification = () => {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [dragActive, setDragActive] = useState(false);

  // Handle file upload from both drag & drop or file input
  const handleFileUpload = (event) => {
    let uploadedFile = event.target.files
      ? event.target.files[0]
      : event.dataTransfer.files[0];
    setFile(uploadedFile);
  };

  // Handle drag & drop functionality
  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    handleFileUpload(event);
  };

  // Simulate summarization process
  const handleSummarize = () => {
    if (file) {
      setSummary("The Case Belongs to Criminal Law");
    }
  };

  // Handle summary download
  const handleDownloadSummary = () => {
    const element = document.createElement("a");
    const fileBlob = new Blob([summary], { type: "text/plain" });
    element.href = URL.createObjectURL(fileBlob);
    element.download = "summary.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="flex min-h-screen max-h-max bg-gray-100">
      {/* Left Side Navigation Menu */}
      <div className="w-64 bg-black text-white p-6 flex flex-col justify-between rounded-r-2xl">
        <div>
          <h2 className="text-3xl font-bold mb-8 text-center">Legal AI</h2>
          <ul className="space-y-4 text-center">
            <li className="p-2 hover:shadow-xl hover:bg-white hover:text-black hover:rounded-lg">
              <a href="/" className="text-lg">
                Home
              </a>
            </li>
            <li className="p-2 hover:shadow-xl hover:bg-white hover:text-black hover:rounded-lg">
              {/* <a href="/#About" className="text-lg">
                About
              </a> */}
              <Link className="text-lg" to="/About">
                About
              </Link>
            </li>
            <li className="p-2 hover:shadow-xl hover:bg-white hover:text-black hover:rounded-lg">
              {/* <a href="/#Team" className="text-lg">
                Team
              </a> */}
              <Link className="text-lg" to="/team">
                Team
              </Link>
            </li>
            <li className="p-2 hover:shadow-xl hover:bg-white hover:text-black hover:rounded-lg">
              <a href="#download" className="text-lg">
                My Account
              </a>
            </li>
            <li className="p-2">
              <a href="#download" className="text-lg">
                <Logout />
              </a>
            </li>
          </ul>
        </div>

        <div>
          {/* <h1 className="text-center text-sm"> &copy; Legal AI 2025 </h1> */}
          <h1 className="text-center text-sm">
            &copy; Legal AI {new Date().getFullYear()}
          </h1>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 py-4">
        <h1 className="text-5xl font-bold text-gray-800 mb-8 text-center bg-black text-white p-5 rounded-2xl">
          Document Classification
        </h1>

        {/* Enhanced File Upload Section with Drag & Drop */}
        <div
          className={`mb-4 border-4 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            dragActive ? "border-blue-600 bg-blue-50" : "border-gray-300"
          }`}
          style={{ width: "100%", height: "300px" }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            id="fileUpload"
            type="file"
            className="hidden"
            onChange={handleFileUpload}
          />
          <label htmlFor="fileUpload" className="block h-full">
            <p className="text-lg text-gray-700 font-medium mb-12">
              Drag & drop a document here, or{" "}
              <span className="text-blue-600 underline">browse</span> to upload.
            </p>
            {/* <FontAwesomeIcon icon={faArrowUpFromBracket} /> */}
            <i class="fa-solid fa-file fa-7x"></i>
            {file && (
              <p className="mt-3 text-gray-600">
                Uploaded: <strong>{file.name}</strong> (
                {(file.size / 1024).toFixed(2)} KB)
              </p>
            )}
          </label>
        </div>

        {/* Classify Button */}
        <button
          className="bg-blue-600 text-white font-medium px-5 py-3 rounded-md hover:bg-blue-700 transition duration-300"
          onClick={handleSummarize}
        >
          Classify Document
        </button>

        {/* Display Class in Textarea */}
        {summary && (
          <div className="mt-4 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Class</h2>
            <textarea
              value={summary}
              readOnly
              rows="1"
              className="w-full p-4 border border-gray-300 rounded-lg resize-none text-gray-700"
            />

            {/* Download Button */}
            {/* <button
              className="mt-4 bg-green-600 text-white font-medium px-5 py-3 rounded-md hover:bg-green-700 transition duration-300"
              onClick={handleDownloadSummary}
            >
              Download Summary
            </button> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentClassification;
