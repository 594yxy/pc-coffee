<template>
  <div id="userLayout" :class="['user-layout-wrapper', isMobile && 'mobile']">
    <div class="container">
      <div class="wrap">
        <div class="top">
          <div class="header">
            <a href="/">
              <div class="logo-box"><img src="~@/assets/logo.png" class="logo" alt="logo" /></div>
              <span class="title">舒品客-城市咖啡</span>
            </a>
          </div>
          <!-- <div class="desc">Ant Design 是西湖区最具影响力的 Web 设计规范</div> -->
        </div>

        <router-view />
      </div>

      <!-- <div class="footer">
        <div class="links">
          <a href="_self">帮助</a>
          <a href="_self">隐私</a>
          <a href="_self">条款</a>
        </div>
        <div class="copyright">
          Copyright &copy; 2018 vueComponent
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
import { deviceMixin } from '@/store/device-mixin'

export default {
  name: 'UserLayout',
  mixins: [deviceMixin],
  mounted() {
    document.body.classList.add('userLayout')
  },
  beforeDestroy() {
    document.body.classList.remove('userLayout')
  },
}
</script>

<style lang="less" scoped>
#userLayout.user-layout-wrapper {
  height: 100%;

  &.mobile {
    .container {
      .main {
        max-width: 360px;
        width: 98%;
      }
    }
  }

  .container {
    width: 100%;
    min-height: 100%;
    background: #f0f2f5 url(~@/assets/background.jpg) no-repeat center center;
    background-size: cover;
    position: relative;

    .wrap {
      background-color: #fff;
      padding: 24px 32px;
      min-height: 378px;
      border-radius: 4px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0 3px 8px #302718;
    }

    a {
      text-decoration: none;
    }

    .top {
      text-align: center;
      margin-top: 24px;

      .header {
        // height: 44px;
        // line-height: 44px;

        .badge {
          position: absolute;
          display: inline-block;
          line-height: 1;
          vertical-align: middle;
          margin-left: -12px;
          margin-top: -10px;
          opacity: 0.8;
        }
        .logo-box {
          position: absolute;
          top: -45px;
          left: 50%;
          margin-left: -40px;
          width: 90px;
          height: 90px;
          padding: 5px;
          border-radius: 50%;
          background-color: #fff;
          .logo {
            height: 100%;
            // width: 44px;
            vertical-align: top;
            margin-left: 10px;
            border-style: none;
          }
        }

        .title {
          font-size: 26px;
          color: rgba(0, 0, 0, 0.85);
          font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
          font-weight: 600;
          position: relative;
          top: 25px;
        }
      }
      .desc {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.45);
        margin-top: 12px;
        margin-bottom: 40px;
      }
    }

    .main {
      min-width: 320px;
      max-width: 368px;
      margin: 0 auto;
      margin-top: 50px;
    }

    .footer {
      position: absolute;
      width: 100%;
      bottom: 0;
      padding: 0 16px;
      margin: 48px 0 24px;
      text-align: center;

      .links {
        margin-bottom: 8px;
        font-size: 14px;
        a {
          color: rgba(0, 0, 0, 0.45);
          transition: all 0.3s;
          &:not(:last-child) {
            margin-right: 40px;
          }
        }
      }
      .copyright {
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
      }
    }
  }
}
</style>
