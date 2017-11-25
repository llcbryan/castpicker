import * as React from 'react';

export function CastPicker(props: CastPicker.Props) {
  return (
    <div>
      <h1>Cast Picker</h1>
      <button onClick={props.startPick}>Pick</button>
      <div>
        Results:
        <ul>
          {props.generatedCasts.map(ListItem)}
        </ul>
      </div>
    </div>
  );
}

export namespace CastPicker {

  export interface Props {
    startPick: () => void;
    generatedCasts: GeneratedCast[];
  }

  export interface GeneratedCast {
    name: string;
    key: string;
  }
}

function ListItem(props: ListItem.Props) {
  return <li key={props.key}>{props.name}</li>;
}

namespace ListItem {
  export interface Props extends CastPicker.GeneratedCast { }
}