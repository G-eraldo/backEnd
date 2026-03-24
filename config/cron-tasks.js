module.exports = {
  deletePassedEvents: {
    task: async ({ strapi }) => {
      const now = new Date().toISOString();

      const results = await strapi
        .documents("api::temps-fort.temps-fort")
        .findMany({
          filters: {
            $or: [
              { end_date: { $lt: now, $notNull: true } },
              { end_date: { $null: true }, start_date: { $lt: now } },
            ],
          },
          status: "published",
        });

      for (const event of results) {
        await strapi.documents("api::temps-fort.temps-fort").delete({
          documentId: event.documentId,
        });
      }
    },
    options: {
      rule: "0 2 * * *",
    },
  },
};
