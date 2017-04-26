import React, { PureComponent } from 'react';
import { observer } from 'mobx-react';
import { Tabs } from 'zent';
import { tabs as tabsMap } from '../consts';

const { TabPanel } = Tabs;

class Tab extends PureComponent {
  render() {
    const { store } = this.props;
    return (
      <div style={{ paddingTop: 6 }}>
        <Tabs
          type="slider"
          activeId={store.tab}
          onTabChange={tab => store.fetchTopics({ tab })}>
          {tabsMap.map(item => <TabPanel key={item} id={item[0]} tab={item[1]} />)}
        </Tabs>
      </div>
    );
  }
}

export default observer(Tab);
