export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}

function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([i, j]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([i, j]);
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            // We overwrite the value at index k in the original array with the
            // value at index i in the auxiliary array.
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            // We overwrite the value at index k in the original array with the
            // value at index j in the auxiliary array.
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }
    while (i <= middleIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([i, i]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([i, i]);
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([j, j]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([j, j]);
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
    }
}









export function getBubbleSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    bubbleSortHelper(array, animations);
    return animations;
}

function bubbleSortHelper(array, animations) {
    const n = array.length;
    let swapped;
    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            // Push the comparison between the two elements to change their color.
            animations.push([j, j + 1]);
            // Push the comparison again to revert their color.
            animations.push([j, j + 1]);
            if (array[j] > array[j + 1]) {
                // If the current element is greater than the next element, swap them.
                animations.push([j, array[j + 1]]);
                animations.push([j + 1, array[j]]);
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                swapped = true;
            } else {
                // Push the current and next element to show no swap happened
                animations.push([j, array[j]]);
                animations.push([j + 1, array[j + 1]]);
            }
        }
        if (!swapped) break; // If no swap happened in the inner loop, the array is sorted.
    }
}






export function getHeapSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    heapSortHelper(array, animations);
    return animations;
}

function heapSortHelper(array, animations) {
    const n = array.length;

    // Build heap (rearrange array)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(array, n, i, animations);
    }

    // One by one extract an element from heap
    for (let i = n - 1; i > 0; i--) {
        // Move current root to end
        animations.push([0, i]);
        animations.push([0, i]);
        animations.push([0, array[i]]);
        animations.push([i, array[0]]);
        swap(array, 0, i);

        // Call max heapify on the reduced heap
        heapify(array, i, 0, animations);
    }
}

function heapify(array, n, i, animations) {
    let largest = i; // Initialize largest as root
    const left = 2 * i + 1; // left = 2*i + 1
    const right = 2 * i + 2; // right = 2*i + 2

    // If left child is larger than root
    if (left < n && array[left] > array[largest]) {
        largest = left;
    }

    // If right child is larger than largest so far
    if (right < n && array[right] > array[largest]) {
        largest = right;
    }

    // If largest is not root
    if (largest !== i) {
        animations.push([i, largest]);
        animations.push([i, largest]);
        animations.push([i, array[largest]]);
        animations.push([largest, array[i]]);
        swap(array, i, largest);

        // Recursively heapify the affected sub-tree
        heapify(array, n, largest, animations);
    }
}

function swap(array, i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}







export function getSelectionSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return animations;

    for (let i = 0; i < array.length - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < array.length; j++) {
            // Push the indices to change their color for comparison.
            animations.push([minIdx, j, 0]); // adding zero so can check its length and take for adding color
            // Push the indices to revert their color.
            animations.push([minIdx, j, 1]); // & to remove color

            if (array[j] < array[minIdx]) {
                minIdx = j;
            }
        }

        if (minIdx !== i) {
            // Swap the elements and push the changes to the animations array.
            animations.push([i, array[minIdx]]);
            animations.push([minIdx, array[i]]);
            [array[i], array[minIdx]] = [array[minIdx], array[i]];
        } else {
            // No swap needed, push the same value to maintain the animation sequence.
            animations.push([i, array[i]]);
            animations.push([minIdx, array[minIdx]]);
        }
    }
    return animations;
}



export function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
}

function quickSortHelper(mainArray, startIdx, endIdx, animations) {
    if (startIdx < endIdx) {
        const pivotIdx = doPartition(mainArray, startIdx, endIdx, animations);
        quickSortHelper(mainArray, startIdx, pivotIdx - 1, animations);
        quickSortHelper(mainArray, pivotIdx + 1, endIdx, animations);
    }
}

function doPartition(mainArray, startIdx, endIdx, animations) {
    const pivotValue = mainArray[endIdx];
    let pivotIdx = startIdx;
    for (let i = startIdx; i < endIdx; i++) {
        // Compare the current element with the pivot.
        animations.push([i, endIdx, 0]); // to add color
        // Revert the color after comparison.
        animations.push([i, endIdx, 1]); // to remove color
        if (mainArray[i] <= pivotValue) {
            // Swap elements.
            animations.push([i, mainArray[pivotIdx]]);
            animations.push([pivotIdx, mainArray[i]]);
            [mainArray[i], mainArray[pivotIdx]] = [mainArray[pivotIdx], mainArray[i]];
            pivotIdx++;
        }
    }
    // Swap the pivot element to its correct sorted position.
    animations.push([pivotIdx, mainArray[endIdx]]);
    animations.push([endIdx, mainArray[pivotIdx]]);
    [mainArray[pivotIdx], mainArray[endIdx]] = [mainArray[endIdx], mainArray[pivotIdx]];
    return pivotIdx;
}




