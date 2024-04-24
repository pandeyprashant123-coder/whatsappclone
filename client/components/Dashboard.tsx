import React from "react";
import Sidebar from "./Sidebar";
import OpenConversation from "./OpenConversation";
import { useConversations } from "@/context/ConversationProvider";

const Dashboard = ({ id }: { id: String }) => {
  const { selectedConversation } = useConversations();
  return (
    <div className="flex h-screen">
      <Sidebar id={id} />
      {selectedConversation && <OpenConversation />}
    </div>
  );
};
export default Dashboard;
