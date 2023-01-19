import { cloneElement } from "react";

export default function ArmyList(props: any) {
  const units: Array<Unit> = props.units || [];

  const rows = units.map((unit:Unit, index) => {
    const row = { ...unit }
    if (Array.isArray(row.options))
      row.options.forEach((option) => {
        Object.keys(option).forEach((key) => {
          if (key === 'name') return;
          if (Array.isArray(row[key]))
            row[key] = [ ...row[key] as Array<string>, ...option[key] as Array<string>]
          else if (option[key])
            row[key] = [row[key], `[${option[key]}]`].join(' ')
        });
      });

    return (
      <div className="unit-row">
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
            <div className="td">{row.ua.join(', ')}</div>
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
            <div className="td collapsed">{row.rweapons.join(', ')}</div>
            <div className="td expanded">
              <table>
                <tbody>
                  {
                    row.rweapons.map((weapon:string, i:number) => {
                      const parsed = /^(?<name>.+) (?<range>\d.*\/.+) Dmg:(?<damage>\d+) (?<traits>.*)(?<mode>[A-Z])$/.exec(props.tooltips[weapon])
                      return (
                        <tr className="weapon-row" key={i}>
                          {<td className="weapon-name">
                            {`${parsed?.groups?.name}`}
                          </td>}
                          {<td className="weapon-range">
                            {`${parsed?.groups?.range}`}
                          </td>}
                          {<td className="weapon-damage">
                            {`${parsed?.groups?.damage}`}
                          </td>}
                          {<td className="weapon-traits">
                          { `${parsed?.groups?.traits}`}
                          </td>}
                          {<td className="weapon-mode">
                            {`${parsed?.groups?.mode}`}
                          </td>}
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
          <div className="stat-pair mweapons">
            <div className="th">Mounted Weapons</div>
            <div className="td collapsed">{row.mweapons.join(', ')}</div>
            <div className="td expanded">
              <table>
                <tbody>
                  {
                    row.mweapons.map((weapon:string, i:number) => {
                      const parsed = /^(?<name>.+) (?<range>\d.*\/.+) Dmg:(?<damage>\d+) (?<traits>.*)(?<mode>[A-Z])$/.exec(props.tooltips[weapon])
                      return (
                        <tr className="weapon-row" key={i}>
                          {<td className="weapon-name">
                            {`${parsed?.groups?.name}`}
                          </td>}
                          {<td className="weapon-range">
                            {`${parsed?.groups?.range}`}
                          </td>}
                          {<td className="weapon-damage">
                            {`${parsed?.groups?.damage}`}
                          </td>}
                          {<td className="weapon-traits">
                          { `${parsed?.groups?.traits}`}
                          </td>}
                          {<td className="weapon-mode">
                            {`${parsed?.groups?.mode}`}
                          </td>}
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
          <div className="stat-pair traits">
            <div className="th">Traits</div>
            <div className="td">{row.traits.join(', ')}</div>
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
        { row.options.length ? 
          <div className="unit-options">
            {
              row.options.map((unit:Unit, i:number) => (
                <div key={i}>{unit.name}</div>
              ))
            }
          </div>
          : ''
        }
      </div>
    )
  });

  return (
    <div className="unit-scroll">
      <div className="cg-list">{rows}</div>
    </div>
  );
}
