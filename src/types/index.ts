interface Unit {
  [key: string]: number | string | boolean | Array<string> | Array<Unit> | undefined;
  faction: string;
  chassis: string;
  id: string;
  name: string;
  tv: number;
  ua: Array<string>;
  mr: string;
  ar: number;
  hs: string;
  a: number;
  gu: string;
  pi: string;
  ew: string;
  rweapons: Array<string>;
  mweapons: Array<string>;
  traits: Array<string>;
  type: string;
  height: string;
  rules?: string;
  upgradesTaken?: string;
  options: Array<Unit>
}

interface CombatGroup {
  name: string;
  units: Array<Unit>;
}

interface Army {
  name?: string;
  squads?: Array<CombatGroup>;
}

interface QsCombatGroup {
  name?: string;
  units?: Array<string>
}

interface QsArmy {
  name?: string;
  squads?: Array<QsCombatGroup>;
}

interface Sort {
  key?: string;
  direction?: string;
}

interface Filter {
  key: string;
  label: string;
  value: string;
  join: string;
}

interface Labels {
  [key: string]: number | string | boolean | undefined;
}