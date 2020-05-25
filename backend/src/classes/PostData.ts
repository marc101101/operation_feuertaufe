import { logger } from "../helpers/logger";

import AWS from "aws-sdk";
import * as uuid from "uuid";

export class PostData {
  private db_connection: AWS.DynamoDB.DocumentClient;

  constructor() {
    this.db_connection = new AWS.DynamoDB.DocumentClient();
  }

  public async request(event) {
    const timestamp = new Date().getTime();
    logger.info(event.body);
    const data = JSON.parse(event.body);

    const params = {
      TableName: process.env.TABLE_NAME,
      Item: {
        id: uuid.v1(),
        timestamp: Date.now(),
        humidity: data.humidity,
        noise: data.noise,
        gas: data.gas,
      },
    };

    await this.db_connection.put(params).promise();

    return JSON.stringify(params);
  }
}
