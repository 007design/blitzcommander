import ModalSave from "./ModalSave";
import ModalTraits from "./ModalTraits";
import ModalObjectives from "./ModalObjectives";
import ModalAbout from "./ModalAbout";
import { useState } from "react";

export default function Menu(props: any) {
  const [show, setShow] = useState(false);
  const menuCLick = (target:string) => {
    switch(target) {
      case 'save': props.openModal((<ModalSave/>)); break;
      case 'traits': props.openModal((<ModalTraits tooltips={props.tooltips}/>)); break;
      case 'objectives': props.openModal((<ModalObjectives army={props.army}/>)); break;
      case 'about': props.openModal((<ModalAbout/>)); break;
      default: break;
    }

    setShow(false);
  }

  return (
    <nav id="menu">
      <button id="menu_button" className={show ? 'show' : ''} onClick={() => setShow(!show)}>
        <span className="bars"></span>
      </button>   
      {
        show && (
          <ul id="menu_list">
            <li className="menu-option">
              <button onClick={() => menuCLick('save')}>Save</button>
            </li>
            <li className="menu-option">
              <button onClick={() => menuCLick('traits')}>Traits</button>
            </li>
            <li className="menu-option">
              <button onClick={() => menuCLick('objectives')}>Objectives</button>
            </li>
            <li className="menu-option">
              <button onClick={() => menuCLick('about')}>About</button>
            </li>
          </ul>)
        }
    </nav>
  );
}