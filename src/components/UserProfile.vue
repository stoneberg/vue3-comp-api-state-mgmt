<template>
  <div>
    <h3>User: {{ fullName }}</h3>
    <button @click="updateIsLoggedIn(false)">Logout</button>
  </div>
</template>

<script>
import useUserStore from "@/store/useUserStore";

export default {
  name: "UserProfile",
  setup: () => {
    const { getters: userGetters, actions: userActions } = useUserStore();

    return {
      fullName: userGetters.getFullName(),
      updateIsLoggedIn: userActions.updateIsLoggedIn,
    };
  },
};
</script>

<style></style>
