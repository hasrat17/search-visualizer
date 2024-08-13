import React from 'react';
import { getMergeSortAnimations, getBubbleSortAnimations, getHeapSortAnimations, getSelectionSortAnimations, getQuickSortAnimations } from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

// Number of elements to show
const NUMBER_OF_ARRAY_BARS = 40;

// color og bars
const PRIMARY_COLOR = 'blue';

// COlors when changing the bar
const SECONDARY_COLOR = 'yellow';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      animationSpeed: 50, // Default speed
    };

    this.timeouts = []; 
  }

  componentDidMount() {
    this.resetArray();
  }

  componentWillUnmount() {
    this.clearAllTimeouts();
  }

  clearAllTimeouts() {
    this.timeouts.forEach(timeout => clearTimeout(timeout));
    this.timeouts = [];
  }

  resetArray() {
    this.clearAllTimeouts();
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(3, 500));
    }
    this.setState({ array });
  }

  setAnimationSpeed = (event) => {
    this.resetArray()
    this.setState({ animationSpeed: Number(event.target.value) });
    this.clearAllTimeouts();
  }

  mergeSort() {
    this.clearAllTimeouts();
    const animations = getMergeSortAnimations(this.state.array);
    const ANIMATION_SPEED_MS = this.state.animationSpeed;
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        const timeout = setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
        this.timeouts.push(timeout);
      } else {
        const timeout = setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
        this.timeouts.push(timeout);
      }
    }
  }


  bubbleSort() {
    this.clearAllTimeouts();
    const animations = getBubbleSortAnimations(this.state.array);
    const ANIMATION_SPEED_MS = this.state.animationSpeed;
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 4 === 0 || i % 4 === 1;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        const timeout = setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
        this.timeouts.push(timeout);
      } else {
        const timeout = setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
        this.timeouts.push(timeout);
      }
    }
  }


  heapSort() {
    this.clearAllTimeouts();
    const animations = getHeapSortAnimations(this.state.array);
    const ANIMATION_SPEED_MS = this.state.animationSpeed;
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 4 < 2; // Change color every two steps
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        const timeout = setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
        this.timeouts.push(timeout);
      } else {
        const timeout = setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
        this.timeouts.push(timeout);
      }
    }
  }

  
  selectionSort() {
    this.clearAllTimeouts();
    const animations = getSelectionSortAnimations(this.state.array);
    const ANIMATION_SPEED_MS = this.state.animationSpeed;
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = animations[i].length === 3; // Change color for comparison
      if (isColorChange) {
        const [barOneIdx, barTwoIdx, temp] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = temp === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        const timeout = setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
        this.timeouts.push(timeout);
      } else {
        const timeout = setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
        this.timeouts.push(timeout);
      }
    }
  }

  
  quickSort() {
    this.clearAllTimeouts();
    const animations = getQuickSortAnimations(this.state.array);
    const ANIMATION_SPEED_MS = this.state.animationSpeed;
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = animations[i].length === 3; // Change color for comparison
      if (isColorChange) {
        const [barOneIdx, barTwoIdx, temp] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = temp === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        const timeout = setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
        this.timeouts.push(timeout);
      } else {
        const timeout = setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
        this.timeouts.push(timeout);
      }
    }
  }
  

  render() {
    const { array, animationSpeed } = this.state;
    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}></div>
        ))}
        <br></br>
        <div className="button">
          <button onClick={() => this.resetArray()}>Generate New Array</button>
          <button onClick={() => this.mergeSort()}>Merge Sort</button>
          <button onClick={() => this.quickSort()}>Quick Sort</button>
          <button onClick={() => this.heapSort()}>Heap Sort</button>
          <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
          <button onClick={() => this.selectionSort()}>Selection Sort</button>
        </div>
        <div className="speed-control">
          <label>Speed: {animationSpeed} ms</label>
          <input
            type="range"
            min="10"
            max="200"
            step="10"
            value={animationSpeed}
            onChange={this.setAnimationSpeed}
            className="speed-slider"
          />
        </div>
      </div>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
