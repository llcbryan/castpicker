import * as React from 'react';

import './App.css';

import { pickRandomCastSet } from './CastLogic';
import { CastPicker } from './CastPicker';

const MAX_RESULTS: number = Infinity;

// Generate a unique key for array elements
const nextKey = (() => {
  let _next = 0;
  return () => '' + _next++;
})();

class App extends React.Component<{}, App.State> {

  constructor(props: CastPicker.Props) {
    super(props);
    this.state = { generatedCasts: [] };
  }

  public render() {
    return (
      <CastPicker
                generatedCasts={this.state.generatedCasts}
                startPick={this.pick}
      />
    );
  }

  private pick = () => {
    this.setState(oldState => {
      let nextCasts: CastPicker.GeneratedCastSet = {
        casts: pickRandomCastSet(),
        key: nextKey()
      };
      let newResults: CastPicker.GeneratedCastSet[] = [ nextCasts, ...oldState.generatedCasts ];

      return {
        generatedCasts: newResults.slice(0, MAX_RESULTS)
      } as App.State;
    });
  }
}

namespace App {

  export interface State {
    generatedCasts: CastPicker.GeneratedCastSet[];
  }
}

export default App;
