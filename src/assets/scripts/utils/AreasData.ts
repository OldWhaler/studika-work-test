import { AdaptedArea, Area } from '../Types';

export class AreasData {
  static isDownload = false;
  static areasData: AdaptedArea[] = [];

  static getAreasData = async (link: string) => {
    if (AreasData.isDownload) return AreasData.areasData;

    const response = await fetch(link, { method: 'POST' });
    if (response.status) {
      AreasData.isDownload = true;
      const data: Area[] = await response.json();
      AreasData.areasData = AreasData.adapter(data);
    }
  };

  static adapter = (arr: Area[]) => {
    return arr.reduce((acc: AdaptedArea[], curr) => {
      const res: AdaptedArea[] = [];
      res.push({ name: curr.name, id: String(curr.id) });

      if (curr.cities && curr.cities.length !== 0) {
        curr.cities.forEach((city) => {
          res.push({ name: city.name, id: String(city.id), area: curr.name });
        });
      }
      acc.push(...res);
      return acc;
    }, []);
  };
}
