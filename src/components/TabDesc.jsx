import React, { PureComponent } from 'react';
import { Button } from 'zent';
import { tabs as tabsMap, tabsIndex } from '../consts';

class TabDesc extends PureComponent {
  render() {
    const { data, style } = this.props;
    if (!data.top && !data.good && !data.tab) {
      return null;
    }

    return (
      <div style={style}>
        {data.top && <Button size="small" type="danger">置顶</Button>}
        {!data.top && data.good && <Button size="small" type="success">精华</Button>}
        {!data.top && !data.good && data.tab && <Button size="small" type="success">{tabsMap[tabsIndex.get(data.tab)][1]}</Button>}
      </div>
    );
  }
}

export default TabDesc;
