import { cloneElement } from "react";

export default function GarageList(props: any) {
  let units: Array<Unit> = props.units || [];
  const filters: Array<Filter> = props.filters || [];
  const sorting: Sort = props.sorting;

  if (props.hideOptions) {
    units = units.filter(({faction}:{faction:string}) => faction !== 'Option');
  }

  const filteredAndSorted = units.filter((unit: Unit) => {
    if (filters.length === 0) return true;

    let ok = false;
    filters.forEach((filter) => {
      if (unit[filter.key] && Array.isArray(unit[filter.key])) {
        if ((unit[filter.key] as Array<string>).includes(filter.value)) ok = true;
      }
      else if (filter.value.toString() === unit[filter.key]?.toString()) ok = true;
    });
    return ok;
  });

  filteredAndSorted.sort((a: Unit, b: Unit) => {
    if (!props.groupVariants) return 0;

    if (a.chassis !== a.name && b.chassis === b.name) {
      return 1;
    } else if (a.chassis === a.name && b.chassis !== b.name) {
      return -1;
    } else if (a.upgradesTaken && !b.upgradesTaken) {
      return 1;
    } else if (!a.upgradesTaken && b.upgradesTaken) {
      return -1;
    }
    return 0;
  }).sort((a: Unit, b: Unit) => {
    if (a.chassis > b.chassis) {
      return 1;
    } else if (a.chassis < b.chassis) {
      return -1;
    }
    return 0;
  }).sort((a: Unit, b: Unit) => {
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

  const unitRows = filteredAndSorted.map((row, index) => (
    <tr key={row.id} className={
      `${row.upgradesTaken ? 'upgraded' : ''} ${row.chassis !== row.name && props.groupVariants ? 'variant' : ''}`
    }>
      <td className="unit-name">{row.name}</td>
      <td id={`garage_unit_${index}`}>
        {row.tv}
      </td>
      <td>{row.ua.join(', ')}</td>
      <td>{row.mr}</td>
      <td>{row.ar}</td>
      <td>{row.hs}</td>
      <td>{row.a}</td>
      <td>{row.gu}</td>
      <td>{row.pi}</td>
      <td>{row.ew}</td>
      <td>{row.rweapons.map((w, i) => (
        <span className="tooltip-target" key={i} onClick={
          (e) => props.openTooltip(
            e.currentTarget.getBoundingClientRect(), 
            props.tooltips[w]
          )
        }>
          {`${i > 0 ? ', ' : ''}${w}`}
        </span>
      ))}</td>
      <td>{row.mweapons.map((w, i) => (
        <span className="tooltip-target" key={i} onClick={
          (e) => props.openTooltip(
            e.currentTarget.getBoundingClientRect(), 
            props.tooltips[w]
          )
        }>
          {`${i > 0 ? ', ' : ''}${w}`}
        </span>
      ))}</td>
      <td>{row.traits.map((t, i) => (
        <span className="tooltip-target" key={i} onClick={
          (e) => props.openTooltip(
            e.currentTarget.getBoundingClientRect(), 
            props.tooltips[t]
          )
        }>
          {`${i > 0 ? ', ' : ''}${t}`}
        </span>
      ))}</td>
      <td>{row.type}</td>
      <td>{row.height}</td>
      <td className="unit-controls">
        {cloneElement(props.children, { unit: row })}
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
          <th onClick={(e) => props.sort("hs")}>H/S</th>
          <th onClick={(e) => props.sort("a")}>A</th>
          <th onClick={(e) => props.sort("gu")}>GU</th>
          <th onClick={(e) => props.sort("pi")}>PI</th>
          <th onClick={(e) => props.sort("ew")}>EW</th>
          <th onClick={(e) => props.sort("rweapons")}>React Weapons</th>
          <th onClick={(e) => props.sort("mweapons")}>Mounted Weapons</th>
          <th onClick={(e) => props.sort("traits")}>Traits</th>
          <th onClick={(e) => props.sort("type")}>Type</th>
          <th onClick={(e) => props.sort("height")}>Height</th>
          <th className="unit-controls" />
        </tr>
      </thead>
      <tbody>{unitRows}</tbody>
    </table>
  );
}
