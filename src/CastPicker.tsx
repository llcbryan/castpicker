import * as React from 'react';

export function CastPicker(props: CastPicker.Props) {
  return (
    <div>
      <h1>Cast Picker</h1>
      <button onClick={props.startPick}>Pick</button>
      <div>
        Results:
        <ul>
          {props.results.map((r, i) => <li key={i}>{r}</li>)}
        </ul>
      </div>
    </div>
  );
}

export namespace CastPicker {

  export interface Props {
    startPick: () => void;
    results: string[];
  }
}