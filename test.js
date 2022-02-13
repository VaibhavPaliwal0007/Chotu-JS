Array.prototype.myMap = function (callback) {
  const result = [];

  for (let idx = 0; idx < this.length; idx++) {
    result.push(callback(this[i], i, this));
  }

  return result;
};

const arr = [1, 2, 3, 4, 5];