<template>
  <div id="makequiz">
    <div class="top-main"></div>
    <table class="text">
      <tr>
        <td>Question:</td>
        <td>
          <textarea rows="8" cols="60" v-model="questionContent"></textarea>
        </td>
      </tr>
      <tr>
        <td>Option1:</td>
        <td>
          <textarea rows="3" cols="60" v-model="answerContent[0]"></textarea>
        </td>
      </tr>
      <tr>
        <td>Option2:</td>
        <td>
          <textarea rows="3" cols="60" v-model="answerContent[1]"></textarea>
        </td>
      </tr>
      <tr>
        <td>Option3:</td>
        <td>
          <textarea rows="3" cols="60" v-model="answerContent[2]"></textarea>
        </td>
      </tr>
      <tr>
        <td>Option4:</td>
        <td>
          <textarea rows="3" cols="60" v-model="answerContent[3]"></textarea>
        </td>
      </tr>
      <tr>
        <td>Answer(s):</td>
        <td>
          <input type="checkbox" v-model="checkedOption" value="1" />Option 1
          <input type="checkbox" v-model="checkedOption" value="2" />Option 2
          <input type="checkbox" v-model="checkedOption" value="3" />Option 3
          <input type="checkbox" v-model="checkedOption" value="4" />Option 4
        </td>
      </tr>
      <tr>
        <td></td>
        <td><button @click="submit">Save</button></td>
      </tr>
    </table>
  </div>
</template>

<script>
import Axios from "axios";
import jwt_decode from "jwt-decode";

export default {
  name: "makequiz",
  data() {
    return {
      questionContent: "",
      answerContent: ["", "", "", ""],
      checkedOption: []
    };
  },
  methods: {
    async submit() {
      let answers = [];
      for (let i = 0; i < this.answerContent.length; i++) {
        let isChecked = false;
        for (let j = 0; j < this.checkedOption.length; j++) {
          if (this.checkedOption[j] == i + 1) {
            isChecked = true;
          }
        }
        answers.push({
          answerId: i,
          content: this.answerContent[i],
          isTrue: isChecked
        });
      }
      let question = {
        content: this.questionContent,
        userId:  parseInt(this.getUserID()),
        answers: answers
      };
      console.log(question);
      await Axios.post(`https://localhost:44342/api/Questions`, question, {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("token")}`
        }
      })
        .then(response => {
          console.log(response.data);
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
    }
  }
};
</script>

<style>
#makequiz table td:first-child {
  vertical-align: top;
}
</style>