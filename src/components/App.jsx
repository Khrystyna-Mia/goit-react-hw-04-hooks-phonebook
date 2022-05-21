import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import ContactForm from './ContactForm';
import ContactList from './ContactList';
import ContactFilter from './ContactFilter';
import { nanoid } from 'nanoid';

const App = () => {
  const [contacts, setContacts] = useState(
    () =>
      JSON.parse(localStorage.getItem('contacts')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
  );
  const [filter, setFilter] = useState('');
  const isRender = useRef(true);

  useEffect(() => {
    if (isRender.current) {
      isRender.current = false;
      return;
    }

    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const isInContacts = contacts.find(({ name }) => name === contact.name);
    if (isInContacts) return alert(`${name} is already in contacts.`);

    setContacts([contact, ...contacts]);
  };

  const delContact = contactId => {
    setContacts(contacts.filter(({ id }) => id !== contactId));
  };

  const changeFilter = e => setFilter(e.currentTarget.value);

  const visibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <Wrapper>
      <Title>Phonebook</Title>
      <ContactForm onSubmit={addContact} />

      <Text>Contacts</Text>
      <ContactFilter value={filter} onChange={changeFilter} />
      <ContactList contacts={visibleContacts()} onDelete={delContact} />
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding: 20px;
`;

const Title = styled.h1`
  font-family: 'Georgia', sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 1.8;
  letter-spacing: 0.02em;

  color: white;
`;

const Text = styled.h2`
  font-family: 'Georgia', sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 1.8;
  letter-spacing: 0.02em;

  color: white;
`;

export default App;

/* ------------------------------------------------------ */

// class App extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };

//   componentDidMount() {
//     const contacts = JSON.parse(localStorage.getItem('contacts'));

//     if (contacts) {
//       this.setState({ contacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   addContact = ({ name, number }) => {
//     const contact = {
//       id: nanoid(),
//       name,
//       number,
//     };

//     const { contacts } = this.state;

//     if (
//       contacts.find(
//         contact => contact.name.toLowerCase() === name.toLowerCase()
//       )
//     ) {
//       alert(`${name} is already in contacts.`);
//     } else {
//       this.setState(({ contacts }) => ({
//         contacts: [contact, ...contacts],
//       }));
//     }
//   };

//   delContact = contactId => {
//     this.setState(({ contacts }) => ({
//       contacts: contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   changeFilter = e => {
//     this.setState({ filter: e.currentTarget.value });
//   };

//   visibleContacts = () => {
//     const { contacts, filter } = this.state;
//     const normalizedFilter = filter.toLowerCase();

//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter)
//     );
//   };

//   render() {
//     return (
//       <Wrapper>
//         <Title>Phonebook</Title>
//         <ContactForm onSubmit={this.addContact} />

//         <Text>Contacts</Text>
//         <ContactFilter value={this.state.filter} onChange={this.changeFilter} />
//         <ContactList
//           contacts={this.visibleContacts()}
//           onDelete={this.delContact}
//         />
//       </Wrapper>
//     );
//   }
// }

// const Wrapper = styled.main`
//   padding: 20px;
// `;

// const Title = styled.h1`
//   font-family: 'Georgia', sans-serif;
//   font-weight: 700;
//   font-size: 20px;
//   line-height: 1.8;
//   letter-spacing: 0.02em;

//   color: white;
// `;

// const Text = styled.h2`
//   font-family: 'Georgia', sans-serif;
//   font-weight: 700;
//   font-size: 20px;
//   line-height: 1.8;
//   letter-spacing: 0.02em;

//   color: white;
// `;

// export default App;
