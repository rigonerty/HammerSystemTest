import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect,useParams } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { APP_PREFIX_PATH } from 'configs/AppConfig'
import EditProfile from "./setting/EditProfile";
const withRouter = WrappedComponent => props => {
  const params = useParams();

  return (
    <WrappedComponent
      {...props}
      params={params}
    />
  );
};
export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="content"/>}>
      <Switch>
        <Route path={`${APP_PREFIX_PATH}/main/clients/list`} component={lazy(() => import(`./user-list`))} />
        <Route path={`${APP_PREFIX_PATH}/main/planner`} component={lazy(() => import(`./planner`))} />
        <Route path={`${APP_PREFIX_PATH}/main/clients/:id`} component={withRouter(EditProfile)} />
        <Redirect from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/main/clients/list`} />
      </Switch>
    </Suspense>
  )
}

export default React.memo(AppViews);