import { Definitions } from '../Definitions';
import { CityBadges } from './CityBadges';
import { CityList } from './CityList';

export function changeBadgesAndPopupULVisualisation(id: string | number) {
  CityList.toggleSelected(id);

  Definitions.citiesBadges.innerHTML = CityBadges.getBadgesHTML();
  Definitions.citiesPopupUL.innerHTML = CityList.getSortedCitiesListHTML();

  const selectedStr = CityList.selected.sort().join(' ');
  const prevSelectedStr = CityList.prevSelected.sort().join(' ');

  if (selectedStr === prevSelectedStr) {
    Definitions.citiesPopupButton.classList.remove('cities-popup__btn_colored');
  } else {
    Definitions.citiesPopupButton.classList.add('cities-popup__btn_colored');
  }
}
