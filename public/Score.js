import { sendEvent } from './Socket.js';
import { getStage } from './GameData.js';

class Score {
  score = 0;
  addScore = 1;
  forStageChange = 0;
  stageNum = 1000;
  HIGH_SCORE_KEY = 'highScore';
  stageChange = true;

  constructor(ctx, scaleRatio) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.scaleRatio = scaleRatio;
  }

  update(deltaTime) {
    this.score += deltaTime * 0.001 * this.addScore;
    this.forStageChange += deltaTime * 0.001 * this.addScore;
    if (this.stageNum < 1006 && Math.floor(this.forStageChange) === 10) {
      sendEvent(11, { currentStage: this.stageNum, targetStage: this.stageNum + 1 });
      this.stageNum++;
      this.addScore*=2;
      this.forStageChange = 0;
      console.log('stageNum: ', this.stageNum, 'addScore: ', this.addScore)
    }
  }

  getItem(itemId) {
    this.score += 0;
  }

  reset() {
    this.score = 0;
    this.addScore = 1;
    this.forStageChange = 0;
    this.stageNum = 1000;
  }

  setHighScore() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    if (this.score > highScore) {
      localStorage.setItem(this.HIGH_SCORE_KEY, Math.floor(this.score));
    }
  }

  getScore() {
    return this.score;
  }

  draw() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    const y = 20 * this.scaleRatio;

    const fontSize = 20 * this.scaleRatio;
    this.ctx.font = `${fontSize}px serif`;
    this.ctx.fillStyle = '#525250';

    const scoreX = this.canvas.width - 75 * this.scaleRatio;
    const highScoreX = scoreX - 125 * this.scaleRatio;

    const scorePadded = Math.floor(this.score).toString().padStart(6, 0);
    const highScorePadded = highScore.toString().padStart(6, 0);

    this.ctx.fillText(scorePadded, scoreX, y);
    this.ctx.fillText(`HI ${highScorePadded}`, highScoreX, y);
  }
}

export default Score;
