// import{createServer} from 'http'
import { Server } from "socket.io";
import cors from "cors";
const corsMiddleware = cors();

// const httpServer = createServer()
// const io = new Server(httpServer,{
//   cors:{
//     origin: '*',
//     methods :[ 'GET', 'POST']
//   }
// });

// io.on("connection", (socket) => {
//   try {
//     const id = socket.handshake.query.id!;
//   console.log(socket.handshake,"hi")
//   socket.join(id);

//   socket.on('send-message',({recipents,text})=>{
//     recipents.forEach((recipient:string) => {
//       const newRecipients = recipents.filter((r:string) => r !== recipient);
//       newRecipients.push(id);
//       socket.broadcast.to(recipient).emit('receive-message',{
//         recipients: newRecipients, sender: id, text
//       })
//     });
//   })
//   } catch (error) {
//     console.log(error)
//   }

// });

// httpServer.listen(5000,()=>{
//   console.log("server listening on port 5000")
// })

export default function SocketHandler(req, res) {
  if (res.socket.server.io) {
    console.log("Socket is already running");
    res.end();
    return;
  }
  console.log("Socket is initializing");
  const io = new Server(res.socket.server, {
    path: "/api/socket",
    addTrailingSlash: false,
  });
  io.on("connection", (socket) => {
    console.log(socket, "hi");
    const id = socket.handshake.query.id;
    socket.join(id);
    socket.on("send-message", ({ recipents, text }) => {
      recipents.forEach((recipient) => {
        const newRecipients = recipents.filter((r) => r !== recipient);
        newRecipients.push(id);
        socket.broadcast.to(recipient).emit("receive-message", {
          recipients: newRecipients,
          sender: id,
          text,
        });
      });
    });
  });
  corsMiddleware(req, res, () => {
    res.socket.server.io = io;
    res.end();
  });
}
