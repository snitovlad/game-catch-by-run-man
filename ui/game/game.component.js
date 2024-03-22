import {Settings} from './settings/settings.component.js'
import {Scores} from './scores/scores.component.js'
import {Greed} from './greed/greed.component.js'
import { Player } from '../../sound/player.js';

export function Game() {
   Player()
   const containerElement = document.createElement('div');
   
   const settingsElement = Settings();
   containerElement.append(settingsElement);

   const scoresElement = Scores();
   containerElement.append(scoresElement);

   const greedElement = Greed();
   containerElement.append(greedElement);

   return containerElement;
}