import React, { PureComponent } from 'react';
import { Alert, Button, Input } from 'zent';

const styles = {
  wrapper: {
    backgroundColor: '#fff',
    overflow: 'hidden'
  },
  textarea: {
    margin: 20,
    minHeight: 120,
    border: 'none',
    outline: 'none',
    boxShadow: 'none'
  },
  submit: {
    display: 'block',
    margin: '0 auto 20px'
  }
};

class Editor extends PureComponent {
  render() {
    return (
      <div style={styles.wrapper}>
        <Alert>评论</Alert>
        <Input style={styles.textarea} type="textarea" value={this.props.value} onChange={e => this.props.onChange(e.target.value)} />
        <Button style={styles.submit} type="primary" onClick={() => this.props.onSubmit(this.props.topic_id, this.props.value)}>提交</Button>
      </div>
    );
  }
}

export default Editor;
