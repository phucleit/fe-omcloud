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

// status
const ListStatus = Loadable(lazy(() => import('views/status/ListStatus')));
const AddStatus = Loadable(lazy(() => import('views/status/AddStatus')));
const UpdateStatus = Loadable(lazy(() => import('views/status/UpdateStatus')));

// công trình
const ListProjects = Loadable(lazy(() => import('views/projects/ListProjects')));
const AddProjects = Loadable(lazy(() => import('views/projects/AddProjects')));
const UpdateProjects = Loadable(lazy(() => import('views/projects/UpdateProjects')));

// báo cáo
const ListReports = Loadable(lazy(() => import('views/reports/ListReports')));
const AddReports = Loadable(lazy(() => import('views/reports/AddReports')));
const DetailReports = Loadable(lazy(() => import('views/reports/DetailReports')));
const PreviewReports = Loadable(lazy(() => import('views/reports/PreviewReports')));

// const ListLogs = Loadable(lazy(() => import('views/logs/ListLogs')));

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
    },

    // status
    {
      path: 'status',
      children: [
        {
          path: 'list-status',
          element: <ListStatus />
        },
        {
          path: 'add-status',
          element: <AddStatus />
        },
        {
          path: 'update-status/:id',
          element: <UpdateStatus />
        }
      ]
    },

    // logs
    // {
    //   path: 'logs',
    //   children: [
    //     {
    //       path: 'list-logs',
    //       element: <ListLogs />
    //     }
    //   ]
    // },

    // công trình
    {
      path: 'projects',
      children: [
        {
          path: 'list-projects',
          element: <ListProjects />
        },
        {
          path: 'add-projects',
          element: <AddProjects />
        },
        {
          path: 'update-projects/:id',
          element: <UpdateProjects />
        }
      ]
    },

    // báo cáo
    {
      path: 'reports',
      children: [
        {
          path: 'list-reports',
          element: <ListReports />
        },
        {
          path: 'add-reports',
          element: <AddReports />
        },
        {
          path: 'detail-reports/:id',
          element: <DetailReports />
        },
        {
          path: 'preview-reports/:id',
          element: <PreviewReports />
        }
      ]
    }
  ]
};

export default MainRoutes;
