import React from 'react';
import Home from './Home.js'
import Battle from './Battle.js';
import Popular from './Popular.js';
import Nav from './Nav.js';
import Results from './Results.js';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/battle' component={Battle} />
            <Route path='/battle/results' component={Results} />
            <Route path='/popular' component={Popular} />
            <Route render={()=><p>Not Found</p>} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
