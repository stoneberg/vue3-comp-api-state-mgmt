import { reactive, readonly, computed, watch } from "vue";
import loginService from "@/services/loginService";

const STATE_NAME = "userState";

const defaultState = {
  userData: {
    firstName: "",
    lastName: "",
  },
  isLoggedIn: false,
  loading: false,
};

const getDefaultState = () => {
  if (localStorage.getItem(STATE_NAME)) {
    return JSON.parse(localStorage.getItem(STATE_NAME));
  }
  return defaultState;
};

const state = reactive(getDefaultState());

const getters = {
  getFullName() {
    return computed(
      () => `${state.userData.firstName} ${state.userData.lastName}`
    );
  },
  getIsLoggedIn() {
    return computed(() => state.isLoggedIn);
  },
};

const actions = {
  async login() {
    try {
      const response = await loginService.signin();
      console.log("response>>>", response);
      actions.updateUserData(response);
      return response;
    } catch (e) {
      console.error(e);
      actions.updateLoading(false);
    }
    // finally {
    //   actions.updateLoading(false);
    // }
  },

  updateUserData({ firstName, lastName }) {
    state.userData.firstName = firstName;
    state.userData.lastName = lastName;

    actions.updateIsLoggedIn(true);
  },
  updateIsLoggedIn(isLoggedIn) {
    state.isLoggedIn = isLoggedIn;
    if (!isLoggedIn) {
      state.userData.firstName = "";
      state.userData.lastName = "";
    }
  },
  updateLoading(loadingStatus) {
    state.loading = loadingStatus;
  },
};

watch(
  () => state,
  () => {
    localStorage.setItem(STATE_NAME, JSON.stringify(state));
  },
  { deep: true }
);

export default () => {
  if (!localStorage.getItem(STATE_NAME)) {
    localStorage.setItem(STATE_NAME, JSON.stringify(state));
  }

  return {
    state: readonly(state),
    getters,
    actions,
  };
};
