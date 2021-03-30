import React from "react";

const List = ({ people }) => {
  const getAge = (dateString) => {
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const getNextBirthDay = (person) => {
    let next = new Date(person.birthday);
    let year = next.getFullYear();
    let today = new Date();
    while (next < today) {
      year++;
      next.setFullYear(year);
    }
    return next;
  };

  const getDaysTo = (date) => {
    let today = new Date();

    return Math.ceil((date.getTime() - today.getTime()) / (1000 * 3600 * 24));
  };

  return (
    <>
      {people
        .sort((a, b) => getNextBirthDay(a) - getNextBirthDay(b))
        .map((person) => {
          let { id, name, age, image } = person;
          if (person.birthday !== undefined) {
            age = getAge(person.birthday);
          }
          let daysToNextBD = getDaysTo(getNextBirthDay(person));
          let birthdayString =
            getNextBirthDay(person).getDate() +
            "." +
            (getNextBirthDay(person).getMonth()+1) +
            "." +
            getNextBirthDay(person).getUTCFullYear();

          return (
            <article key={id} className="person">
              <img src={image} alt={name} />
              <div>
                <h4>{name}</h4>
                <p>
                  {age + 1} years in {daysToNextBD} days
                </p>
                <p>{birthdayString}</p>
              </div>
            </article>
          );
        })}
    </>
  );
};

export default List;
