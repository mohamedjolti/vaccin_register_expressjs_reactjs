import { useContext } from 'react';
import './App.css';
import { Home } from './components/Home';
import { PrivateComponent } from './components/Private';
import { GlobalContext, GlobalProvider } from './context/gloabalContext';

function App() {

  return (
    <GlobalProvider>
      <div className="App">
        <h1>React app running</h1>
        <PrivateComponent>
          <Home />
        </PrivateComponent>
      </div>
    </GlobalProvider>

  );
}

export default App;
