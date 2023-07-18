<template>
  <div class="chat-textarea-div" :style="{ height: textareaHeight + 'px' }">
    <textarea class="chat-textarea"
      placeholder="how can i ..."
      v-model="userQuery"
      @keydown.enter.prevent="handleEnterKey"
      @input="resizeTextarea"
      ref="textarea"
      :rows="textareaRows"
    ></textarea>
    <!-- 위에서 @keydown.enter="hidePreQuestion" 뺌 -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ChatTextArea',
  data() {
    return {
      userQuery: '',
      question: '',
      textareaHeight: 24, // 초기값 지정
      textareaRows: 1,
      prevtextareaRows: 1,
    };
  },
  methods: {
    ...mapActions(['makeNewChat', 'sendQuestion']),
    // === hidePreQuestion: preQuestion 숨기기 (부모에게 보냄)
    // hidePreQuestion() {
    //   this.$emit('hide-prequestion');
    // },

    resizeTextarea() {
      this.$nextTick(() => {
        const textarea = this.$refs.textarea;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`; // 실제 높이로 조정
        this.textareaHeight = textarea.scrollHeight; // .chat-textarea-div의 높이로 설정
        this.textareaRows = textarea.rows; // textarea의 rows 값 업데이트
        this.prevTextareaRows = this.textareaRows;
      });
    },

    async handleEnterKey(event) {
      // shift + enter
      if (event.shiftKey) {
        this.userQuery += '\n';
      } else { // enter
        event.preventDefault();
        console.log('this.$route.path === /chat', this.$route.path === '/chat');
        console.log('this.isFirst', this.isFirst);

        if (this.$route.path === '/chat') {
          if (this.isFirst) {
            this.makeNewChat(this.userQuery)
              .then(() => {
                console.log('after make new chat', this.$store.state.newChatId);
                console.log('after make new chat', this.newChatId);
                this.$store.commit('setIsVisibleNewQuestion', true);
                this.$router.push(`/chat/${this.$store.state.newChatId}`);
              })
              .catch((error) => {
                // 비동기 함수 실행 중 에러 처리
                console.error('Error in makeNewChat:', error);
              });
          } else {
            const chatRoomId = this.$store.state.newChatId;
            this.sendQuestion({ chatRoomId: chatRoomId, question: this.userQuery });
          }
        } else {
          const chatRoomId = this.$route.params.id;
          this.sendQuestion({ chatRoomId: chatRoomId, question: this.userQuery });
        }

        this.$store.commit('setIsVisibleNewQuestion', true);
        this.userQuery = '';
        this.$store.commit('setIsFirst', true);
      }
    },
  },
  computed: {
    ...mapState(['isFirst', 'newChatId']), // isVisibleNewQuestion
  },
  created() {
    console.log('ChatTextArea 컴포넌트 생성');
  }
}
</script>

<style>
  .chat-textarea-div {
    position: relative;
    max-height: 48px;
    padding: 12px 20px;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 24px;
    border: 1px solid #6F6F6F;
    display: flex;
    align-items: center;
    flex-direction: column;

    /* 자동으로 늘어나는 높이를 위해 설정 */
    height: auto;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .chat-textarea {
    resize: none;     /* 크기 조절 안 보이게 */
    outline: none;    /* textarea 파란색 선 없애기 */
    border: none;

    /* 폰트 설정 */
    background: transparent;
    color: #FFFFFF;
    font-size: 16px;
    font-family: Montserrat;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: 0.5px;

    /* 자동으로 늘어나는 높이를 위해 설정 */
    height: auto;

    resize: none;
    width: 100%;
  }
  .chat-textarea:focus {
      padding-top: 0px;
      padding-bottom: 0px;
      margin-top: 1px;
      margin-bottom: 1px;
  }
</style>
