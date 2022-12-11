interface City {
  name: string;
  id: number;
  state_id: number;
  class: string;
}

interface Area {
  name: string;
  id: number | string;
  type: string;
  class: string;
  cities: City[];
}

interface AdaptedArea {
  name: string;
  id: number | string;
  area?: string;
}

export { Area, City, AdaptedArea };
