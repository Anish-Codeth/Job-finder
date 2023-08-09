let y = "i am dumb";
let yArray = y.split('');

for (let x = 0; x < yArray.length / 2; x++) {
    let temp = yArray[x];
    yArray[x] = yArray[yArray.length - 1 - x];
    yArray[yArray.length - 1 - x] = temp;
    console.log(yArray.join(''));
}

y = yArray.join('');
console.log(y);
