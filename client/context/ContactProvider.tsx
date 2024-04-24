import useLocalStorage from "@/hooks/useLocalStorage";
import React, { createContext, useContext } from "react";

type Contact = {
  id: string;
  name: string;
};
type ContactContextType = {
  contacts: Contact[];
  createContact: (id: string, name: string) => void;
};
const ContactsContext = createContext<ContactContextType>(null!);

export const useContacts = () => {
  return useContext(ContactsContext);
};

export const ContactsProvider = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const [contacts, setContacts] = useLocalStorage("contacts", []);
  const createContact = (id: string, name: string) => {
    setContacts((prevContacts: Contact[]) => {
      return [...prevContacts, { id, name }];
    });
  };
  return (
    <ContactsContext.Provider value={{ contacts, createContact }}>
      {children}
    </ContactsContext.Provider>
  );
};
