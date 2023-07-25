// store/index.js

import { createStore } from 'vuex';
import axios from 'axios';
import { makeTruncatedText } from '../utils.js';
import userModule from './user.js';
import layoutModule from './layout.js';

const store = createStore({
  state: {
    // isFirst: 페이지 이동 후 첫 번째 질문인지?
    isFirst: true,

    // isVisibleNewQuestion: 사용자가 쿼리를 날린 직후인지? (question만 보여줌)
    isVisibleNewQuestion: false,

    // isLoading: API 리턴 대기중인지? (추후 로딩 애니메이션 추가 예정)
    isLoading: false,

    // chatList: <SideBar>에서 보여줄 History
    chatList: [],

    // chatDetail: 한 채팅방의 log
    chatDetail: [
      // {
      //   id: 0, // 한 쌍의 qna 의 id
      //   question: '질문',
      //   answer: '답변',
      //   references: ['https://www.naver.com']
      // }
    ],

    // 현재 chatRoomId (/chat 이어도 id 존재함)
    chatRoomId: '',

    // 프론트엔드용 (유저가 새로 날린 쿼리)
    // TODO: newChat { }
    newChatId: '',         // 서버에서 받아오기 
    newQuestion: '',      // 쿼리 날리자마자 갱신 
    newAnswer: '',        // 서버에서 받아오기 -> 안씀
    newReferences: [],    // 서버에서 받아오기 -> 안씀
    // nextQuestions: []  // 기능 추가 (다음 쿼리 추천)

    // 프론트엔드용 (유저 공통 추천 질문)
    commonPreQuestions: ["제주도 맛집 추천", "탄산수를 마신 후에 꼭 양치를 하고 취침해야 하나요?", "스프레이형 모기약은 사람에게 무해한가요?"],
  },

  mutations: {
    setIsVisibleNewQuestion(state, bool) {
      state.isVisibleNewQuestion = bool;
    },
    setIsFirst(state, bool) {
      state.isFirst = bool;
    },
    setIsLoading(state, bool) {
      state.isLoading = bool;
    },
    setNewChatId(state, newChatId) { // chatroom_id
      state.newChatId = newChatId;
    },
    setNewQuestion(state, newQuestion) {
      state.isVisibleNewQuestion = true;
      state.newQuestion = newQuestion;
    },
    setNewAnswer(state, newAnswer) { // 안씀
      state.newAnswer = newAnswer;
    },
    setNewReferences(state, newReferences) { // 안씀
      state.newReferences = newReferences;
    },

    setChatDetail(state, chatDetail) { // fetch 용
      state.chatDetail = chatDetail;
    },
    // qna 단위로 push 
    pushChatDetail(state, newChatDetail) { // newChat update 용
      state.chatDetail.push(newChatDetail);
    },
    setChatList(state, chatList) { // fetch 용
      state.chatList = chatList;
    },
    // id, title 단위로 push
    pushChatList(state, newChatList) { // newChat update 용 
      state.chatList.unshift(newChatList); // 맨 앞에 추가 
    },
    // 초기화
    RESET_NEW_CHAT(state) {
      state.newQuestion = ''; 
      state.newAnswer = ''; 
      state.newReferences = []; 
      state.isVisibleNewQuestion = false;
    },
    // 로그인 정보 달라질 때
    RESET_CHAT_LIST(state) {
      state.chatList = [];
    },
    // 채팅방 누르기 전 
    RESET_CHATROOM_ID(state) {
      state.newChatId = '';
    },
    // 채팅방 누르기 전
    RESET_CHAT_DETAIL(state) {
      state.chatDetail = [];
    },
  },
  actions: {
    // ====== [ makeNewChat ] =========
    // ✅ '/chat' 에서 '첫번째' 쿼리를 날렸을 때 동작
    //    1️) chatList에 New Chat을 push 하기
    //    2️) API로 불러온 chatRoomId로 설정
    //    3️) newQuestion 설정
    async makeNewChat({ commit }, question ) { // TODO: 실행된 다음에 pushChatList -> 
      // 첫번째 쿼리를 타이틀로
      console.log('question:', question);
      const title = makeTruncatedText(question);
      console.log('after makeTruncatedText title', title)
      // try {
      try {
        const response = await axios.post('/chatroom/create', { 'title': title });
        // 새로 만들어진 id로 지정
        console.log(response.data);

        const newChatId = response.data.chatroom_id; // 넘겨받은 id
        console.log('newChatId:', newChatId);

        commit('setNewChatId', newChatId); // this.newChatId = 넘겨받은 id
        commit('setNewQuestion', question);
        // 에러 확인: newQuestion 이 undefined
        console.log('newQuestion', this.newQuestion);
        // 맨 앞에 push
        const newChatList = { id: newChatId, title: title };
        console.log('newChatList', newChatList);
        commit('pushChatList', newChatList);
        console.log(store.state.chatList);
        console.log(store.state.chatDetail);
      } catch (error) {
        console.error(error);
      }
    },

    // ====== [ sendQuestion ] ========
    // ✅ /chat 또는 /chat/:id 에서 쿼리를 날렸을 때 동작
    async sendQuestion({ commit }, { chatRoomId, question }) {
      // newQuestion에 현재 질문 추가 후 API 대기 처리
      commit('setNewQuestion', question);
      commit('setIsLoading', true);
      console.log('chatRoomId:', chatRoomId);
      console.log('question:', question);
      try {
        try {
          const response = await axios.post(`/qna/create/${chatRoomId}`, { 'query': question });

          const newChatDetail = {
            id: response.data.id,
            question: response.data.question,
            answer: response.data.answer,
            references: response.data.references,
          };
          console.log('newChatDetail:', newChatDetail);
          // qna 쌍 push 
          commit('pushChatDetail', newChatDetail);
        } catch (error) {
          console.error(error);
        }
      } finally {
        // 임시 newQuestion, newChatID 초기화 
        commit('RESET_NEW_CHAT'); 
        // API 응답 완료 
        commit('setIsLoading', false);
        // 임시 말풍선 안 보이게
        commit('setIsVisibleNewQuestion', false);
      }
    },

    // ====== [ fetchChatDetail ] ========
    // chatRoomId에 해당하는 대화 데이터 전부 불러옴
    // ✅ /chat/:id 를 누르기 전 동작 (routes/index.js 에서 처리)
    async fetchChatDetail({ commit, dispatch }, chatRoomId) {
      try {
        await dispatch('resetChatDetail');
        const response = await axios.get(`/chatroom/detail/${chatRoomId}`);
        const chatDetail = response.data.qnas.map(qna => ({
          id: qna.id,
          question: qna.question,
          answer: qna.answer,
          references: qna.references
        }));
        commit('setChatDetail', chatDetail);
      } catch (error) {
        console.error(error);
      }
    },

    // ====== [ fetchChatList ] ========
    // chatList (SideBar의 History) 해당하는 데이터 불러옴
    // ✅ /chat 처음 누를 때 동작
    async fetchChatList({ commit, state }) {
      try {
        const response = await axios.get('/chatroom/list');
        console.log(response.data);
        const chatList = response.data.map(chat => ({
          id: chat.id,
          title: chat.title,
        }));
        console.log('fetchChatList - chatList', chatList);
        commit('setChatList', chatList);
        console.log('fetchChatList(after commit) - state.chatList', state.chatList);

      } catch (error) {
        console.error(error);
      }
    },

    // ====== [ set isFirst ] ========
    setIsFirstTrue({ commit }) {
      commit('setIsFirst', true);
    },
    setIsFirstFalse({ commit }) {
      commit('setIsFirst', false);
    },

    // ====== [ resetNewChat ] ========
    // ✅ 쿼리 날린 직후 동작 
    resetNewChat({ commit }) {
      commit('RESET_NEW_CHAT');
    },

    // ✅ 로그인 정보 바뀔 때마다 동작 
    resetChatList({ commit }) {
      commit('RESET_CHAT_LIST');
    },

    // ✅ /chat, /chat/:id 렌더링 전에 동작
    resetChatDetail({ commit }) {
      commit('RESET_CHAT_DETAIL');
    }, 

    // ✅ /chat, /chat/:id 렌더링 전에 동작
    resetChatRoom({ commit }) {
      commit('RESET_CHATROOM_ID');
    },
  },
  getters: {
    getChatList(state) {
      return state.chatList;
    },
  },
  modules: {
    userModule: userModule,
    layoutModule: layoutModule,
  }
});

export default store;