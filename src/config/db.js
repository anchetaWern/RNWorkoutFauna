import faunadb from "faunadb";

const client = new faunadb.Client({
  secret: "YOUR FAUNADB SECRET",
  domain: "YOUR FAUNADB DOMAIN",
});

const q = faunadb.query;

export { client, q };
