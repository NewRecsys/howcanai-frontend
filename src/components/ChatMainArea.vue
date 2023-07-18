<template>
  <!-- text -->
  <p style="color: white;">{{ isFirst }}</p>
  <p style="color: white;">{{ chatDetail }}</p>
  <p style="color: white;">{{ this.$route.path === '/chat' }}</p>
  <!-- 현재 채팅방의 모든 QnA -->
  <div class="qna" v-for="chat in chatDetail" :key="chat.id" ref="chatArea">
    <ChatQuestion :question="chat.question" />
    <ChatAnswer 
    :typing="false" 
    :answer="chat.answer" 
    :references="chat.references"/>
  </div>
  <!-- 임시로 질문 보여주기 -->
  <ChatQuestion 
    v-if="isVisibleNewQuestion"
    :question="newQuestion" />
</template>

<script>
import { mapState } from 'vuex';
import ChatQuestion from './ChatQuestion.vue';
import ChatAnswer from './ChatAnswer.vue';

export default {
  name: 'ChatMainArea',
  components: {
    ChatQuestion,
    ChatAnswer,
  },
  props: {
    chatId: String
  },
  computed: {
    ...mapState(['isVisibleNewQuestion', 'isLoading', 'newQuestion', 'chatDetail']),
    newChatData() {
      return this.$store.state.newChat;
    },
    isFirst() {
      return this.$store.getters.isFirst;
    },
  },
  mounted() {
    this.setupScrollObserver();
    this.scrollToBottom();
  },
  data() {
    return {
    };
  },
  methods: {
    // 🐞 TODO: 자동 스크롤 안 되는 문제
    // 🐞 분명 어젯밤에는 됐음 이상함 ㅋㅋ;
    scrollToBottom() {
      this.$nextTick(() => {
        const chatArea = this.$refs.chatArea;
        if (chatArea) {
          chatArea.scrollTop = chatArea.scrollHeight;
        }
      });
    },
    setupScrollObserver() {
      const observer = new MutationObserver(() => {
        this.scrollToBottom();
      });
      const chatArea = this.$refs.chatArea;
      if (chatArea instanceof Node) {
        observer.observe(chatArea, {
          childList: true,
          subtree: true,
        });
      }
    },
  },
  
  watch: {
    chatList: { // chatList 바뀌는지 감시 
      handler() {
        const chatRoomId = this.$route.params.id;
        this.$store.dispatch('fetchChatDetail', chatRoomId)
          .then(() => {
            this.$store.commit('setIsFirst', true);
          })
          .catch(error => {
            console.error(error);
            // 에러 처리 로직
          });
      },
      immediate: true // 컴포넌트가 생성될 때 즉시 watch를 실행
    },
    '$store.state.chatDetail': {
      handler() {
        this.$nextTick(() => {this.scrollToBottom();});
      },
      deep: true
    },
  }
}
</script>

<style>

</style>