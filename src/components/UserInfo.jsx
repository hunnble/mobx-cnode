import React, { PureComponent } from 'react';
import Radium from 'radium';

const styles = {
  wrapper: {
    display: 'flex',
    marginBottom: 20,
    padding: 10
  },
  avatar: {
    height: 60,
    width: 60
  },
  items: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginLeft: 12,
    fontSize: 13
  },
  itemName: {
    fontSize: 24
  },
  itemScore: {
    color: '#b4b4b4'
  }
};

class UserInfo extends PureComponent {
  render() {
    const { info } = this.props;
    if (!info) {
      return null;
    }

    return (
      <div className="bg radius" style={styles.wrapper}>
        <img style={styles.avatar} src={info.avatar_url} alt="" />
        <div style={styles.items}>
          <div>
            <div style={styles.itemName}>{info.loginname}</div>
            <div style={styles.itemScore}>{info.score}积分</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Radium(UserInfo);
