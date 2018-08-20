export default function defaultPrepareSelectedText(selectedValues, valueNameMap) {
  if (!valueNameMap || !(valueNameMap)) {
    throw new Error('Value map is empty');
  }

  if (!selectedValues || !(selectedValues instanceof Array) || selectedValues.length === 0) {
    return 'Click to select';
  }

  const values = selectedValues.map((value) => {
    if (!valueNameMap.has(value)) {
      throw new Error(`Value ${value} is not found`);
    }

    return valueNameMap[value];
  }).join(', ');

  return values;
}
