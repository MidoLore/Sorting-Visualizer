let n = 20; //Size of array
let array = [];
const min = 5; //Min element in array
const max = 100; //Max element in array
let bar;

const createArrayButton = document.getElementById('createArrayButton');
const bubbleButton = document.getElementById('bubbleButton');
const selectionButton = document.getElementById('selectionButton');
const insertionButton = document.getElementById('insertionButton');
const slider = document.getElementById('arraySize');


document.addEventListener('DOMContentLoaded', function() {
    const sliderValue = document.getElementById('arraySizeValue')

    slider.addEventListener('input', function() {
        n = parseInt(slider.value, 10)
        sliderValue.textContent = n;
        init()
    });
    init()
});

function init() {
    array.length = n;
    for (let i = 0; i < n; i++) {
        array[i] = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    showBars();
}


function showBars(indices = [], swapIndices = [], finalIndices = []) {
    container.innerHTML = '';

    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement("div");
        bar.style.height = array[i] + "%";
        bar.classList.add("bar");

        if (finalIndices.includes(i)) {
            bar.style.backgroundColor = "green";
        } else if (swapIndices.includes(i)) {
            bar.style.backgroundColor = "red"; 
        } else if (indices.includes(i)) {
            bar.style.backgroundColor = "yellow"; 
        } else {
            bar.style.backgroundColor = "";
        }

        container.appendChild(bar);
    }
}

function animate(swaps) {
    if (swaps.length === 0) {
        console.log(array)
        showBars([], [], array.map((_, finalIndex) => finalIndex));
        enableButtons();
        return;
    }

    const { indices, swap, final, finalIndex } = swaps.shift();
    if (final) {
        showBars([], [], [finalIndex]);
    } else {
        if (swap) {
            [array[indices[0]], array[indices[1]]] = [array[indices[1]], array[indices[0]]];
            showBars([], indices); 
        } else {
            showBars(indices); 
        }
    }
    setTimeout(() => animate(swaps), 10);
}

function playBubbleSort() {
    disableButtons();
    const swaps = bubbleSort([...array]);
    animate(swaps);
}

function playSelectionSort() {
    disableButtons();
    const swaps = selectionSort([...array]);
    animate(swaps);
}

function playInsertionSort(){
    disableButtons()
    const swaps = insertionSort([...array]);
    animate(swaps)
}

function playMergeSort(){
    disableButtons()
    const swaps = mergeSort([...array])
    animate(swaps)
}

function bubbleSort(array) {
    const swaps = [];
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            swaps.push({ indices: [j, j + 1], swap: false });
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                swaps.push({ indices: [j, j + 1], swap: true });
            }
        }
        swaps.push({ final: true, index: array.length - i - 1 });
    }
    return swaps;
}

function selectionSort(array) {
    const swaps = [];
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            swaps.push({ indices: [minIndex, j], swap: false });
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
            swaps.push({ indices: [i, minIndex], swap: true });
        }
        swaps.push({ final: true, index: i });
    }
    swaps.push({ final: true, index: array.length - 1 });
    return swaps;
}


function insertionSort(array){
    const swaps = [];
    for (let i = 1; i < array.length; i++){
        let j = i;
         while (j > 0 && array[j-1] > array[j]){
            [array[j-1], array[j]] = [array[j], array[j-1]];
            swaps.push({ indices: [j-1, j], swap: true });
            j--;
        }
    }
    swaps.push({ final: true, index: array.length - 1 });
    return swaps;
}

function mergeSort(array) {

}

function merge(leftArray, rightArray, array) {
}

function disableButtons() {
    createArrayButton.disabled = true;
    bubbleButton.disabled = true;
    selectionButton.disabled = true;
    insertionButton.disabled = true;
    slider.disabled = true;
}

function enableButtons() {
    createArrayButton.disabled = false;
    bubbleButton.disabled = false;
    selectionButton.disabled = false;
    insertionButton.disabled = false;
    slider.disabled = false;
}
