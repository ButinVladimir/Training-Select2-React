export default function sortFunc(a, b) {
  if (a.checked > b.checked) {
    return -1;
  }
  if (a.checked < b.checked) {
    return 1;
  }

  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }

  if (a.value < b.value) {
    return -1;
  }
  if (a.value > b.value) {
    return 1;
  }

  return 0;
}
