
import { createRoot } from "react-dom/client";

// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App.jsx";

// import store from "./redux/store/store.js";

import { store } from "./store";
import { ToastContainer } from "react-toastify";

// //! instance of react query
// const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  // <StrictMode>

  // <ToastContainer>
  <>
    <Provider store={store}>
      <App />
    </Provider>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      transition:Bounce
    />
  </>

  // </ToastContainer>
);
