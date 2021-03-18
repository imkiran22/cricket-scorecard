import "./styles.css";
import { store } from "./store";
import { Provider } from "react-redux";
import { Container } from "./components/index";

export default function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Container />
      </div>
    </Provider>
  );
}
