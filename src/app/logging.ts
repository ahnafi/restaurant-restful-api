import Winston from "winston";

export const logger = Winston.createLogger({
  level: "info",
  format: Winston.format.json(),
  transports: [new Winston.transports.Console({ level: "info" })],
});
