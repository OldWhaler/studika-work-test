import { Definitions } from './Definitions';
import { AreasData } from './utils/AreasData';
import { CityBadges } from './utils/CityBadges';
import { CityList } from './utils/CityList';
import { changeBadgesAndPopupULVisualisation } from './utils/functions';

export class Handlers {
  static cityElementClickHandler = async function cityElementClickHandler(this: HTMLDivElement, event: Event) {
    event.stopPropagation();

    const cookieData = document.cookie.split(';').find((elem) => elem.match(/^selectedAreasIDList/));
    if (cookieData) {
      CityList.selected = JSON.parse(cookieData.split('=')[1]);
      CityList.prevSelected = [...CityList.selected];
    }

    Definitions.citiesPopup.classList.remove('hidden');
    document.body.addEventListener('click', CityList.hide);

    if (!AreasData.isDownload) {
      Definitions.preloader.classList.remove('hidden');
      await AreasData.getAreasData('https://studika.ru/api/areas');
      Definitions.preloader.classList.add('hidden');

      Definitions.citiesPopupUL.innerHTML = CityList.getSortedCitiesListHTML();
      Definitions.citiesBadges.innerHTML = CityBadges.getBadgesHTML();
      Definitions.citiesPopupInput.focus();
    }
  };

  static citiesPopupInputHandler = function (this: HTMLInputElement, event: Event): void {
    const value = (event.target as HTMLInputElement).value;

    if (value.length === 0) {
      Definitions.citiesPopupInputLabel.classList.add('hidden');
    } else {
      Definitions.citiesPopupInputLabel.classList.remove('hidden');
    }

    Definitions.citiesPopupUL.innerHTML = CityList.getSortedCitiesListHTML();
  };

  static citiesPopupInputLabelHandler(): void {
    Definitions.citiesPopupInput.value = '';
    Definitions.citiesPopupUL.innerHTML = CityList.getSortedCitiesListHTML();
    Definitions.citiesPopupInputLabel.classList.add('hidden');
  }

  static citiesPopupULHandler(this: HTMLUListElement, event: Event): void {
    const target = event.target as HTMLElement;

    const li = target.closest('.cities-popup__elem');
    if (li) {
      changeBadgesAndPopupULVisualisation(li.id);
    }
  }

  static citiesPopupButtonHandler() {
    CityList.prevSelected = [...CityList.selected];
    Definitions.citiesPopupButton.classList.remove('cities-popup__btn_colored');

    document.cookie = `selectedAreasIDList=${JSON.stringify(CityList.selected)}`;

    fetch('./', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(CityList.prevSelected),
    });
  }

  static citiesBadgesClickHandler(this: HTMLDivElement, event: Event) {
    const target = event.target as HTMLElement;
    const button = target.closest('.cities-badges__elem-btn');

    if (button) {
      const li = target.closest('.cities-badges__elem') as HTMLLIElement;
      changeBadgesAndPopupULVisualisation(li.id);
    }
  }
}
