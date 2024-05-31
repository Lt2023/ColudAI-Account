<template>
    <bg>
        <div class="content">
            <div class="header">
                <div class="user-pic">
                    <img v-if="userInfoStore.userInfo.fields.头像" :src="userInfoStore.userInfo.fields.头像.title" alt="">
                </div>
                <div class="nick">Hello, <span>{{ userInfoStore.userInfo.fields.用户名 }}</span></div>
                <div class="icon">
                    <img src="../assets/layers.png" alt="">
                </div>
            </div>
            <ul class="other-info">
                <li>
                    <div class="title">邮箱: </div>
                    <span>{{ userInfoStore.userInfo.fields.邮箱 }}</span>
                </li>
                <li>
                    <div class="title">关注: </div>
                    <span>{{ userInfoStore.userInfo.fields.关注 }}</span>
                </li>
                <li>
                    <div class="title">粉丝: </div>
                    <span>{{ userInfoStore.userInfo.fields.粉丝 }}</span>
                </li>
                <li>
                    <div class="title">Wey ID: </div>
                    <span>{{ userInfoStore.userInfo.fields['Wey ID'] }}</span>
                </li>
                <li>
                    <div class="title">Wey卡号: </div>
                    <span>{{ userInfoStore.userInfo.fields.Wey卡号 }}</span>
                </li>
                <li>
                    <div class="title">密码安全程度: </div>
                    <span>{{ userInfoStore.userInfo.fields.帐号安全状态 }}</span>
                </li>
            </ul>
            <div class="footer-box">
                <div class="title">帐号安全状态:</div>
                <div class="progress">
                    <a-progress type="circle" :percent="progressNum" :strokeColor="progressNum > 60 ? '#4C81FF' : '#FF4C4C'" size="small" />
                </div>
            </div>
        </div>
    </bg>
</template>

<script setup>
import { computed } from 'vue';
import bg from '../components/bg.vue'
import { useUserInfoStore } from '../pinia/modules/user'
const userInfoStore = useUserInfoStore()

const progressNum = computed(() => {
    let s = userInfoStore.userInfo.fields.帐号安全状态
    let res = s.replace("%", "")
    return new Number(res)
})
</script>

<style lang="scss" scoped>
.content {
    width: 600px;
    background-color: #ffffff;
    border: 5px solid #4C81FF;
    border-radius: 20px;
    padding: 15px;
    display: flex;
    flex-direction: column;

    .header {
        width: 100%;
        height: 50px;
        display: flex;
        margin-bottom: 15px;

        .user-pic {
            width: 50px;
            height: 50px;
            background-color: #D8D8D8;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 10px;
        }

        .nick {
            flex: 1;
            line-height: 50px;
            font-size: 20px;
            width: 400px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .icon {
            width: 30px;
            height: 30px;
        }
    }
    .other-info {
        padding-left: 10px;
        li {
            width: 100%;
            height: 30px;
            display: flex;
            align-items: center;
            font-size: 16px;
            .title {
                margin-right: 10px;
            }
            span {
                color: #797979;
            }
        }
    }
    .footer-box {
        width: 200px;
        height: 100px;
        align-self: flex-end;
        border-radius: 15px;
        border: 3px solid #797979;
        padding: 7.5px;
        font-size: 12px;
        display: flex;
        flex-direction: column;
        .progress {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}</style>