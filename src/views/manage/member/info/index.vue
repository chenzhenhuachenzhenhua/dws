<template>
  <div class="container">
    <a-card>
      <a-row>
        <a-col :flex="1">
          <a-form
            :model="formModel"
            :label-col-props="{ span: 5 }"
            :wrapper-col-props="{ span: 19 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item field="input" :label="'关键字'">
                  <a-input
                    v-model="formModel.input"
                    :placeholder="'输入组织名称/姓名/手机号/身份证号'"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="education" :label="'学历'">
                  <a-select
                    v-model="formModel.education"
                    :options="Object.values(educationTypeOptions)"
                    :placeholder="'请选择学历'"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="sex" :label="'性别'">
                  <a-select
                    v-model="formModel.sex"
                    :options="Object.values(sexTypeOptions)"
                    :placeholder="'请选择性别'"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="contentType" :label="'状态'">
                  <a-select
                    v-model="formModel.flag"
                    :options="Object.values(flagTypeOptions)"
                    :placeholder="'请选择状态'"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 84px" direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" @click="search">
              <template #icon>
                <icon-search />
              </template>
              {{ $t('searchTable.form.search') }}
            </a-button>
            <a-button @click="reset">
              <template #icon>
                <icon-refresh />
              </template>
              {{ $t('searchTable.form.reset') }}
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 0" />
      <a-row style="margin-bottom: 16px">
        <a-col :span="12">
          <a-space>
            <a-button type="primary">
              <template #icon>
                <icon-plus />
              </template>
              {{ $t('searchTable.operation.create') }}
            </a-button>
            <a-upload action="/">
              <template #upload-button>
                <a-button>
                  {{ $t('searchTable.operation.import') }}
                </a-button>
              </template>
            </a-upload>
          </a-space>
        </a-col>
        <a-col
          :span="12"
          style="display: flex; align-items: center; justify-content: end"
        >
          <a-button>
            <template #icon>
              <icon-download />
            </template>
            {{ $t('searchTable.operation.download') }}
          </a-button>
          <a-tooltip :content="$t('searchTable.actions.refresh')">
            <div class="action-icon" @click="search"
              ><icon-refresh size="18"
            /></div>
          </a-tooltip>
          <a-dropdown @select="handleSelectDensity">
            <a-tooltip :content="$t('searchTable.actions.density')">
              <div class="action-icon"><icon-line-height size="18" /></div>
            </a-tooltip>
          </a-dropdown>
          <a-tooltip :content="$t('searchTable.actions.columnSetting')">
            <a-popover
              trigger="click"
              position="bl"
              @popup-visible-change="popupVisibleChange"
            >
              <div class="action-icon"><icon-settings size="18" /></div>
              <template #content>
                <div id="tableSetting">
                  <div
                    v-for="(item, index) in showColumns"
                    :key="item.dataIndex"
                    class="setting"
                  >
                    <div style="margin-right: 4px; cursor: move">
                      <icon-drag-arrow />
                    </div>
                    <div>
                      <a-checkbox
                        v-model="item.checked"
                        @change="
                          handleChange($event, item as TableColumnData, index)
                        "
                      >
                      </a-checkbox>
                    </div>
                    <div class="title">
                      {{ item.title === '#' ? '序列号' : item.title }}
                    </div>
                  </div>
                </div>
              </template>
            </a-popover>
          </a-tooltip>
        </a-col>
      </a-row>
      <a-table
        row-key="id"
        :loading="loading"
        :row-selection="(rowSelection as TableRowSelection)"
        :pagination="pagination"
        :columns="(cloneColumns as TableColumnData[])"
        :data="renderData"
        :bordered="false"
        :size="size"
        @page-change="onPageChange"
      >
        <template #education="{ record }">
          {{ educationTypeOptions[record.education].label }}
        </template>
        <template #sex="{ record }">
          {{ sexTypeOptions[record.sex].label }}
        </template>
        <template #flag="{ record }">
          {{ flagTypeOptions[record.flag].label }}
        </template>

        <template #operations>
          <a-button type="text" size="small"> 修改 </a-button>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, reactive, watch, nextTick } from 'vue';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import { queryMemberList, PolicyRecord, PolicyParams } from '@/api/manage';
  import { Pagination } from '@/types/global';
  import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
  import type {
    TableColumnData,
    TableRowSelection,
  } from '@arco-design/web-vue/es/table/interface';
  import cloneDeep from 'lodash/cloneDeep';
  import Sortable from 'sortablejs';

  type SizeProps = 'mini' | 'small' | 'medium' | 'large';
  type Column = TableColumnData & { checked?: true };

  const rowSelection = reactive({
    type: 'checkbox',
    showCheckedAll: true,
    onlyCurrent: false,
  });
  const generateFormModel = () => {
    return {
      input: '',
      flag: '',
      education: '',
      sex: '',
    };
  };
  const { loading, setLoading } = useLoading(true);
  const { t } = useI18n();
  const renderData = ref<PolicyRecord[]>([]);
  const formModel = ref(generateFormModel());
  const cloneColumns = ref<Column[]>([]);
  const showColumns = ref<Column[]>([]);

  const size = ref<SizeProps>('medium');

  const basePagination: Pagination = {
    current: 0,
    pageSize: 20,
  };
  const pagination = reactive({
    ...basePagination,
  });
  const columns = computed<TableColumnData[]>(() => [
    {
      title: '所属组织',
      dataIndex: 'partyName',
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      slotName: 'sex',
    },
    {
      title: '手机号码',
      dataIndex: 'mobile',
    },
    {
      title: '身份证号',
      dataIndex: 'idNumber',
    },
    {
      title: '民族',
      dataIndex: 'nation',
    },
    {
      title: '学历',
      dataIndex: 'education',
      slotName: 'education',
    },
    {
      title: '党员类型',
      dataIndex: 'uswfpm',
    },
    {
      title: '状态',
      dataIndex: 'flag',
      slotName: 'flag',
    },
    {
      title: '党费缴纳到',
      dataIndex: 'pmdDate',
    },
    {
      title: t('searchTable.columns.operations'),
      dataIndex: 'operations',
      slotName: 'operations',
    },
  ]);
  // 11.博士研究生 10.硕士研究生 21.大学 22.大专 61.高中 41.中专 71.初中 81.小学 90.文盲"
  const educationTypeOptions: any = ref({
    11: {
      label: '博士研究生',
      value: '11',
    },
    10: {
      label: '硕士研究生',
      value: '10',
    },
    21: {
      label: '大学',
      value: '21',
    },
    22: {
      label: '大专',
      value: '22',
    },
    61: {
      label: '高中',
      value: '61',
    },
    41: {
      label: '中专',
      value: '41',
    },
    71: {
      label: '初中',
      value: '71',
    },
    81: {
      label: '小学',
      value: '81',
    },
    90: {
      label: '文盲',
      value: '90',
    },
  });
  const sexTypeOptions: any = ref({
    '1': {
      label: '男',
      value: '1',
    },
    '0': {
      label: '女',
      value: '0',
    },
  });
  // 0-正常，1-出党，2-死亡，3-停止党籍"
  const flagTypeOptions: any = ref({
    0: {
      label: '正常',
      value: '0',
    },
    1: {
      label: '出党',
      value: '1',
    },
    2: {
      label: '死亡',
      value: '2',
    },
    3: {
      label: '停止党籍',
      value: '3',
    },
  });
  const fetchData = async (
    params: PolicyParams = { current: 0, pageSize: 20 }
  ) => {
    setLoading(true);
    try {
      const { data } = await queryMemberList(params);
      renderData.value = data.content;
      pagination.current = params.current;
      pagination.total = data.totalPages;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };

  const search = () => {
    fetchData({
      ...basePagination,
      ...formModel.value,
    } as unknown as PolicyParams);
  };
  const onPageChange = (current: number) => {
    fetchData({ ...basePagination, current });
  };

  fetchData();
  const reset = () => {
    formModel.value = generateFormModel();
  };

  const handleSelectDensity = (
    val: string | number | Record<string, any> | undefined,
    e: Event
  ) => {
    size.value = val as SizeProps;
  };

  const handleChange = (
    checked: boolean | (string | boolean | number)[],
    column: Column,
    index: number
  ) => {
    if (!checked) {
      cloneColumns.value = showColumns.value.filter(
        (item) => item.dataIndex !== column.dataIndex
      );
    } else {
      cloneColumns.value.splice(index, 0, column);
    }
  };

  const exchangeArray = <T extends Array<any>>(
    array: T,
    beforeIdx: number,
    newIdx: number,
    isDeep = false
  ): T => {
    const newArray = isDeep ? cloneDeep(array) : array;
    if (beforeIdx > -1 && newIdx > -1) {
      // 先替换后面的，然后拿到替换的结果替换前面的
      newArray.splice(
        beforeIdx,
        1,
        newArray.splice(newIdx, 1, newArray[beforeIdx]).pop()
      );
    }
    return newArray;
  };

  const popupVisibleChange = (val: boolean) => {
    if (val) {
      nextTick(() => {
        const el = document.getElementById('tableSetting') as HTMLElement;
        const sortable = new Sortable(el, {
          onEnd(e: any) {
            const { oldIndex, newIndex } = e;
            exchangeArray(cloneColumns.value, oldIndex, newIndex);
            exchangeArray(showColumns.value, oldIndex, newIndex);
          },
        });
      });
    }
  };

  watch(
    () => columns.value,
    (val) => {
      cloneColumns.value = cloneDeep(val);
      cloneColumns.value.forEach((item, index) => {
        item.checked = true;
      });
      showColumns.value = cloneDeep(cloneColumns.value);
    },
    { deep: true, immediate: true }
  );
</script>

<script lang="ts">
  export default {
    name: 'SearchTable',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 20px;
  }
  :deep(.arco-table-th) {
    &:last-child {
      .arco-table-th-item-title {
        margin-left: 16px;
      }
    }
  }
  .action-icon {
    margin-left: 12px;
    cursor: pointer;
  }
  .active {
    color: #0960bd;
    background-color: #e3f4fc;
  }
  .setting {
    display: flex;
    align-items: center;
    width: 200px;
    .title {
      margin-left: 12px;
      cursor: pointer;
    }
  }
</style>
