import Mock from 'mockjs'
import './extend'

// 用户信息
const user = Mock.mock({
  name: '@ADMIN',
  avatar: '@AVATAR',
  address: '@CITY',
  welcome: '@WELCOME',
  timefix: '@TIMEFIX',
  position: '@POSITION'
})

// 账号登录接口
Mock.mock('/login/account', 'post', ({ body }) => {
  let result = {}
  const { username, password } = JSON.parse(body)
  // 验证账号
  if (username !== 'admin' || password !== '123456') {
    result.code = 401
    result.message = '账户名或密码错误'
  } else {
    result.code = 200
    result.message = Mock.mock('@TIMEFIX') + '，欢迎回来'
    result.data = {
      user
    }
  }
  return result
})

// 验证码登录接口
Mock.mock('/login/captcha', 'post', ({ body }) => {
  let result = {}
  const { mobile, captcha } = JSON.parse(body)
  // 验证账号
  if (mobile !== '13330102099' || captcha !== '123456') {
    result.code = 401
    result.message = '手机号或验证码错误'
  } else {
    result.code = 200
    result.message = Mock.mock('@TIMEFIX') + '，欢迎回来'
    result.data = {
      user
    }
  }
  return result
})

// 获取验证码接口
Mock.mock('/captcha', 'post', ({ body }) => {
  let result = {}
  const { mobile } = JSON.parse(body)
  // 验证账号
  if (mobile !== '13330102099') {
    result.code = 400
    result.message = '手机号不存在'
  } else {
    result.code = 200
    result.message = '验证码发送成功'
  }
  return result
})
