let n = 20; //Size of array
let array = [];
const min = 5; //Min element in array
const max = 100; //Max element in array


document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('arraySize');
    const sliderValue = document.getElementById('arraySizeValue')

    slider.addEventListener('input', function() {
        n = parseInt(slider.value, 10)
        sliderValue.textContent = n;
        init()
    });
    init()
});

function init(){
    array.length = n;
    for(let i=0; i<n; i++){
        array[i] = Math.floor(Math.random() * (max-min+1)) + min;
    }
    showBars();
}

function playBubbleSort(){
    bubbleSort(array)
    showBars();
}

function bubbleSort(array){
    for (let i = 0; i<array.length-1; i++){
        for (let j = 0; j< array.length-i-1; j++){
            if (array[j] > array[j+1]){
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }
        }
    }
}

function showBars(){
    container.innerHTML = ''; 
    for(let i=0;i<array.length;i++){
        const bar = document.createElement("div")
        bar.style.height=array[i]+"%"
        bar.classList.add("bar")

        //const label = document.createElement("div");
        //label.classList.add("label");
        //label.textContent = array[i];
        //bar.appendChild(label);

        container.appendChild(bar)
    }
}