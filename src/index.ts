import { PageShower } from "./core/viewer/PageShower";
import $ from 'jquery'
import { TetrisFactory } from "./core/TetrisFactory";
import { TetrisRules } from "./core/TetrisRules";
import { EDirection } from "./core/types";



const bp = TetrisFactory.getTetrisBlock({ x: 3, y: 5 });
bp.BlockArr.forEach(b => {
  b.shower = new PageShower($('#root'), b);
  b.shower.show();
});

$('#up').on('click', () => {
  TetrisRules.move(bp, {
    x: bp.centerPointer.x,
    y: bp.centerPointer.y - 1
  })

})
$('#down').on('click', () => {
  TetrisRules.moveDirectly(bp, EDirection.down);
})
$('#left').on('click', () => {
  TetrisRules.move(bp, EDirection.left);
})
$('#right').on('click', () => {
  TetrisRules.move(bp, EDirection.right);
})