const layoutModule = {
  namespaced: true, // 이거 때문에 연결 안 돼서 한참 헤맴
  state: {
    isSideBarOpen: false,
    sideBarWidth: 0,
  },
  mutations: {
    OPEN_SIDEBAR(state) {
      state.isSideBarOpen = true;
      state.sideBarWidth= 240;
    },
    CLOSE_SIDEBAR(state) {
      state.isSideBarOpen = false;
      state.sideBarWidth = 0;
    }
  },
  actions: {
    openSideBar({ commit }) {
      commit('OPEN_SIDEBAR');
    },
    closeSideBar({ commit }) {
      commit('CLOSE_SIDEBAR');
    }
  },
};

export default layoutModule;