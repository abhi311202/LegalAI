import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import pdfToText from "react-pdftotext"; // Import react-pdftotext
import mammoth from "mammoth";
import toast from "react-hot-toast";
import "../App.css";


function AdminUploadnewdoc() {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState("");
  const [summary, setSummary] = useState("");
  const [Class, SetClass] = useState("");

  const storedObjectString = localStorage.getItem("Admin");
  const myObject = JSON.parse(storedObjectString);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    register("content", { required: true });
    register("summary", { required: true });
    register("Class", { required: true });
  }, [register]);

  const onSubmit = async (data) => {
    const documentInfo = {
      title: data.title,
      serialnum: data.serialnum,
      content: data.content,
      summary: data.summary,
      Class: data.Class,
      adminid: myObject.id,
      uploadDate: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };
    await axios
      .post("http://localhost:4001/admin/adminDocuments", documentInfo)
      .then((res) => {
        // console.log(res.data);
        if (res.data) {
          // console.log(res.data);
          toast.success(res.data.message);
          handleResetButton();
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          console.log("Error from backend: " + err.response.data.message);
          toast.error("Error: " + err.response.data.message);
        }
      });
  };

  const handleResetButton = () => {
    setValue("title", "");
    setValue("serialnum", "");
    setValue("content", "");
    setValue("summary", "");
    setValue("Class", "");
    setFile(null);
    setFilePreview("");
    setSummary("");
    setContent("");
    SetClass("");
  };

  const handleFileUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);

      if (uploadedFile.type === "application/pdf") {
        try {
          const text = await pdfToText(uploadedFile);
          setContent(text);
          setValue("content", text);
          setFilePreview("PDF text extracted successfully.");
        } catch (error) {
          console.error("Error extracting text from PDF:", error);
        }
      } else if (
        uploadedFile.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        const reader = new FileReader();
        reader.onload = async (event) => {
          try {
            const { value } = await mammoth.extractRawText({
              arrayBuffer: event.target.result,
            });
            setFilePreview(value);
            setContent(value);
            setValue("content", value);
          } catch (error) {
            console.error("Error reading .docx file:", error);
          }
        };
        reader.readAsArrayBuffer(uploadedFile);
      }
    }
  };

  const handleShowResult = () => {
    if (file) {
      // setTimeout(() => {
      const mockSummary =
        "This is the automatically generated summary for your uploaded document.";
      setSummary(mockSummary);

      const mockClass = "Criminal";
      SetClass(mockClass);
      // }, 1000);
    }
  };

  const handleFileClick = () => {
    if (file) {
      // Create a URL for the file to open it in a new tab
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, "_blank");
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg space-y-6 dark:bg-[#222]">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4 dark:text-white">
        Upload New Document
      </h2>
      <form
        // onSubmit={handleSubmit(onSubmit)}
        method="dialog"
        className="space-y-4 text-black"
      >
        <label className="block text-gray-600 font-medium dark:text-white">
          Document Title:
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 dark:bg-black dark:border-gray-600"
            placeholder="Enter document title"
            {...register("title", { required: true })}
          />
        </label>
        {errors.title && (
          <span className="p-2 text-sm text-red-500">
            This field is required
          </span>
        )}

        <label className="block text-gray-600 font-medium">
          Serial No:
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 dark:bg-black dark:border-gray-600"
            placeholder="Enter serial number"
            {...register("serialnum", { required: true })}
          />
        </label>
        {errors.serialnum && (
          <span className="p-2 text-sm text-red-500">
            This field is required
          </span>
        )}

        <div className="flex items-center justify-between mt-6">
          <label className="bg-blue-600 text-white font-medium px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300 cursor-pointer">
            Upload Document
            <input
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              accept=".pdf,.docx"
            />
          </label>

          <label className="">
            {file && (
              <div className="text-gray-600 flex flex-col items-center justify-center w-full">
                <p className="text-center mb-4">
                  <strong>Uploaded File:</strong> {file.name}
                </p>

                <button
                  type="button"
                  onClick={handleFileClick}
                  className="text-blue-600"
                >
                  View Document
                </button>
              </div>
            )}
          </label>

          <button
            className={`bg-green-600 text-white font-medium px-6 py-2 rounded-md transition duration-300 ${
              file
                ? "hover:bg-green-700 cursor-pointer"
                : "opacity-50 cursor-not-allowed"
            }`}
            onClick={handleShowResult}
            disabled={!file}
          >
            Show Result
          </button>
        </div>

        <label className="block text-gray-600 font-medium">
          Document Content:
          <JoditEditor
            config={{
              readonly: false,
              toolbar: true,
              // theme: "custom", // Optionally set a custom theme
              iframe: false,
            }}
            // className="dark:bg-black dark:border-gray-600"
            ref={editor}
            value={content}
            onChange={(newContent) => {
              setContent(newContent);
              setValue("content", newContent);
            }}
            className="jodity-editor-custom"
          />
        </label>
        {errors.content && (
          <span className="p-2 text-sm text-red-500">
            This field is required
          </span>
        )}

        <label className="block text-gray-600 font-medium">
          Summary:
          <JoditEditor
            ref={editor}
            value={summary}
            onChange={(newSummary) => {
              setSummary(newSummary);
              setValue("summary", newSummary);
            }}
          />
        </label>
        {errors.summary && (
          <span className="p-2 text-sm text-red-500">
            This field is required
          </span>
        )}

        <label className="block text-gray-600 font-medium">
          Classification:
          <JoditEditor
            ref={editor}
            value={Class}
            onChange={(newClass) => {
              SetClass(newClass);
              setValue("Class", newClass);
            }}
          />
        </label>
        {errors.Class && (
          <span className="p-2 text-sm text-red-500">
            This field is required
          </span>
        )}

        <div className="flex justify-center justify-around">
          <button
            className="bg-green-600 text-white font-medium px-6 py-2 rounded-md transition duration-300 w-1/4"
            // type="Submit"
            onClick={handleSubmit(onSubmit)}
          >
            Submit
          </button>
          <button
            className="bg-red-600 text-white font-medium px-6 py-2 rounded-md transition duration-300 w-1/4"
            type="reset"
            onClick={handleResetButton}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminUploadnewdoc;
