import ReactDOM from "react-dom/client";
import { HashRouter  } from "react-router-dom";
import { StudentProvider } from "./context/StudentProvider";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import { AuthProvider } from "./context/AuthProvider";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter>
    <ErrorBoundary>
      <AuthProvider>
        <StudentProvider>
          <App />
          <ToastContainer />
        </StudentProvider>
      </AuthProvider>
    </ErrorBoundary>
  </HashRouter>,
);
