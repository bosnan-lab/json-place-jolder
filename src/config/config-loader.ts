export const configLoader = () => {
  return {
    port: process.env.PORT,
    mongo_database: {
      uri: process.env.DATABASE_URL,
    },
  };
};
