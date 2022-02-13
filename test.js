//write a polyfill of reduce

/*
Array.prototype.myReduce = function(callback, initialValue){
    let accumulator = initialValue;
    let startIdx = accumulator ? 0 : 1;

    for(let i = startIdx; i < this.length; i++){
        if(!accumulator){
            accumulator = this[i];
        } else {
            accumulator = callback(accumulator, this[i], i, this);
        }
    }

    return accumulator;
}
*/