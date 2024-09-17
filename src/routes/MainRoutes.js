import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

/***** user *****/
// users
const ListUser = Loadable(lazy(() => import('views/users/ListUser')));
const AddUser = Loadable(lazy(() => import('views/users/AddUser')));
const UpdateUser = Loadable(lazy(() => import('views/users/UpdateUser')));

// group users
const ListGroupUser = Loadable(lazy(() => import('views/group-users/ListGroupUser')));
const AddGroupUser = Loadable(lazy(() => import('views/group-users/AddGroupUser')));
const UpdateGroupUser = Loadable(lazy(() => import('views/group-users/UpdateGroupUser')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/dashboard',
  element: <MainLayout />,
  children: [
    {
      path: '/dashboard',
      element: <DashboardDefault />
    },
    {
      path: 'users',
      children: [
        {
          path: 'list-users',
          element: <ListUser />
        },
        {
          path: 'add-users',
          element: <AddUser />
        },
        {
          path: 'update-users/:id',
          element: <UpdateUser />
        },
        {
          path: 'list-group-users',
          element: <ListGroupUser />
        },
        {
          path: 'add-group-users',
          element: <AddGroupUser />
        },
        {
          path: 'update-group-users/:id',
          element: <UpdateGroupUser />
        }
      ]
    }
  ]
};

export default MainRoutes;
