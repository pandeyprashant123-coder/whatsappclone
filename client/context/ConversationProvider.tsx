import useLocalStorage from "@/hooks/useLocalStorage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { useContacts } from "./ContactProvider";
import { useSocket } from "./SocketProvider";

type Conversation = {
  recipients: string[];
  messages: {
    sender: string;
    text: string;
  }[];
};
type formattedConversation = {
  recipients: {
    id: string;
    name: string;
  }[];
  messages: {
    sender: string;
    senderName: string;
    fromMe: boolean;
    text: string;
  }[];
  selected: boolean;
};
type ConversationContextType = {
  conversations: formattedConversation[];
  selectedConversation: formattedConversation;
  selectConversationIndex: React.Dispatch<React.SetStateAction<number>>;
  createConversation: (recipients: string[]) => void;
  sendMessage: (recipients: string[], text: string) => void;
};

const ConversationsContext = createContext<ConversationContextType>(null!);

export const useConversations = () => {
  return useContext(ConversationsContext);
};

export const ConversationsProvider = ({
  children,
  id,
}: {
  children?: React.ReactNode;
  id: string;
}) => {
  const [conversations, setConversations] = useLocalStorage(
    "Conversations",
    []
  );
  const [selectedConversationIndex, setSelectedConverstionIndex] =
    React.useState<number>(0);
  const { contacts } = useContacts();
  const socket = useSocket();
  const createConversation = (recipients: string[]) => {
    setConversations((prevConversations: Conversation[]) => {
      return [...prevConversations, { recipients, messages: [] }];
    });
  };

  const addMessageToConversation = useCallback(
    ({
      recipients,
      text,
      sender,
    }: {
      recipients: string[];
      text: string;
      sender: string;
    }) => {
      setConversations((prevConversations: Conversation[]) => {
        let madeChange = false;
        const newMessage = { sender, text };
        const newConversation = prevConversations.map(
          (conversation: Conversation) => {
            if (arrayEquality(conversation.recipients, recipients)) {
              madeChange = true;
              return {
                ...conversation,
                messages: [...conversation.messages, newMessage],
              };
            }
            return conversation;
          }
        );
        console.log(newConversation, "newConversation");
        if (madeChange) {
          return newConversation;
        } else {
          return [...prevConversations, { recipients, messages: [newMessage] }];
        }
      });
    },
    [setConversations]
  );
  // console.log(socket, "socket2");

  useEffect(() => {
    if (socket == null) return;
    socket.on("receive-message", addMessageToConversation);
    return () => {
      socket.off("receive-message");
    };
  }, [socket, addMessageToConversation]);
  const sendMessage = (recipients: string[], text: string) => {
    // console.log(text, recipients, "send-message");
    socket.emit("send-message", { recipients, text });
    addMessageToConversation({ recipients, text, sender: id });
  };
  const formattedConversations: formattedConversation[] = conversations?.map(
    (conversation: Conversation, index: number) => {
      const recipients = conversation.recipients?.map((recipient) => {
        const contact = contacts?.find((contact) => contact.id === recipient);
        const name = (contact && contact.name) || recipient;
        return { id: recipient, name };
      });

      const messages = conversation.messages.map((message) => {
        const contact = contacts?.find(
          (contact) => contact.id === message.sender
        );
        const name = (contact && contact.name) || message.sender;
        const fromMe = id === message.sender;

        return { ...message, senderName: name, fromMe };
      });
      const selected = index === selectedConversationIndex;
      return { ...conversation, messages, recipients, selected };
    }
  );

  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedConversationIndex],
    selectConversationIndex: setSelectedConverstionIndex,
    createConversation,
    sendMessage,
  };
  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
};

const arrayEquality = (a: any[], b: any[]) => {
  if (a.length !== b.length) return false;
  a.sort();
  b.sort();
  return a.every((element, index) => {
    return element === b[index];
  });
};
