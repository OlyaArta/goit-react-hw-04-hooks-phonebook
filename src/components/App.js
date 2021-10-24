import React from "react";
import { v4 as uuidv4 } from "uuid";
import Container from "./container/Container";
import Form from "./form/Form";
import ContactList from "./contactList/ContactList";
import Filter from "./filter/Filter";

class App extends React.Component {
  state = {
    contacts: [
      // { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      // { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      // { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      // { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  addContact = ({ name, number }) => {
    const newContact = {
      id: uuidv4(),
      name,
      number,
    };

    this.setState(({ contacts }) => {
      if (contacts.some((contact) => contact.name === name)) {
        return alert(`${name} is already in contacts!`);
      }
      return {
        contacts: [newContact, ...contacts],
      };
    });
  };
  // this.setState(({ contacts }) => ({
  //   contacts: [newContact, ...contacts],
  // }));

  watchFilter = (event) => {
    this.setState({ filter: event.currentTarget.value });
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;

    const normalizedFilter = filter.toLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
  };

  componentDidMount() {
    console.log("something");
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);
    console.log(parsedContacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      console.log("tada");
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { filter } = this.state;
    const results = this.filterContacts();
    return (
      <Container>
        <h1>Phonebook</h1>
        <Form onSubmit={this.addContact} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.watchFilter} />
        <ContactList contacts={results} onDeleteContact={this.deleteContact} />
      </Container>
    );
  }
}

export default App;
