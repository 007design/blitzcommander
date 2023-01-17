import { cloneElement } from "react";

export default function UnitList(props: any) {
  const units: Array<Unit> = props.units || [];

  const rows = units.map((row, index) => (
    <div className="unit-stats" key={row.id}>
      <div className="stat-pair controls">
        {cloneElement(props.children, { index })}
      </div>
      <div className="stat-pair name">
        <div className="th">Name</div>
        <div className="td">{row.name}</div>
      </div>
      <div className="stat-pair tv">
        <div className="th">TV</div>
        <div className="td">{row.tv}</div>
      </div>
      <div className="stat-pair ua">
        <div className="th">Roles</div>
        <div className="td">{row.ua}</div>
      </div>
      <div className="stat-pair mr">
        <div className="th">Move</div>
        <div className="td">{row.mr}</div>
      </div>
      <div className="stat-pair ar">
        <div className="th">Armor</div>
        <div className="td">{row.ar}</div>
      </div>
      <div className="stat-pair hs">
        <div className="th">Dmg</div>
        <div className="td">{row.hs}</div>
      </div>
      <div className="stat-pair a">
        <div className="th">Act</div>
        <div className="td">{row.a}</div>
      </div>
      <div className="stat-pair gu">
        <div className="th">GU</div>
        <div className="td">{row.gu}</div>
      </div>
      <div className="stat-pair pi">
        <div className="th">PI</div>
        <div className="td">{row.pi}</div>
      </div>
      <div className="stat-pair ew">
        <div className="th">EW</div>
        <div className="td">{row.ew}</div>
      </div>
      <div className="stat-pair rweapons">
        <div className="th">React Weapons</div>
        <div className="td">{row.rweapons}</div>
      </div>
      <div className="stat-pair mweapons">
        <div className="th">Mounted Weapons</div>
        <div className="td">{row.mweapons}</div>
      </div>
      <div className="stat-pair traits">
        <div className="th">Traits</div>
        <div className="td">{row.traits}</div>
      </div>
      <div className="stat-pair type">
        <div className="th">Type</div>
        <div className="td">{row.type}</div>
      </div>
      <div className="stat-pair height">
        <div className="th">Height</div>
        <div className="td">{row.height}</div>
      </div>
      <div className="stat-pair etc">
        <div className="th">Notes</div>
        <div className="td"></div>
      </div>
    </div>
  ));

  return (
    <div className="unit-scroll">
      <div className="unit-list">{rows}</div>
    </div>
  );
}
