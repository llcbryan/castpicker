import * as React from 'react';

import { Cast } from './CastLogic';

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
    generatedCasts: GeneratedCastSet[];
  }

  export interface GeneratedCastSet {
    casts: Cast[];
    key: string;
  }
}

function ListItem(props: ListItem.Props) {
  return <li key={props.key}>{props.casts[0].toString()}</li>;
}

namespace ListItem {
  export interface Props extends CastPicker.GeneratedCastSet { }
}