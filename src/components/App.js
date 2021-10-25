import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Container from "./container/Container";
import Form from "./form/Form";
import ContactList from "./contactList/ContactList";
import Filter from "./filter/Filter";

function App() {
  const [contacts, setContact] = useState(() => {
    return JSON.parse(window.localStorage.getItem("contacts")) ?? "";
  });

  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const newContact = {
      id: uuidv4(),
      name,
      number,
    };

    // this.setState(({ contacts }) => {
    if (contacts.some((contact) => contact.name === name)) {
      return alert(`${name} is already in contacts!`);
    }

    setContact((prevContacts) => [newContact, ...contacts]);
  };

  // this.setState(({ contacts }) => ({
  //   contacts: [newContact, ...contacts],
  // }));
  const [filter, setFilter] = useState("");

  const watchFilter = (event) => {
    setFilter(event.currentTarget.value);
  };

  const filterContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = (id) => {
    setContact((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id)
    );
  };

  const results = filterContacts();
  return (
    <Container>
      <h1>Phonebook</h1>
      <Form onSubmit={addContact} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={watchFilter} />
      <ContactList contacts={results} onDeleteContact={deleteContact} />
    </Container>
  );
}

export default App;
