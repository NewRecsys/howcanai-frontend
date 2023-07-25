<template>
  
  <!-- main area -->
  <div class="main">
    
    <!-- <div class="chat-area" ref="chatArea"> -->
    <div class="chat-area">
      <div v-if="$store.state.userModule.loggedIn">
        <SignInComplete />
      </div>
      <div v-if="!$store.state.userModule.loggedIn">
        <SignOutComplete />
      </div>
      <!-- <ChatPreQuestion v-if="!this.$route.params.id"/> -->
      <ChatStartPage v-if="!this.$route.params.id"/>
      <router-view :chatId="this.$route.params.id" :key="this.$route.fullPath"></router-view>
    </div>
    <!-- chat textarea -->
    <div class="input" v-if="this.$route.params.id">
      <ChatTextArea></ChatTextArea>
    </div>
  </div>
</template>

<script>
import ChatStartPage from './ChatStartPage.vue';
// import ChatPreQuestion from './ChatPreQuestion.vue';
import ChatTextArea from './ChatTextArea.vue';
import SignInComplete from './SignInComplete.vue';
import SignOutComplete from './SignOutComplete.vue';

export default {
  name: 'MainPage',
  components: {
    ChatStartPage,
    // ChatPreQuestion,
    ChatTextArea,
    SignInComplete,
    SignOutComplete

  },

  data() {
    return {
    };
  },

  // mobile viewport bug fix
  methods: {
    setVhVariable() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    },
  },
  mounted() {
    // 페이지 로드 시 이벤트 리스너 추가
    this.setVhVariable();
    window.addEventListener("resize", this.setVhVariable);
  },
  beforeUnmount() {
    // 컴포넌트 해제 전 이벤트 리스너 제거
    window.removeEventListener("resize", this.setVhVariable);
  },


  computed: {
  },
  watch: {
  },
 
}
</script>

<style>
  .main {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
  
  .chat-area {
    flex-grow: 1;
    overflow-y: auto;
    padding: 12px;
    display: flex;
    flex-direction: column;
  }
  
  .pre-question {
    margin-top: auto;
  }
  
  .qna {
    display: flex;
    flex-direction: column;
    gap: 10px;
    /* margin-top: auto; */
  }
  
  .input {
    padding: 12px;
  }
</style>
