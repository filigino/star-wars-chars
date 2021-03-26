import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import CharacterList from 'components/CharacterList';
import Character from 'components/Character';

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <CharacterList />
                </Route>
                <Route exact path="/character/:id">
                    <Character />
                </Route>
                <Route>
                    <Redirect to="/" />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default App;
