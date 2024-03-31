import { Settings } from '../settings/settings.component.js'
import { Scores } from '../scores/scores.component.js'
import { Greed } from '../greed/greed.component.js'
import { Button } from '../button/button.component.js';
import { buttonStartStop } from '../../../data/game.data.js';
import { stringInfo } from '../stringInfo/stringInfo.component.js';

export function GameSettings() {

   const containerElement = document.createElement('div');

   const settingsElement = Settings();
   containerElement.append(settingsElement);

   const scoresElement = Scores();
   containerElement.append(scoresElement);

   const stringInfoElement = stringInfo()
   containerElement.append(stringInfoElement);

   const greedElement = Greed();
   containerElement.append(greedElement);

   const button = Button('START GAME', buttonStartStop)
//    button.classList = 'game-start-button'
   containerElement.append(button);

   return containerElement;
}