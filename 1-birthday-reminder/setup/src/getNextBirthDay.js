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

export default getNextBirthDay;
