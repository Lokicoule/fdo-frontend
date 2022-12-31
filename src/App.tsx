import "./libs/i18n/config"; //TODO check bootstraped after imports

import "./App.css";

import { AppProvider } from "~/providers/app";
import { AppRoutes } from "~/routes";

function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
