// settings.js
Page({
  data: {
    gameTime: 60,
    difficulty: 'medium',
    soundEnabled: true,
    vibrationEnabled: true
  },

  onLoad() {
    this.loadSettings();
  },

  loadSettings() {
    const gameTime = wx.getStorageSync('gameTime') || 60;
    const difficulty = wx.getStorageSync('difficulty') || 'medium';
    const soundEnabled = wx.getStorageSync('soundEnabled') !== false;
    const vibrationEnabled = wx.getStorageSync('vibrationEnabled') !== false;
    
    this.setData({
      gameTime,
      difficulty,
      soundEnabled,
      vibrationEnabled
    });
  },

  setGameTime(e) {
    const time = parseInt(e.currentTarget.dataset.time);
    this.setData({ gameTime: time });
    wx.setStorageSync('gameTime', time);
  },

  setDifficulty(e) {
    const difficulty = e.currentTarget.dataset.difficulty;
    this.setData({ difficulty });
    wx.setStorageSync('difficulty', difficulty);
  },

  toggleSound(e) {
    const soundEnabled = e.detail.value;
    this.setData({ soundEnabled });
    wx.setStorageSync('soundEnabled', soundEnabled);
  },

  toggleVibration(e) {
    const vibrationEnabled = e.detail.value;
    this.setData({ vibrationEnabled });
    wx.setStorageSync('vibrationEnabled', vibrationEnabled);
  },

  goBack() {
    wx.navigateBack();
  }
})
