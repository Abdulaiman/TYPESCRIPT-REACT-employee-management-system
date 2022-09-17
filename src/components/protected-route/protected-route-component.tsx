import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const token = localStorage.getItem("token");

  const user: { role: String; isVerified: Boolean } = JSON.parse(
    `${localStorage.getItem("user")}`
  );
  if (!token) {
    return <Navigate to="/login" />;
  }
  if (user.isVerified !== true) {
    return <Navigate to="/not-verified" />;
  }
  return children;
};

export default ProtectedRoute;
