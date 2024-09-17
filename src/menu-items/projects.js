// assets
import { IconBrandCodepen } from '@tabler/icons';

const projects = {
  id: 'projects-omcloud',
  title: 'Công trình - Omcloud',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Công trình',
      type: 'collapse',
      icon: IconBrandCodepen,
      children: [
        {
          id: 'list-projects',
          title: 'Danh sách công trình',
          type: 'item',
          url: '/dashboard/projects/list-projects',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default projects;
