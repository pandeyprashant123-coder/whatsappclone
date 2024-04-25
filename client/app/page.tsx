import useLocalStorage from "@/hooks/useLocalStorage";

import Login from "@/components/Login";
import Dashboard from "@/components/Dashboard";
import { ContactsProvider } from "@/context/ContactProvider";
import { ConversationsProvider } from "@/context/ConversationProvider";
import SocketProvider from "@/context/SocketProvider";

export default function Home() {
  const [id, setId] = useLocalStorage("id", null);
  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  );
  return id ? dashboard : <Login onIdSubmit={setId} />;
}
