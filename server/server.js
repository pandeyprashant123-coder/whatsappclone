import { Server } from "socket.io";
import { createServer } from "http";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  try {
    const id = socket.handshake.query.id;
    // console.log(id, "id");
    socket.join(id);

    socket.on("send-message", ({ recipients, text }) => {
      recipients.forEach((recipient) => {
        const newRecipients = recipients.filter((r) => r !== recipient);
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
});

httpServer.listen(5000, () => {
  console.log("server listening on port 5000");
});
