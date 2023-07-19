<template>
  <!-- main area -->
  <div class="main">
    <!-- <div class="chat-area" ref="chatArea"> -->
    <div class="chat-area" >
      <ChatPreQuestion v-if="!this.$route.params.id"/>
      <router-view :chatId="this.$route.params.id" :key="this.$route.fullPath"></router-view>
    </div>
    <!-- chat textarea -->
    <div class="input">
      <ChatTextArea></ChatTextArea>
      <!-- <ChatTextArea @hide-prequestion="hidePreQuestion"></ChatTextArea> -->
    </div>
  </div>
</template>

<script>
import ChatPreQuestion from './ChatPreQuestion.vue';
import ChatTextArea from './ChatTextArea.vue';

export default {
  name: 'MainPage',
  components: {
    ChatPreQuestion,
    ChatTextArea,
  },

  data() {
    return {
    };
  },
  methods: {
  },
  computed: {
  },
  watch: {
  },
}
</script>

<style>
  .main {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 240px;
    right: 0;
    display: flex;
    flex-direction: column;
    height: 100vh;
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
