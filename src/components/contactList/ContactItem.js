// import React from "react";
import PropTypes from "prop-types";
import s from "./Contact.module.css";

const ContactItem = ({ name, number, id, onDeleteContact }) => {
  return (
    <li>
      <span>{name}: </span>
      <span>{number}</span>
      <button
        type="button"
        onClick={() => onDeleteContact(id)}
        className={s.button}
      >
        Delete
      </button>
    </li>
  );
};

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactItem;
