import { useState } from "react";
import ClickAwayListener from "react-click-away-listener";

export default function GarageButton(props: any) {
  const [show, setShow] = useState<boolean>(false);

  const addUnit = (cgIndex?: number) => {
    props.click(cgIndex, props.unit);
    setShow(false);
  };

  return (
    <div>
      <button
        className={show ? "add-button highlight" : "add-button"}
        onClick={() => setShow(true)}
      >
        {props.children}
      </button>
      {show && (
        <ClickAwayListener onClickAway={() => setShow(false)}>
          <div className="popup">
            {props.squads.map(({ name }: { name: string }, index: number) => (
              <button
                key={index}
                className="squad-button"
                onClick={() => addUnit(index)}
              >
                Add to {name}
              </button>
            ))}
            <button className="squad-button" onClick={() => addUnit()}>
              New combat group
            </button>
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
}
