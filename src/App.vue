<template>
  <a-config-provider :locale="locale">
    <router-view />
    <global-setting />
    <!-- 树形选择框 -->
    <tree-select-dialog :visible="treeSelectVisible" :options="options" @confirm="treeSelectCallback" />
  </a-config-provider>
</template>

<script lang="ts" setup>
  import { computed, ref, provide } from 'vue';
  import enUS from '@arco-design/web-vue/es/locale/lang/en-us';
  import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn';
  import GlobalSetting from '@/components/global-setting/index.vue';
  import useLocale from '@/hooks/locale';
  import treeSelectDialog from '@/components/tree-select-dialog/index.vue';

  const { currentLocale } = useLocale();
  const locale = computed(() => {
    switch (currentLocale.value) {
      case 'zh-CN':
        return zhCN;
      case 'en-US':
        return enUS;
      default:
        return enUS;
    }
  });
  const resolveFn = ref();
  const options = ref();
  // 控制弹框显示隐藏
  const treeSelectVisible = ref(false);
  // 关闭弹框的回调
  const treeSelectCallback = (value?: string) => {
    treeSelectVisible.value = false;
    // eslint-disable-next-line no-unused-expressions
    resolveFn.value && resolveFn.value(value);
  }
  // 注册全局依赖
  provide('openTreeSelectDialog', (params: object) =>  {
    options.value = params;
    treeSelectVisible.value = true;
    return new Promise((resolve) => {
        resolveFn.value = resolve;
    });
  });
</script>
