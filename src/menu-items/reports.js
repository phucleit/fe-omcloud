// assets
import { IconDatabaseImport } from '@tabler/icons';

const reports = {
  id: 'reports-omcloud',
  title: 'Báo cáo - Omcloud',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Báo cáo',
      type: 'collapse',
      icon: IconDatabaseImport,
      children: [
        {
          id: 'list-reports',
          title: 'Danh sách báo cáo',
          type: 'item',
          url: '/dashboard/reports/list-reports',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default reports;
