import axios from 'axios';

const userModule = {
  namespaced: true, // 이거 때문에 연결 안 돼서 한참 헤맴
  state: {
    accessToken: localStorage.getItem('access_token') || null,
    // 로그인 여부 확인
    loggedIn: localStorage.getItem('access_token') !== null,
  },
  mutations: {
    SET_ACCESS_TOKEN(state, token) {
      state.accessToken = token;
      state.loggedIn = token !== null; 
    },
    // 로그아웃 할 때 state 변경 
    LOGOUT(state) {
      state.accessToken = null;
      state.loggedIn = false;
    }
  },
  actions: {
    async login({ commit, state }, { username, password }) {
      try {
        console.log('start login - chatList', state.chatList);
        const requestData = new URLSearchParams();
        requestData.append('username', username);
        requestData.append('password', password);
        
        console.log('Request data:', requestData.toString()); // requestData 출력

        const response = await axios.post('/user/login', requestData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        console.log('Response data:', response.data); // 응답 데이터 출력
        console.log('after API - chatList', state.chatList);

        const accessToken = response.data.access_token;
        commit('SET_ACCESS_TOKEN', accessToken);
        localStorage.setItem('access_token', accessToken);
        console.log('after commit token - chatList', state.chatList);

        console.log('Access token:', accessToken);  // access_token 출력
        console.log('Current state:', state); // 현재 스토어 상태 출력
        console.log('end login - chatList', state.chatList);


        return response;
      } catch (error) {
        console.error('로그인 실패!', error);
        throw new Error('로그인에 실패하였습니다. 아이디나 비밀번호를 확인하세요.');
      }
    },
    logout({ commit, state }) {
      console.log('before logout - state', state.accessToken);
      console.log('before logout - login?', state.loggedIn);
      console.log('before logout - chatList', state.chatList);
      localStorage.removeItem('access_token');
      commit('LOGOUT');
      console.log('after logout - state', state.accessToken);
      console.log('after logout - login?', state.loggedIn);
      console.log('after logout - chatList', state.chatList);

    }
  },
};

export default userModule;