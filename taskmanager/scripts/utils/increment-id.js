export function* autoGen(){
    let count = 0;

    while(true){
        count++;
        yield count;
    }
};