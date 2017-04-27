import React, { PureComponent } from 'react';
import Radium from 'radium';
import { observer } from 'mobx-react';
import { Button, Input } from 'zent';

const styles = {
  sidebar: {
    float: 'right',
    width: 290
  },
  item: {
    borderRadius: 3,
    padding: 10
  },
  title: {
    color: '#51585c',
  },
  content: {
    padding: 10
  }
};

class Sidebar extends PureComponent {
  render() {
    const { store } = this.props;
    const isLogIn = false;
    return (
      <div style={styles.sidebar}>
        <section style={styles.item} className="bg">
          <h5 style={styles.title}>
            {!isLogIn && '登录'}
            {isLogIn && '用户信息'}
          </h5>
          {
            !isLogIn &&
            <div style={styles.content}>
              <Input
                className="inline-input"
                placeholder="输入access token"
                value={store.accessToken}
                onChange={e => store.changeAccessToken(e.target.value) } />
              <Button className="inline-button" type="primary" readOnly={!store.accessToken} onClick={store.login}>登录</Button>
            </div>
          }
        </section>
      </div>
    );
  }
}

export default Radium(observer(Sidebar));
