import { createRouter, createWebHashHistory } from 'vue-router'

export default createRouter({
    history: createWebHashHistory(),
    // 滚动行为
    scrollBehavior() {
        return {
            top: 0,
            left: 0
        }
    },
    routes: [
        {
            path: '/',
            name: 'index',
            component: () => import('../views/Index.vue'),
            meta: {
                title: 'ColudAI首页',
                needLogin: true
            }
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/Login.vue'),
            meta: {
                title: 'ColudAI账号登录',
                needLogin: false
            }
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/Register.vue'),
            meta: {
                title: 'ColudAI账号注册',
                needLogin: false
            }
        }
    ]
})