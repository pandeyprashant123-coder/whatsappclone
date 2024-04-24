import React from "react";
import { useConversations } from "@/context/ConversationProvider";

const Conversations = () => {
  const { conversations, selectConversationIndex } = useConversations();
  return (
    <div>
      <ul className="flex flex-col text-xl font-bold">
        {conversations?.map((conversation, index) => {
          return (
            <li
              key={index}
              className={`${
                conversation.selected && "bg-green-300"
              } border-b p-3 cursor-pointer`}
              onClick={() => selectConversationIndex(index)}
            >
              {conversation.recipients.map((r) => r.name).join(",")}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Conversations;
