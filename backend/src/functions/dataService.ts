import { logger } from "../helpers/logger";
import { PostData, GetData } from "../classes";

import { APIGatewayEvent } from "aws-sdk";

const defaultResponseHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": "*",
};

export async function postData(result: APIGatewayEvent) {
  const postDataHandler: PostData = new PostData();
  let response = await postDataHandler.request(result);
  return {
    statusCode: 200,
    headers: defaultResponseHeaders,
    body: response,
  };
}

export const getData = async (result: APIGatewayEvent) => {
  const getDataHandler: GetData = new GetData();
  let response = await getDataHandler.request(result);
  return {
    statusCode: 200,
    headers: defaultResponseHeaders,
    body: response,
  };
};
