import request from './request'
import queryString from 'query-string'

// 发送验证码接口
export const reqSendEmailCode = (email) => request({ url: '/send', method: 'post', data: queryString.stringify(email) })
// 注册接口
export const reqRegister = (data) => request({ url: '/register', method: 'post', data: queryString.stringify(data) })
// 登录接口
export const reqLogin = (data) => request({ url: '/login', method: 'post', data: queryString.stringify(data) })