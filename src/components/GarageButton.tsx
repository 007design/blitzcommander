import { cloneElement, useState } from "react";
import ClickAwayListener from "react-click-away-listener";

export default function GarageButton(props: any) {
  const addUnit = (cgIndex?: number) => {
    props.addUnit(cgIndex, props.unit);
    props.closeModal();
  };

  const addOption = (cgIndex?: number, unitIndex?: number) => {
    props.addOption(cgIndex, unitIndex, props.unit)
    props.closeModal();
  };
  
  const combatGroupAdd = (
    <div className="popup">
      <div className="popup-header">
        {props.unit.name} 
      </div>
      {props.squads?.map(({ name }: { name: string }, index: number) => (
        <button
          key={index}
          className="popup-squad-button"
          onClick={() => addUnit(index)}
        >
          Add to {name}
        </button>
      ))}
      <button className="popup-squad-button new-squad" onClick={() => addUnit()}>
        New combat group
      </button>
    </div>
  );

  const optionAdd = (
    <div className="popup">
      <div className="popup-header">
        {props.unit.name} 
      </div>
      {props.squads?.map(({ name, units }: { name: string, units: Array<Unit> }, cgIndex: number) => (
        <div className="popup-cg" key={cgIndex}>
          <div className="popup-cg-label">{name}</div>
          {
            units.map(({ name: unitName }: { name: string }, unitIndex: number) => (
              <button
                key={unitIndex}
                className="popup-squad-button"
                onClick={() => addOption(cgIndex, unitIndex)}
              >
                Add to {unitName}
              </button>
            ))
          }
        </div>
      ))}
    </div>
  );

  const show = () => {
    props.openModal(
      props.unit.faction === 'Option' ? optionAdd : combatGroupAdd
    );
  }

  return (
    <div>
      <button
        className="add-button"
        onClick={() => show()}
      />
    </div>
  );
}
