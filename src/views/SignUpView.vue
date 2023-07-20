<template>
  <div class="signup-container">
    <img src="../assets/howcanai_logo.svg" alt="Logo" class="logo-image" />
    <form @submit.prevent="submitForm">
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
    }
  },
}
</script>

<style>
.signup-container {
  width: 80%;
  max-width: 680px;
  min-height: 480px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
}

.input-container {
  display: flex;
  padding: 6px;
  justify-content: center;
  align-items: center;
  /* flex-shrink: 0; */
  /* border-radius: 17px; */
  /* background: #464646; */
}

.input-container input {
  /* width: 580px;
  height: 48px;
  border-radius: 36px; */
  color: #ECECEC;
  border: 1px solid #979797;
  background-color: transparent;
  width: 300px;
  height: 20px;
  padding: 10px 30px;
  font-size: 16px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  /* padding-left: 32px;
  font-size: 16px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  display: flex;
  width: 300px;
  height: 20px;
  padding: 10px 30px; */
  /* justify-content: center;
  align-items: center;
  gap: 10px; */
  flex-shrink: 0;
  border-radius: 20px;
  /* background: #464646; */
  outline: none;
  opacity: 0.7;
}

.input-container input:focus {
  color: white;
  opacity: 1;
  transition: 300ms;

}

.input-container input::placeholder {
  color: #979797;
  font-size: 14px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.input-container button {
  /* width: 580px;
  height: 48px;
  border-radius: 36px; */
  color: #ECECEC;
  border: 1px solid #979797;
  background-color: #979797;
  width: 300px;
  height: 20px;
  padding: 10px 30px;
  font-size: 16px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  /* padding-left: 32px;
  font-size: 16px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  display: flex;
  width: 300px;
  height: 20px;
  padding: 10px 30px; */
  /* justify-content: center;
  align-items: center;
  gap: 10px; */
  flex-shrink: 0;
  border-radius: 20px;
  /* background: #464646; */
  outline: none;
  opacity: 0.7;
}

.signup-button {
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

.signup-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.25);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.submit-container {
  display: flex;
  justify-content: right;
  width: 100%;
}</style>