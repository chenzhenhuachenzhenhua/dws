<template>
  <a-layout-footer class="footer">
    <div>
      <a-space>
        <a-link
          href="https://beian.miit.gov.cn/"
          icon
          target="_blank"
          :hoverable="false"
          :style="{ color: '#fff' }"
          >{{ $t('login.tip.link') }}</a-link
        >
      </a-space>
    </div>
  </a-layout-footer>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
  .footer {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    color: var(--color-text-2);
    text-align: center;
  }
</style>
