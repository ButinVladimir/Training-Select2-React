const data = new Map([
  [1, 'Alpha'],
  [2, 'Beta'],
  [3, 'Gamma'],
  [4, 'Delta'],
  [5, 'Option 5'],
  [6, 'Option 6'],
  [7, 'Option 7'],
  [11, 'Alpha 1'],
  [12, 'Beta 1'],
  [13, 'Gamma 1'],
  [14, 'Delta 1'],
  [15, 'Option 15'],
  [16, 'Option 16'],
  [17, 'Option 17'],
  [21, 'Alpha 2'],
  [22, 'Beta 2'],
  [23, 'Gamma 2'],
  [24, 'Delta 2'],
  [25, 'Option 25'],
  [26, 'Option 26'],
  [27, 'Option 27'],
]);

export default function getDataLocal(query) {
  const upperQuery = query.toUpperCase();

  return new Promise((resolve) => {
    const result = [];

    data.forEach((name, value) => {
      if (name.toUpperCase().indexOf(upperQuery) > -1) {
        result.push({ value, name });
      }
    });

    resolve(result);
  });
}
