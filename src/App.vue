<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
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
  height: 100%;
}

body {
  background-color: black;
  position: relative;
  height: 100vh;
  margin: 0;
  padding: 0;
  /* mobile viewport bug fix */
  height: calc(var(--vh, 1vh) * 100);
}

::-webkit-scrollbar {
  width: 0px;
}
</style>
