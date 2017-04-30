import React, { PureComponent } from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import Radium from 'radium';
import { Link } from 'react-router-dom';
import Timeago from 'timeago.js';
import UserInfo from './UserInfo';
import ListPanel from './ListPanel';

const timeago = new Timeago();

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  info: {
    display: 'flex',
    alignItems: 'center'
  },
  img: {
    width: 30,
    height: 30
  },
  loginname: {
    display: 'inline-block',
    padding: '0 6px'
  },
  timeago: {
    paddingRight: 6,
    color: '#b4b4b4'
  }
};

const listBodyRender = data => (
  <div style={styles.wrapper}>
    <div style={styles.info}>
      <img src={data.author.avatar_url} alt="" style={styles.img} />
      <span style={styles.loginname}>{data.author.loginname}</span>
      <span style={styles.timeago}>{timeago.format(data.last_reply_at, 'zh_CN')}</span>
    </div>
    <Link to={`/topic/${data.id}`}>{data.title}</Link>
  </div>
);

class User extends PureComponent {
  componentWillMount() {
    const { store, location } = this.props;
    const loginname = location.pathname.split('user/')[1];
    store.fetchUser(loginname);
    store.fetchCollectTopics(loginname);
  }

  render() {
    const { store } = this.props;
    const { user } = store;
    if (!user) {
      return null;
    }

    return (
      <div>
        <UserInfo info={toJS(user)} />
        <ListPanel alert="最近创建的话题" bodyRender={listBodyRender} datasets={toJS(user).recent_topics} />
        <ListPanel alert="最近参与的话题" bodyRender={listBodyRender} datasets={toJS(user).recent_replies} />
        <ListPanel alert="收藏的话题" bodyRender={listBodyRender} datasets={toJS(store.collectTopics)} />
      </div>
    );
  }
}

export default Radium(observer(User));
