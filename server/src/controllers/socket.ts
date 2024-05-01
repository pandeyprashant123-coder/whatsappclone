import type { Socket } from "socket.io";
const  socket = (socket:Socket) => {
    try {
      const id = socket.handshake.query.id!;
      socket.join(id);
  
      socket.on("send-message", ({ recipients, text }) => {
        recipients.forEach((recipient:string) => {
          const newRecipients = recipients.filter((r:string) => r !== recipient);
          newRecipients.push(id);
          socket.broadcast.to(recipient).emit("receive-message", {
            recipients: newRecipients,
            sender: id,
            text,
          });
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

export default socket;