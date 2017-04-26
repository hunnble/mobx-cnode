import React, { PureComponent } from 'react';
import Topics from './Topics';
import Sidebar from './Sidebar';
import Tab from './Tab';
import Radium from 'radium';

const styles = {
  page: {
    width: '90%',
    maxWidth: 1400,
    minWidth: 960,
    margin: '15px auto',
    minHeight: 400
  },
  content: {
    marginRight: 305,
    backgroundColor: '#f2f2f2'
  }
};

function Page({ store }) {
  return (
    <div style={styles.page}>
      <div style={styles.content}>
        <Tab store={store} />
        <Topics store={store} />
      </div>
      <Sidebar store={store} />
    </div>
  );
}

export default Radium(Page);
