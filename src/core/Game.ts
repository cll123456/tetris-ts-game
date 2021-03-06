import { Block } from "./Block";
import { BlockGroup } from "./BlockGroup";
import GameCoreConfig from "./GameCoreConfig";
import { TetrisFactory } from "./TetrisFactory";
import { TetrisRules } from "./TetrisRules";
import { EDirection, EGameStatus, IGameViewer } from "./types";
import { getRandom } from "./util/utils";

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
  /**
   * 游戏得分
   */
  private _scores: number = 0;
  /**
   * 获取游戏的状态
   */
  public get gameStatus() {
    return this._gameStatus
  }
  /**
   * 获取游戏的分数
   */
  public get scores() {
    return this._scores;
  }
  /**
   * 设置游戏的分数
   */
  public set scores(num: number) {
    this._scores = num;
    // 游戏分数改变，则设置显示器中的分数
    this._gameShower.countScores(this._scores);
    // 这里需要判断分数，来判断当前游戏所处的等级
    const level = GameCoreConfig.gameLevel.filter(gc => gc.scores <= this._scores);
    if (level.length > 0) {
      // 取出最后一位，就是当前游戏的等级
      const currentLevel = level.pop();
      // 当前处于的等级是一样的
      if (currentLevel!.duration === this._duration) {
        return;
      }
      this._duration = currentLevel!.duration;
      // 清除定时器，重新下落
      if (this._timer) {
        clearInterval(this._timer);
        this._timer = undefined;
        this.autoDrop();
      }
    }

  }
  constructor(private _gameShower: IGameViewer) {
    this.createNextBlock();
    // 初始化游戏界面
    this._gameShower.initPage(this)
  }

  /**
   * 初始化游戏
   */
  private init() {
    // 把展示类中的显示给清除
    this._existBlock.forEach(eb => {
      if (eb.shower) {
        eb.shower.remove();
      }
    })
    this._existBlock = [];
    this.scores = 0;
    this._curTetris = undefined;
    this.createNextBlock();
  }
  /**
   * 创建下一个方块
   */
  private createNextBlock() {
    this._nextTetris = TetrisFactory.getTetrisBlock({ x: 0, y: 0 });
    if (getRandom(0, 100) % 2 === 0) {
      this._nextTetris.rotateBlock();
    }
    this._gameShower.showNext(this._nextTetris);
    // 显示下一个的时候，需要把方块居中
    this.centerBlock(this._nextTetris, GameCoreConfig.nextPanelSize.width)
  }

  /**
   * 开始游戏
   */
  public start() {
    if (this._gameStatus === EGameStatus.playing) {
      // 游戏正在进行中，啥也不做
      return;
    }
    if (this._gameStatus === EGameStatus.over) {
      // 重新开始游戏
      this.init()
    }
    // 修改当前的游戏状态
    this._gameStatus = EGameStatus.playing;
    // 切换方块
    if (!this._curTetris) {
      this.switchTetris();
    }
    // 当前方块自由下落
    this.autoDrop();
    // 显示者也需要开始
    this._gameShower.gameStart();
  }
  /**
   * 触底处理
   */
  private hitBottom() {
    // 把当前方块打散，存在数组中
    this._existBlock = [...this._existBlock, ...this._curTetris!.BlockArr];
    // 判断当前存在的是否可以消除方块
    const num = TetrisRules.removeBlock(this._existBlock);
    // 进行积分统计
    this.getScores(num);
    // 触底后，切换下一个方块
    this.switchTetris();
  }
  /**
   * 通过行来获取分数
   * @param num 
   */
  private getScores(num: number) {
    if (num === 0) {
      return;
    }
    GameCoreConfig.scoreRules.forEach(sr => {
      if (sr.num === num) {
        this.scores += sr.scores;
      }
    })
  }
  /**
   * 切换当前和下一个俄罗斯方块
   */
  private switchTetris() {
    // 把下一个俄罗斯方块给当前游戏的俄罗斯方块
    this._curTetris = this._nextTetris;
    // 把当前的方块给移除掉
    this._curTetris.BlockArr.forEach(bk => {
      if (bk.shower) {
        bk.shower.remove();
      }
    })
    this.centerBlock(this._curTetris, GameCoreConfig.blockPaneSize.width);
    // 需要对游戏的结束进行判断
    if (!TetrisRules.isMove(this._curTetris.shape, this._curTetris.centerPointer, this._existBlock)) {
      // 如果不能移动，标准着游戏结束
      this._gameStatus = EGameStatus.over;
      clearInterval(this._timer);
      this._timer = undefined;
      this._curTetris = undefined;
      // 游戏结束
      this._gameShower.gameOver();
      return;
    }

    this.createNextBlock();
    // 右侧的方块需要切换，并且需要显示下一个方块
    this._gameShower.switchBlock(this._curTetris);
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
      this._gameShower.gamePause();
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