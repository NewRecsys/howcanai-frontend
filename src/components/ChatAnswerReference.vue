<template>
  <button class="reference-button" @click="openReference">
    <span>
      {{ hostName }}
    </span>
  </button>
</template>
  
<script>
export default {
  name: 'ChatAnswerReference',
  props: {
    reference: String,
  },
  computed: {
    hostName() {
      try {
        const url = new URL(this.reference);
        return url.hostname;
      } catch (error) {
        console.error('Invalid reference URL:', this.reference);
        return '';
      }
    }
  },
  methods: {
    openReference() {
      window.open(this.reference, '_blank');
    }
  }
}
</script>
  
<style>
  .reference-button {
  display: inline-flex;
  padding: 8px 14px;
  margin-top: 8px;
  margin-right: 8px;

  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 20px;
  border: 1px solid #242424;
  background: rgba(36, 36, 36, 0.00);

  color: #979797;
  text-align: center;
  font-size: 12px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  transition: background 300ms;
  }

  .reference-button:hover {
  background: rgba(236, 236, 236, 0.10);
  }
</style>