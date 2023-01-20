import { useState, useEffect, ChangeEvent } from "react";
import "../types";

import FilterTag from "./FilterTag";

export default function FilterPanel({
  labels,
  garage,
  sorting,
  filters,
  updateFilters,
  clearSorting,
  optionsToggle,
  variantsToggle
}: {
  labels: Labels;
  garage: Array<Unit>;
  sorting: Sort;
  filters: Array<Filter>;
  updateFilters: Function;
  clearSorting: Function;
  optionsToggle: Function;
  variantsToggle: Function;
}) {
  let [hideOptions, setHideOptions] = useState<boolean>(true);
  let [groupVariants, setGroupVariants] = useState<boolean>(true);
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
          Sort: {labels[sorting.key]}, {sorting.direction}
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

        if (Array.isArray(value)) {
          value.forEach((entry) => {
            if (entry && list.indexOf(entry) < 0) {
              if (
                !filters.find(
                  ({ value: val }) => entry.toString() === val.toString()
                )
              )
                list.push(entry);
            }
          })
        } else {
          if (value && list.indexOf(value) < 0) {
            if (
              !filters.find(
                ({ value: val }) => value.toString() === val.toString()
              )
            )
              list.push(value);
          }
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

  const filterByFaction = (faction:string) => {
    if (faction === 'Option') {
      setHideOptions(false);
    }

    updateFilters([
      ...filters.filter((f) => !(faction === 'Option' && f.key === 'faction')),
      {
        key: 'faction',
        label: 'Faction',
        value: faction
      }
    ]);
  }

  const toggleOptions = () => {
    setHideOptions(!hideOptions);
  };

  const toggleGrouping = () => {
    setGroupVariants(!groupVariants);
  };

  useEffect(() => {
    optionsToggle(hideOptions);
  }, [hideOptions]);

  useEffect(() => {
    variantsToggle(groupVariants);
  }, [groupVariants]);

  const keyInput = (
    <select
      name="new_filter_key"
      id="new_filter_key"
      onChange={updateFilterKey}
    >
      <option value="">Filter by</option>
      <option value="faction">Faction</option>
      <option value="ua">Role</option>
      <option value="tv">TV</option>
      <option value="chassis">Chassis</option>
      <option value="name">Name</option>
      <option value="traits">Traits</option>
      <option value="mweapons">Mounted Weapons</option>
      <option value="rweapons">React Weapons</option>
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
    <div id="filter_tags">
      {sortTag}
      {filterTags}
    </div>
  );

  return (
    <aside id="filter_panel">
      {tags}
      <div id="filter_controls">
        <div id="faction_filters">
          <button className="filter-button north" onClick={() => filterByFaction('North')} />
          <button className="filter-button south" onClick={() => filterByFaction('South')} />
          <button className="filter-button pr" onClick={() => filterByFaction('Peace River')} />
          <button className="filter-button nucoal" onClick={() => filterByFaction('NuCoal')} />
          <button className="filter-button bt" onClick={() => filterByFaction('Black Talon')} />
          <button className="filter-button cef" onClick={() => filterByFaction('CEF')} />
          <button className="filter-button caprice" onClick={() => filterByFaction('Caprice')} />
          <button className="filter-button utopia" onClick={() => filterByFaction('Utopia')} />
          <button className="filter-button eden" onClick={() => filterByFaction('Eden')} />
          <button className="filter-button universal" onClick={() => filterByFaction('Universal')} />
          <button className="filter-button options" onClick={() => filterByFaction('Option')} />
        </div>
        <div id="new_filter">
          {keyInput}
          {valueInput}
          <button className="add-button" onClick={() => addFilter()} disabled={!newFilter.key || !newFilter.value} />
          {/* <button className="or-button" onClick={() => addFilter('or')} /> */}
        </div>
        <div id="global_filters">
          <label>
            <input 
              type="checkbox" 
              name="hide_options" 
              id="hide_options" 
              checked={hideOptions}
              onChange={toggleOptions} />
              Hide Options
          </label>
          <label>
            <input 
              type="checkbox" 
              name="group_variants" 
              id="group_variants" 
              checked={groupVariants}
              onChange={toggleGrouping} />
              Group Variants
          </label>
        </div>
      </div>
    </aside>
  );
}
