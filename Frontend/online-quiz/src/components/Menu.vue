<template>
  <div id="menu">
    <div class="navigation">
      <router-link :to="{name: 'Home'}" class="link menu-link">Home</router-link>
      <span v-if="this.$cookies.get('token') != null">
        <router-link
          :to="{ name: 'TakeQuiz'}"
          class="link menu-link"
          >Take Quiz</router-link
        >
        <router-link :to="{ name: 'MakeQuiz'}" class="link menu-link"
          >Make Quiz</router-link
        >
        <router-link :to="{name: 'ManagerQuiz'}" class="link menu-link"
          >Manage Quiz</router-link
        >
        <a @click="logOut" class="link menu-link">Log Out </a>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "menu",
  methods: {
    logOut() {
      let allCookies = this.$cookies.keys();
      allCookies.forEach(element => {
        this.$cookies.remove(element);
      });
      this.$router.push("/");
      window.location.reload();
    }
  }
};
</script>

<style>
#menu {
  margin: 0 auto;
  background-image: url("../assets/menu_bg.gif");
  width: 663px;
  height: 51px;
}
.navigation {
  position: relative;
  top: 25%;
  padding: 0px 40px 0px 40px;
  display: inline-block;
}

.menu-link {
  font-size: 20px;
  font-weight: bolder;
  color: #62584d;
  margin-right: 25px;
  cursor: pointer;
}
</style>