<template>
  <div class="signin-container">
    <a href="/chat"><img src="../assets/howcanai_logo.svg" alt="Logo" class="logo-image" /></a>
    <form @submit.prevent="submitForm">
      <div class="signin-form">
      <div class="input-container"><input class="input-field" type="text" id="username" v-model="username"
          placeholder="username" required> </div>
      <div class="input-container"><input class="input-field" type="password" id="password" v-model="password"
          placeholder="password" required> </div>


        </div>
      <div class="submit-container">

        <!-- 로그아웃 테스트 용 -->
        <!-- <button class="signout-button" type="button" @click="submitLogout">로그아웃</button> -->
        <button class="signup-button" type="button" @click="goToSignUp">Sign Up</button>
        <button class="signin-button" type="submit">Sign in</button>
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
        console.log('chatList', this.$store.state.chatList);
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
    },
    async goToSignUp() {
  this.$router.push('/signup/');
}

  }
}
</script>


<style scoped>
html, body {
  background-color: black;
  font-family: Montserrat, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
}

.signin-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  background-color: black;
  padding: 0 16px;
  box-sizing: border-box;
}

.logo-image {
  display: block;
  width: 100%;
  max-width: 300px;
  margin-bottom: 24px;
}

.signin-form {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  max-width: 360px;
}

.input-container {
  margin-bottom: 10px;
}

.input-field {
  display: block;
  min-width: 300px;
  width: 100%;
  background-color: black;
  color: #fff;
  padding: 8px 16px;
  border: 1px solid #999;
  border-radius: 15px;
  font-family: Montserrat, sans-serif;
  font-style: normal;
  /* font-weight: 500; */
  font-size: 16px;
  box-sizing: border-box;
  outline: none;
}

.submit-container {
  text-align: center;
  display: flex;
  justify-content: space-between;
}

.signin-button {
  margin-right: 0px;
  margin-left: 30px;
  background-color: #3d3939;
  padding: 8px 16px;
  border: none;
  border-radius: 15px;
  color: #999;
  font-family: Montserrat, sans-serif;
  font-style: normal;
  /* font-weight: 500; */
  font-size: 16px;
  cursor: pointer;
  width: 100%;
}

.signin-button:hover {
  background-color: #666;
}

.signup-button {
  margin-left: 16px;
  padding: 8px 16px;
  border: 1px solid black;
  border-radius: 15px;
  background-color: black;
  color: #999;
  font-family: Montserrat, sans-serif;
  font-style: normal;
  /* font-weight: 500; */
  font-size: 16px;
  cursor: pointer;
  width: 100%;
}

.signup-button:hover {
  border: 1px solid #444;
}
</style>