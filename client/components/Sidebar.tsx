"use client";
import React, { useState } from "react";
import Conversations from "./Conversations";
import Contacts from "./Contacts";
import NewConversationModel from "./NewConversationModel";
import NewContactModel from "./NewContactModel";

const CONVERSATIONS_KEY = "conversations";
const CONTACT_KEY = "contacts";

const Sidebar = ({ id }: { id: String }) => {
  const [activeKey, setActiveKey] = useState<string>(CONVERSATIONS_KEY);
  const conversationOpen = activeKey == CONVERSATIONS_KEY;
  const [modelOpen, setModelOpen] = useState<boolean>(false);
  const closeModal = () => {
    setModelOpen(false);
  };

  return (
    <>
      <div className="w-1/2 flex flex-col">
        <nav className="w-full">
          <button
            className={`${
              activeKey == CONVERSATIONS_KEY
                ? "border-x-2 border-t-2 text-green-400"
                : "border-b-2"
            } px-5 py-3 font-bold text-lg w-1/2`}
            onClick={() => setActiveKey(CONVERSATIONS_KEY)}
          >
            Conversations
          </button>
          <button
            className={`${
              activeKey == CONTACT_KEY
                ? "border-x-2 border-t-2 text-green-400"
                : "border-b-2"
            }  px-5 py-3 font-bold text-lg w-1/2`}
            onClick={() => setActiveKey(CONTACT_KEY)}
          >
            Contacts
          </button>
        </nav>
        <div className="border-r-2 grow overflow-auto">
          {activeKey == CONVERSATIONS_KEY ? <Conversations /> : <Contacts />}
        </div>
        <div className="border-t-2 border-r-2 p-3">
          Your Id: <span className="text-gray-500">{id}</span>
        </div>
        <button
          className="bg-green-400 p-2 font-bold text-white text-xl"
          onClick={() => setModelOpen(true)}
        >
          New {conversationOpen ? "Conversation" : "Contact"}
        </button>
      </div>
      {modelOpen && (
        <div className="w-screen h-screen bg-[#00000037] absolute">
          {conversationOpen ? (
            <NewConversationModel closeModel={closeModal} />
          ) : (
            <NewContactModel closeModel={closeModal} />
          )}
        </div>
      )}
    </>
  );
};

export default Sidebar;
