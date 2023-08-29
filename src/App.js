import { BrowserRouter } from 'react-router-dom';
import './App.css';
import RouteList from './routes/RouteList';
import { Provider } from 'react-redux';
import store from './store';

function App() {
    return (
        <>
            <Provider store={store}>
                <BrowserRouter>
                    <RouteList />
                </BrowserRouter>
            </Provider>
        </>
    );
}

export default App;
