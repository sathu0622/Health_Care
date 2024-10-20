import PropTypes from "prop-types";
import { IoMdAddCircleOutline } from "react-icons/io";

const AddButton = ({ onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between py-1.5 px-4 bg-black text-white text-xl rounded-lg shadow-md font-BreeSerif ${className}`}
    >
      <IoMdAddCircleOutline className="text-xl mr-2" />
      <span className="">Add</span>
    </button>
  );
};

AddButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default AddButton;
