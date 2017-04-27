import React, { PureComponent } from 'react';
import { Route, HashRouter, Link } from 'react-router-dom';
import Radium from 'radium';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Topics from './Topics';
import Topic from './Topic';
import User from './User';

import '../../node_modules/zent/lib/index.css';
import '../../node_modules/github-markdown-css/github-markdown.css';

const styles = {
  page: {
    width: '90%',
    maxWidth: 1400,
    minWidth: 960,
    margin: '80px auto 15px',
    minHeight: 400
  },
  content: {
    marginRight: 305
  }
};

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { store } = this.props;
    return (
      <HashRouter>
        <div>
          <Navbar store={store} />
          <div style={styles.page}>
            <Sidebar store={store} />
            <div style={styles.content}>
              <Route exact path="/" render={() => <Topics store={store} />} />
              <Route path="/topic/:id" render={({ location }) => <Topic store={store} location={location} />} />
              <Route path="/user/:loginname" render={({ location }) => <User store={store} location={location} />} />
            </div>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default Radium(App);
