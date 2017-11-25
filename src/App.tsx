import * as React from 'react';

import './App.css';

import { pickCast } from './CastLogic';
import { CastPicker } from './CastPicker';

const MAX_RESULTS: number = Infinity;

// Generate a unique key for array elements
const nextKey = (() => {
  let _next = 0;
  return () => _next++;
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
      let newCast = {
        name: pickCast(),
        key: nextKey()
      };
      let newResults = [ newCast, ...oldState.generatedCasts ];

      return {
        generatedCasts: newResults.slice(0, MAX_RESULTS)
      };
    });
  }
}

namespace App {

  export interface State {
    generatedCasts: CastPicker.GeneratedCast[];
  }
}

export default App;
