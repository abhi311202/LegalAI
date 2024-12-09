import React, { useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf"; // Import jsPDF

function DocumentsUploaded() {
  const [uploadedDocuments, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null); // State to track the selected document

  // Utility function to strip HTML tags
  const stripHTML = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  // Fetch uploaded documents
  React.useEffect(() => {
    const fetchDocuments = async () => {
      const storedObjectString = localStorage.getItem("Admin");
      const myObject = JSON.parse(storedObjectString);
      const adminInfo = {
        adminid: myObject.id,
      };

      await axios
        .post("http://localhost:4001/admin/adminDocumentsUploaded", adminInfo)
        .then((res) => {
          if (res.data) {
            setDocuments(res.data.docs);
          }
        })
        .catch((err) => {
          if (err.response) {
            console.error(err);
          }
        });
    };

    fetchDocuments();
  }, []);

  // Open modal and set selected document
  const handleViewMore = (doc) => {
    setSelectedDocument(doc);
    const modal = document.getElementById("my_modal_3");
    modal.showModal();
  };

  // Close modal
  const closeModal = () => {
    const modal = document.getElementById("my_modal_3");
    modal.close();
    setSelectedDocument(null); // Clear selected document when closing
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);

    // Add Title
    doc.text(Title: ${selectedDocument.title || "Untitled"}, 10, 10);
    doc.text(Class: ${stripHTML(selectedDocument.Class) || "Not Classified"}, 10, 20);
    doc.text(
      Uploaded Date: ${selectedDocument.uploadDate || "Not Available"},
      10,
      30
    );

    // Add Summary
    doc.text("Summary:", 10, 40);
    const summary = stripHTML(selectedDocument.summary || "No summary available.");
    doc.text(summary, 10, 50, { maxWidth: 180 });

    // Add Content
    doc.text("Content:", 10, 70);
    const content = stripHTML(
      selectedDocument.content || "No additional content provided."
    );

    // Add the content text with automatic wrapping
    const contentLines = doc.splitTextToSize(content, 180);
    doc.text(contentLines, 10, 80);

    // Save the PDF
    doc.save(${selectedDocument.title || "Document"}.pdf);
  };

  return (
    <>
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Documents Uploaded
        </h2>
        <div className="space-y-6">
          {uploadedDocuments.map((doc) => (
            <div
              key={doc.id}
              className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col justify-between w-full"
            >
              {/* Document Title and Date */}
              <div className="mb-2">
                <h3 className="text-xl font-semibold text-gray-800">
                  {doc.title}
                </h3>
                <p className="text-gray-600">{doc.uploadDate}</p>
              </div>

              {/* View More Button */}
              <button
                onClick={() => handleViewMore(doc)}
                className="self-start bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition duration-300"
              >
                View More
              </button>
            </div>
          ))}
        </div>

        {/* Modal for displaying selected document */}
        <div className="w-1/1 bg-white">
          <dialog
            id="my_modal_3"
            className="modal dark:bg-gray-900 dark:text-gray-100 bg-gray-50"
            onClick={closeModal} // Close modal when clicking outside
          >
            <div
              className="modal-box w-full max-w-7xl bg-white dark:bg-gray-800 rounded-lg shadow-md p-8"
              onClick={(e) => e.stopPropagation()} // Prevent closing on modal content click
            >
              {selectedDocument ? (
                <>
                  <div className="p-6 space-y-6">
                    {/* Title */}
                    <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100">
                      {selectedDocument.title}
                    </h1>
                    <hr className="border-gray-300 dark:border-gray-600" />

                    {/* Document Class */}
                    <p className="text-xl mt-4 text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Class:</span>{" "}
                      {stripHTML(selectedDocument.Class) || "Not Classified"}
                    </p>

                    {/* Uploaded Date */}
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                      <span className="font-medium">Uploaded Date:</span>{" "}
                      {selectedDocument.uploadDate}
                    </p>
                    <hr className="border-gray-300 dark:border-gray-600" />

                    {/* Summary */}
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                      <span className="font-medium">Summary:</span>{" "}
                      {stripHTML(selectedDocument.summary) ||
                        "No summary available."}
                    </p>
                    <hr className="border-gray-300 dark:border-gray-600" />

                    {/* Content */}
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      <span className="font-medium">Content:</span>{" "}
                      {stripHTML(selectedDocument.content) ||
                        "No additional content provided."}
                    </p>
                  </div>

                  {/* Download Button */}
                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={handleDownloadPDF}
                      className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700 transition duration-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 9a1 1 0 011-1h4V3a1 1 0 112 0v5h4a1 1 0 110 2H4a1 1 0 01-1-1zM3 13a1 1 0 011-1h10a1 1 0 110 2H4a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Download as PDF
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-center text-lg font-medium text-gray-700 dark:text-gray-300">
                  Loading...
                </p>
              )}
            </div>

            {/* Close Button */}
            <form method="dialog" className="modal-backdrop">
              <button
                onClick={closeModal}
                className="bg-grey-100 dark:bg-grey-100 text-white px-3 py-1 rounded-md"
              >
                Close
              </button>
            </form>
          </dialog>
        </div>
      </div>
    </>
  );
}

export default DocumentsUploaded;