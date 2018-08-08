// src: https://www.frankmitchell.org/2015/01/fisher-yates/
const FUNCTION_NAME = "visualizer";
const DEFAULT_CODE = `function ${FUNCTION_NAME}(lst) \n{\n  //`
  + "Start typing here, do not delete the function declaration \n}";

const ALGO_LIST_REVERSE = `function ${FUNCTION_NAME}(lst) \n{\n  `
+ "lst.reverse(); \n}";

const ALGO_BUBBLE_SORT = `function ${FUNCTION_NAME}(lst) \n{\n
      var swapped;\n
      do {\n
          swapped = false;\n
          for (var i=0; i < lst.length-1; i++) {\n
              if (lst[i] > lst[i+1]) {\n
                  var temp = lst[i];\n
                  lst[i] = lst[i+1];\n
                  lst[i+1] = temp;\n
                  swapped = true;\n
              }\n
          }\n
      } while (swapped);\n
\n}`;

const ALGO_SELECTION_SORT = `function ${FUNCTION_NAME}(lst) \n{\n
    var minIdx, temp, len = lst.length;\n
    for(var i = 0; i < len; i++){\n
        minIdx = i;\n
        for(var  j = i+1; j<len; j++){\n
            if(lst[j]<lst[minIdx]){\n
                minIdx = j;\n
            }\n
        }\n
        temp = lst[i];\n
        lst[i] = lst[minIdx];\n
        lst[minIdx] = temp;\n
    }\n
\n}`;

const ALGO_QUICK_SORT = `function ${FUNCTION_NAME}(lst) \n{\n
  quickSort(lst, 0, lst.length-1);
}\n
function quickSort(lst, left, right){
  var len = lst.length, 
  pivot,
  partitionIndex;


  if(left < right){
      pivot = right;
      partitionIndex = partition(lst, pivot, left, right);

      //sort left and right
      quickSort(lst, left, partitionIndex - 1);
      quickSort(lst, partitionIndex + 1, right);
  }
}
  
function partition(lst, pivot, left, right){
    var pivotValue = lst[pivot],
        partitionIndex = left;

    for(var i = left; i < right; i++){
        if(lst[i] < pivotValue){
            swap(lst, i, partitionIndex);
            partitionIndex++;
        }
    }
    swap(lst, right, partitionIndex);
    return partitionIndex;
}

function swap(lst, i, j){
    var temp = lst[i];
    lst[i] = lst[j];
    lst[j] = temp;
}`;

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

export {arrayShuffle, ALGO_LIST_REVERSE, ALGO_BUBBLE_SORT, ALGO_QUICK_SORT, ALGO_SELECTION_SORT, DEFAULT_CODE};
