import { Definitions } from '../Definitions';
import { AreasData } from './AreasData';

export class CityList {
  static selected: Array<string | number> = [];
  static prevSelected: Array<string | number> = [];

  static toggleSelected(id: string | number) {
    if (CityList.selected.includes(id)) {
      CityList.selected = CityList.selected.filter((item) => item != id);
    } else {
      CityList.selected.push(id);
    }
  }

  static hide(event: MouseEvent) {
    event.stopPropagation();
    const target = event.target as HTMLElement;

    if (target.tagName === 'BODY') {
      Definitions.citiesPopup.classList.add('hidden');
      document.body.removeEventListener('click', CityList.hide);
    }
  }

  static getCitiesListHTML(): string {
    const result = AreasData.areasData.map((locality) => {
      return `<li
          class="cities-popup__elem ${CityList.selected.includes(locality.id) ? 'selected' : ''}"
          id="${locality.id}">
            <p>${locality.name}</p>
            ${locality.area ? `<p class="cities-popup__elem-subtext">${locality.area}</p>` : ''}
         </li>`;
    });
    return result.join(' ');
  }

  static getSortedCitiesListHTML() {
    const word = Definitions.citiesPopupInput.value.trim();
    if (word.length === 0) return CityList.getCitiesListHTML();

    const regexp = new RegExp(`${word}`, 'gi');
    const result: string[] = [];

    AreasData.areasData.forEach((locality) => {
      if (locality.name.match(regexp)) {
        result.push(
          `<li
             class="cities-popup__elem ${CityList.selected.includes(locality.id) ? 'selected' : ''}"
             id="${locality.id}">
              ${CityList.modifyName(locality.name, regexp)}
              ${locality.area ? `<p class="cities-popup__elem-subtext">${locality.area}</p>` : ''}
            </li>`
        );
      }
    });
    return result.length === 0 ? `<li class="cities-popup__elem_dummy">Ничего не найдено</li>` : result.join(' ');
  }

  static modifyName(name: string, regexp: RegExp) {
    return name.replace(regexp, (match, offset) => {
      if (offset === 0) {
        return `<span class="text-colored">${match[0].toUpperCase() + match.slice(1)}</span>`;
      }
      return `<span class="text-colored">${match}</span>`;
    });
  }
}
