import React, { useContext, createContext, useEffect, useState } from "react";
import io from "socket.io-client";
import type { Socket } from "socket.io-client";

const SocketContext = createContext<Socket>(null!);
let socket: Socket;
export const useSocket = () => {
  return useContext(SocketContext);
};

const SocketProvider = ({
  id,
  children,
}: {
  children?: React.ReactNode;
  id: string;
}) => {
  // const [socket, setSocket] = useState<Socket>(null!);
  useEffect(() => {
    connectSocket();
  }, [id]);
  async function connectSocket() {
    await fetch("/api/socket");
    socket = io("/", { path: "/api/socket", query: { id } });
    socket.on("connect", () => {
      console.log("connected");
    });
  }
  console.log(socket, "socket");
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
