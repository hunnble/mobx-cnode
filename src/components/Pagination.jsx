import React, { PureComponent } from 'react';
import { Button } from 'zent';

const styles = {
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10px 0'
  },
  info: {
    lineHeight: '30px',
    fontSize: 12,
    padding: '0 12px'
  }
};

class Pagination extends PureComponent {
  render() {
    const { page, onChange } = this.props;

    return (
      <div style={styles.pagination}>
        <Button disabled={page === 1} onClick={() => onChange(+page - 1)}>上一页</Button>
        <span style={styles.info}>第{page}页</span>
        <Button onClick={() => onChange(+page + 1)}>下一页</Button>
      </div>
    );
  }
}

export default Pagination;
