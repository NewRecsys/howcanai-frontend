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
        <!-- 로그아웃 테스트 용 -->
        <button class="signout-button" type="button" @click="submitLogout">로그아웃</button>
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
    ...mapActions(['resetChatList', 'fetchChatList']),
    ...mapActions('userModule', ['login', 'logout']),
    // 폼 제출
    async submitForm() {
      try {
        await this.login({
          username: this.username,
          password: this.password,
        });
        this.resetChatList();
        await this.fetchChatList();
        alert('로그인 성공!');
        // TODO: 이동 전에 chatList fetch 해오기 
        // this.resetChatList();
        // await this.fetchChatList();
        console.log('chatList',this.$store.state.chatList);
        this.$router.push('/chat');
        console.log('chatList', this.$store.state.chatList);
      } catch (error) {
        alert(error.message);
      }
    },
    async submitLogout() {
      try {
        await this.logout();
        alert('로그아웃 성공!');
      } catch (error) {
        alert('로그아웃 실패' + error.message);
      }
    }
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