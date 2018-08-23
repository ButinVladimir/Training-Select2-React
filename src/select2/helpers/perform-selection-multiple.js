import ListItemValue from './list-item-value';

export default function performSelectionMultiple(
  value,
  name,
  selectedValues,
  foundItems,
) {
  let newSelectedValues;

  if (selectedValues.some(sv => sv.value === value)) {
    newSelectedValues = selectedValues.filter(sv => sv.value !== value);
  } else {
    newSelectedValues = selectedValues.concat(new ListItemValue(name, value, true));
  }

  const newFoundItems = foundItems.map(fi => (
    fi.value === value
      ? new ListItemValue(fi.name, fi.value, !fi.checked)
      : fi
  ));

  return {
    newSelectedValues,
    newFoundItems,
  };
}
