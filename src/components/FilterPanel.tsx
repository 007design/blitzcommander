import { useState, ChangeEvent } from "react";
import "../types";

import FilterTag from "./FilterTag";

export default function FilterPanel({
  labels,
  garage,
  sorting,
  filters,
  updateFilters,
  clearSorting
}: {
  labels: Labels;
  garage: Array<Unit>;
  sorting: Sort;
  filters: Array<Filter>;
  updateFilters: Function;
  clearSorting: Function;
}) {
  let [newFilter, setNewFilter] = useState<Filter>({
    key: "",
    label: "",
    value: "",
    join: ""
  });

  const deleteTag = (index: number) => {
    const newFilters = filters.map((filter) => filter);
    newFilters.splice(index, 1);
    updateFilters(newFilters);
  };

  let sortTag;
  if (sorting) {
    if (sorting.key)
      sortTag = (
        <div className="tag">
          Sort: {sorting.key}, {sorting.direction}
          <button className="delete-tag" onClick={() => clearSorting()} />
        </div>
      );
  }

  let filterTags;
  if (filters) {
    filterTags = filters.map((filter, index) => (
      <FilterTag
        key={index}
        filter={filter}
        deleteTag={() => deleteTag(index)}
      />
    ));
  }

  const options = () => {
    let list: Array<any> = [];

    if (garage.length && newFilter.key) {
      garage.forEach((unit: Unit) => {
        const value = unit[newFilter.key];
        if (value && list.indexOf(value) < 0) {
          if (
            !filters.find(
              ({ value: val }) => value.toString() === val.toString()
            )
          )
            list.push(value);
        }
      });
    }

    return list.sort();
  };

  const updateFilterKey = (event: ChangeEvent<HTMLSelectElement>) => {
    setNewFilter({
      ...newFilter,
      key: event.currentTarget.value
    });
  };

  const updateFilterValue = (event: ChangeEvent<HTMLSelectElement>) => {
    setNewFilter({
      ...newFilter,
      value: event.currentTarget.value
    });
  };

  const addFilter = (join: string = "and") => {
    updateFilters([
      ...filters,
      {
        ...newFilter,
        label: labels[newFilter.key],
        join
      }
    ]);
    setNewFilter({
      ...newFilter,
      value: ""
    });
  };

  const keyInput = (
    <select
      name="new_filter_key"
      id="new_filter_key"
      onChange={updateFilterKey}
    >
      <option value="">Filter by</option>
      <option value="faction">Faction</option>
      <option value="tv">TV</option>
      <option value="chassis">Chassis</option>
      <option value="name">Name</option>
      <option value="ua">Roles</option>
      <option value="mr">Movement</option>
      <option value="ar">Armor</option>
      <option value="type">Type</option>
    </select>
  );

  const valueInput = (
    <select
      name="new_filter_value"
      id="new_filter_value"
      value={newFilter.value}
      onChange={updateFilterValue}
    >
      <option value="">Select value</option>
      {newFilter.key
        ? options().map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))
        : ""}
    </select>
  );

  const tags = (
    <div className="filter-tags">
      {sortTag}
      {filterTags}
    </div>
  );

  return (
    <aside id="filter_controls">
      {tags}
      <div className="new-filter">
        {keyInput}
        {valueInput}
        <button className="add-button" onClick={() => addFilter()} />
        {/* <button className="or-button" onClick={() => addFilter('or')} /> */}
      </div>
    </aside>
  );
}
