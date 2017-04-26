import React, { PureComponent } from 'react';
import Radium from 'radium';

const styles = {
  sidebar: {
    width: 290
  }
};

class Sidebar extends PureComponent {
  render() {
    const { store } = this.props;
    const isLogIn = store.accessToken;
    return (
      <div style={styles.sidebar}>
        <section>
          <h4>
            {!isLogIn && '输入access token登陆'}
            {isLogIn && '用户信息'}
          </h4>
          <div>
            
          </div>
        </section>
      </div>
    );
  }
}

export default Radium(Sidebar);
