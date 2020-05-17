import { logger } from "../helpers/logger";

import AWS from "aws-sdk";
import * as uuid from "uuid";

export class GetData {
  private db_connection: AWS.DynamoDB.DocumentClient;

  constructor() {}

  public async request(event) {
    const params = {
      TableName: process.env.TABLE_NAME,
    };
    // fetch all todos from the database
    this.db_connection.scan(params, (error, result) => {
      // handle potential errors
      if (error) {
        logger.info(error);
        throw "Couldn't fetch entries!";
      }

      // create a response
      return JSON.stringify(result.Items);
    });
  }
}
