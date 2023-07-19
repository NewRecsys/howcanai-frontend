<template>
  <SideBar></SideBar>
  <MainPage></MainPage>
</template>

<script>
// import store from '../store/index.js';
import { mapMutations, mapState } from 'vuex';
import SideBar from '../components/SideBar.vue'
import MainPage from '../components/MainPage.vue'

export default {
  name: 'App',
  components: {
    SideBar,
    MainPage
  },
  methods: {
    ...mapMutations(['addChat']),
  },
  computed: {
    ...mapState(['chatList']), // chatList 상태를 가져옴
  },
  // beforeRouteEnter(to, from, next) {
  //   store.dispatch('resetChatRoom');
  //   store.dispatch('fetchChatList')
  //     .then((chatList) => {
  //       next(vm => {
  //         // 데이터를 가져온 후, ChatMainArea 컴포넌트에 전달
  //         vm.chatList = chatList;
  //       });
  //     })
  //     .catch(error => {
  //       console.error(error);
  //       next(false); // 라우트 진입을 중단하고 에러 처리
  //     });
  // },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

#app {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0.5px;
}

body {
  background-color: black;
  position: relative;
  height: 100vh;
  margin: 0;
  padding: 0;
}

</style>
