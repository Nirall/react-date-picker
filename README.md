# React date picker based on dayjs

A date picker with automatic calendar position and time input field. The package exports a react component <DatePicker />

## Install
npm install @nirall/react-date-picker

## Usage
With built-in input design

```
import { DatePicker } from '@nirall/react-date-picker';

function App() {
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <div className="App">
      <DatePicker onChange={v => setDate(v)} value={date} />
    </div>
  );
}
```

You can provide your own input as a child element

```
import { DatePicker } from '@nirall/react-date-picker';

function App() {
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <div className="App">
      <DatePicker onChange={v => setDate(v)} value={date}>
        // your input
        {date?.toISOString()}
      </DatePicker>
    </div>
  );
}
```

## git
[https://github.com/Nirall/react-date-picker](https://github.com/Nirall/react-date-picker)
