<template>
  <div class="container">
    <div class="content">
      <!-- <a-result
        class="result"
        status="403"
        :subtitle="$t('exception.result.403.description')"
      />
      <a-button key="back" type="primary">
        {{ $t('exception.result.403.back') }}
      </a-button> -->
      <div :style="{ width: '55%' }" class="content">
        <div class="textBackground">
          <span class="text_title">滨海党委党员队伍基本情况</span>
        </div>
        <span
          >滨海党委 190 名党员； 其中，正式党员 95 名， 预备党员 95 名。
          另外，发展对象 95 名， 入党积极分子 95 名， 入党申请人 95 名。
          男性党员 47 名，占党员总数的 24.74 %； 女性党员 40 名，占党员总数的
          21.05 %。 少数民族党员 18 名，占党员总数的 9.47 %。
          硕士研究生及以上学历 15 名，占党员总数的 7.89 %； 大学学历党员 28
          名，占党员总数的 14.74 %； 大专以下学历学历党员 8 名，占党员总数的
          4.21 %。</span
        >
      </div>
      <!-- <a-card :style="{ width: '55%' }" class="content" title="Arco Card">
      </a-card> -->
    </div>
  </div>
</template>
<!-- background: url('@/assets/images/login-left-bg3.png'); -->
<script lang="ts" setup></script>

<script lang="ts">
  export default {
    name: '403',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 20px;
    height: calc(100% - 40px);
    justify-content: center;
    align-items: center;
    background: url('@/assets/images/org_manage_bg.png');
    background-size: 100% 100%;
    :deep(.content) {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      text-align: center;
      border-radius: 4px;
    }
  }
  .textBackground {
    background-color: rgba(212, 20, 21, 1);
    border-radius: 8px;
    margin: 30px;
  }
  .text_title {
    width: 288px;
    height: 33px;
    overflow-wrap: break-word;
    color: rgba(255, 255, 255, 1);
    font-size: 24px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    text-align: left;
    white-space: nowrap;
    line-height: 33px;
    margin: 14px 0 0 31px;
  }
  .card {
    width: '55%';
    background: transparent;
  }
</style>
