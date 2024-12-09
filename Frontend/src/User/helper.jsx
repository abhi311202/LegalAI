import React, { useEffect, useState } from "react";

function Helper() {
  const [profileData, setProfileData] = useState({});
  const storedObjectString = localStorage.getItem("Users");
  const myObject = JSON.parse(storedObjectString);
  // Fetch profile data from database (simulated here)
  useEffect(() => {
    setProfileData({
      name: myObject.name,
      email: myObject.email,
      phone: myObject.phone,
      dob: myObject.dob,
      gender: myObject.gender,
      aadhaar: myObject.aadhaar,
      profession: myObject.profession,
      organisation: myObject.organisation,
      docUploaded: myObject.docUploaded,
      registeredDate: myObject.registeredDate,
    });
  }, []);
  return (
    <div>
      <dialog id="My_Profile" className="modal text-black">
        {/* <div className="modal-box"> */}
        <div className="modal-box p-8 bg-white shadow-lg rounded-lg dark:bg-[#222] dark:text-stone-50">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4 dark:text-white">
            My Profile
          </h2>
          <div className="space-y-2 mb-5">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Name:</span>
              <span>{profileData.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Email:</span>
              <span>{profileData.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Phone:</span>
              <span>{profileData.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Date of Birth:</span>
              <span>{profileData.dob}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Gender:</span>
              <span>{profileData.gender}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Aadhaar ID:</span>
              <span>{profileData.aadhaar}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Profession:</span>
              <span>{profileData.profession}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Organization:</span>
              <span>{profileData.organisation}</span>
            </div>
          </div>
          <div className="flex justify-start gap-4">
            <button
              className="bg-blue-600 text-white font-medium px-5 py-2 rounded-md"
              onClick={() => setShowChangePasswordModal(true)}
            >
              Change Password
            </button>
            <button
              className="bg-green-600 text-white font-medium px-5 py-2 rounded-md"
              onClick={() => setShowEditDetailsModal(true)}
            >
              Edit Details
            </button>
          </div>
        </div>
        {/* </div> */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default Helper;
