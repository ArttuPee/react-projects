import React from "react";
import data from "./data";
import List from "./List";
import Person from "./Person";
import getNextBirthDay from "./getNextBirthDay";

/*
https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
*/
const wikipediaAPICall =
  "https://murmuring-springs-88575.herokuapp.com/https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=1&explaintext=1&titles=";

function App() {
  const tempPeople = data;
  const sortedPeople = tempPeople.sort(
    (a, b) => getNextBirthDay(a) - getNextBirthDay(b)
  );
  const people = sortedPeople.slice(1);
  const birthdayPerson = sortedPeople[0];

  const [wikiInfo, setWikiInfo] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  const fetchInfo = async (name) => {
    setLoading(true);
    try {
      const response = await fetch(wikipediaAPICall + name.replace(/ /g, "_"));
      const info = await response.json();
      for (let page in info.query.pages) {
        if (info.query.pages.hasOwnProperty(page)) {
          setWikiInfo(info.query.pages[page].extract);
          setLoading(false);
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  React.useEffect(() => {
    fetchInfo(birthdayPerson.name);
  }, [birthdayPerson.name]);

  return (
    <main>
      <section className="todayContainer">
        <h2>Happy Birthday to </h2>
        {loading ? "..." :<Person person={birthdayPerson} wikiInfo={wikiInfo} />}
      </section>
      <section className="container">
        <h3>Next Birthdays</h3>
        <List people={people} />
      </section>
    </main>
  );
}

export default App;
