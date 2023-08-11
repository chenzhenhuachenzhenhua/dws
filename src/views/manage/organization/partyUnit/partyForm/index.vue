<template>
  <div class="container">
    <a-form ref="formRef" layout="vertical" :model="formData">
      <a-space direction="vertical" :size="16">
        <a-card class="general-card">
          <template #title> 基本信息 </template>
          <a-row :gutter="80">
            <a-col :span="12">
              <a-form-item :label="'所属组织名称'" field="video.mode">
                <a-select :placeholder="$t('groupForm.placeholder.video.mode')">
                  <a-option value="custom">自定义</a-option>
                  <a-option value="mode1">模式1</a-option>
                  <a-option value="mode2">模式2</a-option>
                </a-select>
                <TreeSelectDialog></TreeSelectDialog>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                :label="'单位名称'"
                field="video.acquisition.resolution"
              >
                <a-select
                  :placeholder="
                    $t('groupForm.placeholder.video.acquisition.resolution')
                  "
                >
                  <a-option value="resolution1">分辨率1</a-option>
                  <a-option value="resolution2">分辨率2</a-option>
                  <a-option value="resolution3">分辨率3</a-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="80">
            <a-col :span="12">
              <a-form-item
                :label="'单位隶属关系'"
                field="video.encoding.resolution"
              >
                <a-select
                  :placeholder="
                    $t('groupForm.placeholder.video.encoding.resolution')
                  "
                >
                  <a-option value="resolution1">分辨率1</a-option>
                  <a-option value="resolution2">分辨率2</a-option>
                  <a-option value="resolution3">分辨率3</a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item :label="'单位属性'" field="video.encoding.rate.min">
                <a-input
                  :placeholder="
                    $t('groupForm.placeholder.video.encoding.rate.min')
                  "
                >
                </a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="80">
            <a-col :span="12">
              <a-form-item
                :label="'所属行业'"
                field="video.encoding.rate.default"
              >
                <a-input
                  :placeholder="
                    $t('groupForm.placeholder.video.encoding.rate.default')
                  "
                >
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item :label="'经济类型'" field="video.encoding.frameRate">
                <a-input
                  :placeholder="
                    $t('groupForm.placeholder.video.encoding.frameRate')
                  "
                >
                </a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="80">
            <a-col :span="12">
              <a-form-item
                :label="'企业规模'"
                field="video.encoding.rate.default"
              >
                <a-input
                  :placeholder="
                    $t('groupForm.placeholder.video.encoding.rate.default')
                  "
                >
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item :label="'企业类型'" field="video.encoding.frameRate">
                <a-input
                  :placeholder="
                    $t('groupForm.placeholder.video.encoding.frameRate')
                  "
                >
                </a-input>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>
        <a-card class="general-card">
          <template #title> 联系信息 </template>
          <a-row :gutter="80">
            <a-col :span="12">
              <a-form-item :label="'联系人'" field="audio.encoding.channels">
                <a-input
                  :placeholder="
                    $t('groupForm.placeholder.audio.encoding.channels')
                  "
                >
                  <template #append> bps </template>
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item :label="'电话'" field="audio.encoding.channels">
                <a-input
                  :placeholder="
                    $t('groupForm.placeholder.audio.encoding.channels')
                  "
                >
                  <template #append> bps </template>
                </a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="80">
            <a-col :span="8">
              <a-form-item
                :label="$t('groupForm.form.label.audio.encoding.rate')"
                field="audio.encoding.rate"
              >
                <a-input
                  :placeholder="$t('groupForm.placeholder.audio.encoding.rate')"
                >
                  <template #append> bps </template>
                </a-input>
              </a-form-item>
            </a-col>

            <a-col :span="8">
              <a-form-item
                :label="$t('groupForm.form.label.audio.encoding.profile')"
                field="audio.encoding.profile"
              >
                <a-input
                  :placeholder="
                    $t('groupForm.placeholder.audio.encoding.profile')
                  "
                >
                  <template #append> fps </template>
                </a-input>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>
      </a-space>
      <div class="actions">
        <a-space>
          <a-button @click="onCloseClick"> 关闭 </a-button>
          <a-button>
            {{ $t('groupForm.reset') }}
          </a-button>
          <a-button type="primary" :loading="loading" @click="onSubmitClick">
            {{ $t('groupForm.submit') }}
          </a-button>
        </a-space>
      </div>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import useLoading from '@/hooks/loading';
  import TreeSelectDialog from '@/components/tree-select-dialog/index.vue';

  const formData = ref({});
  const formRef = ref<FormInstance>();
  const { loading, setLoading } = useLoading();

  const onSubmitClick = async () => {
    const res = await formRef.value?.validate();
    if (!res) {
      setLoading(true);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  const onCloseClick = () => {};
</script>

<script lang="ts">
  export default {
    name: 'Group',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 20px;
    overflow: hidden;
  }

  .actions {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 60px;
    padding: 14px 20px 14px 0;
    background: var(--color-bg-2);
    text-align: right;
  }
</style>
