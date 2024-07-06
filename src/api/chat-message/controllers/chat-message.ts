import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::chat-message.chat-message",
  ({ strapi }) => ({
    async createAndEcho(ctx) {
      try {
        const { content } = ctx.request.body.data;
        const user = ctx.state.user;

        const userMessage = await strapi.entityService.create(
          "api::chat-message.chat-message",
          {
            data: {
              content,
              from_user: true,
              user: user.id,
              publishedAt: new Date(),
            },
          }
        );

        const serverMessage = await strapi.entityService.create(
          "api::chat-message.chat-message",
          {
            data: {
              content: `Echo: ${content}`,
              from_user: false,
              user: user.id,
              publishedAt: new Date(),
            },
          }
        );

        return { data: { userMessage, serverMessage } };
      } catch (err) {
        ctx.body = err;
        ctx.status = 500;
      }
    },

    async create(ctx) {
      const { data } = ctx.request.body;

      const entity = await strapi.entityService.create(
        "api::chat-message.chat-message",
        {
          data: {
            ...data,
            publishedAt: new Date(),
          },
        }
      );

      return { data: entity };
    },

    async find(ctx) {
      const user = ctx.state.user;

      if (!user) {
        return ctx.unauthorized("You must be logged in to view your messages");
      }

      const { query } = ctx;

      const chatMessages = await strapi.db
        .query("api::chat-message.chat-message")
        .findMany({
          ...query,
          where: {
            ...query.where,
            user: {
              id: user.id,
            },
          },
        });

      return { data: chatMessages };
    },
  })
);
