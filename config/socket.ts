import { Server } from "socket.io";
import { Strapi } from "@strapi/strapi";

const socketConfig = {
  register({ strapi }: { strapi: Strapi }) {
    const io = new Server(strapi.server.httpServer, {
      cors: {
        origin: "*",
      },
    });

    io.on("connection", (socket) => {
      console.log(`A user connected: ${socket.id}`);

      socket.on("message", async (message) => {
        console.log(`Message received: ${message}`);

        io.emit("message", message);
      });

      socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
      });
    });

    (strapi as any).io = io;
  },
};

export default socketConfig;
