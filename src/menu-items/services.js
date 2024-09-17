// assets
import { IconServerBolt } from '@tabler/icons';

const services = {
  id: 'services-omcloud',
  title: 'Dịch vụ - Omcloud',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Dịch vụ',
      type: 'collapse',
      icon: IconServerBolt,
      children: [
        {
          id: 'list-services',
          title: 'Danh sách dịch vụ',
          type: 'item',
          url: '/dashboard/services/list-services',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default services;
