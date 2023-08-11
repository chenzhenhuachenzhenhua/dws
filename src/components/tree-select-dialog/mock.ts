import Mock from 'mockjs';
import setupMock, { successResponseWrap } from '@/utils/setup-mock';

const { Random } = Mock;

setupMock({
  setup() {
    // Quality Inspection
    Mock.mock(new RegExp('/api/admin/party/org/treeData'), () => {
      const total = Mock.mock({ "number|0-20": 0 }).number
      return successResponseWrap(
        Array.from({length: total}).map(() => ({
          id: Random.guid(),
          name: Random.ctitle(3, 5),
          isParent: Random.boolean()
        }))
      );
    });
  },
});
