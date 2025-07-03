import { BigQuery } from '@google-cloud/bigquery';
import { Storage } from '@google-cloud/storage';

const bq = new BigQuery();
const storage = new Storage();

console.log("Log: " + JSON.stringify({ bq, storage }, null, 2));
