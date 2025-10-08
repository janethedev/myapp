// game.js
const words = [
  '苹果', '香蕉', '橙子', '葡萄', '草莓',
  '西瓜', '桃子', '梨子', '柠檬', '樱桃',
  '老虎', '狮子', '大象', '长颈鹿', '熊猫',
  '猴子', '兔子', '猫咪', '狗狗', '鸟儿',
  '汽车', '飞机', '火车', '轮船', '自行车',
  '手机', '电脑', '电视', '冰箱', '洗衣机'
];

// 打乱数组的Fisher-Yates洗牌算法
function shuffleArray(array) {
  const shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }
  return shuffled;
}

Page({
  data: {
    currentWord: '',
    timeLeft: 60,
    score: 0,
    gameTimer: null,
    wordIndex: 0,
    isPaused: false,
    shuffledWords: []
  },

  onLoad() {
    this.loadSettings();
    this.startGame();
  },

  loadSettings() {
    const gameTime = wx.getStorageSync('gameTime') || 60;
    this.setData({ gameTime });
  },

  onUnload() {
    this.clearTimer();
  },

  startGame() {
    const gameTime = this.data.gameTime || 60;
    const shuffledWords = shuffleArray(words);
    this.setData({
      currentWord: shuffledWords[0],
      timeLeft: gameTime,
      score: 0,
      wordIndex: 0,
      isPaused: false,
      shuffledWords: shuffledWords
    });
    this.startTimer();
  },

  startTimer() {
    this.data.gameTimer = setInterval(() => {
      if (!this.data.isPaused) {
        const timeLeft = this.data.timeLeft - 1;
        this.setData({ timeLeft });
        
        if (timeLeft <= 0) {
          this.endGame();
        }
      }
    }, 1000);
  },

  clearTimer() {
    if (this.data.gameTimer) {
      clearInterval(this.data.gameTimer);
      this.data.gameTimer = null;
    }
  },

  correctAnswer() {
    if (this.data.isPaused) return;
    
    const newScore = this.data.score + 10;
    this.setData({ score: newScore });
    this.nextWord();
  },

  skipAnswer() {
    if (this.data.isPaused) return;
    this.nextWord();
  },

  nextWord() {
    const nextIndex = (this.data.wordIndex + 1) % this.data.shuffledWords.length;
    this.setData({
      wordIndex: nextIndex,
      currentWord: this.data.shuffledWords[nextIndex]
    });
  },

  pauseGame() {
    const isPaused = !this.data.isPaused;
    this.setData({ isPaused });
  },

  endGame() {
    this.clearTimer();
    
    // 保存最高分
    const highScore = wx.getStorageSync('highScore') || 0;
    if (this.data.score > highScore) {
      wx.setStorageSync('highScore', this.data.score);
    }

    wx.redirectTo({
      url: `/pages/result/result?score=${this.data.score}&timeLeft=${this.data.timeLeft}`
    });
  }
})
