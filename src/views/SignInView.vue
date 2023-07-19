<template>
  <div class="signin-container">
    <h1>로그인</h1>
    <form @submit.prevent="submitForm">
      <div class="input-container">
        <label for="username">유저 이름:</label>
        <input class="input-field" type="text" id="username" v-model="username" required>
      </div>
      <div class="input-container">
        <label for="username">비밀번호:</label>
        <input class="input-field" type="password" id="password" v-model="password" required>
      </div>

      <div class="submit-container">
        <button class="signin-button" type="submit">로그인</button>
      </div>

    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    ...mapActions('userModule', ['login']),
    // 폼 제출
    async submitForm() {
      try {
        await this.login({
          username: this.username,
          password: this.password,
        });
        this.$router.push('/chat');
      } catch (error) {
        alert(error.message);
      }
    },
  }
}
</script>

<style>
  .signin-container {
    width: 680px;
    height: 480px;
    flex-shrink: 0;
  }
</style>