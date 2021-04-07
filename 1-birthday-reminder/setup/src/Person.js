import React from "react";
import getNextBirthDay from "./getNextBirthDay";

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

const getDaysTo = (date) => {
  let today = new Date();
  return Math.floor((date.getTime() - today.getTime()) / (1000 * 3600 * 24));
};

const Person = (props) => {
  const person = props.person
  const wikiInfo = props.wikiInfo
  const { id, name, twitter, birthday, image, info } = person;


  let age = getAge(birthday);
  let birthDate = new Date(birthday);
  let daysToNextBD = getDaysTo(getNextBirthDay(person));

  let birthdayString =
    birthDate.getDate() +
    "." +
    (birthDate.getMonth() + 1) +
    "." +
    birthDate.getUTCFullYear();

  if (daysToNextBD === 0) {
    let firstName = name.split(" ")[0];
    let link = "https://twitter.com/intent/tweet?screen_name=" + twitter;
    let text = "Happy birthday " + firstName + "!";

    return (
      <article key={id} className="todayPerson">
        <img src={image} alt={name} />
        <div>
          <h3>{name}</h3>
          <h4>{age} years old today</h4>
          <h4>{birthdayString}</h4>
          <p>{wikiInfo ? wikiInfo : info}</p>
          <a
            className="twitter-mention-button"
            href={link}
            data-size="large"
            data-text={text}
          >
            Wish {firstName} a happy birthday!
          </a>
        </div>
      </article>
    );
  }
  return (
    <article key={id} className="person">
      <img src={image} alt={name} />
      <div>
        <h4>{name}</h4>
        <p>
          {age + 1} years in {daysToNextBD}{" "}
          {daysToNextBD === 1 ? "day" : "days"}
        </p>
        <p>{birthdayString}</p>
      </div>
    </article>
  );
};

export default Person;
