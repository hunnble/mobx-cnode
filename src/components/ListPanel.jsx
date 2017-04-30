import React, { PureComponent } from 'react';
import { Alert, Table } from 'zent';

class ListPanel extends PureComponent {
  constructor(props) {
    super(props);
    this.columns = [{
      width: '80%',
      bodyRender: props.bodyRender
    }, {}];
  }

  render() {
    const { alert, datasets } = this.props;

    return (
      <div className="bg radius">
        <Alert className="radius-top top">{alert}</Alert>
        <Table columns={this.columns} datasets={datasets} rowKey="id" />
      </div>
    );
  }
}

export default ListPanel;
