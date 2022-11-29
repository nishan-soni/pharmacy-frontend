import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  children: any;
  accessFunction: () => boolean;
  deniedRoute: string;
};

function PrivateRoute(props: PrivateRouteProps) {
  const { children, accessFunction, deniedRoute } = props;
  if (accessFunction()) {
    return children;
  } else {
    return <Navigate to={deniedRoute} />;
  }
}

export default PrivateRoute;
