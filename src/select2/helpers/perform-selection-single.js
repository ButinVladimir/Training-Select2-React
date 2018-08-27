import ListItemValue from './list-item-value';

export default function performSelectionSingle(
  value,
  name,
  selectedValues,
  foundItems,
) {
  let newSelectedItems;
  let newFoundItems;

  if (selectedValues.some(sv => sv.value === value)) {
    newSelectedItems = [];
    newFoundItems = foundItems.map(fi => (
      fi.value === value
        ? new ListItemValue(fi.name, fi.value, false)
        : fi
    ));
  } else {
    newSelectedItems = [new ListItemValue(name, value, true)];
    newFoundItems = foundItems.map((fi) => {
      if (fi.value === value) {
        return new ListItemValue(fi.name, fi.value, true);
      }

      if (fi.checked) {
        return new ListItemValue(fi.name, fi.value, false);
      }

      return fi;
    });
  }

  return {
    newSelectedItems,
    newFoundItems,
  };
}
