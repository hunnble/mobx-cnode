import React, { PureComponent } from 'react';
import Radium from 'radium';
import Timeago from 'timeago.js';
import ListPanel from './ListPanel';

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

const bodyRender = data => (
  <div>
    <div style={styles.inWrapper}>
      <img style={styles.img} src={data.author.avatar_url} alt="" />
      <span style={styles.info}>{data.author.loginname}发表于{timeago.format(data.created_at, 'zh_CN')}</span>
    </div>
    <div dangerouslySetInnerHTML={{ __html: data.content }} className="markdown-body"></div>
  </div>
)

class Comments extends PureComponent {
  render() {
    const { comments } = this.props;
    return (
      <ListPanel alert={`共${comments.length}条`} datasets={comments} bodyRender={bodyRender} />
    );
  }
}

export default Radium(Comments);
