<template>
  <div class="signup-container">
    <div class="input-title" style="width: 100%; border-bottom: 1px solid rgba(75, 75, 70, 0.60);; ">
      <img src="../assets/sideLogo.svg" style="padding: 14px;">
    </div>
    <!-- <h1>회원가입</h1> -->
    <form @submit.prevent="submitForm" style="color: white;">
      <div class="input-container" style="padding-top: 20px;">
        <!-- <label for="username">username:</label> -->
        <input type="text" placeholder="username" id="username" v-model="username" required>
      </div>
      <div class="input-container"> 
        <!-- <label for="email">email:</label> -->
        <input type="email" placeholder="email" id="email" v-model="email" required>
      </div>
      <div class="input-container">
        <!-- <label for="password">password:</label> -->
        <input class="input-container" type="password" placeholder="password" id="password" v-model="password" required>
      </div>
      <div class="input-container">
        <!-- <label for="confirm_password">confirm password:</label> -->
        <input type="password" placeholder="check your password" id="confirm_password" v-model="confirm_password" required>
      </div>
      <div style="bottom:0;">
      <div class="input-container">
        <button type="submit">submit</button>
      </div>
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
      axios.post('http://49.50.160.214:30005/api/user/create', formData)
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
  display: flex; flex-direction: column;
  width: 680px;
  height: 480px;
  border-radius: 16px;
  background: #242424;
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

</style>