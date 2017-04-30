import { observable, computed, action } from 'mobx';
import fetch from 'isomorphic-fetch';
import { Notify } from 'zent';
import apiConf from './api/config';
import { toPostData, setLocal } from './utils';
import { currentUserKey } from './consts';

class Store {
  topicLimit = 20;
  @observable topicsPage = 1;
  @action changeTopicsPage(p) {
    this.fetchTopics({
      page: p,
      tab: this.tab
    });
  }


  @observable topics = [];
  @action fetchTopics(data = { page: 1 }) {
    fetch(`${apiConf.path}${apiConf.topics}?page=${data.page || 1}&tab=${data.tab || 'all'}`)
      .then(res => res.json())
      .then((res) => {
        if (!res.success) {
          throw new Error(res.error_msg);
        }
        this.topics = res.data;
        this.topicsPage = data.page ? data.page : 1
        this.tab = data.tab ? data.tab : 'all'
      })
      .catch(err => Notify.error(err.message ? err.message : '网络错误'));
  }


  @observable tab = 'all';
  @action changeTab(id) {
    this.tab = id;
  }


  @observable topic = null;
  @action fetchTopic(id) {
    this.topic = null;
    fetch(`${apiConf.path}${apiConf.topic}/${id}?accesstoken=${this.currentUser ? this.currentUser.accesstoken : ''}`)
      .then(res => res.json())
      .then((res) => {
        if (!res.success) {
          throw new Error(res.error_msg);
        }
        this.topic = res.data;
      })
      .catch(err => Notify.error(err.message ? err.message : '网络错误'));
  }


  @observable user = null;
  @action fetchUser(loginname) {
    this.user = null;
    fetch(`${apiConf.path}${apiConf.user}/${loginname}`)
      .then(res => res.json())
      .then((res) => {
        if (!res.success) {
          throw new Error(res.error_msg);
        }
        this.user = res.data;
      })
      .catch(err => Notify.error(err.message ? err.message : '网络错误'));
  }

  @observable accessToken = '';
  @action changeAccessToken(token) {
    this.accessToken = token;
  }


  @observable currentUser = null;
  @action login(accesstoken) {
    fetch(`${apiConf.path}${apiConf.accesstoken}`, toPostData({ accesstoken }))
      .then(res => res.json())
      .then((res) => {
        if (!res.success) {
          throw new Error(res.error_msg);
        }
        this.accessToken = '';
        const user = {
          loginname: res.loginname,
          avatar_url: res.avatar_url,
          id: res.id,
          accesstoken
        };
        setLocal(currentUserKey, user);
        this.currentUser = user;
        return user.loginname
      })
      .then((loginname) => fetch(`${apiConf.path}${apiConf.user}/${loginname}`))
      .then(res => res.json())
      .then((res) => {
        if (!res.success) {
          throw new Error(res.error_msg);
        }
        this.currentUser = Object.assign(this.currentUser, res.data);
      })
      .catch(err => Notify.error(err.message ? err.message : '网络错误'));
  }

  @action logout() {
    this.currentUser = null;
    setLocal(currentUserKey, null);
  }

  @action collectTopic(topic_id, is_collect) {
    const url = is_collect ? `${apiConf.path}${apiConf.deCollect}` : `${apiConf.path}${apiConf.collect}`;
    fetch(url, toPostData({
      accesstoken: this.currentUser.accesstoken,
      topic_id
    }))
    .then(res => res.json())
    .then((res) => {
      if (!res.success) {
        throw new Error(res.error_msg);
      }
      this.topic.is_collect = !is_collect;
    })
    .catch(err => Notify.error(err.message ? err.message : '网络错误'));
  }

  @observable collectTopics = [];
  @action fetchCollectTopics(loginname) {
    fetch(`${apiConf.path}${apiConf.topicCollect}/${loginname}`)
      .then(res => res.json())
      .then((res) => {
        if (!res.success) {
          throw new Error(res.error_msg);
        }
        this.collectTopics = res.data;
      })
      .catch(err => Notify.error(err.message ? err.message : '网络错误'));
  }

  @observable messages = null;
  @action fetchMessages(loginname) {
    fetch(`${apiConf.path}${apiConf.messages}?accesstoken=${this.currentUser.accesstoken}`)
      .then(res => res.json())
      .then((res) => {
        if (!res.success) {
          throw new Error(res.error_msg);
        }
        this.messages = res.data;
      })
      .catch(err => Notify.error(err.message ? err.message : '网络错误'));
  }
}

export default Store;
