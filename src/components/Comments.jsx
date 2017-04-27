import React, { PureComponent } from 'react';
import Radium from 'radium';
import { Table } from 'zent';
import Timeago from 'timeago.js';

const timeago = new Timeago();

const styles = {
  inWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  img: {
    width: 30,
    height: 30
  },
  info: {
    display: 'inline-block',
    paddingLeft: 12,
    color: '#838383',
    fontSize: 12
  }
};

class Comments extends PureComponent {
  constructor(props) {
    super(props);
    this.columns = [{
      width: '80%',
      bodyRender: data => (
        <div>
          <div style={styles.inWrapper}>
            <img style={styles.img} src={data.author.avatar_url} alt="" />
            <span style={styles.info}>{data.author.loginname}发表于{timeago.format(data.created_at, 'zh_CN')}</span>
          </div>
          <div dangerouslySetInnerHTML={{ __html: data.content }} className="markdown-body"></div>
        </div>
      )
    }, {}];
  }

  render() {
    const { comments } = this.props;
    return (
      <Table columns={this.columns} datasets={comments} />
    );
  }
}

export default Radium(Comments);
