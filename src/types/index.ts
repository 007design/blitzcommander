interface Unit {
  [key: string]: number | string | boolean | undefined;
  faction: string;
  chassis: string;
  id: string;
  name: string;
  tv: number;
  ua: string;
  mr: string;
  ar: number;
  hs: string;
  a: number;
  gu: string;
  pi: string;
  ew: string;
  rweapons: string;
  mweapons: string;
  traits: string;
  type: string;
  height: string;
}

interface CombatGroup {
  name: string;
  units: Array<Unit>;
}

interface Army {
  name?: string;
  squads?: Array<CombatGroup>;
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