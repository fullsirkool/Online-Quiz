import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './components/Home.vue'
import Register from './components/Register.vue'
import DoQuiz from './components/DoQuiz.vue'
import TakeQuiz from './components/TakeQuiz.vue'
import Result from './components/Result.vue'
import MakeQuiz from './components/MakeQuiz.vue'
import ManagerQuiz from './components/ManagerQuiz.vue'

Vue.use(VueRouter)

export const router = new VueRouter({
    mode: 'history',
    routes: [
        { name: 'Home', path: '/', component: Home, props: true },
        { name: 'Register', path: '/register', component: Register },
        { name: 'DoQuiz', path: '/doquiz/:questionId', component: DoQuiz, props: true },
        { name: 'TakeQuiz', path: '/takequiz', component: TakeQuiz, props: true },
        { name: 'Result', path: '/result', component: Result, props: true },
        { name: 'MakeQuiz', path: '/makequiz', component: MakeQuiz },
        { name: 'ManagerQuiz', path: '/managerquiz/:pageIndex', component: ManagerQuiz, props: true },
    ]
})

router.beforeEach((to, from, next) => {
    let documentTitle = to.name
    document.title = documentTitle
    next()
})