class ArrayList {
  constructor() {
    this.length = 0;
    this.data = {};
  }
  push(value) {
    this.data[this.length++] = value;
  }
  pop() {
    let deleted = this.data[this.length - 1];
    delete this.data[this.length - 1];
    this.length--;
    return deleted;
    // return this.delete(this.length-1)
  }
  get(index) {
    return this.data[index];
  }
  delete(index) {
    /* My solution */
    let deleted = this.data[index];

    if (index < this.length - 1) {
      let i = index;
      while (i < this.length) {
        this.data[i] = this.data[i + 1];
        i++;
      }
      delete this.data[this.length - 1];
      this.length--;
    }
    return deleted;
  }
  /* Front End Masters' Solution 
    delete (index) {
        const ans = this.data[index];
        this._collapseTo(index);
        return ans;
    }
    _collapseTo(index) {
        for (let i = index; i < this.length; i++) {
            this.data[i] = this.data[i+1];
        }
        delete this.data[this.length - 1];
        this.length--;
    } */
}
