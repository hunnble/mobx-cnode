import { observable, computed, action } from 'mobx';

class Store {
  name = 'Z2EX';
  description = 'v2ex in react';
  @observable numClicks = 0;

  @computed get oddOrEven() {
    return this.numClicks % 2 === 0 ? 'even' : 'odd';
  }

  @action clickButton() {
    this.numClicks++;
  }
}

export default Store;
