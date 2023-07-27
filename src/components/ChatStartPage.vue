<template>
<!-- <p style="color: white;">isFirst: {{ isFirst }}</p>
<p style="color: white;">{{ isTyping }}</p>
<p style="color: white;">{{ chatDetail.length }}</p> -->
<!-- <p style="color: white;">{{ chatDetail }}</p> -->
<!-- <p style="color: white;">{{ this.$route.path === '/chat' }}</p> -->
<!-- <p style="color: white;">{{ this.$store.state.userModule.accessToken ?? 'undefined'}}</p> -->

<!-- pre-question 뭉탱이로 component 화 -->
<!-- <div  v-if="isFirst" 
      style="background: #000000; 
              margin:80px;
              border-radius: 24px; 
              color: white;
              text-align: center;
              bottom: 0px;"> -->
<div  v-if="isFirst" class="start-page-container">
  <div class="start-page-content">
    <!-- <a href="/" style="text-align: center; display: block;"><img src="../assets/howcanai_logo.svg" style="max-width: 100%; height: auto;"></a>
    <br><br> -->
  </div>
  <div>
    <span style="font-size: 48px; font-weight: 700;">how can</span>
    <!-- <span style="color: #1c1c1c; font-size: 48px; font-weight: 700;">a</span> -->
    <span style="color: #000000; font-size: 48px; font-weight: 700; text-shadow: -1.5px 0 #606060, 0 1.5px #606060, 1.5px 0 #606060, 0 -1.5px #606060;">a</span>
    <!-- <img src="../assets/a.png"> -->
    <span style="font-size: 48px; font-weight: 700;">i</span>
  </div>
  <!-- <h1 style="font-size: 60px; margin-bottom: 0; line-height: 1.2;">how canai</h1> -->
  <br>
  <ChatTextArea style=""></ChatTextArea>
  <br>
  <div class="pre-question">
    <div class="prequestion-container"  style="display: inline-block; padding: 0 6px" 
    v-for="(q, i) in commonPreQuestions" 
    :key="i" 
    @click="commitPreQuestion(q)">
      <div class="prequestion-inner">{{ q }}</div>
    </div>
    <!-- 🐞🛠️ Fixed : /chat 에서 처음 쿼리 날릴 때 로드 안됨  -->
    <!-- 🐞🛠️ 비동기 처리 등등 더 해야될 듯? -->
    <ChatQuestion 
    v-if="isVisibleNewQuestion"
    :question="newQuestion" />
  </div>
</div>
</template>
  
<script>
import { mapActions, mapState } from 'vuex';
import ChatQuestion from './ChatQuestion.vue'
// import ChatAnswer from './ChatAnswer.vue'
import ChatTextArea from './ChatTextArea.vue';

export default {
  name: 'ChatStartPage',
  components: {
    ChatQuestion,
    // ChatAnswer,
    ChatTextArea,
  },
  data() {
    return {
      indexTextareaClass: 'first-chat-textarea-div',
    };
  },
  computed: {
    ...mapState(['commonPreQuestions', 'isVisibleNewQuestion', 'newChatId', 'newQuestion', 'chatDetail', 'isFirst']),
    ...mapState('layoutModule', ['isTyping']),
  },
  methods: {
    ...mapActions(['makeNewChat', 'sendQuestion', 'setIsFirstFalse']),
    ...mapActions('layoutModule', ['setTyping', 'resetTyping']),

    commitPreQuestion(question) {
      console.log('commitPreQuestion 눌렀을 때 [question]', question);
      this.makeNewChat(question)
      .then(() => {
        console.log('makeNewChat 완료');
        this.$store.commit('setIsVisibleNewQuestion', true);
        this.$router.push(`/chat/${this.newChatId}`);
        // 첫번째 쿼리 날리면 isFirst=false, isTyping=true
        // this.setIsFirstFalse();
        this.setTyping();

        this.sendQuestion({ chatRoomId: this.newChatId, question: question })
        .then(() => {
          console.log('sendQuestion 완료');
          this.$store.commit('setIsVisibleNewQuestion', false);
        })
      })
      .catch((error) => {
        console.error(error);
      });
    }
  },
}
</script>
  
<style>
.prequestion-container {
  text-align: left;
}

.prequestion-inner {
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

.prequestion-inner:hover {
  background: #9747FF;
  color: white;
  transition: 300ms;
}

.pre-question {
    margin-top: auto;
}

/* .index-textarea .chat-textarea-div {
  border: 4px solid #6F6F6F;
} */

.start-page-container {
  /* margin: auto; */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #000000;
  margin: 0px;
  border-radius: 24px;
  color: white;
  text-align: center;
  z-index: 1;
  /* min-width: 400px; */
  /* max-width: 400px; */
  /* min-width: 100%; */
  min-width: min(90%, 512px);
}

.start-page-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>