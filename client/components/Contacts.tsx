import { useContacts } from "@/context/ContactProvider";
import React from "react";

const Contacts = () => {
  const { contacts } = useContacts();
  return (
    <div>
      <ul className="flex flex-col gap-3 text-xl font-bold">
        {contacts?.map((contact) => {
          return (
            <li key={contact.id} className="border-b p-2">
              {contact.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Contacts;
