import './App.css';

export default function App() {
  return (
    <div className="App">
      <h1>React Practical</h1>
      <h2>The topic 'Routes'</h2>
      <div>
        <a href="/">Show protected information if </a>
        <input type="number" className="odd-input" /> is odd
      </div>
      <div className="mainClass">
        Go to the component programmatically, by checking the box:
        <input type="checkbox" />
      </div>
    </div>
  );
}
