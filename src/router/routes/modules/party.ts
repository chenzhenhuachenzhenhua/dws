import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';
/**
 * 党务中心
 */
const MANAGE: AppRouteRecordRaw = {
  path: '/party',
  name: 'party',
  component: '',
  meta: {
    locale: 'menu.party',
    requiresAuth: true,
    icon: '',
    order: 1,
  },
  children: [
    {
      path: 'fee',
      name: 'fee',
      component: DEFAULT_LAYOUT,
      meta: {
        locale: 'menu.party.fee',
        requiresAuth: true,
        roles: ['*'],
      },
      children: [
        {
          path: 'feemanage',
          name: 'feemanage',
          component: () => import('@/views/dashboard/workplace/index.vue'),
          meta: {
            locale: 'menu.party.fee.manage',
            requiresAuth: true,
            roles: ['*'],
          },
        },
        {
          path: 'wages',
          name: 'wages',
          component: () => import('@/views/dashboard/monitor/index.vue'),
          meta: {
            locale: 'menu.party.fee.wages',
            requiresAuth: true,
            roles: ['admin'],
          },
        },
      ],
    },
    {
      path: 'activity',
      name: 'activity',
      component: DEFAULT_LAYOUT,
      meta: {
        locale: 'menu.party.activity',
        requiresAuth: true,
        roles: ['*'],
      },
      children: [
        {
          path: 'shyk',
          name: 'shyk',
          component: () => import('@/views/dashboard/workplace/index.vue'),
          meta: {
            locale: 'menu.party.activity.shyk',
            requiresAuth: true,
            roles: ['*'],
          },
        },
        {
          path: 'txth',
          name: 'txth',
          component: () => import('@/views/dashboard/monitor/index.vue'),
          meta: {
            locale: 'menu.party.activity.txth',
            requiresAuth: true,
            roles: ['admin'],
          },
        },
      ],
    },
  ],
};

export default MANAGE;
