import * as React from 'react';
import './App.css';
import { pickCast } from './CastLogic';

import { CastPicker } from './CastPicker';

class App extends React.Component<{}, App.State> {

  constructor(props: CastPicker.Props) {
    super(props);
    this.state = { previousResults: [] };
  }

  public render() {
    return (
      <CastPicker
                results={this.state.previousResults}
                startPick={this.pick}
      />
    );
  }

  private pick = () => {
    this.setState(oldState => ({
      previousResults: [ pickCast(), ...oldState.previousResults ]
    }));
  }
}

namespace App {
  export interface State {
    previousResults: string[];
  }
}

export default App;
