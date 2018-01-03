import * as React from 'react';
import { Button, Container, Divider, Header } from 'semantic-ui-react';

import { CastList, CastsListItem } from './CastList';

const FlexContainerStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const HeaderContainerStyle: React.CSSProperties = {
  padding: 14,
  textAlign: 'center',
};

const ListContainerStyle: React.CSSProperties = {
  flex: 1,
  padding: 14,
  minWidth: 300,
  maxWidth: 400,
  overflowY: 'auto',
};

export function CastPicker(props: CastPicker.Props) {
  return (
    <div style={FlexContainerStyle}>
      <div style={HeaderContainerStyle}>
        <Header as='h1'>Cast Picker</Header>
        <Button primary={true} onClick={props.startPick}>Pick a random cast!</Button>
      </div>
      <div style={ListContainerStyle}>
        <CastList casts={props.generatedCasts} />
      </div>
      <div>
        <Divider />
        <span>This is a footer</span>
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
