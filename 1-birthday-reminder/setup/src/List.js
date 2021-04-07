import React from "react";
import Person from "./Person"

const List = ({ people }) => {

  return (
    <>
      {people.map((person) => {
          return <Person person={person} key={person.id} />
        })}
    </>
  );
};

export default List;
