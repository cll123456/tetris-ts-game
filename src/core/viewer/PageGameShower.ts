import { BlockGroup } from "../BlockGroup";
import { EGameStatus, IGameViewer } from "../types";
import { PageShower } from "./PageShower";
import $ from 'jquery';
import { Game } from "../Game";
import GameCoreConfig from "../GameCoreConfig";
import PageShowerConfig from "./PageShowerConfig";

export class PageGameShower implements IGameViewer {


  /**
   * 下一个俄罗斯方块的dom
   */
  private _nextDom = $('#next');
  /**
   * 游戏面板的dom
   */
  private _panelDom = $('#panel')
  /**
   * 分数dom
   */
  private _scoresDom = $('#scores')
  /**
   * 遮罩dom
   */
  private _maskDom = $('#mask')
  /**
   * 初始化游戏界面
   * @param game 
   */
  initPage(game: Game): void {
    // 初始化游戏的面板的宽高
    this._panelDom.css({
      height: GameCoreConfig.blockPaneSize.height * PageShowerConfig.BlockSize.height,
      width: GameCoreConfig.blockPaneSize.width * PageShowerConfig.BlockSize.width
    })

    this._nextDom.css({
      height: GameCoreConfig.nextPanelSize.height * PageShowerConfig.BlockSize.height,
      width: GameCoreConfig.nextPanelSize.width * PageShowerConfig.BlockSize.width,
    })

    // 注册键盘事件
    //2. 注册键盘事件
    $(document).on('keydown', (e: { keyCode: number; }) => {
      if (e.keyCode === 37) {
        game.left();
      }
      else if (e.keyCode === 38) {
        game.rotate();
      }
      else if (e.keyCode === 39) {
        game.right();
      }
      else if (e.keyCode === 40) {
        game.down();
      }
      else if (e.keyCode === 32) {
        if (game.gameStatus === EGameStatus.playing) {
          game.pause();
        }
        else {
          game.start();
        }
      }
    })
  }
  /**
   * 在页面的右侧显示下一个方块
   * @param tetris 
   */
  showNext(tetris: BlockGroup): void {
    tetris.BlockArr.forEach(sp => {
      sp.shower = new PageShower(this._nextDom, sp);
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
      sp.shower = new PageShower(this._panelDom, sp);
    })
  }
  /**
   * 统计游戏的分数
   * @param scores 
   */
  countScores(scores: number): void {
    this._scoresDom.html(scores.toString())
  }
  /**
   * 开始游戏
   */
  gameStart(): void {
    this._maskDom.hide();
  }
  /**
   * 游戏暂停
   */
  gamePause(): void {

    this._maskDom.css({
      display: "flex"
    })
    this._maskDom.find("p").html("游戏暂停");
  }
  /**
   * 游戏结束
   */
  gameOver(): void {

    this._maskDom.css({
      display: "flex"
    })
    this._maskDom.find("p").html("游戏结束");
  }

}