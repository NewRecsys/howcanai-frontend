<template>
  <!-- text -->
  <!-- <p style="color: white;">{{ isFirst }}</p>
  <p style="color: white;">{{ isTyping }}</p>
  <p style="color: white;">{{ chatDetail.length }}</p> -->
  <!-- <p style="color: white;">{{ this.$route.path === '/chat' }}</p> -->
  
  <!-- 현재 채팅방의 모든 QnA -->
  <div class="qna" v-for="chat in chatDetail" :key="chat.id" ref="chatArea">
    <ChatQuestion :question="chat.question" />
    <ChatAnswer 
    :typing=isTyping
    :answer="chat.answer" 
    :references="chat.references" 
    :nexts="chat.nexts"/>
  </div>
  
  <!-- 다음 쿼리 추천 -->
  <div v-if="isVisibleNextQuestion" class="pre-question">
    <div class="nextquestion-container"  
    v-for="(q, i) in newNexts" 
    :key="i" 
    @click="commitNextQuery(q)">
      <div class="nextquestion-inner">{{ q }}</div>
    </div>
  </div>

  <!-- 임시로 질문 보여주기 -->
  <ChatQuestion 
    v-if="isVisibleNewQuestion"
    :question="newQuestion" />
  <LoadingSpinner v-if="isLoading"/>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ChatQuestion from './ChatQuestion.vue';
import ChatAnswer from './ChatAnswer.vue';
import LoadingSpinner from './LoadingSpinner.vue';

export default {
  name: 'ChatMainArea',
  components: {
    ChatQuestion,
    ChatAnswer,
    LoadingSpinner,
  },
  props: {
    chatId: String
  },
  computed: {
    ...mapState(['isVisibleNewQuestion', 'isLoading', 'newQuestion', 'chatDetail','isFirst', 'newNexts', 'isVisibleNextQuestion']),
    ...mapState('layoutModule', ['isTyping']),
    newChatData() {
      return this.$store.state.newChat;
    },
  },
  mounted() {
    console.log('Mounted - chatArea:', this.$refs.chatArea);
    this.setupScrollObserver();
    this.scrollToBottom();
  },
  // created() {
  //   if (this.chatDetail.length > 0) {
  //     this.resetTyping(); 
  //   }
  // },
  methods: {
    ...mapActions(['sendQuestion']),
    ...mapActions('layoutModule', ['setTyping', 'resetTyping']),

    // next
    commitNextQuery(question) {
      console.log('nextQuery 추천 [question] (선택)', question);
      console.log('nextQuery 추천 [newQuestion] 확인:', this.$store.state.newQuestion);

      // 새로운 question 으로 보이게
      this.$store.commit('setIsVisibleNewQuestion', true);
      // 현재 chatroom id 설정
      const chatRoomId = this.$route.params.id;
      // 질문 보내기 
      this.sendQuestion({ chatRoomId: chatRoomId, question: question })
      .then(() => {
        this.$store.commit('setIsVisibleNewQuestion', false);
      })
      .catch((error) => {
        console.error(error);
      });
    },


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
        console.log('MutationObserver - Chat content changed');
        this.scrollToBottom();
      });
      const chatArea = this.$refs.chatArea;
      if (chatArea instanceof Node) {
        observer.observe(chatArea, {
          childList: true, // 삭제?
          subtree: true,   // 삭제?
        });
        this.scrollToBottom(); // 초기 로딩 스크롤 조절
      }
    },
  },
  
  watch: {
    // '$store.state.isFirst': {
    //   handler(newValue, oldValue) {
    //     console.log('oldValue: ', oldValue);
    //     console.log('newValue: ', newValue);
    //     // isFirst: true -> false 로 바뀌면 
    //     // isTyping: true 로 설정
    //     if (oldValue && !newValue) {
    //       const lastIndex = this.chatDetail.length - 1;
    //       console.log('lastIndex: ', lastIndex);
    //       // this.$set(this.isTyping, lastIndex, true);
    //       console.log('isTyping (before): ', this.isTyping);

    //       this.setTyping();
    //       // this.isTyping = true;
    //       console.log('isTyping: (after)', this.isTyping);
    //     }
    //   },
    // },
    chatList: { // chatList 바뀌는지 감시 
      handler() {
        const chatRoomId = this.$route.params.id;
        this.$store.dispatch('fetchChatDetail', chatRoomId)
          .then(() => {
            // this.$store.commit('setIsFirst', true);
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
.nextquestion-container {
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0 6px
}

.nextquestion-inner {
  display: inline-flex;
  max-width: 754px;
  padding: 12px 20px;
  margin-top: 12px;
  margin-bottom: 0px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 24px;
  border: 1px solid #9747FF;
  background: #000000;

  color: #9747FF;
  font-size: 16px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0.5px;

  cursor: pointer;
}

.nextquestion-inner:hover {
  background: #9747FF;
  color: white;
  transition: 300ms;
}
</style>