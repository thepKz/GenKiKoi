import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import store from "./redux/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Pro-Rounded",
        },
        components: {
          Button: {
            borderRadiusLG: 5,
            colorPrimary: "white",
            colorTextLightSolid: "black",
            colorPrimaryHover: "#49aaff",
            colorLink: "#49aaff",
          },
          Dropdown: {
            colorBgElevated: "#0c3c54",
            colorText: "white",
            fontSize: 16,
          },
          Divider: {
            marginLG: 0,
          },
          Form: {
            itemMarginBottom: 12,
          },
        },
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
  </StrictMode>,
);
