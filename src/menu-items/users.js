// assets
import { IconUserCircle } from '@tabler/icons';

const users = {
  id: 'users-omcloud',
  title: 'Tài khoản - Omcloud',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Tài khoản',
      type: 'collapse',
      icon: IconUserCircle,
      children: [
        {
          id: 'list-users',
          title: 'Danh sách tài khoản',
          type: 'item',
          url: '/dashboard/users/list-users',
          breadcrumbs: false
        },
        {
          id: 'list-group-users',
          title: 'Nhóm người dùng',
          type: 'item',
          url: '/dashboard/users/list-group-users',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default users;
