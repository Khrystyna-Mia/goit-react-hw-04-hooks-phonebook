import PropTypes from 'prop-types';
import { Label, Input } from './ContactFilter.styled';
import { nanoid } from 'nanoid';

const ContactFilter = ({ value, onChange }) => {
  const filterId = nanoid();

  return (
    <>
      <Label htmlFor={filterId}>Find contacts by name</Label>

      <Input
        id={filterId}
        type="text"
        name="filter"
        value={value}
        onChange={onChange}
      />
    </>
  );
};

ContactFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ContactFilter;
