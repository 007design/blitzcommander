import { ChangeEvent, useState } from "react";
import ArmyList from "./ArmyList";
import DeleteUnitButton from "./DeleteUnitButton";

export default function CombatGroup(props: any) {
  const [edit, setEdit] = useState(false);

  const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
    props.renameCg(props.index, event.currentTarget.value)
  } 

  const rolesClasses = {
    gp: props.units.map(({ ua }: {ua:Array<string>}) => ua)
      .every((unitRoles:Array<string>) => unitRoles.includes('GP') || unitRoles.includes('GP+')),
    sk: props.units.map(({ ua }: {ua:Array<string>}) => ua)
      .every((unitRoles:Array<string>) => unitRoles.includes('SK') || unitRoles.includes('SK+')),
    fs: props.units.map(({ ua }: {ua:Array<string>}) => ua)
      .every((unitRoles:Array<string>) => unitRoles.includes('FS') || unitRoles.includes('FS+')),
    rc: props.units.map(({ ua }: {ua:Array<string>}) => ua)
      .every((unitRoles:Array<string>) => unitRoles.includes('RC') || unitRoles.includes('RC+')),
    so: props.units.map(({ ua }: {ua:Array<string>}) => ua)
      .every((unitRoles:Array<string>) => unitRoles.includes('SO') || unitRoles.includes('SO+')),
  };

  return (
    <div className="combat-group">
      <div className="cg-header">
        <button
          className="delete-button"
          onClick={() => props.deleteCg(props.index)}
        />
        {
          edit ? 
            <input 
              autoFocus
              className="edit-name"
              value={props.name}
              onChange={handleChange}
              onBlur={() => setEdit(false)}
            /> : 
            <div
              className="cg-name"
              onClick={() => setEdit(true)}
            >
              {props.name}
              <span className="edit-pencil"/>
            </div>
        }
        <div className={`cg-roles ${Object.values(rolesClasses).every((bool:boolean) => !bool) ? 'invalid' : ''}`}>
          <span className={`role ${rolesClasses.gp ? '' : 'invalid'}`}>GP</span>
          <span className={`role ${rolesClasses.sk ? '' : 'invalid'}`}>SK</span>
          <span className={`role ${rolesClasses.fs ? '' : 'invalid'}`}>FS</span>
          <span className={`role ${rolesClasses.rc ? '' : 'invalid'}`}>RC</span>
          <span className={`role ${rolesClasses.so ? '' : 'invalid'}`}>SO</span>
        </div>
      </div>
      <ArmyList
        units={props.units}
        tooltips={props.tooltips}        
        openTooltip={props.openTooltip}
        closeTooltip={props.closeTooltip}
      >
        <DeleteUnitButton cgIndex={props.index} deleteUnit={props.deleteUnit} />
      </ArmyList>
    </div>
  );
}
