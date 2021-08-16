<template>
  <div id="result">
    <div class="top-main">
      <span class="text">Your score </span
      ><span class="highlight"
        >{{ score * 10 }} ({{ score * 100 }}%) - Passed</span
      >
    </div>
    <div>
      <span class="text">Take another test </span>
      <button @click="redo">Start</button>
    </div>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
import Axios from "axios";
export default {
  name: "result",
  data() {
    return {
      score: 0,
      questions: []
    };
  },
  mounted() {
    let a = this.$cookies.get("userAnswer");
    if (a != null) {
      this.questions = JSON.parse(a);
      this.getScore();
      let userId = this.getUserID();
      console.log(userId);
    }
  },
  methods: {
    async getScore() {
      await Axios.post(
        "https://localhost:44342/api/Questions/GetMarkForQuestion",
        this.questions
      )
        .then(response => {
          this.score = response.data.toFixed(1);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getUserID() {
      if (this.$cookies.get("token") != null) {
        let token = this.$cookies.get("token");
        let decodeValue = jwt_decode(token);
        return decodeValue.UserID;
      } else {
        return null;
      }
    },
    redo() {
      this.$cookies.remove("userAnswer");
      this.$cookies.remove("questions");
      this.$router.replace({ name: "TakeQuiz" });
    }
  }
};
</script>

<style>
</style>