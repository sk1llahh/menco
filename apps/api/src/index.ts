import { createServer } from "./app/server";
import { CONFIG } from "@repo/config";

export function start() {
  const app = createServer();
  const port = CONFIG.PORT;
  app.listen(port, () => {
    console.log(`[backend] listening on http://localhost:${port}`);
  });
}

start();
