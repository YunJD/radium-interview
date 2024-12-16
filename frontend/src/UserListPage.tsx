import ReactDOM from "react-dom/client";
import AppWrapper from "./components/AppWrapper";
import UserList from "./components/UserList";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AppWrapper>
    <UserList />
  </AppWrapper>
);
