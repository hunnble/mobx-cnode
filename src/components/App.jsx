import React, { PureComponent } from 'react';
import { observer } from 'mobx-react';
import Page from './Page';

import '../../node_modules/zent/lib/index.css';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.store = props.store;
  }

  render() {
    return (
      <div>
        <Page store={this.store} />
      </div>
    );
  }
}

export default observer(App);
