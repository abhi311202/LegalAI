import React from "react";
import { Autocomplete } from "@mui/material";

function SearchBar({ data, placeholder, value, onChange }) {
  return (
    <div className="w-full">
      <Autocomplete
        id="custom-input-demo"
        options={data || []}
        getOptionLabel={(opt) => opt.title || ""}
        renderInput={(params) => (
          <div ref={params.InputProps.ref} className="w-full">
            <input
              type="text"
              {...params.inputProps}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              className="w-full px-4 py-2 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
      />
    </div>
  );
}

export default SearchBar;