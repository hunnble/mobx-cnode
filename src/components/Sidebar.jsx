import React, { PureComponent } from 'react';
import Radium from 'radium';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { Button, Input } from 'zent';

const styles = {
  sidebar: {
    float: 'right',
    width: 290
  },
  header: {
    padding: '10px 0 10px 20px'
  },
  title: {
    color: '#51585c',
  },
  content: {
    padding: 20
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  avatar: {
    width: 40,
    height: 40
  },
  name: {
    padding: '0 12px 0 6px'
  }
};

class Sidebar extends PureComponent {
  componentWillMount() {
    window.scrollTo(0, 0);
    console.log(111);
  }

  render() {
    const { store } = this.props;
    const isLogIn = !!store.currentUser;

    return (
      <aside style={styles.sidebar}>
        <section className="bg radius">
          <header style={styles.header} className="top radius-top">
            <h5 style={styles.title}>
              {!isLogIn && '登录'}
              {isLogIn && '用户信息'}
            </h5>
          </header>
          {
            !isLogIn &&
            <div style={styles.content}>
              <Input
                className="inline-input"
                placeholder="输入access token"
                value={store.accessToken}
                onChange={e => store.changeAccessToken(e.target.value) } />
              <Button className="inline-button" type="primary" onClick={() => store.login(store.accessToken)}>登录</Button>
            </div>
          }
          {
            isLogIn &&
            <div style={[styles.content, styles.userInfo]}>
              <Link to={`/user/${store.currentUser.loginname}`} style={styles.userInfo}>
                <img style={styles.avatar} src={store.currentUser.avatar_url} alt="" />
                <h4 style={[styles.name, styles.title]}>{store.currentUser.loginname}</h4>
              </Link>
              <Button type="primary" onClick={store.logout.bind(store)}>注销</Button>
            </div>
          }
        </section>
      </aside>
    );
  }
}

export default Radium(observer(Sidebar));
