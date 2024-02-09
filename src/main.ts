import { app } from "./app/app";
import { logger } from "./app/logging";

const port: number = 3000 || process.env.PORT;

app.listen(port, () => {
  logger.info(`listen at port ${port}`);
});
