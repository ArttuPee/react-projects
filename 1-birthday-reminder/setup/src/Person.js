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
  const [readMore, setReadMore] = React.useState(false);
  const person = props.person;
  const wikiInfo = props.wikiInfo;

  const { id, name, twitter, birthday, image } = person;
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
    let twitterLink = "https://twitter.com/intent/tweet?screen_name=" + twitter;
    let text = "Happy birthday " + firstName + "!";

    return (
      <article key={id} className="todayPerson">
        <img src={image} alt={name} />
        <div className="todayPersonNameAge">
          <h3>{name}</h3>
          <h4>{age} years old today</h4>
          <h4>{birthdayString}</h4>
        </div>
        <p>
          {readMore ? wikiInfo : `${wikiInfo.substring(0, 500)}...`}
          <button onClick={() => setReadMore(!readMore)}>
            {readMore ? "show less" : "read more"}
          </button>
        </p>
        <div className="todayPersonFooter">
          {twitter && (
            <a
              className="twitter-mention-button"
              href={twitterLink}
              data-size="large"
              data-text={text}
            >
              Tweet @{twitter}
            </a>
          )}
          <a
            href={"https://en.wikipedia.org/wiki/" + name.replace(/ /g, "_")}
            className="btn wikiBtn"
          >
            <i className="fa fa-wikipedia-w" aria-hidden="true"></i> wikipedia
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
