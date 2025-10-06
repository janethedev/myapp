// result.js
Page({
  data: {
    score: 0,
    timeLeft: 0,
    highScore: 0
  },

  onLoad(options) {
    const score = parseInt(options.score) || 0;
    const timeLeft = parseInt(options.timeLeft) || 0;
    const highScore = wx.getStorageSync('highScore') || 0;
    
    this.setData({
      score,
      timeLeft,
      highScore
    });
  },

  restartGame() {
    wx.redirectTo({
      url: '/pages/game/game'
    });
  },

  goHome() {
    wx.reLaunch({
      url: '/pages/index/index'
    });
  },

  shareScore() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },

  onShareAppMessage() {
    return {
      title: `我在疯狂猜词中得了${this.data.score}分！`,
      path: '/pages/index/index'
    };
  }
})
