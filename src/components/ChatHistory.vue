<template>
  <button class="chat">
    <div class="content">{{ contentText }}</div>
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
    };
  },
  computed: {
  }
};
</script>
  
  <style>
  .chat {
    width: 100%;
    height: 52px;
    padding: 12px 20px;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    border: 1px solid rgba(220, 220, 218, 0.24);
    border-radius: 12px;
    background: rgba(111, 111, 111, 0.00);
    overflow: hidden;
    margin-bottom: 8px;
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
    font-size: 14px;
    font-family: Montserrat;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  
    /* 혹시 텍스트 넘치는거 방지용 */
    overflow: hidden;
    white-space: nowrap;
  }
  </style>