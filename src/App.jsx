import { useState } from 'react';
import { Link, Route, Routes, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import './App.css';

function Subtask1() {
  const { parameter } = useParams();
  return <div>Subtask1, parameter: {parameter}</div>;
}

function Subtask2() {
  const [searchParams] = useSearchParams();
  const values = Array.from(searchParams.entries()).map(([key, value]) => `${key}=${value}`);
  return <div>Subtask2, query parameters: {values.join(', ')}</div>;
}

function Subtask3() {
  return <div>Subtask3, protected information</div>;
}

function Subtask4() {
  return <div>Subtask4, navigated programmatically</div>;
}

export default function App() {
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  const number = Number(value);
  const isOdd = value !== '' && Number.isInteger(number) && Math.abs(number) % 2 === 1;

  const handleProtectedClick = (event) => {
    if (!isOdd) {
      event.preventDefault();
    }
  };

  const handleCheckboxChange = (event) => {
    if (event.target.checked) {
      navigate('/subtask4');
    }
  };

  return (
    <div className="App">
      <h1>React Practical</h1>
      <h2>The topic 'Routes'</h2>
      <div>
        <Link to="/subtask3" onClick={handleProtectedClick}>Show protected information if </Link>
        <input
          type="number"
          className="odd-input"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        /> is odd
      </div>
      <div className="mainClass">
        Go to the component programmatically, by checking the box:
        <input type="checkbox" onChange={handleCheckboxChange} />
      </div>
      <Routes>
        <Route path="/subtask1/:parameter" element={<Subtask1 />} />
        <Route path="/subtask2" element={<Subtask2 />} />
        <Route path="/subtask3" element={isOdd ? <Subtask3 /> : null} />
        <Route path="/subtask4" element={<Subtask4 />} />
      </Routes>
    </div>
  );
}
