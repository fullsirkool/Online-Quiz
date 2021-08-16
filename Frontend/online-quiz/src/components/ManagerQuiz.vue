<template>
  <div id="managerquiz">
    <div class="top-main text">
      <span class="text">Welcome </span
      ><span class="highlight">{{ getName }}</span>
    </div>
    <table>
      <tr class="highlight text-bold">
        <td>Question</td>
        <td>DateCreated</td>
        <td>Active</td>
      </tr>
      <tr v-for="question in questions" :key="question" class="text">
        <td>{{ question.content }}</td>
        <td>{{ getFormatDate(question.createDate) }}</td>
        <td>
          <div class="link" @click="deleteQuestion(question.questionId)">
            Delete
          </div>
        </td>
      </tr>
      <div class="paging">
        <router-link
          v-for="page in pages"
          :to="{ name: 'ManagerQuiz', params: { pageIndex: page } }"
          :key="page"
          class="page-link link"
          :class="{active : page == pageIndex}"
          >{{ page }}</router-link
        >
      </div>
    </table>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
import Axios from "axios";
import moment from "moment";
export default {
  name: "manager",
  props: {
    pageIndex: Number
  },
  data() {
    return {
      questions: [],
      pages: 1
    };
  },
  mounted() {
    this.getQuestion();
    this.getPages();
  },
  watch: {
    pageIndex: function() {
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
    async getQuestion() {
      let token = this.$cookies.get("token");
      if (this.pageIndex == null) {
        this.pageIndex = 1;
      }
      const size = 3;
      await Axios.get(
        "https://localhost:44342/api/Questions/GetPagingQuestion",
        {
          params: {
            pageIndex: this.pageIndex,
            pageSize: size
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
        .then(response => {
          this.questions = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getFormatDate(createdDate) {
      return moment(createdDate).format("YYYY-MM-DD");
    },
    async deleteQuestion(questionId) {
      let token = this.$cookies.get("token");
      await Axios.delete(
        `https://localhost:44342/api/Questions/${questionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
      this.getQuestion();
    },
    async getPages() {
      const size = 3;
      let token = this.$cookies.get("token");
      await Axios.get(
        `https://localhost:44342/api/Questions/GetToTalQuestion`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      ).then(response => {
        let rawPage = parseFloat(response.data) / size;
        let intPage = parseInt(rawPage);
        this.pages = intPage == rawPage ? rawPage : intPage + 1;
      });
    }
  }
};
</script>

<style>
#managerquiz table {
  width: 100%;
}
#managerquiz th {
  width: 100%;
  float: left;
}
#managerquiz table td:first-child {
  width: 70%;
}
#managerquiz table td:last-child {
  width: 30%;
}
.paging {
  margin-top: 50px;
}
.page-link {
  font-size: 15px;
  font-weight: lighter;
  padding: 3px;
  border: 1px solid #436478;
  margin-right: 5px;
  color: #436478;
}
.active {
  font-weight: bold;
  border: 2px solid #436478;
}
</style>