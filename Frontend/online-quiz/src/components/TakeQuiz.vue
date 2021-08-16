<template>
  <div id="takequiz">
    <div class="top-main">
      <span class="text">Welcome </span
      ><span class="highlight">{{ getName }}</span>
    </div>
    <div>
      <span class="text">Enter number of question: </span><br />
      <input type="number" v-model="questionNumber" /><br />
      <button class="fl-right" @click="doQuiz()">Start</button>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import jwt_decode from "jwt-decode";
export default {
  name: "TakeQuiz",
  data() {
    return {
      questionNumber: 4
    };
  },
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
  methods: {
    async doQuiz() {
      await Axios.get(`https://localhost:44342/api/Questions/GetToTalQuestion`)
        .then(response => {
          if (
            this.questionNumber <= parseInt(response.data) &&
            this.questionNumber > 0
          ) {
            this.getQuestions();
          } else {
            alert(`Please input again`);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    async getQuestions() {
      let questionCodes = new Array();
      await Axios.get(
        `https://localhost:44342/api/Questions/GetQuestionCodes`,
        {
          params: {
            numberOfQuestion: this.questionNumber
          }
        }
      )
        .then(response => {
          questionCodes = response.data;
        })
        .catch(error => {
          console.log(error);
        });

      this.$cookies.set(
        "questions",
        JSON.stringify(questionCodes),
        `${this.questionNumber}min`,
        "",
        "",
        [{ httpOnly: true }]
      );

      this.$router.replace({
        name: "DoQuiz",
        params: {
          questionId: questionCodes[0]
        }
      });
    }
  }
};
</script>

<style>
#takequiz {
  width: 50%;
}
</style>