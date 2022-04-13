import { useContext } from 'react';
import './App.css';
import { Home } from './components/Home';
import { PrivateComponent } from './components/Private';
import { GlobalContext, GlobalProvider } from './context/gloabalContext';
import { VaccinContext, VaccinProivder } from './context/vaccinContext';

function App() {

  return (
    <GlobalProvider>
      <div className="App">
        <h1>React app running</h1>
        <PrivateComponent>
          <VaccinProivder> 
            <Home />
          </VaccinProivder>
        </PrivateComponent>

      </div>
    </GlobalProvider>

  );
}

export default App;
