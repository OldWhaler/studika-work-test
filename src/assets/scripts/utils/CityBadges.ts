import { AreasData } from './AreasData';
import { CityList } from './CityList';

export class CityBadges {
  static getBadgesHTML(): string {
    if (CityList.selected.length === 0) return '';

    return `<ul class="cities-badges__list">
      ${CityList.selected
        .map((id) => {
          return `
        <li class="cities-badges__elem" id="${id}">
            <span class="cities-badges__elem-text">
            ${AreasData.areasData.find((locality) => locality.id == id)?.name}
            </span>
            <button class="cities-badges__elem-btn"></button>
        </li>`;
        })
        .join('')}
      </ul>`;
  }
}
