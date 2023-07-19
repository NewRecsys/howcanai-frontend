import axios from 'axios';

const userModule = {
  namespaced: true, // 이거 때문에 연결 안 돼서 한참 헤맴
  state: {
    accessToken: null,
  },
  mutations: {
    SET_ACCESS_TOKEN(state, token) {
      state.accessToken = token;
    },
  },
  actions: {
    async login({ commit }, { username, password }) {
      try {
        const requestData = new URLSearchParams();
        requestData.append('username', username);
        requestData.append('password', password);
        
        const response = await axios.post('http://49.50.160.214:30005/api/user/login', requestData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        const accessToken = response.data.access_token;
        commit('SET_ACCESS_TOKEN', accessToken);
        localStorage.setItem('access_token', accessToken);
        return response;
      } catch (error) {
        console.error('로그인 실패!', error);
        throw new Error('로그인에 실패하였습니다. 아이디나 비밀번호를 확인하세요.');
      }
    },
  },
};

export default userModule;