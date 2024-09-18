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

// services
const ListServices = Loadable(lazy(() => import('views/services/ListServices')));
const AddServices = Loadable(lazy(() => import('views/services/AddServices')));
const UpdateServices = Loadable(lazy(() => import('views/services/UpdateServices')));

// plan services
const ListPlanServices = Loadable(lazy(() => import('views/plan-services/ListPlanServices')));
const AddPlanServices = Loadable(lazy(() => import('views/plan-services/AddPlanServices')));
const UpdatePlanServices = Loadable(lazy(() => import('views/plan-services/UpdatePlanServices')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/dashboard',
  element: <MainLayout />,
  children: [
    {
      path: '/dashboard',
      element: <DashboardDefault />
    },

    // users
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
    },

    // services
    {
      path: 'services',
      children: [
        {
          path: 'list-services',
          element: <ListServices />
        },
        {
          path: 'add-services',
          element: <AddServices />
        },
        {
          path: 'update-services/:id',
          element: <UpdateServices />
        }
      ]
    },

    // plan services
    {
      path: 'plan-services',
      children: [
        {
          path: 'list-plan-services',
          element: <ListPlanServices />
        },
        {
          path: 'add-plan-services',
          element: <AddPlanServices />
        },
        {
          path: 'update-plan-services/:id',
          element: <UpdatePlanServices />
        }
      ]
    }
  ]
};

export default MainRoutes;
