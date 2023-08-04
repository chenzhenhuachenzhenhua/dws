<template>
  <div class="container">
    <a-layout-content>
      <div class="content">
        <!-- <img
          style="width: 320px; height: 290px"
          alt="logo"
          src="@/assets/images/emblem.png"
        /> -->
        <!-- <div class="logo-text">党务工作管理平台</div> -->
      </div>
    </a-layout-content>
    <a-layout-content>
      <div class="content-inner">
        <LoginForm />
      </div>
    </a-layout-content>
    <a-layout-footer>
      <div class="footer"> <Footer /> </div
    ></a-layout-footer>
  </div>
</template>

<script lang="ts" setup>
  import Footer from '@/components/footer/index.vue';
  import LoginForm from './components/login-form.vue';
</script>

<style lang="less" scoped>
  .container {
    display: flex;
    height: 100vh;
    background: url('@/assets/images/login-left-bg3.png');
    background-size: 100% 100%;
    justify-content: space-between;
    align-items: center;
    .content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .content-inner {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .footer {
      position: absolute;
      margin-bottom: 12px;
      right: 0;
      bottom: 0;
      width: 100%;
    }
  }

  .logo {
    position: fixed;
    top: 24px;
    left: 22px;
    z-index: 1;
    display: inline-flex;
    align-items: center;

    &-text {
      margin-right: 4px;
      margin-left: 4px;
      color: var(--color-fill-1);
      font-size: 20px;
      overflow-wrap: break-word;
      font-family: MicrosoftYaHei;
      font-weight: NaN;
    }
  }
</style>

<style lang="less" scoped>
  // responsive
  @media (max-width: @screen-lg) {
    .container {
      .banner {
        width: 25%;
      }
    }
  }
</style>
