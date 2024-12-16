import ReactDOM from "react-dom/client";
import AppWrapper from "./components/AppWrapper";
import UserForm from "./components/UserForm";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AppWrapper>
    <UserForm />
  </AppWrapper>
);
