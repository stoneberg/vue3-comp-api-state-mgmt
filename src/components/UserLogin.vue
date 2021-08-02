<template>
  <form @submit.prevent="onSubmit()">
    <label>
      Email:
      <input type="email" v-model="email" />
    </label>

    <label>
      Password:
      <input type="password" v-model="password" />
    </label>

    <button type="submit" :disabled="userState.loading">
      {{ userState.loading ? "Loading..." : "Submit" }}
    </button>
  </form>
</template>

<script>
import { reactive, toRefs } from "vue";
import useUserStore from "@/store/useUserStore";

export default {
  name: "UserLogin",
  setup: () => {
    const userForm = reactive({
      email: "",
      password: "",
    });

    const { state: userState, actions: userActions } = useUserStore();

    const onSubmit = () => {
      userActions.updateLoading(true);
      userActions.login()
        .then(() => userActions.updateLoading(false))
    };

    return {
      ...toRefs(userForm),
      onSubmit,
      userState,
    };
  },
};
</script>

<style></style>
