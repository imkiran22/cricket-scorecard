import "./styles.css";
import { store } from "./store";
import { Provider } from "react-redux";
import { ScoreCard } from "./components/index";

export default function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ScoreCard />
      </div>
    </Provider>
  );
}
