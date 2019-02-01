import React from 'react';
import DefaultLayout from './containers/DefaultLayout';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Campaign = React.lazy(() => import('./views/Campaign'));
const Calendar = React.lazy(() => import('./views/Calendar'));
const Recommendation = React.lazy(() => import('./views/Recommendation'));
const Report = React.lazy(() => import('./views/Report'));
const NewCampaign = React.lazy(() => import('./views/NewCampaign'));


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/campaigns', name: 'Campaign', component: Campaign },
  { path: '/reports', name: 'Report', component: Report },
  { path: '/recommendations', name: 'Recommendation', component: Recommendation },
  { path: '/calendar', name: 'Calendar', component: Calendar }, 
  { path: '/new-campaign', name: 'New Campaign', component: NewCampaign },
];

export default routes;
