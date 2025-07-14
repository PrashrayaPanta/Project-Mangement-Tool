import React from "react";

import { FaArrowRightToBracket } from "react-icons/fa6";

import { FaArrowRotateRight } from "react-icons/fa6";

const SubmitButton = ({ label, formik, icon= <FaArrowRightToBracket/>}) => {

  return (

      <button
        type="submit"
        disabled={formik.isSubmitting}
        className={`group relative ${
          label === "Log In" ? "w-full" : ""
        } flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 items-center gap-2 mb-4`}>
        {
          formik.isSubmitting ? <FaArrowRotateRight className="animate-spin"/>  : icon
        }
        {label}
      </button>
 
  );
};

export default SubmitButton;
