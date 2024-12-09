import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Autocomplete, TextField } from "@mui/material";
import Hero_Vdo1 from "../../public/Hero_Vdo1.mp4";

const ExplorePage = () => {
  const navigate = useNavigate();
  const [uploadedDocuments, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedClassType, setSelectedClassType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("A-Z");

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await axios.post("http://localhost:4001/user/Documents");
        if (res.data) {
          setDocuments(res.data.docs);
          setFilteredDocuments(res.data.docs);
        }
      } catch (err) {
        console.error(err.response || err.message);
      }
    };

    fetchDocuments();
  }, []);

  const stripHTML = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const filterDocuments = () => {
    let filtered = [...uploadedDocuments];

    if (selectedClassType && selectedClassType !== "All") {
      filtered = filtered.filter(
        (doc) =>
          stripHTML(doc.Class).toLowerCase() === selectedClassType.toLowerCase()
      );
    }

    if (startDate && endDate) {
      filtered = filtered.filter((doc) => {
        const docDate = new Date(doc.uploadDate);
        return docDate >= new Date(startDate) && docDate <= new Date(endDate);
      });
    }

    if (searchQuery) {
      filtered = filtered.filter((doc) => {
        const lowercasedQuery = searchQuery.toLowerCase();
        return (
          doc.title.toLowerCase().includes(lowercasedQuery) ||
          stripHTML(doc.summary).toLowerCase().includes(lowercasedQuery) ||
          stripHTML(doc.Class).toLowerCase().includes(lowercasedQuery)
        );
      });
    }

    if (sortOrder) {
      filtered.sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        return sortOrder === "A-Z"
          ? titleA.localeCompare(titleB)
          : titleB.localeCompare(titleA);
      });
      p;
    }

    setFilteredDocuments(filtered);
  };

  const handleSearch = () => {
    filterDocuments();
  };

  const handleViewMore = (doc) => {
    const newTab = window.open(`/document-details/${doc._id}`, "_blank");
    newTab.focus();
  };

  return (
    <div className="bg-gray-100 text-gray-900 mt-[65px]">
      <header className="bg-blue-800 text-white">
        <div className="hero min-h-[470px] relative">
          <video
            autoPlay
            loop
            muted
            className="absolute top-0 left-0 w-full h-full object-cover"
          >
            <source
              src={Hero_Vdo1}
              // src="https://drive.google.com/uc?id=1AKJrfT1itD059rVjjlRpNsmA-Vgg8BTI"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <div className="hero-overlay bg-opacity-60"></div>
          <div className=" w-[95%] hero-content text-neutral-content text-center relative z-10">
            {/* oringal code.... */}
            <div className=" w-[95%] mx-auto px-6 py-4 text-center">
              <h1 className="text-4xl font-bold mb-4">
                Explore Research Articles and Journals
              </h1>
              <p className="text-lg text-center mb-8">
                Access thousands of high-quality research papers and articles.
              </p>

              <div className="flex flex-col items-center space-y-4 w-[95%] mx-auto">
                <div className="flex items-center w-full space-x-[1px] bg-red-900">
                  <select
                    className="px-4 py-2 text-gray-800 border border-gray-300 rounded-l-md bg-gray-200 h-full"
                    value={selectedClassType}
                    onChange={(e) => setSelectedClassType(e.target.value)}
                  >
                    <option value="All">All</option>
                    <option value="Criminal">Criminal</option>
                    <option value="Civil">Civil</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Administration">Administration</option>
                  </select>

                  {/* Updated Autocomplete Search Bar */}
                  <div className="w-full bg-red-900">
                    <Autocomplete
                      id="custom-input-demo"
                      freeSolo
                      options={uploadedDocuments.map((doc) => doc.title)}
                      renderInput={(params) => (
                        <div ref={params.InputProps.ref} className="w-full">
                          <TextField
                            {...params}
                            placeholder="Search for articles, authors, or topics..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            variant="outlined"
                            className="w-full px-4 py-1 text-sm text-gray-800 border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      )}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleSearch}
                    className="bg-orange-500 text-white px-4 py-2 rounded-r-md hover:bg-orange-600"
                  >
                    <i className="fa fa-search"></i>
                  </button>
                </div>

                <div className="flex items-center space-x-4">
                  <div>
                    <label className="block text-gray-700">Start Date</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="px-4 py-2 text-gray-800 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700">End Date</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="px-4 py-2 text-gray-800 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700">Sort By</label>
                    <select
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                      className="px-4 py-2 text-gray-800 border border-gray-300 rounded-md"
                    >
                      <option value="A-Z">A-Z</option>
                      <option value="Z-A">Z-A</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="">
        <div className="p-6 bg-white shadow-lg ">
          <div className="space-y-6">
            {filteredDocuments.map((doc) => (
              <div
                key={doc._id}
                className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col"
              >
                <h3 className="text-xl font-semibold text-gray-800">
                  {doc.title}
                </h3>
                <p className="text-sm text-gray-600">
                  <strong>Uploaded Date:</strong> {doc.uploadDate}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Class:</strong>{" "}
                  {stripHTML(doc.Class) || "Unclassified"}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Summary:</strong>{" "}
                  {stripHTML(doc.summary) || "No summary available."}
                </p>
                <div className="flex justify-start">
                  <button
                    onClick={() => handleViewMore(doc)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mt-4"
                  >
                    View More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExplorePage;
