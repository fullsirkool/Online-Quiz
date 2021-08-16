<template>
  <div id="app">
    <MainContainer></MainContainer>
  </div>
</template>

<script>
import MainContainer from "./components/MainContainer.vue";
export default {
  name: "App",
  components: {
    MainContainer
  }
};
</script>

<style>
#app {
  font-family: sans-serif;
  height: 886px;
  margin: 0;
  background-image: url("./assets/bg.jpg");
  background-repeat: repeat-x;
}

body {
  margin: 0 auto;
}
.top-main{
  margin: 30px 0px 30px 0px;
}
.title {
  font-size: 20px;
  font-weight: bold;
}
.highlight {
  color: #0000ff;
}
.danger{
  color: #FF0000;
}
.text {
  font-size: 17px;
  font-weight: lighter;
  color: #436478;
}
.link {
  text-decoration: none;
  cursor: pointer;
}
.text-bold{
  font-weight: bold;
}
.pd-right {
  padding-right: 30px;
}
.fl-right{
  float: right;
}
</style>
