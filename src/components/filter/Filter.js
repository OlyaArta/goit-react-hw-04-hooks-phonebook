import PropTypes from "prop-types";
import s from "./Filter.module.css";

function Filter({ value, onChange }) {
  return (
    <label className={s.label}>
      Find contacts by name
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={s.input}
      />
    </label>
  );
}
Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Filter;
