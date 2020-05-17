import { logger } from "../helpers/logger";
import { PostData, GetData } from "../classes";
import { DataToS3 } from "../models/data";

import { APIGatewayEvent } from "aws-sdk";

const defaultResponseHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": "*",
};

export async function postData(result: APIGatewayEvent) {
  const postDataHandler: PostData = new PostData();
  return requestHandler(result, postDataHandler);
}

export const getData = async (result: APIGatewayEvent) => {
  const getDataHandler: GetData = new GetData();
  return requestHandler(result, getDataHandler);
};

/**
 * Requests handler
 * @param result
 * @param handler
 */
async function requestHandler(result: APIGatewayEvent, handler: any) {
  try {
    let jsonData: DataToS3;
    try {
      if (result == undefined || result.body == "") {
        throw "Request Body not valid.";
      }
      if (typeof result.body == "string") {
        jsonData = JSON.parse(result.body);
      }
      if (typeof result.body == "object") {
        jsonData = Object.assign(result.body, result.body);
      }
    } catch (error) {
      return {
        statusCode: 400,
        headers: defaultResponseHeaders,
        body: JSON.stringify(error),
      };
    }

    let response;

    try {
      response = await handler.request(jsonData);
    } catch (error) {
      return {
        statusCode: 400,
        headers: defaultResponseHeaders,
        body: error,
      };
    }

    return {
      statusCode: 200,
      headers: defaultResponseHeaders,
      body: response,
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: defaultResponseHeaders,
      body: JSON.stringify(error),
    };
  }
}
