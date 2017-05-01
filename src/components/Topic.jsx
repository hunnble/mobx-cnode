import React, { PureComponent } from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { Alert, Button } from 'zent';
import Radium from 'radium';
import Timeago from 'timeago.js';
import Comments from './Comments';
import Editor from './Editor';
import { tabs as tabsMap, tabsIndex } from '../consts';

const timeago = new Timeago();

const styles = {
  article: {
    marginBottom: 20
  },
  header: {
    borderBottom: '1px solid #bbb',
    padding: '18px 10px 10px 20px'
  },
  descWrapper: {
    margin: '6px 0 12px'
  },
  desc: {
    display: 'inline-block',
    paddingRight: 12,
    color: '#838383',
    fontSize: 12
  },
  collect: {
    float: 'right'
  }
};

class Topic extends PureComponent {
  componentWillMount() {
    const { store, location } = this.props;
    const id = location.pathname.split('topic/')[1];
    store.fetchTopic(id);
  }

  generateTopic = () => {
    const { topic, currentUser, collectTopic, comment, changeComment, createComment } = this.props.store;
    const { is_collect, id } = topic;

    return (
      <div>
        <article className="bg radius" style={styles.article}>
          <div style={styles.header}>
            <h2>{topic.title}</h2>
            {
              currentUser &&
              <Button
                style={styles.collect}
                type={is_collect ? 'default' : 'primary'}
                onClick={collectTopic.bind(this.props.store, id, is_collect)}>
                {`${is_collect ? '取消' : ''}收藏`}
              </Button>
            }
            <div style={styles.descWrapper}>
              <span style={styles.desc}>发布于：{timeago.format(topic.created_at, 'zh_CN')}</span>
              <span style={styles.desc}>作者：{topic.author.loginname}</span>
              <span style={styles.desc}>{topic.visit_count}次浏览</span>
              {topic.tab && <span style={styles.desc}>来自{tabsMap[tabsIndex.get(topic.tab)][1]}</span>}
            </div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: topic.content }} className="markdown-body"></div>
        </article>
        {
          topic.replies.length > 0 &&
          <Comments store={this.props.store} comments={toJS(topic.replies)} author={topic.author} />
        }
        {
          currentUser &&
          <Editor topic_id={topic.id} value={toJS(comment)} onChange={toJS(changeComment.bind(this.props.store))} onSubmit={toJS(createComment.bind(this.props.store))} />
        }
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
