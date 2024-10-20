import PropTypes from "prop-types";
import { MdOutlineEdit } from "react-icons/md";

const EditButton = ({ onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-fit h-fit justify-between p-1.5 text-md bg-gray-600 text-white rounded-lg shadow-md font-BreeSerif  ${className}`}
    >
      <MdOutlineEdit className="text-xl ml-1 mr-2" />
      <span className="mx-2">Edit</span>
    </button>
  );
};

EditButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  label: PropTypes.string,
};

export default EditButton;
