import { useAuth } from "../../hooks/useAuth";

const Dashboard = () => {
  const { user, accessToken, isAuthenticated } = useAuth();

  console.log("USER:", user);
  console.log("ACCESS TOKEN:", accessToken);
  console.log("AUTHENTICATED:", isAuthenticated);

  return (
    <div>
      <h1>Dashboard</h1>

      <p>User: {user?.fullName}</p>

      <p>Email: {user?.email}</p>

      <p>Logged in: {isAuthenticated ? "Yes" : "No"}</p>
    </div>
  );
};

export default Dashboard;
