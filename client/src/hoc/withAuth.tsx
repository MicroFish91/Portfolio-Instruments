import { useAuth } from "../customHooks";

interface WithAuthProps {
  children?: any;
}

const WithAuth: React.FC<WithAuthProps> = (props) =>
  useAuth() && props.children;

export default WithAuth;
