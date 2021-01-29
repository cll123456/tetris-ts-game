import { BlockGroup } from "../BlockGroup";
import { IGameViewer } from "../types";
import { PageShower } from "./PageShower";
import $ from 'jquery';

export class PageGameShower implements IGameViewer{
  /**
   * 在页面的右侧显示下一个方块
   * @param tetris 
   */
  showNext(tetris: BlockGroup): void {
    tetris.BlockArr.forEach(sp => {
      sp.shower = new PageShower($('#next'), sp);
    })
  }
  /**
   * 在面板中显示切换的俄罗斯方块
   * @param tetris 
   */
  switchBlock(tetris: BlockGroup): void {
    tetris.BlockArr.forEach(sp => {
      // 先把上一个移除，在显示下一个
      sp.shower!.remove();
      // 显示下一个
      sp.shower = new PageShower($('#panel'), sp);
    })
  }
    
    
  
}