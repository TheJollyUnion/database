import "dotenv/config";
import { Ottoman } from "ottoman";
import {
  GroupSchema,
  TemplateSchema,
  type Group,
  type Template,
} from "./models";

const connectionString = process.env.CB_CONNECTION_STRING;
const bucketName = process.env.CB_BUCKET_NAME;
const username = process.env.CB_USERNAME;
const password = process.env.CB_PASSWORD;
const scopeName = process.env.CB_SCOPE_NAME;

if (!(!!connectionString && !!bucketName && !!username && !!password)) {
  throw new Error(
    "Missing Couchbase connection string, bucket name, username, and/or password"
  );
}

export const ottoman = new Ottoman({
  scopeName: scopeName,
  modelKey: "type",
});

export const Groups = ottoman.model<Group, Group>("groups", GroupSchema, {
  modelKey: "type",
  idKey: "_id",
});

export const Templates = ottoman.model<Template, Template>(
  "templates",
  TemplateSchema,
  {
    modelKey: "type",
    idKey: "_id",
  }
);

await ottoman.connect({
  connectionString,
  bucketName,
  username,
  password,
});

await ottoman.start();
