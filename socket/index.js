import { Server } from "socket.io";
import { createServer } from "http";

const port = process.env.PORT || 5001;

const httpServer = createServer({
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const io = new Server(httpServer);

io.on("connection", (socket) => {
  try {
    const id = socket.handshake.query.id;
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

httpServer.listen(port, () =>
  console.log(`Socket server is listening on port ${port}...`)
);
