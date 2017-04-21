import React, { PureComponent } from 'react';
import { Layout } from 'zent';
import List from './List';
import Sidebar from './Sidebar';

const { Row, Col } = Layout;

class Page extends PureComponent {
  render() {
    return (
      <Row>
        <Col span={18}>
          <List />
        </Col>
        <Col span={6}>
          <Sidebar />
        </Col>
      </Row>
    );
  }
}

export default Page;
