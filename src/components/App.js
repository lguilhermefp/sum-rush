import React from 'react';
import Game from './Game';

class App extends React.Component {
    render() {
        return (
            <Game randomNumberCount={6} initialSeconds={5} />
        );
    }
}

export default App;
