import React from "react";
import data from "./data";
import List from "./List";
import Person from "./Person";
import getNextBirthDay from "./getNextBirthDay";

/*
https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
*/
const wikipediaAPICall =
  "https://murmuring-springs-88575.herokuapp.com/https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts|pageimages|pageprops&exintro=1&explaintext=1&pithumbsize=200&titles=";

function App() {
  const [wikiInfo, setWikiInfo] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const tempPeople = data;
  const sortedPeople = tempPeople.sort(
    (a, b) => getNextBirthDay(a) - getNextBirthDay(b)
  );
  const people = sortedPeople.slice(1);
  const birthdayPerson = sortedPeople[0];
  /*

Tämän avulla pystyy hakemaan syntymäpäivän ja toimii hyvin, mutta koska myös järjestän syntymäpäivän perusteella tarvitsen sen tiedon valmiiks jollen halua hakea kaikkia 365 ihmistä wikipedian APIn kautta, mikä olisi ehkä vähän turhan ilkeetä ja sen lisäksi pitäisi wikidatasta hakea kaikki eli kaksi hakua kertaa 365 joka kerta kun joku tulee sivulle eli no thanks. 

Tätä voi käyttää sit jos haluan hakea randomilla wikipedian on this day APIsta jonkun henkilön ja sen tiedot pitää saada. Näin toimisi aika kivasti. 

const wikidataAPICall =
  "https://murmuring-springs-88575.herokuapp.com/https://www.wikidata.org/w/api.php?action=wbgetclaims&property=P569&format=json&entity=";

  //Lisää alapuolella oleva rivi fetchImageAndInfoon
  setWikiImage(info.query.pages[page].thumbnail.source);
  setWikidataID(info.query.pages[page].pageprops.wikibase_item);
  
  const [wikiImage, setWikiImage] = React.useState("");
  const [wikidataID, setWikidataID] = React.useState("");
  const [wikidataBirthday, setWikidataBirthday] = React.useState("");
  const fetchBirthday = async (id) => {
    try {
      const response = await fetch(wikidataAPICall + id);
      const data = await response.json();
      setWikidataBirthday(
        data.claims.P569[0].mainsnak.datavalue.value.time.slice(1, -1)
      );
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchBirthday(wikidataID);
  }, [wikidataID]);
*/
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
        {loading ? (
          "..."
        ) : (
          <Person person={birthdayPerson} wikiInfo={wikiInfo} />
        )}
      </section>
      <section className="container">
        <h3>Next Birthdays</h3>
        <List people={people} />
      </section>
    </main>
  );
}

export default App;
