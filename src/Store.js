import { observable, computed, action } from 'mobx';
import fetch from 'isomorphic-fetch';
import { Notify } from 'zent';
import apiConf from './api/config';
import { toPostData, setLocal } from './utils';
import { currentUserKey } from './consts';

class Store {
  topicLimit = 20;
  @observable topicCurrent = 1;
  @action changeTopicCurrent(p) {
    this.topicCurrent = p;
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
        this.topicCurrent = data.page ? data.page : 1
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
    fetch(`${apiConf.path}${apiConf.topic}/${id}`)
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

  @observable accessToken = 'ea15f1ed-7a11-41ae-8d24-1a35502f2be8';
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
        };
        setLocal(currentUserKey, user);
        this.currentUser = user;
      })
      .catch(err => Notify.error(err.message ? err.message : '网络错误'));
  }
  @action logout() {
    this.currentUser = null;
    setLocal(currentUserKey, null);
  }
}

export default Store;
