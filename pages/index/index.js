// index.js
Page({
  data: {
    highScore: 0
  },

  onLoad() {
    this.loadHighScore();
  },

  loadHighScore() {
    const highScore = wx.getStorageSync('highScore') || 0;
    this.setData({ highScore });
  },

  startGame() {
    wx.navigateTo({
      url: '/pages/game/game'
    });
  },

  goToRules() {
    wx.navigateTo({
      url: '/pages/rules/rules'
    });
  },

  goToSettings() {
    wx.navigateTo({
      url: '/pages/settings/settings'
    });
  }
})
