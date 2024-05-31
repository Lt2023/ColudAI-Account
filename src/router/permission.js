// 引入pinia
import pinia from '../pinia'
import { useUserInfoStore } from '../pinia/modules/user'
const userInfoStore = useUserInfoStore(pinia)
import router from './index'

router.beforeEach((to, from ,next) => {
    window.document.title = to.meta.title
    let needLogin = to.matched.some(item => item.meta.needLogin)
    if (needLogin) {
        let isLogin = userInfoStore.userInfo.recordId
        if (isLogin) {
            next()
        } else {
            next('/login')
        }
    } else {
        next()
    }
})