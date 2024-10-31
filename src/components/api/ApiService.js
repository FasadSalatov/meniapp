import axios from 'axios';

const API_URL = 'https://spacetest.shop/api';

const ApiService = {
  tasks: null,
  userInfo: null,
  referrals: null,
  leaderboard: null,

  async initialize(userId) {
    try {
      const [tasksRes, userRes, referralRes, leaderboardRes] = await Promise.all([
        this.getUserTasks(userId),
        this.getUserInfo(userId),
        this.getUserReferrals(userId),
        this.getLeaderboard(),
      ]);

      this.tasks = tasksRes.data;
      this.userInfo = userRes.data;
      this.referrals = referralRes.data;
      this.leaderboard = leaderboardRes.data;
    } catch (error) {
      console.error("Ошибка при инициализации данных API:", error);
    }
  },

  async getUserTasks(userId) {
    return axios.get(`${API_URL}/task/${userId}`);
  },

  async markTaskAsDone(userId, taskId) {
    return axios.get(`${API_URL}/task/done-task/${userId}/${taskId}`);
  },

  async getUserInfo(userId) {
    return axios.get(`${API_URL}/user/${userId}`);
  },

  async createUser(userData) {
    return axios.post(`${API_URL}/user`, userData);
  },

  async updateUserBalance(userId, lastClaim) {
    return axios.put(`${API_URL}/user/update-balance`, { user_id: userId, last_claim: lastClaim });
  },

  async getUserReferrals(userId) {
    return axios.get(`${API_URL}/user/referral/${userId}`);
  },

  async getLeaderboard() {
    return axios.get(`${API_URL}/user/leaderboard`);
  },
};

export default ApiService;
