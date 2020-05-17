import { logger } from "../helpers/logger";

import AWS from "aws-sdk";
import * as uuid from "uuid";

export class PostData {
  private db_connection: AWS.DynamoDB.DocumentClient;

  constructor() {
  }

  public async request(event) {
    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body);

    if (typeof data.text !== "string") {
      logger.info("Validation Failed");
      throw "Couldn't create item.";
    }

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

    // write the todo to the database
    this.db_connection.put(params, (error) => {
      // handle potential errors
      if (error) {
       logger.info("Inserting into DB Failed");
        throw error;
      }

      // create a response
      return JSON.stringify(params.Item);
    }
}
}
