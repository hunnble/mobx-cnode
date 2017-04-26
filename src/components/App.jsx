import React, { PureComponent } from 'react';
import { Route, BrowserRouter, Link } from 'react-router-dom';
import Radium from 'radium';
import Sidebar from './Sidebar';
import Topics from './Topics';
import Topic from './Topic';

import '../../node_modules/zent/lib/index.css';

const styles = {
  page: {
    width: '90%',
    maxWidth: 1400,
    minWidth: 960,
    margin: '15px auto',
    minHeight: 400
  },
  content: {
    marginRight: 305,
    backgroundColor: '#f2f2f2'
  }
};

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { store } = this.props;
    return (
      <BrowserRouter>
        <div style={styles.page}>
          <Sidebar store={store} />
          <div style={styles.content}>
            <Route exact path="/" render={() => <Topics store={store} />} />
            <Route path="/topic/:id" render={({ location }) => <Topic store={store} location={location} />} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default Radium(App);
