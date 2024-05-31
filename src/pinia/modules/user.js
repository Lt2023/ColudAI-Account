import { defineStore } from "pinia"

export const useUserInfoStore = defineStore('userInfoStore', {
    state: () => {
        return {
            userInfo: {
                createdAt: '',
                fields: {
                    'Wey ID': '',
                    'Wey卡号': '',
                    'ip地址': '',
                    'weycloud': '',
                    'weycloudpicture': '',
                    '付款码': '',
                    '关注': '',
                    '创作总数': '',
                    '动态': '',
                    '头像': '',
                    '密码': '',
                    '帐号安全状态': '',
                    '收藏': '',
                    '服务器': '',
                    '点赞': '',
                    '用户名': '',
                    '积分': '',
                    '粉丝': '',
                    '蓝V服务': '',
                    '邮箱': ''
                },
                recordId: '',
                updatedAt: ''
            },
            registerInfo: {
                username: '',
                password: ''
            }
        }
    },
    actions: {
        login(userInfo) {
            this.userInfo = userInfo
        },
        register(info) {
            const { username, password } = info
            this.registerInfo.username = username
            this.registerInfo.password = password
        }
    }
})