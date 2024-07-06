import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider as WebTheme } from "./context/ThemeContext.jsx";
import { SidebarProvider } from "./context/SidebarContext.jsx";
import { ThemeProvider } from "@material-tailwind/react";
import { TitleData } from "./context/TitleContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <TitleData>
      <WebTheme>
        <SidebarProvider>
          <App />
        </SidebarProvider>
      </WebTheme>
    </TitleData>
  </ThemeProvider>
);
