 import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_CONNECTION_STRING;

if (!uri) {
  throw new Error("MONGODB_CONNECTION_STRING is not defined");
}

declare global {
  // eslint-disable-next-line no-var
  var mongoClientPromise: Promise<MongoClient> | undefined;
}

const client =
  global.mongoClientPromise
    ? undefined
    : new MongoClient(uri);

const clientPromise =
  global.mongoClientPromise ??
  client!.connect();

if (process.env.NODE_ENV !== "production") {
  global.mongoClientPromise = clientPromise;
}

export default clientPromise;