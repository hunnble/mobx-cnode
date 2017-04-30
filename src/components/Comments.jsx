import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import Radium from 'radium';
import Timeago from 'timeago.js';
import { Button, Icon } from 'zent';
import ListPanel from './ListPanel';

const timeago = new Timeago();

const styles = {
  wrapper: {
    width: '100%'
  },
  inWrapper: {
    display: 'inline-block',
    verticalAlign: 'middle'
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
  },
  author: {
    marginLeft: 6
  },
  content: {
    marginLeft: 24
  },
  agree: {
    float: 'right',
    paddingTop: 10,
    cursor: 'pointer',
    color: '#eb0b19'
  }
};

class Comments extends PureComponent {
  bodyRender = data => (
    <div style={styles.wrapper}>
      <div onClick={() => this.onAgree(data)} style={styles.agree}><Icon type={data.is_uped ? 'youzan' : 'youzan-o'} />&nbsp;{data.ups.length > 0 ? data.ups.length : ''}</div>
      <Link to={`/user/${data.author.loginname}`} style={styles.inWrapper}>
        <img style={styles.img} src={data.author.avatar_url} alt="" />
      </Link>
      <span style={styles.info}>{data.author.loginname}发表于{timeago.format(data.created_at, 'zh_CN')}</span>
      {data.author.loginname === this.props.author.loginname && <Button style={styles.author} size="small" type="success">作者</Button>}
      <div style={styles.content} dangerouslySetInnerHTML={{ __html: data.content }} className="markdown-body"></div>
    </div>
  )

  onAgree = (data) => {
    const { store } = this.props;
    if (store.currentUser && data.id) {
      store.agreeReply(data.id);
    }
  }

  render() {
    const { comments } = this.props;
    return (
      <ListPanel alert={`共${comments.length}条`} datasets={comments} bodyRender={this.bodyRender} />
    );
  }
}

export default Radium(Comments);
