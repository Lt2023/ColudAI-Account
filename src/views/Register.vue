<template>
    <bg :spinning="spinning">
        <content>
            <div class="header">
                <img src="https://img2.imgtp.com/2024/05/25/WNdbDY2s.png" alt="">
                <div class="title">Sign up</div>
            </div>
            <form>
                <div class="input-box">
                    <input type="text" placeholder="Username you had set" v-model="form.username">
                </div>
                <div class="input-box">
                    <input type="password" placeholder="Password of ColudAI account" v-model="form.password">
                </div>
                <div class="input-box">
                    <input type="text" placeholder="Email of ColudAI account" v-model="form.email">
                </div>
                <div class="input-box">
                    <input type="email" id="email" placeholder="Please enter your 4 email code" v-model="form.emailCode">
                    <div class="btn" @click="sendEmailCode">
                        <svg v-if="!timer" t="1707062746528" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="9403" id="mx_n_1707062746531" width="25" height="25">
                            <path
                                d="M784 144H240c-88 0-160 72-160 160v416c0 88 72 160 160 160h544c88 0 160-72 160-160V304c0-88-72-160-160-160z m-544 64h544c35.2 0 65.6 19.2 81.6 46.4L552 508.8c-24 19.2-57.6 19.2-80 0L158.4 254.4c16-27.2 46.4-46.4 81.6-46.4z m544 608H240c-52.8 0-96-43.2-96-96V326.4L432 560c24 19.2 51.2 28.8 80 28.8 28.8 0 57.6-9.6 80-28.8l288-233.6V720c0 52.8-43.2 96-96 96z"
                                fill="#ffffff" p-id="9404"></path>
                        </svg>
                        <span v-else class="time" style="color: #ffffff;">{{ time }}</span>
                    </div>
                </div>
                <div class="agree-box">
                    <div class="checkbox" @click="isCheck = !isCheck">
                        <svg v-if="isCheck" t="1706979946550" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="5431" width="15" height="15">
                            <path
                                d="M416.832 798.08C400.64 798.08 384.512 791.872 372.16 779.52L119.424 525.76C94.784 500.992 94.784 460.8 119.424 436.032 144.128 411.264 184.128 411.264 208.768 436.032L416.832 644.928 814.4 245.76C839.04 220.928 879.04 220.928 903.744 245.76 928.384 270.528 928.384 310.656 903.744 335.424L461.504 779.52C449.152 791.872 432.96 798.08 416.832 798.08Z"
                                fill="#ffffff" p-id="5432"></path>
                        </svg>
                    </div>
                    <div class="text">I have known <span @click="open = true">ColudAI Account Agreement</span></div>
                </div>
            </form>
            <div class="submit" @click="register">Register</div>
        </content>
        <a-modal v-model:open="open" title="ColudAI Account Agreement" @ok="open = false">
            <template #footer>
            </template>
            <agreement />
        </a-modal>
    </bg>
</template>

<script setup>
import bg from '../components/bg.vue'
import content from '../components/content.vue'
import agreement from '../components/agreement.vue'
import { ref, computed } from 'vue'
import { reqSendEmailCode, reqRegister } from '../api/index'
import md5 from 'crypto-js/md5'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { useUserInfoStore } from '../pinia/modules/user'
const router = useRouter()
const userInfoStore = useUserInfoStore()

// 用户协议框
const open = ref(false)
// 是否勾选用户协议
let isCheck = ref(true)

let checkboxColor = computed(() => {
    return isCheck.value ? '#2F96E0' : '#ffffff'
})

let form = ref({
    username: '',
    password: '',
    email: '',
    emailCode: ''
})

// loading
const spinning = ref(false)

// 验证码倒计时
let time = ref(60)

// 发送邮箱验证码
const sendEmailCode = async () => {
    if (time.value !== 60) return
    const { email } = form.value
    if (!validateEmail(email)) return message.error('邮箱不正确')
    spinning.value = true
    let res = await reqSendEmailCode({ email })
    spinning.value = false
    setInterval(() => {
        time.value--
        if (time.value <= 0) {
            clearInterval()
            time.value = 60
        }
    }, 1000)
    if (res.code === 200) {
        message.success(res.msg)
    } else {
        message.error(res.msg)
    }
}

// 注册按钮
const register = async () => {
    const { username, password, email, emailCode } = form.value
    // 非空检测
    if (!isCheck.value) return message.error('请勾选用户协议')
    if (!username) return message.error('用户名不能为空')
    if (!password) return message.error('密码不能为空')
    if (!email) return message.error('邮箱不能为空')
    if (!validateEmail(email)) return message.error('邮箱不正确')
    if (!emailCode) return message.error('验证码不能为空')
    if (emailCode.length != 4) return message.error('验证码不正确')

    // md5 密码加密
    const md5Password = md5(password).toString()
    let data = { username, password: md5Password, email, code: emailCode }
    spinning.value = true
    let res = await reqRegister(data)
    spinning.value = false
    if (res.code === 200) {
        userInfoStore.register({ username, password })
        message.success('注册成功')
        router.push('/login')
    } else {
        message.error(res.msg)
    }
}

// 邮箱正则
function validateEmail(email) {
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
    return regex.test(email);
}
</script>

<style lang="scss" scoped>
.header {
    align-self: flex-start;
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    img {
        width: 40px;
        height: 40px;
        margin-right: 15px;
    }

    .title {
        font-size: 25px;
        color: #2F96E0;
    }
}

form {
    width: 100%;
    margin-bottom: 30px;

    .title {
        font-size: 13px;
        color: #9E9E9E;
        margin-bottom: 7.5px;
    }

    .input-box {
        width: 100%;
        height: 50px;
        padding: 7.5px 20px;
        margin-bottom: 20px;
        background-color: #f0f0f0;
        border-radius: 10px;
        border: 1px solid #9E9E9E;
        position: relative;

        &:focus-within {
            border-color: #3677f1;
            background-color: #f2f6fe;
        }

        input {
            width: 100%;
            height: 100%;
            background-color: #f0f0f0;

            &:focus {
                background-color: #f2f6fe;
            }
        }

        #email {
            width: 80%;
        }

        .btn {
            width: 70px;
            height: 90%;
            border-radius: 10px;
            background-color: #0094FF;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            right: 2px;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;

            &:hover {
                background-color: #0f81d3;
                transition: all .5s;
            }
        }
    }

    .agree-box {
        display: flex;
        align-items: center;
        font-size: 13px;
        color: #9E9E9E;

        .checkbox {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            overflow: hidden;
            background-color: v-bind(checkboxColor);
            margin-right: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        }

        .text {
            span {
                color: #2F96E0;
                cursor: pointer;
            }
        }
    }
}

.submit {
    width: 100%;
    height: 35px;
    color: #ffffff;
    background-color: #2F96E0;
    border-radius: 7.5px;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-bottom: 10px;

    &:hover {
        background-color: #0f81d3;
        transition: all .5s;
    }
}
</style>