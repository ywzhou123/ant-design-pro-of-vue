<template>
  <div class="container">
    <div class="content">
      <div class="top">
        <div class="header">
          <img alt="logo" class="logo" src="../../assets/img/logo.png" />
          <span class="title">{{systemName}}</span>
        </div>
        <div class="desc">Ant Design 是西湖区最具影响力的 Web 设计规范</div>
      </div>
      <div class="login">
        <a-form @submit="onSubmit" :form='form'>
          <a-tabs size="large" :tabBarStyle="{textAlign: 'center'}" style="padding: 0 2px;"
            v-model="activeKey" @change="onChangeTabs" :animated='false'>
            <a-tab-pane tab="账户密码登录" key="account">
              <a-alert type="error" :closable="true" v-show="accountError" :message="accountError" showIcon style="margin-bottom: 24px;" />
              <a-form-item>
                <a-input
                  size="large"
                  placeholder="用户名：admin"
                  v-decorator="[
                    'username',
                    { rules: [{ required: true, message: '请输入用户名!' }] }
                  ]"
                >
                  <a-icon slot="prefix" type="user" />
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-input
                  size="large"
                  placeholder="密码：123456"
                  type="password"
                  v-decorator="[
                    'password',
                    { rules: [{ required: true, message: '请输入密码!' }] }
                  ]"
                  @pressEnter='onSubmit'
                >
                  <a-icon slot="prefix" type="lock" />
                </a-input>
              </a-form-item>
            </a-tab-pane>
            <a-tab-pane tab="手机号登录" key="captcha">
              <a-alert type="error" :closable="true" v-show="captchaError" :message="captchaError" showIcon style="margin-bottom: 24px;" />
              <a-form-item>
                <a-input
                  size="large"
                  placeholder="手机号"
                  v-decorator="[
                    'mobile',
                    { rules: [{ required: true, message: '请输入手机号!' }, { pattern: /^1\d{10}$/, message: '手机号格式错误' }] }
                  ]"
                >
                  <a-icon slot="prefix" type="mobile" />
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-row :gutter="8" style="margin: 0 -4px">
                  <a-col :span="16">
                    <a-input
                      size="large"
                      placeholder="验证码"
                      type="digit"
                      v-decorator="[
                        'captcha',
                        { rules: [{ required: true, message: '请输入验证码!' }, { pattern: /^\d{6}$/, message: '验证码格式错误' }] }
                      ]"
                      @pressEnter='onSubmit'
                    >
                    <a-icon slot="prefix" type="mail" />
                  </a-input>
                  </a-col>
                  <a-col :span="8" style="padding-left: 4px">
                    <a-button style="width: 100%" class="captcha-button"
                      size="large" @click="onGetCaptcha"
                      :disabled='captchaLoading'
                    >{{captchaLoading ? countDown : '获取验证码'}}</a-button>
                  </a-col>
                </a-row>
              </a-form-item>
            </a-tab-pane>
          </a-tabs>
          <div>
            <a-checkbox :checked="checked" @change="onChangeCheckBox">自动登录</a-checkbox>
            <a style="float: right">忘记密码</a>
          </div>
          <a-form-item>
            <a-button :loading="logging" style="width: 100%;margin-top: 24px"
              size="large" htmlType="submit" type="primary">登录</a-button>
          </a-form-item>
          <div>
            其他登录方式
            <a-icon class="icon" type="alipay-circle" />
            <a-icon class="icon" type="taobao-circle" />
            <a-icon class="icon" type="weibo-circle" />
            <router-link style="float: right" to="/login" >注册账户</router-link>
          </div>
        </a-form>
      </div>
    </div>
    <global-footer :link-list="linkList" :copyright="copyright" />
  </div>
</template>

<script>
import GlobalFooter from '@/layouts/GlobalFooter'

export default {
  name: 'Login',
  components: {
    GlobalFooter
  },
  data () {
    return {
      logging: false,
      accountError: '',
      captchaError: '',
      activeKey: 'account',
      checked: true,
      captchaLoading: false,
      countDown: 60,
      form: this.$form.createForm(this)
    }
  },
  computed: {
    systemName () {
      return this.$store.state.setting.systemName
    },
    linkList () {
      return this.$store.state.setting.footerLinks
    },
    copyright () {
      return this.$store.state.setting.copyright
    }
  },
  methods: {
    onChangeTabs (key) {
      this.activeKey = key
    },
    onChangeCheckBox () {
      this.checked = !this.checked
    },
    onGetCaptcha (e) {
      e.preventDefault()
      this.form.validateFields(['mobile'], {}, (err, values) => {
        if (!err) {
          // 验证码倒计时
          this.captchaLoading = true
          let timer = setInterval(() => {
            if (this.countDown > 0) {
              this.countDown -= 1
            } else {
              this.captchaLoading = false
              this.countDown = 60
              window.clearInterval(timer)
            }
          }, 1000)
          // 请求验证码接口
          const data = {
            mobile: this.form.getFieldValue('mobile')
          }
          this.$axios.post('/captcha', data).then((res) => {
            if (res.code === 200) {
              this.$message.success(res.message, 3)
            } else {
              this.$message.warning(res.message, 3)
            }
          })
        } else {
          console.log('err: ', err)
        }
      })
    },
    onSubmit (e) {
      e.preventDefault()
      const fields = this.activeKey === 'account' ? ['username', 'password'] : ['mobile', 'captcha']
      this.form.validateFields(fields, {}, (err, values) => {
        if (!err) {
          this.logging = true
          let data = {
            username: this.form.getFieldValue('username'),
            password: this.form.getFieldValue('password'),
            mobile: this.form.getFieldValue('mobile'),
            captcha: this.form.getFieldValue('captcha')
          }
          this.$axios.post(`/login/${this.activeKey}`, data).then((res) => {
            this.logging = false
            console.log(res)
            if (res.code === 200) {
              // 登录成功跳转页面，保存用户信息，提示成功
              this.$message.success(res.message, 3)
              this.$store.commit('account/setUser', res.data.user)
              this[this.activeKey + 'Error'] = ''
              this.$router.push('/dashboard/analysis')
            } else {
              this[this.activeKey + 'Error'] = res.message
            }
          })
        } else {
          console.log('err: ', err)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  background: #f0f2f5 url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg') no-repeat center 110px;
  background-size: 100%;
  .content {
    padding: 32px 0;
    flex: 1;
    @media (min-width: 768px){
      padding: 112px 0 24px;
    }
    .top {
      text-align: center;
      .header {
        height: 44px;
        line-height: 44px;
        a {
          text-decoration: none;
        }
        .logo {
          height: 44px;
          vertical-align: top;
          margin-right: 16px;
        }
        .title {
          font-size: 33px;
          color: rgba(0,0,0,.85);
          font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
          font-weight: 600;
          position: relative;
          top: 2px;
        }
      }
      .desc {
        font-size: 14px;
        color: rgba(0,0,0,.45);
        margin-top: 12px;
        margin-bottom: 40px;
      }
    }
    .login{
      width: 368px;
      margin: 0 auto;
      @media screen and (max-width: 576px) {
        width: 95%;
      }
      @media screen and (max-width: 320px) {
        .captcha-button{
          font-size: 14px;
        }
      }
      .icon {
        font-size: 24px;
        color: rgba(0, 0, 0, 0.2);
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
          color: #1890ff;
        }
      }
    }
  }
}
</style>
