module.exports = ({ env }) => {
  const connectionString = env("DATABASE_URL");

  return {
    connection: {
      client: "postgres",
      // Si DATABASE_URL existe (Railway), on l'utilise. Sinon, on prend les variables une par une.
      connection: connectionString
        ? {
            connectionString,
            ssl: env.bool("DATABASE_SSL", false) && {
              rejectUnauthorized: false, // Requis pour les DB gérées sur le cloud
            },
          }
        : {
            host: env("DATABASE_HOST", "127.0.0.1"),
            port: env.int("DATABASE_PORT", 5432),
            database: env("DATABASE_NAME", "strapi"),
            user: env("DATABASE_USERNAME", "strapi"),
            password: env("DATABASE_PASSWORD", "strapi"),
            ssl: env.bool("DATABASE_SSL", false),
          },
      pool: {
        min: env.int("DATABASE_POOL_MIN", 2),
        max: env.int("DATABASE_POOL_MAX", 10),
      },
      acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
    },
  };
};
