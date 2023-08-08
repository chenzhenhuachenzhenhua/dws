<script lang="tsx">
  import { defineComponent, ref, h, compile, computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRoute, useRouter, RouteRecordRaw } from 'vue-router';
  import type { RouteMeta } from 'vue-router';
  import { useAppStore } from '@/store';
  import { listenerRouteChange } from '@/utils/route-listener';
  import { openWindow, regexUrl } from '@/utils';
  import useMenuTree from './use-menu-tree';

  export default defineComponent({
    emit: ['collapse'],
    props: {
      mode: {
        type: String,
        default: 'horizontal',
      },
    },
    setup(props) {
      const { t } = useI18n();
      const appStore = useAppStore();
      const router = useRouter();
      const route = useRoute();
      const { menuTree } = useMenuTree();
      const collapsed = computed({
        get() {
          if (appStore.device === 'desktop') return appStore.menuCollapse;
          return false;
        },
        set(value: boolean) {
          appStore.updateSettings({ menuCollapse: value });
        },
      });

      // const topMenu = computed(() => appStore.topMenu);
      const openKeys = ref<string[]>([]);
      const selectedKey = ref<string[]>([]);
      const currentKey = ref<string>('');
      const goto = (item: RouteRecordRaw) => {
        // Open external link
        if (regexUrl.test(item.path)) {
          openWindow(item.path);
          selectedKey.value = [item.name as string];
          return;
        }
        // Eliminate external link side effects
        const { hideInMenu, activeMenu } = item.meta as RouteMeta;
        if (route.name === item.name && !hideInMenu && !activeMenu) {
          selectedKey.value = [item.name as string];
          return;
        }
        // Trigger router change
        router.push({
          name: item.name,
        });
      };

      const findMenuOpenKeys = (target: string) => {
        const result: string[] = [];
        let isFind = false;
        const backtrack = (item: RouteRecordRaw, keys: string[]) => {
          if (item.name === target) {
            isFind = true;
            result.push(...keys);
            return;
          }
          if (item.children?.length) {
            item.children.forEach((el) => {
              backtrack(el, [...keys, el.name as string]);
            });
          }
        };
        menuTree.value.forEach((el: RouteRecordRaw) => {
          if (isFind) return; // Performance optimization
          backtrack(el, [el.name as string]);
        });
        return result;
      };
      listenerRouteChange((newRoute) => {
        const { requiresAuth, activeMenu, hideInMenu } = newRoute.meta;
        if (requiresAuth && (!hideInMenu || activeMenu)) {
          const menuOpenKeys = findMenuOpenKeys(
            (activeMenu || newRoute.name) as string
          );

          const keySet = new Set([...menuOpenKeys, ...openKeys.value]);
          openKeys.value = [...keySet];
          selectedKey.value = [
            activeMenu || menuOpenKeys[menuOpenKeys.length - 1],
          ];
          // 当前选中的路由,包括主路由和父路由
          selectedKey.value = menuOpenKeys;
          // 保存当前的父路由
          const key = menuOpenKeys[0];
          // const key = newRoute.name as string;
          currentKey.value = key;
        }
      }, true);
      const setCollapse = (val: boolean) => {
        if (appStore.device === 'desktop')
          appStore.updateSettings({ menuCollapse: val });
      };

      const renderVerticalSubMenu = () => {
        const filterMenu = menuTree.value.filter(
          (item: any) => item.name === currentKey.value
        );

        function travel(_route: RouteRecordRaw[], nodes = []) {
          if (_route) {
            _route.forEach((element) => {
              // This is demo, modify nodes as needed
              const icon = element?.meta?.icon
                ? () => h(compile(`<${element?.meta?.icon}/>`))
                : null;
              // title: () => h(compile(t(element?.meta?.locale || ''))),
              const node =
                element?.children && element?.children.length !== 0 ? (
                  <a-sub-menu
                    key={element?.name}
                    v-slots={{
                      icon,
                      title: () => h(compile(t(element?.meta?.locale || ''))),
                    }}
                  >
                    {travel(element?.children)}
                  </a-sub-menu>
                ) : (
                  <a-menu-item
                    key={element?.name}
                    v-slots={{ icon }}
                    onClick={() => goto(element)}
                  >
                    {t(element?.meta?.locale || '')}
                  </a-menu-item>
                );
              nodes.push(node as never);
            });
          }
          return nodes;
        }
        if (filterMenu && filterMenu.length > 0) {
          return travel(filterMenu[0].children);
        }
        return travel(menuTree.value);
      };
      const renderHorizontalSubMenu = () => {
        function travel(_route: RouteRecordRaw[], nodes = []) {
          if (_route) {
            _route.forEach((element) => {
              // This is demo, modify nodes as needed
              const icon = element?.meta?.icon
                ? () => h(compile(`<${element?.meta?.icon}/>`))
                : null;
              // title: () => h(compile(t(element?.meta?.locale || ''))),
              const node = (
                <a-menu-item
                  key={element?.name}
                  v-slots={{ icon }}
                  onClick={() => {
                    console.log('element', element, element?.children?.[0]);
                    console.log('elementchildren', element?.children?.[0]);
                    let item = element;
                    if (element.children && element.children.length > 0) {
                      const children = element.children?.[0];
                      if (children.children && children.children.length > 0) {
                        item = children?.children[0];
                      } else {
                        item = element?.children[0];
                      }
                    }
                    selectedKey.value = [item.name as string];
                    goto(item as RouteRecordRaw);
                  }}
                >
                  {t(element?.meta?.locale || '')}
                </a-menu-item>
              );
              nodes.push(node as never);
            });
          }
          return nodes;
        }
        return travel(menuTree.value);
      };
      const renderSubMenu = () => {
        if (props.mode === 'horizontal') {
          return renderHorizontalSubMenu();
        }
        return renderVerticalSubMenu();
      };

      // const renderSubMenu1 = () => {
      //   function travel(_route: RouteRecordRaw[], nodes = []) {
      //     if (_route) {
      //       _route.forEach((element) => {
      //         // This is demo, modify nodes as needed
      //         const icon = element?.meta?.icon
      //           ? () => h(compile(`<${element?.meta?.icon}/>`))
      //           : null;
      //         // title: () => h(compile(t(element?.meta?.locale || ''))),
      //         const node =
      //           element?.children && element?.children.length !== 0 ? (
      //             <a-sub-menu
      //               key={element?.name}
      //               v-slots={{
      //                 icon,
      //                 'title': '',
      //                 'expand-icon-down': '',
      //               }}
      //             >
      //               {travel(element?.children)}
      //               {/* <>222</> */}
      //             </a-sub-menu>
      //           ) : (
      //             <a-menu-item
      //               key={element?.name}
      //               v-slots={{ icon }}
      //               onClick={() => goto(element)}
      //             >
      //               {t(element?.meta?.locale || '')}
      //             </a-menu-item>
      //           );
      //         nodes.push(node as never);
      //       });
      //     }
      //     return nodes;
      //   }
      //   return travel(menuTree.value);
      // };
      return () => (
        <a-menu
          mode={props.mode}
          v-model:collapsed={collapsed.value}
          v-model:open-keys={openKeys.value}
          show-collapse-button={appStore.device !== 'mobile'}
          auto-open={false}
          collapse-icon={false}
          selected-keys={selectedKey.value}
          auto-open-selected={true}
          level-indent={34}
          accordion={false}
          style="height: 100%;width:100%;background: transparent"
          onCollapse={setCollapse}
        >
          {renderSubMenu()}
        </a-menu>
      );
    },
  });
</script>
<style lang="less" scoped>
  :deep(.arco-menu-inner) {
    .arco-menu-inline-header {
      display: flex;
      align-items: center;
    }
    .arco-icon {
      &:not(.arco-icon-down) {
        font-size: 18px;
      }
    }
  }
</style>
