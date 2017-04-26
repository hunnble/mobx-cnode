import React, { PureComponent } from 'react';
import Radium from 'radium';
import { observer } from 'mobx-react';
import { Input } from 'zent';

const styles = {
  sidebar: {
    float: 'right',
    width: 290
  }
};

class Sidebar extends PureComponent {
  render() {
    const { store } = this.props;
    const isLogIn = false;
    return (
      <div style={styles.sidebar}>
        <section>
          <h5>
            {!isLogIn && '输入access token登陆'}
            {isLogIn && '用户信息'}
          </h5>
          {
            !isLogIn &&
            <div>
              <Input placeholder="输入access token" value={store.accessToken} onChange={e => store.changeAccessToken(e.target.value) } />
            </div>
          }
        </section>
      </div>
    );
  }
}

export default Radium(observer(Sidebar));
