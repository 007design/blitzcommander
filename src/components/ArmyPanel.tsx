import ArmyList from "./ArmyList";
import DeleteUnitButton from "./DeleteUnitButton";

export default function ArmyPanel(props: any) {
  const groups: Array<CombatGroup> = props.army?.squads || [];
  const squads = groups.map((squad, index) => (
    <div className="combat-group" key={index}>
      <div className="cg-header">
        <button
          className="delete-button"
          onClick={() => props.deleteCg(index)}
        />
        {squad.name}
      </div>
      <ArmyList units={squad.units}>
        <DeleteUnitButton cgIndex={index} deleteUnit={props.deleteUnit} />
      </ArmyList>
    </div>
  ));
  return <div className="army-list">{squads}</div>;
}
