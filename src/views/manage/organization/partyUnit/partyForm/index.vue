<template>
  <div class="container">
    <a-form ref="formRef" layout="vertical" :model="formData">
      <a-space direction="vertical" :size="16">
        <a-card class="general-card">
          <template #title> 基本信息 </template>
          <a-row :gutter="80">
            <!-- 所属组织名称 -->
            <a-col :span="12">
              <a-form-item label="所属组织名称" field="party.name" :rules="[{ required: true, message: '所属组织名称为必填项' }]">
                <a-input v-model="formData.party.name"
                  @click="getRelationship('party', { type: 'unit_membership', title: '选择单位隶属关系' })" readonly
                  placeholder="请选择所属组织名称">
                </a-input>
              </a-form-item>
            </a-col>
            <!-- 单位名称 -->
            <a-col :span="12">
              <a-form-item label="单位名称" field="name" :rules="[{ required: true, message: '单位名称为必填项' }]">
                <a-input v-model="formData.name" placeholder="请输入单位名称"></a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="80">
            <!-- 单位隶属关系 -->
            <a-col :span="12">
              <a-form-item label="单位隶属关系" field="unitRelation.name" :rules="[{ required: true, message: '单位隶属关系为必填项' }]" :validate-trigger="['change','input']">
                <a-input v-model="formData.unitRelation.name"
                  @click="getRelationship('unitRelation', { type: 'unit_membership', title: '选择单位隶属关系' })" readonly
                  placeholder="请选择单位隶属关系">
                </a-input>
              </a-form-item>
            </a-col>
            <!-- 单位属性 -->
            <a-col :span="12">
              <a-form-item label="单位属性" field="nature.name" :rules="[{ required: true, message: '单位属性为必填项' }]">
                <a-input v-model="formData.nature.name"
                  @click="getRelationship('nature', { type: 'unit_property', title: '选择单位属性' })" readonly
                  placeholder="请选择单位属性">
                </a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="80">
            <!-- 所属行业 -->
            <a-col :span="12">
              <a-form-item label="所属行业" field="industry.name" :rules="[{ required: true, message: '所属行业为必填项' }]">
                <a-input v-model="formData.industry.name"
                  @click="getRelationship('industry', { type: 'SSHY', title: '选择所属行业' })" readonly
                  placeholder="请选择所属行业">
                </a-input>
              </a-form-item>
            </a-col>
            <!-- 经济类型 -->
            <a-col :span="12">
              <a-form-item label="经济类型" field="economicType.name" :rules="[{ required: true, message: '经济类型为必填项' }]">
                <a-input v-model="formData.economicType.name"
                  @click="getRelationship('economicType', { type: 'economy_type', title: '选择经济类型' })" readonly
                  placeholder="请选择经济类型">
                </a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="80">
            <!-- 企业规模 -->
            <a-col :span="12">
              <a-form-item label="企业规模" field="companySize.name" :rules="[{ required: true, message: '企业规模为必填项' }]">
                <a-input v-model="formData.companySize.name"
                  @click="getRelationship('companySize', { type: 'company_size', title: '选择企业规模' })" readonly
                  placeholder="请选择企业规模">
                </a-input>
              </a-form-item>
            </a-col>
            <!-- 企业类型 -->
            <a-col :span="12">
              <a-form-item label="企业类型" field="businessType.name" :rules="[{ required: true, message: '企业类型为必填项' }]">
                <a-input v-model="formData.businessType.name"
                  @click="getRelationship('businessType', { type: 'business_type', title: '选择企业类型' })" readonly
                  placeholder="请选择企业类型">
                </a-input>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>
        <a-card class="general-card">
          <template #title> 联系信息 </template>
          <a-row :gutter="80">
            <!-- 联系人 -->
            <a-col :span="12">
              <a-form-item label="联系人" field="contact">
                <a-input v-model="formData.contact" placeholder="请输入联系人"></a-input>
              </a-form-item>
            </a-col>
            <!-- 电话 -->
            <a-col :span="12">
              <a-form-item label="电话" field="telephone">
                <a-input v-model="formData.telephone" placeholder="请输入电话"></a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="80">
            <!-- 联系手机 -->
            <a-col :span="12">
              <a-form-item label="联系手机" field="cellphone">
                  <a-input v-model="formData.cellphone" placeholder="请输入联系手机"></a-input>
                </a-form-item>
            </a-col>
            <!-- 单位地址 -->
            <a-col :span="12">
              <a-form-item label="单位地址" field="address">
                <a-input v-model="formData.address" placeholder="请输入单位地址"></a-input>
              </a-form-item>
            </a-col>
            <!-- 单位地址 -->
            <a-col :span="12">
              <a-form-item label="单位邮编" field="postcode">
                <a-input v-model="formData.postcode" placeholder="请输入单位邮编"></a-input>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>
      </a-space>
      <div class="actions">
        <a-space>
          <a-button> 关闭 </a-button>
          <a-button>
            {{ $t('groupForm.reset') }}
          </a-button>
          <a-button type="primary" :loading="loading" @click="onSubmitClick">
            {{ $t('groupForm.submit') }}
          </a-button>
        </a-space>
      </div>
    </a-form>
    <!-- 树形选择框 -->
    <!-- <tree-select-dialog /> -->
  </div>
</template>
<script lang="ts" setup>
import { ref, inject, onBeforeMount } from 'vue';
import { FormInstance } from '@arco-design/web-vue/es/form';
import useLoading from '@/hooks/loading';

const formData: any = ref({
  party: { name: '', id: '' }, // 所属组织id
  name: '', // 单位名称
  unitRelation: { name: '', id: '' }, // 单位隶属关系
  nature: { name: '', id: '' }, // 单位属性
  industry: { name: '', id: '' }, // 所属行业
  companySize: { name: '', id: '' }, // 企业规模
  economicType: { name: '', id: '' }, // 经济类型
  businessType: { name: '', id: '' }, // 企业类型
  contact: '', // 联系人
  telephone: '', // 电话
  cellphone: '', // 联系手机
  address: '', // 单位地址
  postcode: '', // 单位邮编
});

const partyList = ref<Array<{id: number, name: string}>>([])
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
const openTreeSelectDialogFunc = inject('openTreeSelectDialog') as any;
const getRelationship = async (field: any, params?: any) => {
  const formVal = await openTreeSelectDialogFunc(params);
  if (!formVal) return;
  formData.value[field] = formVal
  formRef.value?.validateField(`${field}.name`)
}
onBeforeMount(() => {

})
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
