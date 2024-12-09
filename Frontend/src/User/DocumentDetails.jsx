import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";

const DocumentDetails = () => {
  const { id } = useParams();
  const [document, setDocument] = useState(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const res = await axios.get(`http://localhost:4001/user/Document/${id}`);
        setDocument(res.data);
      } catch (err) {
        console.error("Error fetching document details:", err.message);
      }
    };

    fetchDocument();
  }, [id]);

  if (!document) return <div className="text-center text-gray-500">Loading...</div>;

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Define margins and styles
    const margin = 10;
    const topMargin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let currentY = topMargin;

    // Title Section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(`Title: ${document.title || "Untitled"}`, margin, currentY);
    currentY += 10;

    // Metadata Section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Class:", margin, currentY);
    doc.setFont("helvetica", "normal");
    doc.text(stripHTML(document.Class) || "Not Classified", margin + 14, currentY);
    currentY += 10;

    doc.setFont("helvetica", "bold");
    doc.text("Upload Date:", margin, currentY);
    doc.setFont("helvetica", "normal");
    doc.text(new Date(document.uploadDate).toLocaleDateString() || "Not Available", margin + 32, currentY);
    currentY += 10;

    // Summary Section
    doc.setFont("helvetica", "bold");
    doc.text("Summary:", margin, currentY);
    currentY += 10;
    doc.setFont("helvetica", "normal");
    const summary = stripHTML(document.summary || "No summary available.");
    const summaryLines = doc.splitTextToSize(summary, pageWidth - margin * 2);
    summaryLines.forEach((line) => {
      if (currentY + 10 > pageHeight - margin) {
        doc.addPage();
        currentY = topMargin;
      }
      doc.text(line, margin, currentY);
      currentY += 10;
    });

    // Content Section
    doc.setFont("helvetica", "bold");
    doc.text("Content:", margin, currentY);
    currentY += 10;
    doc.setFont("helvetica", "normal");
    const content = stripHTML(document.content || "No content available.");
    const contentLines = doc.splitTextToSize(content, pageWidth - margin * 2);
    contentLines.forEach((line) => {
      if (currentY + 10 > pageHeight - margin) {
        doc.addPage();
        currentY = topMargin;
      }
      doc.text(line, margin, currentY);
      currentY += 10;
    });

    // Footer with Page Numbers
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(`Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - margin, { align: "center" });
    }

    // Save the PDF
    doc.save(`${document.title || "Document"}.pdf`);
  };

  const stripHTML = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{document.title}</h1>
        <p className="text-lg text-gray-600 mb-2">
          <strong>Class:</strong> {stripHTML(document.Class) || "Not Classified"}
        </p>
        <p className="text-lg text-gray-600 mb-4">
          <strong>Upload Date:</strong> {new Date(document.uploadDate).toLocaleDateString()}
        </p>

        {/* Summary Section */}
        <div className="bg-gray-50 p-4 rounded-md shadow-sm mb-4">
          <strong className="text-xl text-gray-700">Summary:</strong>
          <p className="text-gray-600 mt-2">{stripHTML(document.summary)}</p>
        </div>

        {/* Content Section */}
        <div className="bg-gray-50 p-4 rounded-md shadow-sm mb-6">
          <strong className="text-xl text-gray-700">Content:</strong>
          <p className="text-gray-600 mt-2">{stripHTML(document.content)}</p>
        </div>

        {/* Download PDF Button */}
        <div className="flex justify-end">
          <button
            onClick={handleDownloadPDF}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentDetails;