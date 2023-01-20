import { ChangeEvent, useState } from "react";
import AddSquadButton from "./AddSquadButton";
import CombatGroup from "./CombatGroup";

export default function ArmyPanel(props: any) {
  const [edit, setEdit] = useState(false);

  const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
    props.renameArmy(event.currentTarget.value);
  } 

  const groups: Array<CombatGroup> = props.army?.squads || [];
  const squads = groups.map((squad, index) => (
    <CombatGroup
      key={index}
      index={index}
      tooltips={props.tooltips}
      name={squad.name}
      units={squad.units}
      deleteUnit={props.deleteUnit}
      deleteCg={props.deleteCg}
      renameCg={props.renameCg}
      openTooltip={props.openTooltip}
      closeTooltip={props.closeTooltip}
    />
  ));

  let totalTv = 0;
  groups.forEach((squad) => {
    squad.units.forEach((unit) => {
      totalTv += unit.tv

      unit.options.forEach((opt) => {
        totalTv += opt.tv
      })
    })
  })

  return (
    <section id="left_panel">
      {
          <div
            id="army_name"
            onClick={() => setEdit(true)}
          >
            {
              edit ? 
                <input 
                  autoFocus
                  className="edit-name"
                  value={props.army.name}
                  onChange={handleChange}
                  onBlur={() => setEdit(false)}
                /> : 
                <span>
                  {props.army.name}
                  <span className="edit-pencil"/> 
                </span>
            }
            <div id="total_tv">{totalTv}TV</div>
          </div>
      }
      <div className="army-list" onScroll={() => props.closeTooltip()}>{squads}</div>
      <AddSquadButton army={props.army} click={props.addSquad} />
    </section>
  );
}
