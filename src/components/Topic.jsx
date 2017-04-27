import React, { PureComponent } from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { Alert } from 'zent';
import Radium from 'radium';
import Timeago from 'timeago.js';
import Comments from './Comments';
import { tabs as tabsMap, tabsIndex } from '../consts';

const timeago = new Timeago();

const styles = {
  article: {
    marginBottom: 20
  },
  header: {
    padding: 10
  },
  desc: {
    display: 'inline-block',
    paddingRight: 12,
    color: '#838383',
    fontSize: 12
  }
};

class Topic extends PureComponent {
  componentWillMount() {
    const { store, location } = this.props;
    const id = location.pathname.split('topic/')[1];
    store.fetchTopic(id);
  }

  generateTopic = () => {
    const { topic } = this.props.store;
    return (
      <div>
        <article className="bg radius" style={styles.article}>
          <div style={styles.header}>
            <h2>{topic.title}</h2>
            <div>
              <span style={styles.desc}>发布于：{timeago.format(topic.created_at, 'zh_CN')}</span>
              <span style={styles.desc}>作者：{topic.author.loginname}</span>
              <span style={styles.desc}>{topic.visit_count}次浏览</span>
              {topic.tab && <span style={styles.desc}>来自{tabsMap[tabsIndex.get(topic.tab)][1]}</span>}
            </div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: topic.content }} className="markdown-body"></div>
        </article>
        <Comments comments={toJS(topic.replies)} />
      </div>
    );
  }

  render() {
    const { store } = this.props;
    return (
      <div>
        {
          !store.topic &&
          <div>加载中</div>
        }
        {
          store.topic &&
          this.generateTopic()
        }
      </div>
    );
  }
}

export default Radium(observer(Topic));
