import React from "react";
import Sidebar from "./Sidebar";

const Dashboard = ({ id }: { id: String }) => {
  return (
    <div className="flex h-screen">
      <Sidebar id={id} />
    </div>
  );
};
export default Dashboard;
