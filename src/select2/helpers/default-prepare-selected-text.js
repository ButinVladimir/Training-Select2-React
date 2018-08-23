export default function defaultPrepareSelectedText(selectedValues) {
  if (!selectedValues || !(selectedValues instanceof Array) || selectedValues.length === 0) {
    return 'Click to select';
  }

  const values = selectedValues.map(sv => sv.name).sort().join(',');

  return values;
}
