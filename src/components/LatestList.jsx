import React, { PureComponent } from 'react';
import { observer } from 'mobx-react';
import { Table } from 'zent';

class HotList extends PureComponent {
  constructor(props) {
    super(props);
    this.columns = [
      {
        name: 'title',
        bodyRender: data => data.title
      },
      {
        name: 'time',
        bodyRender: data => new Date(data.created).getTime()
      }
    ]
  }

  componentWillMount() {
    this.props.store.fetchLatest();
  }

  render() {
    const { store } = this.props;
    return (
      <div className="main-list">
        <Table
          columns={this.columns}
          datasets={store.latestList}
        />
      </div>
    );
  }
}

export default observer(HotList);
