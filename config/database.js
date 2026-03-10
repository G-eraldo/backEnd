const path = require("path");

module.exports = ({ env }) => {
  const client = env("DATABASE_CLIENT", "sqlite");

  const connections = {
    sqlite: {
      connection: {
        filename: path.join(
          __dirname,
          "..",
          env("DATABASE_FILENAME", ".tmp/data.db"),
        ),
      },
      useNullAsDefault: true,
    },
    postgres: {
      connection: {
        // On essaie d'abord l'URL complète, sinon on prend les variables une par une
        connectionString: env("DATABASE_URL"),
        host: env("PGHOST", env("DATABASE_HOST")),
        port: env.int("PGPORT", env.int("DATABASE_PORT", 5432)),
        database: env("PGDATABASE", env("DATABASE_NAME")),
        user: env("PGUSER", env("DATABASE_USERNAME")),
        password: env("PGPASSWORD", env("DATABASE_PASSWORD")),
        // Très important pour Railway :
        ssl: env.bool("DATABASE_SSL", true)
          ? { rejectUnauthorized: false }
          : false,
        schema: env("DATABASE_SCHEMA", "public"),
      },
      pool: {
        min: env.int("DATABASE_POOL_MIN", 2),
        max: env.int("DATABASE_POOL_MAX", 10),
      },
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
    },
  };
};
