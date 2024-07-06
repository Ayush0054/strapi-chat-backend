// // /**
// //  * chat-message router
// //  */

import { factories } from "@strapi/strapi";

// // export default factories.createCoreRouter('api::chat-message.chat-message');

export default {
  routes: [
    {
      method: "POST",
      path: "/chat-messages/echo",
      handler: "chat-message.createAndEcho",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/chat-messages",
      handler: "chat-message.find",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/chat-messages",
      handler: "chat-message.create",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/chat-messages/:id",
      handler: "chat-message.findOne",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "PUT",
      path: "/chat-messages/:id",
      handler: "chat-message.update",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "DELETE",
      path: "/chat-messages/:id",
      handler: "chat-message.delete",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
