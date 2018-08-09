import * as React from 'react';

import 'semantic-ui-css/semantic.min.css';

import { Button } from 'semantic-ui-react';

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

  private scrollListRef: HTMLElement;
  private buttonRef: Button;

  constructor(props: {}) {
    super(props);
    this.state = { generatedCasts: [] };
  }

  public render() {
    return (
      <CastPicker
                generatedCasts={this.state.generatedCasts}
                startPick={this.pick}
                buttonRef={this.buttonRefCallback}
                scrollListRef={this.scrollListRefCallback}
      />
    );
  }

  public componentDidMount() {
    this.buttonRef.focus();
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
    this.scrollListRef.scrollTop = 0;
  }

  private buttonRefCallback = (el: Button) => this.buttonRef = el;
  private scrollListRefCallback = (el: HTMLElement) => this.scrollListRef = el;
}

namespace App {

  export interface State {
    generatedCasts: CastsListItem[];
  }
}

export default App;
