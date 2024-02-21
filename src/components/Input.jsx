import { PropTypes } from "prop-types";

// placeholder
// css
// accessibility
function Input({ onChange }) {
  return <input type="text" onChange={onChange} placeholder="Search by name" />;
}

Input.propTypes = {
  onChange: PropTypes.function,
};
export default Input;
