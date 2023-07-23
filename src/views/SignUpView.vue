<template>
  <div class="signup-container">
    <div class="sign-logo-container">
      <a href="/chat"><img src="../assets/howcanai_logo.svg" alt="Logo" class="logo-image" /></a>
    </div>
    <form @submit.prevent="submitForm">
      <div class="signup-form">
      <div class="input-container">
        <input class="input-field" type="text" id="username" v-model="username" placeholder="username" required>
      </div>
      <div class="input-container">
        <input class="input-field" type="email" id="email" v-model="email" placeholder="email" required>
      </div>
      <div class="input-container">
        <input class="input-field" type="password" id="password" v-model="password" placeholder="password" required>
      </div>
      <div class="input-container">
        <input class="input-field" type="password" id="confirm_password" v-model="confirm_password"
          placeholder="check your password" required>
      </div>
      </div>
      <div class="submit-container">
        <button class="signup-button" type="submit">submit</button>
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
      email: '',
      password: '',
      confirm_password: '',
    };
  },
  methods: {
    submitForm() {
      if (this.password !== this.confirm_password) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }
      // 가입 폼 데이터 만들기
      const formData = {
        username: this.username,
        password: this.password,
        confirm_password: this.confirm_password,
        email: this.email
      };

      // 백엔드로 데이터 전송
      // 가입처리 URL로 POST 요청
      axios.post('/user/create', formData)
        .then(response => {
          // 요청이 성공한 경우 처리 로직 작성
          console.log(response.data);
          this.goToSignIn();
          // // 모달창 닫히게 하기 위한 가입 성공 이벤트 발생
          // this.$emit('signUpSuccess');
          
          // 가입 처리 완료 후 리셋
          this.username = '';
          this.email = '';
          this.password = '';
          this.confirm_password = '';
        })
        .catch(error => {
          // 요청이 실패한 경우 처리 로직 작성
          console.error(error);
        });
    },
    async goToSignIn() {
  this.$router.push('/signin/');
}
  },
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

.signup-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  background-color: black;
  padding: 0 16px;
  box-sizing: border-box;
}

/* .sign-logo-container {
  margin: 40px;
} */
.logo-image {
  display: block;
  width: 100%;
  max-width: 260px;
  margin-bottom: 24px;
}

.signup-form {
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
  /* padding: 8px 16px; */
  padding: 12px 22px;
  border: 1px solid #999;
  border-radius: 22px;
  font-family: Montserrat, sans-serif;
  font-style: normal;
  /* font-weight: 500; */
  font-size: 14px;
  box-sizing: border-box;
  outline: none;
}

.signup-button {
  margin-right: 0px;
  margin-left: 0px;
  margin: 12px 0 0 0;
  background-color: #3c3c3c;
  /* padding: 8px 16px; */
  padding: 12px 22px;

  border: none;
  border-radius: 22px;
  color: #999;
  font-family: Montserrat, sans-serif;
  font-style: normal;
  /* font-weight: 500; */
  font-size: 14px;
  cursor: pointer;
  width: 100%;
}

.signup-button:hover {
  background-color: #666;
  color: #fff;
  transition: 300ms;
}
</style>