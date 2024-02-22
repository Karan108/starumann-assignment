import PropTypes from "prop-types";

function Input({ onChange, placeholder }) {
  return (
    <div>
      <input
        type="text"
        id="inputField"
        onChange={onChange}
        placeholder={placeholder}
        className="outline-none"
        aria-label={placeholder}
        aria-placeholder={placeholder}
        aria-describedby="inputDescription"
      />
      <div id="inputDescription" className="sr-only">
        This is an input field.
      </div>
    </div>
  );
}

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
};

export default Input;
