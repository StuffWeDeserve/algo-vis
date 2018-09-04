// src: https://www.frankmitchell.org/2015/01/fisher-yates/
var arrayShuffle = function arrayShuffle (array) {
  var i = 0
    , j = 0
    , temp = null

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

var generateNumList = (n) => {
        let arr = []
        for (var i = 1; i < n + 1; i++) {
            arr.push(i);
        }

        return arr;
    }

export {generateNumList, arrayShuffle};
