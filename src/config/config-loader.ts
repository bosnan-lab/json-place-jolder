import 'dotenv/config'; // IMPORT FROM .ENV

export const configLoader = () => {
  return {
    port: process.env.PORT, // Gets the port of the .env file
    mongo_database: {
      uri: process.env.DATABASE_URL, // Gets the MongoDB database URI from the .env file
    },
  };
};
