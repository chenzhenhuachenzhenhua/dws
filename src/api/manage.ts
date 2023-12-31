import axios from 'axios';
import qs from 'query-string';
import type { DescData } from '@arco-design/web-vue/es/descriptions/interface';
import { ApiUrl } from './api';

export interface PolicyRecord {
  id: string;
  number: number;
  name: string;
  contentType: 'img' | 'horizontalVideo' | 'verticalVideo';
  filterType: 'artificial' | 'rules';
  count: number;
  status: 'online' | 'offline';
  createdTime: string;
}

export interface PolicyParams extends Partial<PolicyRecord> {
  current: number;
  pageSize: number;
}

export interface PolicyListRes {
  list: PolicyRecord[];
  total: number;
}
export interface ServiceRecord {
  id: number;
  title: string;
  description: string;
  name?: string;
  actionType?: string;
  icon?: string;
  data?: DescData[];
  enable?: boolean;
  expires?: boolean;
}
export function queryInspectionList() {
  return axios.get('/api/list/quality-inspection');
}

export function queryTheServiceList() {
  return axios.get('/api/list/the-service');
}

export function queryRulesPresetList() {
  return axios.get('/api/list/rules-preset');
}

/**
 *
 * @param params 组织查询
 * @returns
 */
export function queryOrgList(params: PolicyParams) {
  return axios.post('/api/admin/party/org/list', {
    name: params.name,
    page: params.current,
    size: params.pageSize,
  });
}
/**
 *
 * @param params 组织单位查询
 * @returns
 */
export function queryPartyUnitList(params: PolicyParams) {
  // return axios.post(ApiUrl.orgManage.queryPartyUnitList, {
  //   name: params.name,
  //   page: params.current,
  //   size: params.pageSize,
  // });
  return axios.post(ApiUrl.orgManage.queryPartyUnitList, {
    ...params,
  });
}

/**
 *
 * @param params 党员信息查询
 * @returns
 */
export function queryMemberList(params: PolicyParams) {
  return axios.post(ApiUrl.orgManage.queryMemberList, {
    ...params,
  });
}
/**
 * @param params 组织单位查询
 * @returns
 */
export function queryPartyTreeDataSelect(params: any) {
  /**
   * todo 接口待确认
   */
  return axios.post(ApiUrl.orgManage.queryPartyTreeDataSelect, params);
}
