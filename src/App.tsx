import * as React from 'react';
import './App.css';
import { pickCast } from './CastLogic';

import { CastPicker } from './CastPicker';

const MAX_RESULTS = 5;

class App extends React.Component<{}, App.State> {

  constructor(props: CastPicker.Props) {
    super(props);
    this.state = { generatedResults: [] };
  }

  public render() {
    return (
      <CastPicker
                results={this.state.generatedResults}
                startPick={this.pick}
      />
    );
  }

  private pick = () => {
    this.setState(oldState => {
      let newResults = [ pickCast(), ...oldState.generatedResults ];
      return {
        generatedResults: newResults.slice(0, MAX_RESULTS)
      };
    });
  }
}

namespace App {
  export interface State {
    generatedResults: string[];
  }
}

export default App;
