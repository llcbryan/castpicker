import * as React from 'react';

import './App.css';
import 'semantic-ui-css/semantic.min.css';

import { pickRandomCastSet } from './CastLogic';
import { CastsListItem } from './CastList';
import { CastPicker } from './CastPicker';

const MAX_RESULTS: number = Infinity;

// Generate a unique key for array elements
const nextKey = (() => {
  let _next = 0;
  return () => '' + _next++;
})();

class App extends React.Component<{}, App.State> {

  constructor(props: {}) {
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
      let nextCasts: CastsListItem = {
        casts: pickRandomCastSet(),
        key: nextKey()
      };
      let newResults: CastsListItem[] = [ nextCasts, ...oldState.generatedCasts ];

      return {
        generatedCasts: newResults.slice(0, MAX_RESULTS)
      } as App.State;
    });
  }
}

namespace App {

  export interface State {
    generatedCasts: CastsListItem[];
  }
}

export default App;
