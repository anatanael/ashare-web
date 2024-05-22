import "./global/global.scss";

import { Toaster } from "react-hot-toast";

import Routes from "./routes/routes";

function App() {
  return (
    <>
      <Routes />
      <Toaster
        toastOptions={{
          style: { backgroundColor: "#1a1a1a", color: "#fff" },
        }}
      />
    </>
  );
}

export default App;
