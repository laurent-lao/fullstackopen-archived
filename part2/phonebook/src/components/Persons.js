import React from 'react'

const Persons = ({ people }) => {
  return (
    <div>
      {people.map((person) => (
        <li key={person.name}>{person.name} {person.number}</li>
      ))}
    </div>
  );
};

export default Persons