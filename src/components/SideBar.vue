<template>
  <!-- 로그인 모달창 -->
  <div v-show="showSignInModal" class="modal">
    <div class="modal-content">
      <button class="close-btn" @click.stop="showSignInModal = false">X</button>
      <SignInView @openSignUp="showSignUpModal = true; showSignInModal = false" />
    </div>
  </div>

  <!-- 회원가입 모달창 -->
  <div v-show="showSignUpModal" class="modal">
    <div class="modal-content">
      <button class="close-btn" @click.stop="showSignUpModal = false">X</button>
      <SignUpView @signUpSuccess="showSignUpModal = false" />
    </div>
  </div>

  <div class="sidebar-container">
    <!-- 로고 -->
    <div class="logo-container">
      <router-link to="/chat" @click="resetChatDetail">
        <img id="sideLogo" alt="howcan.ai side logo" src="../assets/sideLogo.svg">
      </router-link>
    </div>

    <!-- New Chat 버튼 -->
    <div class="new-chat-container" style="">
      <router-link class="chat" to="/chat" style="display: inline-block; text-decoration: none;" @click="resetChatDetail">
        <div class="new-chat-content">✨&nbsp;&nbsp;&nbsp;Start New</div>
      </router-link>
    </div>

    <!-- History (text) -->
    <div class="side-bar-text">
      History
    </div>

    <!-- History -->
    <div class="chat-list-container" :key="this.$store.state.userModule.accessToken">
      <!-- test -->
      <!-- <ChatHistory :contentText="contentText"></ChatHistory> -->
      <!-- History 받아옴 -->
      <div v-for="chat in chatList" :key="chat.id">
        <router-link :to="`/chat/${chat.id}`">
          <ChatHistory :contentText="chat.title"></ChatHistory>
        </router-link>
      </div>
    </div>

    <!-- 로그인 안 하면 Sign in -->
    <div v-if="!loggedIn" class="user-container">
      <a class="chat" @click.stop="showSignInModal = true;" style="display: inline-block; text-decoration: none;">
        <div class="new-chat-content">🔒&nbsp;&nbsp;&nbsp;Sign in</div>
      </a>
    </div>
    <!-- 로그인 하면 Sign out -->
    <div v-else class="user-container">
      <a class="chat" to="/chat" @click="submitLogout" style="display: inline-block; text-decoration: none;">
        <div class="new-chat-content">🔑&nbsp;&nbsp;&nbsp;Sign out</div>
      </a>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ChatHistory from './ChatHistory.vue';
import SignInView from '../views/SignInView.vue';
import SignUpView from '../views/SignUpView.vue';

export default {
  name: 'SideBar',
  components: {
    ChatHistory,
    SignInView,
    SignUpView,
  },
  data() {
    return {
      // test
      contentText: '불닭볶음면이 중국시장에서 인기를 끌게 된 이유',
      showSignInModal: false,
      showSignUpModal: false,
    };
  },
  computed: {
    ...mapState(['chatList']),
    ...mapState('userModule', ['loggedIn']),
  },
  mounted() {
    this.fetchChatList();
  },
  methods: {
    ...mapActions(['fetchChatList', 'resetChatDetail', 'resetChatList']),
    ...mapActions('userModule', ['logout']),

    // resetChatDetail() {
    //   this.$store.dispatch('resetChatDetail');
    // },

    async submitLogout() {
      try {
        await this.logout();
        alert('로그아웃 성공!');
        // resetChatList -> /chat 으로 이동 
        await this.resetChatList();
        this.$router.push('/chat');
      } catch (error) {
        alert('로그아웃 실패' + error.message);
      }
    },

  },
  // 로그인을 성공했을 때 모달창이 닫히도록 설정
  watch: {
    loggedIn(newValue) {
      if (newValue) {
        this.showSignInModal = false;

      }
    },
  },
}
</script>

<style>
.sidebar-container {
  position: fixed;
  top: 0px;
  left: 0;
  width: 240px;
  height: 100vh;
  border: 1px solid #232323;
  background-color: #111111;
  color: #242424;
  padding: 0px;
  /* 수직으로 쌓이게 만들기 */
  /* display: block; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  /* overflow: ; */
}

.sidebar-container::-webkit-scrollbar {
  width: 0px;
}

.user-info {
  border: 1px solid #242424;
  display: flex;
  align-items: center;
}




.content {
  display: flex;
  width: 100%;
  height: 35px;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  flex-shrink: 0;
  color: #ececec;
  font-size: 12px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  /* 혹시 텍스트 넘치는거 방지용 */
  /* overflow: hidden; */
  /* white-space: nowrap; */
}

.new-chat-content {
  display: flex;
  width: 100%;
  height: 35px;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  flex-shrink: 0;
  color: #ececec;
  font-size: 14px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  /* 혹시 텍스트 넘치는거 방지용 */
  overflow: hidden;
  white-space: nowrap;
}

.chat {
  box-sizing: border-box;
  opacity: 1;
  width: 100%;
  height: 48px;
  padding: 6px 20px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  border-width: 0;
  border-radius: 24px;
  background: rgb(30, 30, 30);
  overflow: hidden;
  margin-bottom: 8px;
  cursor: pointer;
}

.chat:hover {
  border-width: 0;
  background: #393939;
  transition: 300ms;
}


.logo-container {
  padding: 16px 8px 8px 8px;
  border-bottom: 1px solid #232323;
  width: 220px;
}

.new-chat-container {
  padding: 16px 8px;
  width: 224px;
}

.side-bar-text {
  color: darkgrey;
  font-size: 12px;
  padding: 10px;
  width: 216px;
}

.chat-list-container {
  padding: 0px 8px 0px 8px;
  gap: 10px;
  flex: 1;
  width: 224px;
  overflow-y: auto;
}

.user-container {
  padding: 16px 8px 0px 8px;
  gap: 10px;
  width: 224px;
  border-top: 1px solid #232323;
}

.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-content {
  position: relative;
  background-color: black;
  padding: 5px;
  width: 90%;
  height: 80%;
  max-width: 600px;
  max-height: 800px;
  overflow-y: auto;
  border: 2px solid gray;
  box-sizing: border-box;
}

@media (min-width: 768px) {
  .modal-content {
    width: 60%;
    height: 70%;
  }
}

@media (min-width: 992px) {
  .modal-content {
    width: 40%;
    height: 60%;
  }
}

.close-btn {
  color: gray;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-weight: bold;
  text-align: left;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0.5px;
}</style>