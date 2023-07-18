<template>
  <div>
    <div class="chat-answer" v-html="typedText">
    </div>
      <div v-if="isVisible" style="transition: 300ms;">
        <chat-answer-reference v-for="(reference, i) in references" :key="i" :reference="reference"></chat-answer-reference>
      </div>
  </div>
</template>

<script>
import ChatAnswerReference from './ChatAnswerReference.vue';

export default {
  name: 'ChatAnswer',
  components: {
    ChatAnswerReference,
  },
  props: {
    typing: Boolean,
    answer: {
      type: String,
      required: true,
    },
    references: {
      // 일단 지금은 default 값으로 지정 -> 나중에는 default [] 
      type: Array,
    }
  },
  data() {
    return {
      isTyping: false,
      typedText: "",
      index: 0,
      intervalId: null
    };
  },
  computed: {
    isVisible() {
      if (this.typing) {
        return false
      } else {
        return true
      }
    },
  },
  created() {
    if (this.typing) {
      this.startTyping();
    } else {
      this.typedText = this.answer;
    }
  },
  watch: {
    typedText(newText) {
      // typedText의 변화 감지 시 부모 컴포넌트로 이벤트 전달
      this.$emit('typedTextChanged', newText);
    },
  },
  methods: {
    showComponent() {
      this.isVisible = true;
    },
    // 🐞 TODO: true 로 해놓으면 전체 QnA 쌍에 대해 되는데..
    // 🐞 지금은 정신 사나와서 걍 false
    // 🐞 만약 이 효과 할거면 마지막 answer에 대해서만 적용하도록 해야됨 -> 여기서 $store.state.newAnswer 필요할 듯 
    startTyping() {
      // 인터벌 시작
      if (this.isTyping) {
        clearInterval(this.intervalId);
      } else {
        this.intervalId = setInterval(() => {
          this.typedText += this.answer[this.index]; // 현재 인덱스의 글자를 출력 중인 텍스트에 추가
          this.index++; // 인덱스 증가a

          // 출력 완료되면 인터벌 멈추기
          if (this.index === this.answer.length) {
            clearInterval(this.intervalId);
            this.showComponent();
          }
        }, 10);
      }
      this.isTyping = !this.isTyping;
    }
  }
}
</script>

<style>
.chat-answer {
  display: inline-flex;
  max-width: 754px;
  padding: 12px 20px;
  margin-top: 0px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.15);

  color: #FFF;
  font-size: 16px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0.5px;
}

/* 트랜지션 관련 fade 효과 */
.reference-container {
  transition: opacity 1000ms;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1000ms;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

</style>