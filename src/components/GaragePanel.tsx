import { useState } from "react";
import GarageList from "./GarageList";
import GarageButton from "./GarageButton";
import FilterPanel from "./FilterPanel";

export default function GaragePanel(props: any) {
  const [sorting, setSorting] = useState<Sort>({
    key: "chassis",
    direction: "asc"
  });
  const [filters, setFilters] = useState<Array<Filter>>([]);
  const [hideOptions, setHideOptions] = useState<boolean>(true);
  const [groupVariants, setGroupVariants] = useState<boolean>(true);

  const setSortBy = (key: string) => {
    const direction =
      sorting?.key === key
        ? sorting?.direction === "asc"
          ? "desc"
          : "asc"
        : "asc";
    setSorting({
      key,
      direction
    });
  };

  const clearSorting = () => {
    setSorting({
      key: "",
      direction: "asc"
    });
  };

  const updateFilters = (newFilters: Array<Filter>) => {
    setFilters(newFilters);
  };
  
  return (
    <div id="right_panel">
      <FilterPanel
        labels={props.labels}
        sorting={sorting}
        filters={filters}
        garage={props.garage}
        updateFilters={updateFilters}
        clearSorting={clearSorting}
        optionsToggle={(state:boolean) => setHideOptions(state)}
        variantsToggle={(state:boolean) => setGroupVariants(state)}
      />
      <div id="garage-list">
        <GarageList
          units={props.garage}
          tooltips={props.tooltips}
          hideOptions={hideOptions}
          groupVariants={groupVariants}
          sorting={sorting}
          filters={filters}
          sort={setSortBy}
          openTooltip={props.openTooltip}
          closeTooltip={props.closeTooltip}
        >
          <GarageButton
            squads={props.army.squads} 
            openModal={props.openModal} 
            closeModal={props.closeModal}
            addUnit={props.addUnit} 
            addOption={props.addOption}
          />
        </GarageList>
      </div>
    </div>
  );
}
