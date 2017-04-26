import React, { PureComponent } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import Radium from 'radium';
import { Button, Table } from 'zent';
import Tab from './Tab';
import { tabs as tabsMap, tabsIndex } from '../consts';

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  img: {
    minWidth: 30,
    width: 30,
    height: 30
  },
  count: {
    minWidth: 70,
    width: 70,
    textAlign: 'center'
  },
  tab: {
    marginRight: 8,
    minWidth: 36
  },
  title: {
    color: '#000',
    textDecoration: 'none'
  }
}

class Topics extends PureComponent {
  constructor(props) {
    super(props);
    this.columns = [{
      width: '50%',
      bodyRender: data => (
        <div style={styles.wrapper}>
          <img src={data.author.avatar_url} style={styles.img} />
          <div style={styles.count}>
            <span>{data.reply_count}</span>/
            <span>{data.visit_count}</span>
          </div>
          {
            (data.top || data.good || data.tab) &&
            <div style={styles.tab}>
              {data.top && <Button size="small" type="danger">置顶</Button>}
              {!data.top && data.good && <Button size="small" type="success">精华</Button>}
              {!data.top && !data.good && data.tab && <Button size="small">{tabsMap[tabsIndex.get(data.tab)][1]}</Button>}
            </div>
          }
          <p><Link style={styles.title} to={`/topic/${data.id}`}>{data.title}</Link></p>
        </div>
      )
    }, {}];
  }

  componentWillMount() {
    this.props.store.fetchTopics();
  }

  handleClick = (e, key) => {
    console.log(key);
  }

  render() {
    const { store } = this.props;
    return (
      <div>
        <Tab store={store} />
        <Table
          columns={this.columns}
          datasets={store.topics}
          rowKey="id"
          onChange={p => store.fetchTopics({ page: p.current, tab: store.tab })}
          pageInfo={{
            current: store.topicCurrent,
            limit: 20,
            total: 2000
          }}
        />
      </div>
    );
  }
}

export default Radium(observer(Topics));
