import ListItemValue from './list-item-value';

export default function performSelectionMultiple(
  value,
  name,
  selectedValues,
  foundItems,
) {
  let newSelectedItems;

  if (selectedValues.some(sv => sv.value === value)) {
    newSelectedItems = selectedValues.filter(sv => sv.value !== value);
  } else {
    newSelectedItems = selectedValues.concat(new ListItemValue(name, value, true));
  }

  const newFoundItems = foundItems.map(fi => (
    fi.value === value
      ? new ListItemValue(fi.name, fi.value, !fi.checked)
      : fi
  ));

  return {
    newSelectedItems,
    newFoundItems,
  };
}
