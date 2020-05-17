import { default as Pino } from "pino";

const loggerConfig = {
    level: "info",
    prettyPrint: true,
};

export const logger = Pino(loggerConfig, process.stderr);
logger.info("LOGLEVEL: " + loggerConfig.level);
