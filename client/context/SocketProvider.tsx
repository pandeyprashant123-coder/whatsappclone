"use client";
import React, { useContext, createContext, useEffect, useState } from "react";
import io from "socket.io-client";
import type { Socket } from "socket.io-client";

const SocketContext = createContext<Socket>(null!);
// let newSocket: Socket;
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
  const [socket, setSocket] = useState<Socket>(null!);
  useEffect(() => {
    // connectSocket();
    const newSocket = io("http://localhost:5000", { query: { id } });
    setSocket(newSocket);
    return () => {
      socket.close();
    };
  }, [id]);
  // #todo. #1 some other way to connect socket make it work some day
  // async function connectSocket() {
  //   await fetch("/api/socket");
  //   newSocket = io("/", { path: "/api/socket", query: { id } });
  //   newSocket.on("connect", () => {
  //     console.log("connected");
  //   });
  //   setSocket(newSocket);
  // }
  // console.log(socket, "socket");
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
