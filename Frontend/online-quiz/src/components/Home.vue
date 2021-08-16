<template>
  <div id="login">
    <div v-if="this.$cookies.get('token') != null" class="top-main">
      <span class="text">Welcome </span><span class="highlight">{{getName}}</span>
    </div>
    <div
      v-if="this.$cookies.get('token') == null"
      class="title highlight top-main"
    >
      <div class="top-main">
        Login Form
      </div>
      <table>
        <tr>
          <td class="text pd-right">User Name:</td>
          <td><input type="email" v-model="email" placeholder="Email" /></td>
        </tr>
        <tr>
          <td class="text pd-right">Password:</td>
          <td>
            <input type="password" v-model="password" placeholder="Password" />
          </td>
        </tr>
        <tr>
          <td class="pd-right"></td>
          <td>
            <button @click="login">Sign in</button>
            <router-link to="register" class="link text"> Register</router-link>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import jwt_decode from "jwt-decode";
export default {
  name: "login",
  computed: {
    getName() {
      if (this.$cookies.get("token") != null) {
        let token = this.$cookies.get("token");
        let decodeValue = jwt_decode(token);
        return decodeValue.UserName;
      } else {
        return null;
      }
    }
  },
  data() {
    return {
      email: "minhlaanhihi@gmail.com",
      password: "123456"
    };
  },
  methods: {
    async login() {
      await Axios.post(`https://localhost:44342/api/Token`, {
        Email: this.email,
        Password: this.password
      })
        .then(response => {
          console.log(response.data);
          this.$cookies.set("token", response.data, "1d", "", "", [
            { httpOnly: true }
          ]);
          window.location.reload();
          this.$router.push({name: 'Home'});
        })
        .catch(error => {
          console.log(error);
        });
    },
  }
};
</script>

<style>
</style>