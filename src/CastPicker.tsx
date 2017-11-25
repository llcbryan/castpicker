import * as React from 'react';

import { CastList, CastsListItem } from './CastList';

export function CastPicker(props: CastPicker.Props) {
  return (
    <div>
      <h1>Cast Picker</h1>
      <button onClick={props.startPick}>Pick</button>
      <div>
        Results:
        <CastList casts={props.generatedCasts} />
      </div>
    </div>
  );
}

export namespace CastPicker {

  export interface Props {
    startPick: () => void;
    generatedCasts: CastsListItem[];
  }
}
