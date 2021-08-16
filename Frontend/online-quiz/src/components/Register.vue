<template>
  <div id="register">
    <div class="title highlight top-main">Registration Form</div>
    <table>
      <tr>
        <td class="text pd-right">User Name:</td>
        <td>
          <input
            type="text"
            v-model="username"
            placeholder="User Name"
            required
          />
        </td>
      </tr>
      <tr>
        <td class="text pd-right">Password:</td>
        <td>
          <input
            type="password"
            v-model="password"
            placeholder="Password"
            required
          />
        </td>
      </tr>
      <tr>
        <td class="text pd-right">User Type:</td>
        <td>
          <select v-model="userType">
            <option value="1">Teacher</option>
            <option value="2">Student</option>
          </select>
        </td>
      </tr>
      <tr>
        <td class="text pd-right">Email:</td>
        <td>
          <input type="email" v-model="email" placeholder="Email" required />
        </td>
      </tr>
      <tr>
        <td></td>
        <td>
          <button @click="regist">Register</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "register",
  data() {
    return {
      username: "",
      password: "",
      userType: 1,
      email: ""
    };
  },
  methods: {
    async regist() {
      let user = {
        username: this.username,
        password: this.password,
        email: this.email,
        type: this.userType
      };

      if (
        this.username == "" ||
        this.password == "" ||
        this.email == "" ||
        (this.userType != 1 && this.userType != 2)
      ) {
        alert("Please input full fill!");
      } else {
        await Axios.post(`https://localhost:44342/api/Users`, user)
          .then(respone => {
            console.log(respone.data);
            if (respone.data != "") {
              let r = confirm("Register Success! Login?");
              if (r == true) {
                this.$router.push("home");
              }
            } else {
              alert("Duplicated email!");
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
};
</script>

<style>
</style>