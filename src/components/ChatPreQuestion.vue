<template>
<p style="color: white;">{{ isFirst }}</p>
<p style="color: white;">{{ chatDetail }}</p>
<p style="color: white;">{{ this.$route.path === '/chat' }}</p>

<!-- pre-question 뭉탱이로 component 화 -->
<div  v-if="isFirst" 
      style="background: rgb(30, 30, 30); 
              height: 60vh; margin:42px; 
              border-radius: 24px; 
              color: white;
              text-align: center;">
    <br><br><br>👀 다음은 현재 트렌드를 반영한 질문입니다.<br><br>
  
  <div class="pre-question">
    <div class="prequestion-container" 
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
<!-- 🐞 TODO: 제대로 되고 있는지 모르겠어서 링크 이동하는 방식으로 일단 바꿈  -->
<!-- 🐞 즉 현재는 밑에 코드 실행 안됨 -->
<div v-else>
  <ChatQuestion 
    v-if="isVisibleNewQuestion"
    :question="newQuestion" />
  <div class="qna" v-for="chat in chatDetail" :key="chat.id">
    <ChatQuestion :question="chat.question" />
    <ChatAnswer 
    :typing="false" 
    :answer="chat.answer" 
    :references="chat.references"
    />
  </div>
  <ChatQuestion 
    v-if="isVisibleNewQuestion"
    :question="newQuestion" />
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ChatQuestion from './ChatQuestion.vue'
import ChatAnswer from './ChatAnswer.vue'

export default {
  name: 'ChatPreQuestion',
  components: {
    ChatQuestion,
    ChatAnswer,
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState(['commonPreQuestions', 'isVisibleNewQuestion', 'newChatId', 'newQuestion', 'chatDetail', 'isFirst']),
  },
  methods: {
    ...mapActions(['makeNewChat', 'sendQuestion']),

    commitPreQuestion(question) {
      this.makeNewChat(question)
      .then(() => {
        this.$store.commit('setIsVisibleNewQuestion', true);
        this.$router.push(`/chat/${this.newChatId}`);

        this.sendQuestion({ chatRoomId: this.newChatId, question: question })
        .then(() => {
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
  text-align: center;
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
  border: 0px solid #9747FF;
  background: rgb(30, 30, 30);

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
  background: #9747ff;
  color: white;
  transition: 300ms;
}

.pre-question {
    margin-top: auto;
  }

</style>