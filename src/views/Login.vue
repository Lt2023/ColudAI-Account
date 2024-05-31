<template>
  <bg :spinning="spinning">
    <content>
      <div class="logo">
        <img src="https://img2.imgtp.com/2024/05/25/WNdbDY2s.png" alt="">
      </div>
      <form>
        <div class="title">Username</div>
        <div class="input-box">
          <input type="text" placeholder="Username you had set" v-model="userInfo.username">
        </div>
        <div class="title">Password</div>
        <div class="input-box">
          <input type="password" placeholder="Password of ColudAI account" v-model="userInfo.password">
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
      <div class="submit" @click="handleSubmit">Sign in</div>
      <div class="sign-up-text" @click="register">Sign up for new user</div>
      <div class="other-content">
        <div class="title">Sign quickly by</div>
        <ul>
          <li>
            <img src="../assets/message-circle.png" alt="">
            <span>WeChat</span>
          </li>
          <li>
            <img src="../assets/code.png" alt="">
            <span>CodeMao</span>
          </li>
          <li>
            <img src="../assets/external-link.png" alt="">
            <span>StarDream</span>
          </li>
        </ul>
      </div>
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
import { computed, ref, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import md5 from 'crypto-js/md5'
import { useRouter } from 'vue-router'
import { useUserInfoStore } from '../pinia/modules/user'
import { reqLogin } from '../api'
const router = useRouter()
const userInfoStore = useUserInfoStore()

const userInfo = ref({
  username: '',
  password: ''
})

onMounted(() => {
  if (userInfoStore.registerInfo.username && userInfoStore.registerInfo.password) {
    userInfo.value.username = userInfoStore.registerInfo.username
    userInfo.value.password = userInfoStore.registerInfo.password
  }
})

// 用户协议框
const open = ref(false)
// 是否勾选用户协议
let isCheck = ref(true)

let checkboxColor = computed(() => {
  return isCheck.value ? '#2F96E0' : '#ffffff'
})



// loading
const spinning = ref(false)

// 登陆按钮回调
const handleSubmit = async() => {
  const { username, password } = userInfo.value
  // md5 密码加密
  const md5Password = md5(password).toString()
  // 非空检测
  if (!isCheck.value) return message.error('请勾选用户协议')
  if (!username) return message.error('用户名不能为空')
  if (!password) return message.error('密码不能为空')
  spinning.value = true
let data ={
  username,
  md5Password
}
 let res=await reqLogin(data)
 console.log(res)
    spinning.value = false
    if (res.code===200) {
        // 返回的用户信息
        sessionStorage.setItem('uinfo', JSON.stringify(res.data))
        userInfoStore.login(res.data)
       message.success('登陆成功')
       router.push('/')
     } else {
       message.error(res.msg)
     }
 // }).catch(error => {
   spinning.value = false
  //})
}

const register = () => {
  router.push('/register')
}
</script>

<style lang="scss" scoped>
.logo {
  width: 50px;
  height: 50px;
  margin-bottom: 25px;
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

  &:hover {
    background-color: #0f81d3;
    transition: all .5s;
  }
}

.sign-up-text {
  font-size: 12px;
  color: #2F96E0;
  margin: 5px 0 30px;
  margin-right: auto;
  cursor: pointer;
}

.other-content {
  width: 100%;

  .title {
    font-size: 12px;
    color: #9E9E9E;
    margin-bottom: 10px;
  }

  ul {
    li {
      width: 100%;
      height: 35px;
      color: #ffffff;
      margin-bottom: 5px;
      border-radius: 7.5px;
      cursor: pointer;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;

      img {
        width: 20px;
        height: 20px;
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translateY(-50%);
      }

      &:hover {
        transition: all .5s;
      }

      &:nth-of-type(1) {
        background-color: #30C77E;
      }

      &:nth-of-type(1):hover {
        background-color: #1eb36b;
      }

      &:nth-of-type(2) {
        background-color: #C77930;
      }

      &:nth-of-type(2):hover {
        background-color: #ba6617;
      }

      &:nth-of-type(3) {
        background-color: #AB5BE8;
      }

      &:nth-of-type(3):hover {
        background-color: #a34ae7;
      }
    }
  }
}
</style>