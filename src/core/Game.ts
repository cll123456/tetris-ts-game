import { Block } from "./Block";
import { BlockGroup } from "./BlockGroup";
import { TetrisFactory } from "./TetrisFactory";
import { TetrisRules } from "./TetrisRules";
import { EDirection, EGameStatus, IGameViewer } from "./types";
import PageShowerConfig from "./viewer/PageShowerConfig";

/**
 * 游戏相关的类
 */
export class Game {
  /**
   * 游戏的状态
   */
  private _gameStatus: EGameStatus = EGameStatus.init;
  /**
   * 当前的俄罗斯方块
   */
  private _curTetris?: BlockGroup;
  /**
   * 下一个俄罗斯方块
   */
  private _nextTetris: BlockGroup = TetrisFactory.getTetrisBlock({ x: 0, y: 0 });
  /**
   * 方块下落的计时器
   */
  private _timer?: number;

  /**
   * 方块下落的时间，默认1s
   */
  private _duration: number = 1000;
  /**
   * 存在的方块
   */
  private _existBlock: Block[] = [];

  constructor(private _gameShower: IGameViewer) {
    this._gameShower.showNext(this._nextTetris);
    // 显示下一个的时候，需要把方块居中
    this.centerBlock(this._nextTetris, PageShowerConfig.nextPanelSize.width)
  }

  /**
   * 开始游戏
   */
  public start() {
    if (this._gameStatus === EGameStatus.playing) {
      // 游戏正在进行中，啥也不做
      return;
    }
    // 修改当前的游戏状态
    this._gameStatus = EGameStatus.playing;
    // 切换方块
    if (!this._curTetris) {
      this.switchTetris();
    }
    // 当前方块自由下落
    this.autoDrop();
  }
  /**
   * 触底处理
   */
  private hitBottom() {
    // 把当前方块打散，存在数组中
    this._existBlock = [...this._existBlock, ...this._curTetris!.BlockArr];
    // 判断当前存在的是否可以消除方块
    const num = TetrisRules.removeBlock(this._existBlock);
    console.log(num, '-======')
    // 触底后，切换下一个方块
    this.switchTetris();
  }
  /**
   * 切换当前和下一个俄罗斯方块
   */
  private switchTetris() {
    // 把下一个俄罗斯方块给当前游戏的俄罗斯方块
    this._curTetris = this._nextTetris;
    this.centerBlock(this._curTetris, PageShowerConfig.blockPaneSize.width)
    // 重新获取下一个俄罗斯方块
    this._nextTetris = TetrisFactory.getTetrisBlock({ x: 0, y: 0 });
    // 显示下一个的时候，需要把方块居中
    this.centerBlock(this._nextTetris, PageShowerConfig.nextPanelSize.width)
    // 右侧的方块需要切换，并且需要显示下一个方块
    this._gameShower.switchBlock(this._curTetris);
    this._gameShower.showNext(this._nextTetris);
  }
  /**
   * 方块自动下落
   */
  public autoDrop() {
    if (this._timer || this._gameStatus !== EGameStatus.playing) {
      return;
    }
    // 注意这里，类型可能会不匹配，原因是setInterval 在node 和 浏览器的环境里面是不一样的，所以把node_modules里面的@types 里面的node 删除就好
    this._timer = setInterval(() => {
      if (this._curTetris) {
        // 方块向下移动
        if (!TetrisRules.move(this._curTetris, EDirection.down, this._existBlock)) {
          // 触底处理
          this.hitBottom();
        }
      }
    }, this._duration)
  }

  /**
   * 让俄罗斯方块居中
   * @param blkGrp  俄罗斯方块
   * @param width  逻辑宽度
   */
  private centerBlock(blkGrp: BlockGroup, width: number) {
    // 把方块的中心点改了，方块就会自动居中
    // 获取横轴方向的中心点
    const horX = Math.ceil(width / 2) - 1;
    const verY = 0;
    blkGrp.centerPointer = {
      x: horX,
      y: verY
    }
    // 判断是否超出
    while (blkGrp.BlockArr.some(tb => tb.point.y < 0)) {
      // 如果超出了，需要向下移动一行,怕死循环，直接向下移动一行
      blkGrp.centerPointer = {
        x: blkGrp.centerPointer.x,
        y: blkGrp.centerPointer.y + 1
      }
    }
  }
  /**
   * 暂停游戏
   */
  public pause() {
    if (this._timer && this._gameStatus === EGameStatus.playing) {
      this._gameStatus = EGameStatus.pause;
      clearInterval(this._timer);
      this._timer = undefined;
    }
  }
  /**
   * 左移动
   */
  public left() {
    if (this._curTetris && this._gameStatus === EGameStatus.playing) {
      TetrisRules.move(this._curTetris, EDirection.left, this._existBlock)
    }
  }

  /**
 * 右移动
 */
  public right() {
    if (this._curTetris && this._gameStatus === EGameStatus.playing) {
      TetrisRules.move(this._curTetris, EDirection.right, this._existBlock)
    }
  }
  /**
  * 向下移动
  */
  public down() {
    if (this._curTetris && this._gameStatus === EGameStatus.playing) {
      TetrisRules.moveDirectly(this._curTetris, EDirection.down, this._existBlock)
      // 触底处理
      this.hitBottom();
    }
  }
  /**
   * 方块旋转
   */
  public rotate() {
    if (this._curTetris && this._gameStatus === EGameStatus.playing) {
      TetrisRules.rotate(this._curTetris, this._existBlock)
    }
  }
}