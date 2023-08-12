<template>
    <a-modal :visible="visible" @ok="handleOk" @cancel="handleCancel" modal-class="custom-modal" :width="600" @open="init" @close="close">
        <template #title>
            {{ options.title || '选择上级组织' }}
        </template>

        <a-spin :loading="loading" style="width: 100%;height: 100%;" tip="loading">
            <div style="height: 100%;">
                <a-input-search style="margin-bottom: 8px; width: 100%" allow-clear v-model="searchKey" placeholder="请输入关键词" @change="handleSearch"/>
                <div style="height: calc( 100% - 40px ); overflow: hidden;margin-left: 20px;">
                    <div style="height: 100%;overflow-y: scroll;">
                        <a-tree :data="treeData" :load-more="loadMore" size="large"
                            @select="leafSelect" action-on-node-click="expand">
                            <template #title="nodeData">
                                <template v-if="(index = getMatchIndex(nodeData?.title), index < 0)">{{ nodeData?.title
                                }}</template>
                                <span v-else>
                                    {{ nodeData?.title?.substr(0, index) }}
                                    <span style="color: var(--color-primary-light-4);">
                                        {{ nodeData?.title?.substr(index, searchKey.length) }}
                                    </span>{{ nodeData?.title?.substr(index + searchKey.length) }}
                                </span>
                            </template>
                        </a-tree>
                    </div>
                </div>
            </div>
        </a-spin>
    </a-modal>
</template>

<script lang="ts" setup>
import { ref, h, computed } from 'vue';
import { queryPartyTreeDataSelect } from '@/api/manage';
import { IconFolder, IconDriveFile } from '@arco-design/web-vue/es/icon';


const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    options: {
        type: Object,
        default: () => {
            return {
                type: 0,
                title: '选择上级组织'
            }
        }
    }
});
const emit = defineEmits(['confirm']);

let formVal: any = null;
const searchKey = ref('');
const index = ref(0);
const loading = ref(false);

const handleOk = () => {
    emit('confirm', formVal);
};
const handleCancel = () => {
    emit('confirm');
}

const originTreeData = ref([]) as any;

const searchData = (keyword: string) => {
    const loop = (data: any) => {
        const result: any = [];
        (data || []).forEach((item: any) => {
            if (item.title.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
                result.push({ ...item });
            } else if (item.children) {
                const filterData = loop(item.children);
                if (filterData.length) {
                    result.push({
                        ...item,
                        children: filterData
                    })
                }
            }
        })
        return result;
    }

    return loop(originTreeData.value);
}

const treeData = computed(() => {
    if (!searchKey.value) return originTreeData;
    return searchData(searchKey.value);
})

const getTreeData = (params: { type?: string, id?: number, keyword?: string }) => {
    return queryPartyTreeDataSelect(params).then(res => {
        if (!res) return [];
        return (res.data || []).map((item: any) => ({
            title: item.name,
            key: item.id,
            isLeaf: !item.isParent,
            icon: () => h(item.isParent ? IconFolder : IconDriveFile),
        }))
    })
}
const loadMore = async (nodeData: any) => {
    const res = await getTreeData({ id: nodeData.key, type: props.options.type });
    nodeData.children = res;
    return nodeData;
};

const init = async () => {
    loading.value = true;
    const res = await getTreeData({ type: props.options.type, keyword: searchKey.value }).finally(() => { loading.value = false })
    originTreeData.value = res;
}
const close = () => {
    originTreeData.value = [];
    formVal = null;
    searchKey.value = '';
}
const getMatchIndex = (title: string) => {
    if (!searchKey.value) return -1;
    return title.toLowerCase().indexOf(searchKey.value.toLowerCase());
}
const leafSelect = (selectedKeys: any, data: any) => {
    const { key, title } = data.node;
    formVal = { id: key, name: title };
}
const handleSearch = () => {
    init();
}
</script>
<style lang="less">
.arco-tree-node-disabled-selectable {
    .arco-tree-node-title {
        color: #333;

        &:hover {
            color: #333;
            cursor: pointer;
        }
    }
}
.arco-modal.custom-modal {
    height: calc(100% - 100px);
    .arco-modal-body {
        height: calc( 100% - 113px );
    }
}
</style>
