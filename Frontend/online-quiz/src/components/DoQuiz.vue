<template>
  <div id="doquiz">
    <div class="top-main">
      <div>
        <span class="text">Welcome </span
        ><span class="highlight">{{ getName }}</span>
      </div>
      <div class="fl-right">
        <span class="text">Time remaining: </span
        ><span class="danger">10:03</span>
      </div>
    </div>
    <div class="text">
      <span>{{ currentQuestion.content }}</span
      ><br />

      <div v-for="(answer, index) in currentQuestion.answers" :key="answer">
        <input type="checkbox" v-model="checkedOption" :value="index" />{{
          answer.content
        }}
      </div>

      <button
        v-if="currentQuestionLocation < quetionsArray.length - 1"
        class="fl-right"
        @click="nextQuestion"
      >
        Next
      </button>
      <button
        v-if="currentQuestionLocation == quetionsArray.length - 1"
        class="fl-right"
        @click="finish()"
      >
        Finish
      </button>
    </div>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
import Axios from "axios";
export default {
  name: "doquiz",
  props: {
    questionId: Number
  },
  data() {
    return {
      quetionsArray: [],
      currentQuestionLocation: 0,
      currentQuestion: {},
      checkedOption: []
    };
  },
  mounted() {
    this.quetionsArray = JSON.parse(this.$cookies.get("questions"));
    this.getQuestion();
  },
  watch: {
    questionId: function() {
      this.getQuestion();
    }
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
    nextQuestion() {
      this.addQuestion();
      this.currentQuestionLocation += 1;
      this.$router.replace({
        name: "DoQuiz",
        params: {
          questionId: this.quetionsArray[this.currentQuestionLocation]
        }
      });
    },
    addQuestion() {
      let userAnswer = null;
      if (this.$cookies.get("userAnswer") != null) {
        let a = this.$cookies.get("userAnswer");
        userAnswer = JSON.parse(a);
      } else {
        userAnswer = new Array();
      }

      let answers = new Array();
      this.checkedOption.forEach(element => {
        answers.push({ answerId: element });
      });

      userAnswer.push({
        questionId: this.quetionsArray[this.currentQuestionLocation],
        answers: answers
      });

      this.$cookies.set(
        "userAnswer",
        JSON.stringify(userAnswer),
        `${this.quetionsArray.length}min`
      );
    },
    finish() {
      this.addQuestion();
      this.$router.replace({
        name: "Result"
      });
    },
    getQuestion() {
      Axios.get(`https://localhost:44342/api/Questions/${this.questionId}`)
        .then(response => {
          console.log(response.data);
          this.currentQuestion = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style>
#doquiz {
  width: 70%;
}
</style>