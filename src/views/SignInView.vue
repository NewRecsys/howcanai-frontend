<template>
  <div class="signin-container">
    <img src="../assets/howcanai_logo.svg" alt="Logo" class="logo-image" />
    <form @submit.prevent="submitForm">
      <div class="input-container"><input class="input-field" type="text" id="username" v-model="username"
          placeholder="username" required> </div>
      <div class="input-container"><input class="input-field" type="password" id="password" v-model="password"
          placeholder="password" required> </div>
      <div class="submit-container">
        <button class="signin-button" type="submit">Sign in</button>
        <!-- 로그아웃 테스트 용 -->
        <!-- <button class="signout-button" type="button" @click="submitLogout">로그아웃</button> -->
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
    }
  }
}
</script>

<style> 
  .signin-container {
    width: 80%;
    max-width: 680px;
    min-height: 480px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
  }

  .logo-image {
    margin-top: 2rem;
    width: 70%;
    max-width: 300px;
    margin-bottom: 2rem;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }

  .input-field {
    width: 100%;
    padding: 0.5rem;
    margin-top: 0.1rem;
    border: 2px solid purple;
    border-radius: 5px;
    font-size: 1rem;
    outline: none;
  }

  .signin-button {
    background-color: black;
    color: darkgray;
    border: 0;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
    font-family: Montserrat;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: 0.5px;
  }


 .signin-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.25);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

 .submit-container {
   display: flex;
   justify-content: right;
   width: 100%;
 }</style>