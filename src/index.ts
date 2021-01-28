import { Block } from "./core/Block";
import { PageShower } from "./core/viewer/PageShower";
import $ from 'jquery'
import { BlockGroup } from "./core/BlockGroup";



const bp = new BlockGroup([{ x: -2, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }], { x: 4, y: 5 }, 'red');
bp.BlockArr.forEach(b => {
  b.shower = new PageShower($('#root'), b);
  b.shower.show();
});

$('#up').on('click', () => {
  bp.centerPointer = {
    x: bp.centerPointer.x,
    y: bp.centerPointer.y - 1
  }
  console.log(bp.centerPointer);
  console.log(bp.shape);
  
})
$('#down').on('click', () => {
  bp.centerPointer = {
    x: bp.centerPointer.x,
    y: bp.centerPointer.y + 1
  }
})
$('#left').on('click', () => {
  bp.centerPointer = {
    x: bp.centerPointer.x - 1,
    y: bp.centerPointer.y
  }
})
$('#right').on('click', () => {
  bp.centerPointer = {
    x: bp.centerPointer.x + 1,
    y: bp.centerPointer.y
  }
})