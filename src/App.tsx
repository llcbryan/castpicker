import * as React from 'react';
import './App.css';

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
    const newValue = Math.ceil(Math.random() * 10);
    this.setState(oldState => ({
      previousResults: [ newValue, ...oldState.previousResults ]
    }));
  }
}

namespace App {
  export interface State {
    previousResults: string[];
  }
}

export default App;
