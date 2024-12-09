import React from "react";

const ChangePasswordModal = () => {
  return (
    <>
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Change Password
          </h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-600 font-medium mb-1">
                Current Password
              </label>
              <input
                type="password"
                className="w-full p-2 border rounded-md"
                placeholder="Enter current password"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 font-medium mb-1">
                New Password
              </label>
              <input
                type="password"
                className="w-full p-2 border rounded-md"
                placeholder="Enter new password"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full p-2 border rounded-md"
                placeholder="Confirm new password"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={() => setShowChangePasswordModal(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-md"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordModal;
