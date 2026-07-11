import AuthLoader from "../components/common/loader/AuthLoader";
import useAuth from "../hooks/queries/useAuth";

const GuardLoader = ({ children }) => {
  const { isLoading, isAuthChecked } = useAuth();

  if (isLoading || !isAuthChecked) {
    return <AuthLoader />;
  }

  return children;
};

export default GuardLoader;
