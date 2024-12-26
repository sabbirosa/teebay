import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Dashboard() {
  // TODO: Implement logout functionality
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
  }

  const handleLogout = () => {
    logout();
    notifications.show({
      title: "Logout successful!",
      message: "You have successfully logged out.",
      color: "green",
    });
    navigate("/login");
  };

  return (
    <div>
      // TODO: Logout button
      <h1>Dashboard</h1>
      <Button
        onClick={() => {
          handleLogout();
        }}
      >
        Logout
      </Button>
    </div>
  );
}

export default Dashboard;
