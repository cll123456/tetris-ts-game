import { Game } from "./core/Game";
import { PageGameShower } from "./core/viewer/PageGameShower";
import $ from 'jquery'

const game = new Game(new PageGameShower())

$('#start').on('click', () => {
  game.start();
})

$('#pause').on('click', () => {
  game.pause();
})
$('#left').on('click', () => {
  game.left();
})
$('#right').on('click', () => {
  game.right();
})
$('#down').on('click', () => {
  game.down();
})
$('#roate').on('click', () => {
  game.rotate();
})