/*
    https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
    */
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
