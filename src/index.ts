import { Handlers } from './assets/scripts/Handlers';
import { Definitions } from './assets/scripts/Definitions';

import './all.scss';

Definitions.headerCityElement.addEventListener('click', Handlers.cityElementClickHandler);
Definitions.citiesPopupInput.addEventListener('input', Handlers.citiesPopupInputHandler);
Definitions.citiesPopupInputLabel.addEventListener('click', Handlers.citiesPopupInputLabelHandler);
Definitions.citiesPopupUL.addEventListener('click', Handlers.citiesPopupULHandler);
Definitions.citiesBadges.addEventListener('click', Handlers.citiesBadgesClickHandler);
Definitions.citiesPopupButton.addEventListener('click', Handlers.citiesPopupButtonHandler);
