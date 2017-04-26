import React, { PureComponent } from 'react';
import { observer } from 'mobx-react';

class Topic extends PureComponent {
  componentWillMount() {
    const { store, location } = this.props;
    const id = location.pathname.split('topic/')[1];
    store.fetchTopic(id);
  }

  generateTopic = () => {
    const { topic } = this.props.store;
    return (
      <article>
        <h2>{topic.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: topic.content }}></div>
      </article>
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

export default observer(Topic);
