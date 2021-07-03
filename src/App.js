import "./App.css";
import ChatPanel from "./components/ChatPanel";
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import GiphyBox from "./components/GiphyBox";

function App() {
	return (
    <BrowserRouter>
      <Switch>
        <Route path='/chat' component={ChatPanel}/>
        <Route path='/giphy' component={GiphyBox}/>
      </Switch>
    </BrowserRouter>
  )
}
export default App;
