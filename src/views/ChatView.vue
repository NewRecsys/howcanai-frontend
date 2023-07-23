<template>
  <div class="index-container">
    <!-- TOP BAR -->
    <div class="top">
      <!-- top -->
      <button class="sidebar-button" @click="openSideBar"
      >{{ toggleButton }}</button>
    </div>

    <!-- SIDE BAR -->
    <div class="sidebar-background" v-if="isSideBarOpen" @click="closeSideBar">
      <div class="sidebar" :style="{ width: sideBarWidth + 'px'}" @click.stop>
        <side-bar></side-bar>
      </div>
    </div>
    <div class="side"><side-bar></side-bar></div>

    <!-- MAIN PAGE -->
    <div class="mainpart"><main-page></main-page></div>
  </div>
</template>

<script>
import MainPage from '@/components/MainPage.vue';
import SideBar from '@/components/SideBar.vue';

export default {
  components: { MainPage, SideBar },
  name: "IndexView",
  data() {
    return {
      isSideBarOpen: false,
      sideBarWidth: 0,
    }
  },
  methods: {
    openSideBar() {
      this.isSideBarOpen = true;
      this.sideBarWidth = 240;
    },
    closeSideBar() {
      this.isSideBarOpen = false;
      this.sideBarWidth = 0;
    }
  },
  computed: {
    toggleButton() {
      return this.isSideBarOpen ? '<' : '☰';
    },
  }
};
</script>

<style>
.sidebar-button {
  color: white; 
  height: 80%; 
  font-size: 38px; 
  background-color: #ffffff00; 
  border-width: 0; 
  cursor: pointer;
}

  .sidebar-background {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background-color: #000000e4;
  }
  .sidebar {
    position: fixed;
    transition: 300ms;
    position: fixed;
    z-index: 100;
  }
  .index-container {
    height: 100vh;
  }

  .top {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    height: 48px;
    background-color: #000000;
    z-index: 99;
  }

  .side {
    position: fixed;
    top: 48px;
    bottom: 0;
    left: 0;
    width: 240px;
    height: calc(100% - 48px);
    background-color: #000000;
  }

  /* .mainpart {
    margin-top: 88px;
    margin-left: 240px;
    height: calc(100% - 88px);
    background-color: #e9ecef;
  } */

  .mainpart {
    /* margin-top: 20px; */
    margin-top: 0px;
    /* margin-top: 0 으로 하면 스크롤 사라지는거 되는데 그러면 top bar 어떻게 바꿀지 생각해봐야 함... */
    margin-left: 240px;
    /* height: calc(100% - 68px); */
    background-color: #000000;
    display: flex;
    justify-content: center;
    align-items: center;
    /* height: 100vh; */

    height: 100%;
    /* box-sizing: border-box; */

  }

  @media (max-width: 859px) {
    .side {
      display: none;
    }
    .mainpart {
      margin-left: 0;
      margin-top: 0;
    }
    .signin-container, .signup-container {
      flex-direction: column;
      height: 100vh;
      gap: 28px;
    }
  }

  @media (min-width: 860px) {
    .top {
      display: none;
    }
    .mainpart {
      margin-top: 0;
    }
  }
</style>