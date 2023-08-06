// const location = window.location;

// export const host = `${location.protocol}//${location.hostname}${
//   location.port === '' ? '' : `:${location.port}`
// }`;
export const ApiHost = '/api';

export const ApiUrl = {
  // 鉴权登录
  admin: {},
  // 组织管理
  orgManage: {
    queryOrgList: `${ApiHost}/admin/party/org/list`,
    queryPartyUnitList: `${ApiHost}/admin/party/partyUnit/page`, // 组织单位
  },
  // 党务中心
  party: {},
};
