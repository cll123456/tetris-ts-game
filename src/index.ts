import { Block } from "./core/Block";
import { PageShower } from "./core/viewer/PageShower";
import $ from 'jquery'


const block = new Block();

block.shower = new PageShower($('#root'), block)
block.color = 'red'

// setInterval(() => {
//   block.point = {
//     x: 1,
//     y: block.point.y + 1
//   }
// }, 1000)