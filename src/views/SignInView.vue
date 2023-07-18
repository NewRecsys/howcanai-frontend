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
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    // 로그인 어떻게 구현? 
    submitForm() {
      const requestData = {
        username: this.username,
        password: this.password,
      };

      axios.post('http://49.50.160.214:30005/api/user/login', requestData)
        .then(response => {
          const accessToken = response.data.access_token;
          const tokenType = response.data.token_type;
          const username = response.data.username;

          // 로그인 성공 처리 로직 작성
          console.log(`로그인 성공! Access Token: ${accessToken}`);
          console.log(`Token Type: ${tokenType}`);
          console.log(`Username: ${username}`);

          // 로그인 성공 후 리다이렉트 또는 다른 작업 수행
        })
        .catch(error => {
          // 로그인 실패 처리 로직 작성
          console.error('로그인 실패!', error);
          
        });
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