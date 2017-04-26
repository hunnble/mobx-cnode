import { observable, computed, action } from 'mobx';
import fetch from 'isomorphic-fetch';
import apiConf from './api/config';

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
          throw new Error(res);
        }
        this.topics = res.data;
        this.topicCurrent = data.page ? data.page : 1
        this.tabId = data.tab ? data.tab : 'all'
      })
      .catch((err) => {
        console.error(err);
      })
  }

  @observable latestList = [];
  @action fetchLatest() {
    fetch(`http://${apiConf.path}:${apiConf.port}/latest`)
      .then(res => res.json())
      .then((res) => {
        if (!res.success) {
          throw new Error(res);
        }
        this.latestList = res.data;
      })
      .catch((err) => {
        console.error(err);
      })
  }

  @observable tabId = 'all';
  @action changeTab(id) {
    this.tabId = id;
  }
}

export default Store;
