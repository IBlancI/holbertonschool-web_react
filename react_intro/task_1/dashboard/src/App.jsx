import "./App.css";
import logo from "./assets/holberton-logo.jpg";
import { getCurrentYear, getFooterCopy } from "./utils";  // <= il manque ça chez toi
import Notifications from "./Notifications";               // <= il manque ça aussi

function App() {
  return (
    <>
      <div className="root-notifications">
        <Notifications />
      </div>
      <div className="App-header">
        <img src={logo} alt="holberton logo" />
        <h1>School dashboard</h1>
      </div>
      <div className="App-body">
        <p>Login to access the full dashboard</p>
      </div>
      <div className="App-footer">
        <p>Copyright {getCurrentYear()} - {getFooterCopy(false)}</p>
      </div>
    </>
  );
}

export default App;
