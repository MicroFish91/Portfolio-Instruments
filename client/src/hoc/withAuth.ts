import { useAuth } from "../customHooks";

type WithAuthProps = any;

const WithAuth = (props: WithAuthProps) => useAuth() && props.children;

export default WithAuth;
