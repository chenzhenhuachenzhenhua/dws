import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';
// export const DEFAULT_ChildLAYOUT = () =>
//   import('@/layout/default-childLayout.vue');
export const DEFAULT_CHILD_LAYOUT = () =>
  import('@/layout/default-childLayout.vue');
/**
 * 组织管理
 */
const MANAGE: AppRouteRecordRaw = {
  path: '/manage',
  name: 'manage',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.manage',
    requiresAuth: true,
    icon: '',
    order: 0,
  },
  children: [
    {
      path: 'organization',
      name: 'organization',
      component: DEFAULT_CHILD_LAYOUT,
      meta: {
        locale: 'menu.manage.organization',
        requiresAuth: true,
        roles: ['*'],
      },
      children: [
        {
          path: 'statistics',
          name: 'statistics',
          component: () =>
            import('@/views/manage/organization/statistics/index.vue'),
          meta: {
            locale: 'menu.manage.organization.statistics',
            requiresAuth: true,
            roles: ['*'],
          },
        },
        {
          path: 'orgInfo',
          name: 'orgInfo',
          component: () => import('@/views/manage/organization/info/index.vue'),
          meta: {
            locale: 'menu.manage.organization.info',
            requiresAuth: true,
            roles: ['*'],
          },
        },
        {
          path: 'partyUnit', // 组织单位
          name: 'partyUnit',
          component: () =>
            import('@/views/manage/organization/partyUnit/index.vue'),
          meta: {
            locale: 'menu.manage.organization.partyUnit',
            requiresAuth: true,
            roles: ['*'],
          },
        },

        {
          path: 'partyMove', // 组织转移
          name: 'partyMove',
          component: () =>
            import('@/views/manage/organization/partyMove/index.vue'),
          meta: {
            locale: 'menu.manage.organization.partyMove',
            requiresAuth: true,
            roles: ['*'],
          },
        },
        {
          path: 'memorandum', // 党建记事本
          name: 'memorandum',
          component: () =>
            import('@/views/manage/organization/memorandum/index.vue'),
          meta: {
            locale: 'menu.manage.organization.memorandum',
            requiresAuth: true,
            roles: ['*'],
          },
        },
      ],
    },
    {
      path: 'member',
      name: 'member',
      component: DEFAULT_CHILD_LAYOUT,
      meta: {
        locale: 'menu.manage.member',
        requiresAuth: true,
        roles: ['*'],
      },
      children: [
        {
          path: 'memberInfo',
          name: 'memberInfo',
          component: () => import('@/views/manage/member/info/index.vue'),
          meta: {
            locale: 'menu.manage.member.info',
            requiresAuth: true,
            roles: ['*'],
          },
        },
        {
          path: 'advice',
          name: 'advice',
          component: () => import('@/views/dashboard/monitor/index.vue'),
          meta: {
            locale: 'menu.manage.member.advice',
            requiresAuth: true,
            roles: ['*'],
          },
        },
        {
          path: 'query',
          name: 'query',
          component: () => import('@/views/result/success/index.vue'),
          meta: {
            locale: 'menu.manage.member.query',
            requiresAuth: true,
            roles: ['*'],
          },
        },
      ],
    },
  ],
};

export default MANAGE;
