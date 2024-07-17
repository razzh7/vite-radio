import { useState } from 'react';
import Radio from './components/radio';

function App() {
  const [value, setValue] = useState<string | number>(1)
  return (
    <div>
      <h3>非受控模式</h3>
      <Radio.Group defaultValue={1}>
        <Radio value={1}>1</Radio>
        <Radio value={2}>2</Radio>
      </Radio.Group>
      <h3>受控模式</h3>
      <Radio.Group value={value} onChange={(v) => setValue(v)}>
        <Radio value={1}>1</Radio>
        <Radio value={2}>2</Radio>
      </Radio.Group>
    </div>
  );
} 

export default App;
