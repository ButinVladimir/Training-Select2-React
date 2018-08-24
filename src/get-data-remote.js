export default function getDataRemote(query) {
  return new Promise((resolve) => {
    fetch(`https://restcountries.eu/rest/v2/name/${query}`, { method: 'GET' })
      .then(rawData => rawData.json())
      .then((jsonData) => {
        if (!(jsonData instanceof Array)) {
          resolve([]);
        } else {
          resolve(jsonData.map(({ name, alpha3Code }) => ({
            name,
            value: alpha3Code,
          })));
        }
      })
      .catch((err) => {
        console.error(err);
        resolve([]);
      });
  });
}
