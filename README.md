# React date picker based on dayjs

A date picker with automatic calendar position and time input field. The package exports a React component.

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
      <DatePicker onChange={setDate} value={date} />
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
      <DatePicker onChange={setDate} value={date}>
        // your input
        {date?.toISOString()}
      </DatePicker>
    </div>
  );
}
```

There are several variables for styling. You can pass them to the "style" property:

--text: the main color of text and other elements such as arrows;

--main-bg: main background color;

--selected-text: text color in selected cells (days, months, etc.);

--selected-bg: background color of selected cells (days, months, etc.);

--icon: color for input icons (calendar and arrow);

--border: color for borders;

--radius: radius for input and calendar, cells have radius equal to --radius / 2;

```
import { DatePicker } from '@nirall/react-date-picker';

const style = {
  '--text': '#fff',
  '--main-bg': '#090909',
  '--selected-text': '#000',
  '--selected-bg': '#FFB426',
  '--icon': '#FFB426',
  '--border': 'rgba(255, 255, 255, 0.1)',
  '--radius': '10px',
}

function App() {
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <div className="App">
      <DatePicker onChange={setDate} value={date} style={style} />
    </div>
  );
}
```

The component can automatically position the calendar box relative to the screen, but you can also specify it directly

```
<DatePicker onChange={setDate} value={date} position="bottom-right" />
```

By default the date format is "DD.MM.YYYY HH:mm", you can change it to any format provided by dayjs. If the date format does not contain time, there will be no time field.

To set range of years there are two properties - "startYear", "yearsCount".

```
<DatePicker
  onChange={setDate}
  value={date}
  dateFormat="DD.MM.YYYY"
  startYear={1990}
  yearsCount={60}
/>
```
## git
[https://github.com/Nirall/react-date-picker](https://github.com/Nirall/react-date-picker)
