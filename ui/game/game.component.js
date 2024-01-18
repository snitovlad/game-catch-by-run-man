import {Settings} from './settings/settings.component.js'
import {Scores} from './scores/scores.component.js'
import {Greed} from './greed/greed.component.js'

export function Game() {
   const containerElement = document.createElement('div');
   
   const settingsElement = Settings();
   containerElement.append(settingsElement);

   const scoresElement = Scores();
   containerElement.append(scoresElement);

   const greedElement = Greed();
   containerElement.append(greedElement);

   return containerElement;
}