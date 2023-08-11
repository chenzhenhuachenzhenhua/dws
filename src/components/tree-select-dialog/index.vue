<template>
    <a-modal :visible="visible" @ok="handleOk" @cancel="handleCancel" :width="800" @before-open="init">
        <template #title>
            {{ title }}
        </template>
        <div style="margin-bottom: 100px;">
            <a-tree-select v-model="formVal" :allow-search="true" :data="treeData" :load-more="loadMore" placeholder="请选择"
                size="large" selectable="leaf" style="width: 100%"></a-tree-select>
        </div>
    </a-modal>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, defineEmits, defineProps } from 'vue';
import { queryPartyTreeDataSelect } from '@/api/manage';

const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    type: {
        type: Number,
        default: () => 0
    },
    title: {
        type: String,
        default: () => '选择上级组织'
    }
});
const emit = defineEmits(['cancel', 'confirm']);

const formVal = ref(null);

const handleOk = () => {
    emit('confirm', formVal.value);
};
const handleCancel = () => {
    emit('cancel');
}

const treeData = ref([]) as any;

const getTreeData = (params: { type?: number, id?: number }) => {
    return queryPartyTreeDataSelect(params).then(res => {
        if (!res) return [];
        return (res.data || []).map((item: any) => ({
            title: item.name,
            key: item.id,
            isLeaf: !item.isParent
        }))
    })
}
const loadMore = async (nodeData: any) => {
    const res = await getTreeData({ id: nodeData.key });
    nodeData.children = res;
    return nodeData;
};

const init = async () => {
    const res = await getTreeData({ type: props.type })
    treeData.value = res;
}
</script>
