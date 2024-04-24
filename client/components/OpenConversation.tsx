import { useConversations } from "@/context/ConversationProvider";
import React, { useCallback } from "react";

import { IoSendSharp } from "react-icons/io5";

const OpenConversation = () => {
  const [text, setText] = React.useState<string>("");
  const { sendMessage, selectedConversation } = useConversations();
  const setRef = useCallback((e: boolean) => {
    // @ts-ignore
    if (e) e.scrollIntoView({ smooth: true });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(
      selectedConversation.recipients.map((r) => r.id),
      text
    );
    setText("");
  };
  return (
    <div className="flex flex-col h-screen grow p-3 w-1/2">
      <div className="flex-1 overflow-auto grow">
        {selectedConversation.messages.map((message, index) => {
          const lastMessage =
            selectedConversation.messages.length - 1 === index;
          return (
            <div
              // @ts-ignore
              ref={lastMessage ? setRef : null}
              key={index}
              className={`flex flex-col ${
                message.fromMe ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`p-2 m-2 text-white rounded-lg ${
                  message.fromMe ? "bg-green-400" : "bg-gray-300"
                }`}
              >
                {message.text}
              </div>
              <div className={`${message.fromMe && "text-right"}`}>
                {message.fromMe ? "You" : message.senderName}
              </div>
            </div>
          );
        })}
      </div>
      <form action="" onSubmit={handleSubmit} className="flex w-full">
        <textarea
          name="message"
          id="message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          cols={25}
          rows={2}
          className="p-2 border w-full"
        ></textarea>
        <button className="bg-green-400 text-white p-2" type="submit">
          <IoSendSharp className="h-10 align-middle text-center w-full" />
        </button>
      </form>
    </div>
  );
};

export default OpenConversation;
