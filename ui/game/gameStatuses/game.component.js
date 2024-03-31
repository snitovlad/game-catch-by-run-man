import { Settings } from '../settings/settings.component.js'
import { Scores } from '../scores/scores.component.js'
import { Greed } from '../greed/greed.component.js'
import { Player } from '../../../sound/player.js';
import { stringInfo } from '../stringInfo/stringInfo.component.js';

export function Game() {
   Player()

   const containerElement = document.createElement('div');

   const settingsElement = Settings();
   containerElement.append(settingsElement);

   const scoresElement = Scores();
   containerElement.append(scoresElement);

   const stringInfoElement = stringInfo()
   containerElement.append(stringInfoElement);

   const greedElement = Greed();
   containerElement.append(greedElement);

   return containerElement;
}