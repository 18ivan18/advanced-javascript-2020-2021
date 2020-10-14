console.log("Quicksort!\n");

const swap = (arr, i, j) => {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

const partition = (arr, low, high) => {
    let pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr, i, j);
        }
    }
    i++;
    swap(arr, i, high);
    return i;
}

const quicksort = (arr, low, high) => {
    if (low < high) {
        const pivot = partition(arr, low, high);
    
        quicksort(arr, low, pivot - 1);
        quicksort(arr, pivot + 1, high);
    }
}


const main = () => {
    const arr = [10, 80, 30, 90, 40, 50, 70];
    quicksort(arr, 0, arr.length - 1);
    console.log(arr);
}

main();