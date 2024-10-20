// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import { IoEyeOutline } from "react-icons/io5";

const ViewButton = ({ onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between w-fit h-fit p-1.5 text-md font-BreeSerif bg-blue-300 text-white rounded-lg shadow-md ${className}`}
    >
      <IoEyeOutline className="text-xl mx-2" />
      <span className="mr-2">View</span>
    </button>
  );
};

ViewButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default ViewButton;
