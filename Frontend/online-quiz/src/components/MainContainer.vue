<template>
  <div id="main-container">
    <div class="header"></div>
    <div class="content">
      <Menu></Menu>
      <div class="main">
        <div class="main-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from "./Menu.vue";

export default {
  name: "MainContainer",
  components: {
    Menu
  },
  
  
};
</script>

<style>
#main-container {
  margin: 0 auto;
  width: 700px;
  padding: 30px;
}
.header {
  background-image: url("../assets/top_box.gif");
  width: 700px;
  height: 19px;
}

.content {
  width: 660px;
  padding: 0px 20px 70px 20px;
  background-color: #ffffff;
  min-height: 250px;
}

.main {
  padding: 0px 20px 20px 20px;
  width: 623px;
}

.main-content {
  width: 100%;
  background-color: #ffffff;
}
</style>