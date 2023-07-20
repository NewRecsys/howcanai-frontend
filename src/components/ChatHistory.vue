<template>
  <button class="chat-history">
    <div class="history-content">
      {{ contentText }}
      <!-- TODO: X button -->
      <!-- <span>{{ contentText }}</span> -->
      <!-- <div v-if="showClose" class="close-button" @click="closeButtonClicked">X</div> -->
    </div>
  </button>
</template>
  
<script>
export default {
  name: 'ChatHistory',
  props: {
    contentText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showClose: false,
    };
  },
  methods: {
    // showCloseButton() {
    //   this.showClose = true;
    // },
    // hideCloseButton() {
    //   this.showClose = false;
    // },
    // closeButtonClicked() {
    //   // 해당 chatRoom 삭제
    // },
  },
  computed: {
  }
};
</script>
  
<style>
.chat-history {
  width: 100%;
  height: 32px;
  padding: 12px 20px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  border: 0px solid rgba(220, 220, 218, 0.24);
  /* border-radius: 12px; */
  background: rgba(0, 0, 0, 0); /* 테스트 용 */
  overflow: hidden;
  margin-bottom: 8px;
  cursor: pointer;
}

.chat-history:hover .history-content {
  /* border-width: 0; */
  position: relative;
  color: #ffffff;
  transition: 300ms;
}

.history-content {
  display: flex;
  width: 100%;
  height: 32px;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  flex-shrink: 0;
  color: #bfbfbf; 
  font-size: 12px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  /* 혹시 텍스트 넘치는거 방지용 */
  overflow: hidden;
  white-space: nowrap;

  border-bottom: 1.5px solid rgba(220, 220, 218, 0.24);
}


</style>