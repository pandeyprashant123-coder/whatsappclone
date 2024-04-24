"use client";
import React, { useRef } from "react";
import { ImCross } from "react-icons/im";
import { useContacts } from "@/context/ContactProvider";
import { useConversations } from "@/context/ConversationProvider";

const NewConversationModel = ({ closeModel }: { closeModel: () => void }) => {
  const [selectContactsIds, setSelectContactsIds] = React.useState<string[]>(
    []
  );
  const { contacts } = useContacts();
  const { createConversation } = useConversations();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createConversation(selectContactsIds);
    closeModel();
  };
  const handleCheckBoxChange = (contactId: string) => {
    setSelectContactsIds((prevSelectedContacts) => {
      if (prevSelectedContacts?.includes(contactId)) {
        return prevSelectedContacts?.filter((prevId) => prevId !== contactId);
      } else {
        return [...prevSelectedContacts, contactId];
      }
    });
  };
  return (
    <>
      <div className="bg-white p-4 mt-2 mx-3 flex justify-between opacity-100 border-b">
        <h1 className="font-bold">Create Conversation</h1>
        <button onClick={closeModel}>
          <ImCross />
        </button>
      </div>
      <div className="bg-white p-4 mb-2 mx-3 flex justify-between opacity-100">
        <form action="" onSubmit={handleSubmit}>
          {contacts.map((contact) => {
            return (
              <div key={contact.id} className="flex gap-2 font-bold">
                <input
                  type="checkbox"
                  name="contactName"
                  id="contactName"
                  value={contact?.name}
                  checked={selectContactsIds?.includes(contact?.id)}
                  onChange={() => handleCheckBoxChange(contact?.id)}
                />
                <label htmlFor="contactName">{contact.name}</label>
              </div>
            );
          })}
          <button
            type="submit"
            className="bg-green-400 p-2 font-bold text-white mt-3 rounded"
          >
            Create
          </button>
        </form>
      </div>
    </>
  );
};

export default NewConversationModel;
