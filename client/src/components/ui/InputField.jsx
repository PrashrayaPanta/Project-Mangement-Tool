import React from "react";
import { CiUser } from "react-icons/ci";

const InputField = ({ formik, type, name, iconComponent, label }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="">
        {label}
      </label>
      <div className="relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {iconComponent}
          {/* Assuming CiUser is imported */}
        </div>
        <input
          type={type}
          name={name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[name]}
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-2 sm:text-sm border-gray-300 rounded-md"
          placeholder={name}
        />
      </div>
      {formik.touched[name] && formik.errors[name] && (
        <div className="text-red-400">{formik.errors[name]}</div>
      )}
    </div>
  );
};

export default InputField;
