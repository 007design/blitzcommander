import GarageList from "./GarageList";
import GarageButton from "./GarageButton";

export default function GaragePanel(props: any) {
  return (
    <GarageList
      units={props.units}
      sorting={props.sorting}
      filters={props.filters}
      sort={props.sort}
    >
      <GarageButton squads={props.army.squads} click={props.click} />
    </GarageList>
  );
}
