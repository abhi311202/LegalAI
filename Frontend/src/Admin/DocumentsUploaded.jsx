import React, { useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf"; // Import jsPDF
import JoditEditor from "jodit-react";
import { useNavigate } from "react-router-dom";

function DocumentsUploaded() {
  const navigate = useNavigate();
  const [uploadedDocuments, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null); // State to track the selected document

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

  const handleViewMore = (doc) => {
    const newTab = window.open(`/document-details2/${doc._id}`, "_blank");
    newTab.focus();
  };

  // Function to download document as PDF
  // const handleDownloadPDF = () => {
  //   const doc = new jsPDF();

  //   doc.setFont("helvetica", "normal");
  //   doc.setFontSize(14);

  //   // Add Title
  //   doc.text(`Title: ${selectedDocument.title || "Untitled"}`, 10, 10);
  //   doc.text(`Class: ${stripHTML(selectedDocument.Class) || "Not Classified"}`, 10, 20);
  //   doc.text(
  //     `Uploaded Date: ${selectedDocument.uploadDate || "Not Available"}`,
  //     10,
  //     30
  //   );

  //   // Add Summary
  //   doc.text("Summary:", 10, 40);
  //   const summary = stripHTML(selectedDocument.summary || "No summary available.");
  //   doc.text(summary, 10, 50, { maxWidth: 180 });

  //   // Add Content
  //   doc.text("Content:", 10, 70);
  //   const content = stripHTML(
  //     selectedDocument.content || "No additional content provided."
  //   );

  //   // Add the content text with automatic wrapping
  //   const contentLines = doc.splitTextToSize(content, 180);
  //   doc.text(contentLines, 10, 80);

  //   // Save the PDF
  //   doc.save(`${selectedDocument.title || "Document"}.pdf`);
  // };

 

  return (
    <>
      <div className="p-6 bg-white shadow-lg dark:bg-[#222]">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">
          Documents Uploaded
        </h2>
        <div className="space-y-6">
          {uploadedDocuments.map((doc) => (
            <div
              key={doc.id}
              className="bg-gray-100 dark:bg-black p-4 rounded-lg shadow-md flex flex-col justify-between w-full"
            >
              {/* Document Title and Date */}
              <div className="mb-2">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {doc.title}
                </h3>
                <p className="text-gray-600 dark:text-white">
                  {doc.uploadDate}
                </p>
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

        
      </div>
    </>
  );
}

export default DocumentsUploaded;
