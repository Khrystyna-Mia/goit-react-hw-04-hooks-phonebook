import PropTypes from 'prop-types';
import { List, Item } from './ContactList.styled';
import ContactElList from 'components/ContactElList';

const ContactList = ({ contacts, onDelete }) => {
  return (
    <List>
      {contacts.map(({ id, name, number }) => (
        <Item key={id}>
          <ContactElList
            name={name}
            number={number}
            onDelete={() => onDelete(id)}
          />
        </Item>
      ))}
    </List>
  );
};

ContactList.propTypes = {
  onDelete: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

export default ContactList;
