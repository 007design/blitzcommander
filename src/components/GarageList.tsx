import { cloneElement } from "react";

export default function UnitList(props: any) {
  const units: Array<Unit> = props.units || [];
  const filters: Array<Filter> = props.filters || [];
  const sorting: Sort = props.sorting;
  const filteredAndSorted = units.filter((unit: Unit) => {
    if (filters.length === 0) return true;

    let ok = false;
    filters.forEach((filter) => {
      if (filter.value.toString() === unit[filter.key]?.toString()) ok = true;
    });
    return ok;
  });

  filteredAndSorted.sort((a: Unit, b: Unit) => {
    const key = sorting?.key || "name";
    const sortKeyA = a[key] ?? 0;
    const sortKeyB = b[key] ?? 0;

    if (sorting?.direction === "desc") {
      if (sortKeyA > sortKeyB) return -1;
      else if (sortKeyA < sortKeyB) return 1;
      return 0;
    }

    if (sortKeyA > sortKeyB) return 1;
    else if (sortKeyA < sortKeyB) return -1;
    return 0;
  });

  const rows = filteredAndSorted.map((row, index) => (
    <tr key={row.id}>
      <td className="unit-name">{row.name}</td>
      <td>{row.tv}</td>
      <td>{row.ua}</td>
      <td>{row.mr}</td>
      <td>{row.ar}</td>
      <td>{row.hs}</td>
      <td>{row.a}</td>
      <td>{row.gu}</td>
      <td>{row.pi}</td>
      <td>{row.ew}</td>
      <td>{row.rweapons}</td>
      <td>{row.mweapons}</td>
      <td>{row.traits}</td>
      <td>{row.type}</td>
      <td>{row.height}</td>
      <td></td>
      <td className="unit-controls">
        {cloneElement(props.children, { unit: row, addUnit: props.addUnit })}
      </td>
    </tr>
  ));

  return (
    <table className="unit-list">
      <thead>
        <tr>
          <th className="unit-name" onClick={(e) => props.sort("name")}>
            Unit name
          </th>
          <th onClick={(e) => props.sort("tv")}>TV</th>
          <th onClick={(e) => props.sort("ua")}>Roles</th>
          <th onClick={(e) => props.sort("mr")}>Move</th>
          <th onClick={(e) => props.sort("ar")}>Armor</th>
          <th onClick={(e) => props.sort("hs")}>Dmg</th>
          <th onClick={(e) => props.sort("a")}>Act</th>
          <th onClick={(e) => props.sort("gu")}>GU</th>
          <th onClick={(e) => props.sort("pi")}>PI</th>
          <th onClick={(e) => props.sort("ew")}>EW</th>
          <th onClick={(e) => props.sort("rweapons")}>React Weapons</th>
          <th onClick={(e) => props.sort("mweapons")}>Mounted Weapons</th>
          <th onClick={(e) => props.sort("traits")}>Traits</th>
          <th onClick={(e) => props.sort("type")}>Type</th>
          <th onClick={(e) => props.sort("height")}>Height</th>
          <th>Etc</th>
          <th className="unit-controls" />
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
