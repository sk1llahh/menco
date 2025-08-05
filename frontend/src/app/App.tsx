import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./router";
import { QueryProvider } from "./providers/QueryProvider";

function App() {
  return (
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  );
}

export default App;
