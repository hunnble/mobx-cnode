import React, { PureComponent } from 'react';
import { observer } from 'mobx-react';
import '../../node_modules/zent/lib/index.css';
import Page from './Page';
import MyComponent from './MyComponent';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.store = props.store;
  }

  render() {
    return (
      <div>
        <Page />
        <h2>Welcome to the {this.store.name} project.</h2>
        <h3>This project is {this.store.description}.</h3>
        <MyComponent store={this.store} />
      </div>
    );
  }
}

export default observer(App);
