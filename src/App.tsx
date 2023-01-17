import { useState, useEffect } from "react";
import axios from "axios";

import "./styles.scss";
import "./types";

import ArmyPanel from "./components/ArmyPanel";
import GaragePanel from "./components/GaragePanel";
import AddSquadButton from "./components/AddSquadButton";
import FilterPanel from "./components/FilterPanel";

export default function App() {
  const [garage, setGarage] = useState<Array<Unit>>([]);
  const [tooltips, setTooltips] = useState({});
  const [labels, setLabels] = useState({});
  const [army, setArmy] = useState<Army>({});
  const [sorting, setSorting] = useState<Sort>({
    key: "chassis",
    direction: "asc"
  });
  const [filters, setFilters] = useState<Array<Filter>>([]);

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
  };

  const deleteSquad = (index: number) => {
    const squads = army?.squads || [];

    squads.splice(index, 1);

    setArmy({
      ...army,
      squads
    });
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
  };

  const deleteUnit = (cgIndex: number, unitIndex: number) => {
    const squads = army.squads || [];
    squads[cgIndex].units.splice(unitIndex, 1);

    setArmy({
      ...army,
      squads
    });
  };

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

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("./garage.json");

        setLabels(response.data.labels);
        setTooltips(response.data.tooltips);
        setGarage(response.data.statlines);
        setArmy({
          name: "My Army",
          squads: [
            {
              name: "Combat Group",
              units: response.data.statlines.slice(0, 4)
            }
          ]
        });
      } catch (x) {
        console.log(x);
      }
    })();
  }, []);

  return (
    <div id="App">
      <header>
        <div id="logo">
          <img src="bc.gif" alt="Blitz Commander 2" />
        </div>
        <nav id="menu">Menu</nav>
      </header>
      <main>
        <input
          className="view-toggle"
          type="radio"
          name="view"
          id="view_datacard"
          value="datacard"
        />
        <input
          className="view-toggle"
          type="radio"
          name="view"
          id="view_army"
          value="army"
        />
        <input
          className="view-toggle"
          type="radio"
          name="view"
          id="view_default"
          value="default"
          defaultChecked
        />
        <section id="left_panel">
          <div className="army-name">{army.name}</div>
          <ArmyPanel
            army={army}
            deleteUnit={deleteUnit}
            deleteCg={deleteSquad}
          />
          <AddSquadButton army={army} click={addSquad} />
        </section>
        <section id="right_panel">
          <FilterPanel
            labels={labels}
            sorting={sorting}
            filters={filters}
            garage={garage}
            updateFilters={updateFilters}
            clearSorting={clearSorting}
          />
          <div className="garage-list">
            <GaragePanel
              army={army}
              units={garage}
              click={addUnit}
              sorting={sorting}
              filters={filters}
              sort={setSortBy}
            />
          </div>
        </section>
      </main>
      <footer>BlitzCommander 2.0</footer>
    </div>
  );
}
