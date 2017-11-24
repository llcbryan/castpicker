import * as React from 'react';

export class CastPicker extends React.PureComponent<CastPicker.Props, CastPicker.State> {

  constructor(props: CastPicker.Props) {
    super(props);
    this.state = { previousResults: [] };
  }

  public render() {
    return (
      <div>
        <h1>Cast Picker</h1>
        <button onClick={this.pick}>Pick</button>
        <div>
          Results:
          <ul>
            { this.state.previousResults.map((r, i) =>
                  <li key={i}>{r}</li>) }
          </ul>
        </div>
      </div>
    );
  }

  private pick = () => {
    const newValue = Math.ceil(Math.random() * 10);
    this.setState(oldState => ({
      previousResults: [ newValue, ...oldState.previousResults ]
    }));
  }

}

export namespace CastPicker {

  export interface Props {

  }

  export interface State {
    previousResults: string[];
  }
}