import { useState } from "react";

export default function DamageTracker(props: any) {
  const [damageH, setDamageH] = useState(0)
  const [damageS, setDamageS] = useState(0)
  const [h, s] = props.hs.split('/').map((val:string) => parseInt(val));

  const hit = () => {
    if (damageH < h) {
      setDamageH(damageH + 1);
    } else if (damageS < s) {
      setDamageS(damageS + 1);
    } else {
      setDamageH(0);
      setDamageS(0);
    }
  };

  let hBoxes = [],
      sBoxes = [];
  for (let a=0; a<h; a++) {
    hBoxes.push(a)
  }
  for (let a=0; a<s; a++) {
    sBoxes.push(a)
  }

  return (
    <div className="damage-tracker">
      <button className="hit-button" onClick={hit} />
      <div className="boxes">
        <div className="h-boxes">H
          {
            hBoxes.map((box:number, index:number) => (
              <div className={`damage-box h${damageH > index ? ' checked' : ''}`} key={index} />
            ))
          }
        </div>
        <div className="s-boxes">S
          {
            sBoxes.map((box:number, index:number) => (
              <div className={`damage-box s${damageS > index ? ' checked' : ''}`} key={index} />
            ))
          }
        </div>
      </div>
    </div>
  );
}