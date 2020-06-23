import React from 'react';
import { Switch, Redirect } from 'react-router-dom'
import { RouteWithLayout } from './components'
import { PrivateRoute } from './components/authComponent'
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts'

import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  UserList as UserListView,
  TutorList as TutorListView,
  Typography as TypographyView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  OrganizationList as OrganizationListView,
  AppRequestList as AppRequestListView,
  ProductListParent as ProductListParentView,
  HomePage as HomePageView,
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/homepage"
      />
      <PrivateRoute
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <PrivateRoute
        component={TutorListView}
        exact
        layout={MainLayout}
        path="/tutors"
      />
      <PrivateRoute
        component={UserListView}
        exact
        layout={MainLayout}
        path="/learners"
      />
      <PrivateRoute
        component={ProductListView}
        exact
        layout={MainLayout}
        path="/products"
      />
      <PrivateRoute
        component={ProductListParentView}
        exact
        layout={MainLayout}
        path="/productsparent"
      />
      <PrivateRoute
        component={TypographyView}
        exact
        layout={MainLayout}
        path="/typography"
      />
      <PrivateRoute
        component={IconsView}
        exact
        layout={MainLayout}
        path="/icons"
      />
      <PrivateRoute
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <PrivateRoute
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <PrivateRoute
        component={OrganizationListView}
        exact
        layout={MainLayout}
        path="/organizations"
      />
      <PrivateRoute
        component={AppRequestListView}
        exact
        layout={MainLayout}
        path="/apprequests"
      />
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <RouteWithLayout
        component={HomePageView}
        exact
        layout={MinimalLayout}
        path="/homepage"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
