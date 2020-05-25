import { logger } from "../helpers/logger";

import AWS from "aws-sdk";
import * as uuid from "uuid";

export class GetData {
  private db_connection: AWS.DynamoDB.DocumentClient;

  constructor() {
    this.db_connection = new AWS.DynamoDB.DocumentClient();
  }

  public async request(event) {
    const params = {
      TableName: process.env.TABLE_NAME,
    };
    const results = await this.db_connection.scan(params).promise();

    return JSON.stringify(results);
  }
}
