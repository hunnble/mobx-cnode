import React, { PureComponent } from 'react';
import Radium from 'radium';
import { Link } from 'react-router-dom';

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
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginLeft: 12,
    fontSize: 13
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
          <span style={styles.item}>{info.loginname}</span>
          <span style={styles.item}>{info.score}积分</span>
          <span style={styles.item}>
            <Link to={`https://github.com/${info.githubUsername}`}>Github</Link>
          </span>
        </div>
      </div>
    );
  }
}

export default Radium(UserInfo);
