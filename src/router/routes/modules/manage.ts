import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';
/**
 * 组织管理
 */
const MANAGE: AppRouteRecordRaw = {
  path: '/manage',
  name: 'manage',
  component: '',
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
      component: DEFAULT_LAYOUT,
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
          component: () =>
            import('@/views/manage/organization/query/index.vue'),
          meta: {
            locale: 'menu.manage.organization.info',
            requiresAuth: true,
            roles: ['*'],
          },
        },
      ],
    },
    {
      path: 'member',
      name: 'member',
      component: DEFAULT_LAYOUT,
      meta: {
        locale: 'menu.manage.member',
        requiresAuth: true,
        roles: ['*'],
      },
      children: [
        {
          path: 'memberInfo',
          name: 'memberInfo',
          component: () => import('@/views/dashboard/workplace/index.vue'),
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
            roles: ['admin'],
          },
        },
        {
          path: 'query',
          name: 'query',
          component: () => import('@/views/result/success/index.vue'),
          meta: {
            locale: 'menu.manage.member.query',
            requiresAuth: true,
            roles: ['admin'],
          },
        },
      ],
    },
  ],
};

export default MANAGE;
