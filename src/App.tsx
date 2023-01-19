import { useState, useEffect, ReactElement, FunctionComponentElement, DOMElement } from "react";
import axios from "axios";

import "./styles.scss";
import "./types";

import Modal from "./components/Modal";
import Tooltip from "./components/Tooltip";
import ArmyPanel from "./components/ArmyPanel";
import GaragePanel from "./components/GaragePanel";

export default function App() {
  const [view, setView] = useState('default')

  const [modalContent, setModalContent] = useState<FunctionComponentElement<ReactElement>>();
  const [showModal, setShowModal] = useState(false);

  const [tooltipElement, setTooltipElement] = useState<DOMRect>();
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState<string>();

  const [tooltips, setTooltips] = useState({});
  const [labels, setLabels] = useState({});

  const [garage, setGarage] = useState<Array<Unit>>([]);
  const [army, setArmy] = useState<Army>({
    name: 'My Army',
    squads: [],
  });

  const queryParams = new URLSearchParams(window.location.search)
  let qsArmy:Army;

  const loadArmyFromQs = () => {
    try {
      const qs = JSON.parse(queryParams.get("a") || '');

      if (qs) {
        qsArmy = {
          name: qs.name,
          squads: qs.squads.map(({name, units}: {name:string, units:Array<any>}) => ({
            name,
            units: units.map((qsUnit) => {
              const foundUnit = garage.find(({ id }:{id:string}) => {
                return id === qsUnit.id
              })

              const foundOptions = garage.filter(({ id }) => qsUnit.opts.includes(id))

              return {
                ...foundUnit,
                options: foundOptions,
              };
            })
          }))
        };

        setArmy(qsArmy);
      }
    } catch {
    }
  };

  const updateQs = () => {
    const squads = army.squads?.map(({ name, units }: {name:string, units:Array<Unit>}) => ({
      name,
      units: units.map(({ id, options }: {id:string, options:Array<Unit>}) => ({
        id,
        opts: options.map(({ id }:{id:string}) => id)
      }))
    }))

    const url = new URL(window.location.href);
    url.searchParams.set('a',  JSON.stringify({
      name: army.name,
      squads,
    }));
    window.history.pushState(null, '', url.toString());
  };

  const openModal = (content:FunctionComponentElement<ReactElement>) => {
    setModalContent(content);
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
  }

  const openTooltip = (element:DOMRect, content:string) => {
    setTooltipContent(content);
    setTooltipElement(element);
    setShowTooltip(true);
  }

  const closeTooltip = () => {
    setShowTooltip(false);
  }

  const renameArmy = (name:string) => {
    setArmy({
      ...army,
      name
    })
    updateQs();
  };

  const addSquad = () => {
    const squads = army?.squads || [];
    squads.push({
      name: `Combat group ${squads.length + 1}`,
      units: []
    });

    setArmy({
      ...army,
      squads
    });
    updateQs();
  };

  const renameSquad = (cgIndex: number, name:string) => {
    const squads = army?.squads || [];
    squads[cgIndex] = {
      ...squads[cgIndex],
      name
    }
    setArmy({
      ...army,
      squads
    });
    updateQs();
  };

  const deleteSquad = (index: number) => {
    const squads = army?.squads || [];

    squads.splice(index, 1);

    setArmy({
      ...army,
      squads
    });
    updateQs();
  };

  const addOption = (cgIndex: number, unitIndex: number, unit: Unit) => {
    const squads = army?.squads;

    if (squads && squads[cgIndex]) {
      squads[cgIndex].units[unitIndex].options.push(unit);
    }

    setArmy({
      name: army?.name || "My Army",
      squads
    });
    updateQs();
  };

  const addUnit = (cgIndex: number = -1, unit: Unit) => {
    let targetIndex = cgIndex > -1 ? cgIndex : army?.squads?.length || 0;
    if (cgIndex === -1) {
      addSquad();
    }
    const squads = army?.squads;

    if (squads && squads[targetIndex]) squads[targetIndex].units.push(unit);

    setArmy({
      name: army?.name || "My Army",
      squads
    });
    updateQs();
  };

  const deleteUnit = (cgIndex: number, unitIndex: number) => {
    const squads = army.squads || [];
    squads[cgIndex].units.splice(unitIndex, 1);

    setArmy({
      ...army,
      squads
    });
    updateQs();
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("./data.json");

        setLabels(response.data.labels);
        setTooltips(response.data.tooltips);
        setGarage(response.data.statlines);
      } catch (x) {
        console.log(x);
      }
    })();
  }, []);

  useEffect(() => {
    if (garage.length > 0)
      loadArmyFromQs();
  }, [garage]);

  return (
    <div id="App">
      <header>
        <div id="logo">
          <img src="bc.gif" alt="Blitz Commander 2" />
        </div>
        <nav id="menu">Menu</nav>
      </header>
      <main className={view}>
        <button
          className="view-toggle"
          id="view_datacard"
          onClick={() => setView('datacard')}
        />
        <button
          className="view-toggle"
          id="view_army"
          onClick={() => setView('army')}
        />
        <button
          className="view-toggle"
          id="view_default"
          onClick={() => setView('default')}
        />
        <ArmyPanel
          army={army}
          tooltips={tooltips}
          deleteUnit={deleteUnit}
          deleteCg={deleteSquad}
          renameCg={renameSquad}
          addSquad={addSquad}
          renameArmy={renameArmy}
        />
        <GaragePanel
          army={army}
          garage={garage}
          labels={labels}
          tooltips={tooltips}
          addUnit={addUnit}
          addOption={addOption}
          openModal={openModal}
          closeModal={closeModal}
          openTooltip={openTooltip}
          closeTooltip={closeTooltip}
        />
      </main>
      <footer>BlitzCommander 2.0</footer>
      <Modal showModal={showModal} hide={closeModal}>
        {modalContent}
      </Modal>
      <Tooltip show={showTooltip} hide={closeTooltip} el={tooltipElement}>
        {tooltipContent}
      </Tooltip>
    </div>
  );
}
