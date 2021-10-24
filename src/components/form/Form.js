import React, { Component } from "react";
import shortid from "shortid";
import PropTypes from "prop-types";
import s from "./Form.module.css";

class Form extends Component {
  state = {
    name: "",
    number: "",
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  nameInputId = shortid.generate();
  numberInputId = shortid.generate();

  handleChange = (e) => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({
      name: "",
      number: "",
    });
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit} className={s.form}>
          <label htmlFor={this.nameInputId} className={s.label}>
            Name
          </label>
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
            value={this.state.name}
            onChange={this.handleChange}
            id={this.nameInputId}
            className={s.input}
          />

          <label htmlFor={this.numberInputId} className={s.label}>
            Number
          </label>
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
            value={this.state.number}
            onChange={this.handleChange}
            id={this.numberInputId}
            className={s.input}
          />

          <button type="submit" className={s.btn}>
            Add contact
          </button>
        </form>
      </>
    );
  }
}

// Form.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };

export default Form;
