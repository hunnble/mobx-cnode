import React, { PureComponent } from 'react';
import { observer } from 'mobx-react';
import Radium from 'radium';
import { Button, Table } from 'zent';
import { tabs as tabsMap, tabsIndex } from '../consts';

const styles = {
  itemWrapper: {
    display: 'flex',
    justfyContent: 'center'
  },
  itemImg: {
    width: 30,
    height: 30
  }
}

class Topics extends PureComponent {
  constructor(props) {
    super(props);
    this.columns = [{
      width: '50%',
      bodyRender: data => (
        <div style={styles.itemWrapper}>
          <img src={data.author.avatar_url} style={styles.itemImg} />
          <span>{data.reply_count}</span>/
          <span>{data.visit_count}</span>
          {data.top && <Button size="small" type="danger">置顶</Button>}
          {data.good && <Button size="small" type="success">精华</Button>}
          {!data.top && <Button size="small">{tabsMap[tabsIndex.get(data.tab)][1]}</Button>}
          <p>{data.title}</p>
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
        <Table
          columns={this.columns}
          datasets={store.topics}
          rowKey="id"
          onChange={store.changeTopicCurrent} />
      </div>
    );
  }
}

export default Radium(observer(Topics));
