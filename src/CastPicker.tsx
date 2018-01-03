import * as React from 'react';
import { Button, Container, Header } from 'semantic-ui-react';

import { CastList, CastsListItem } from './CastList';

const FlexContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
};

const AppContainerStyle: React.CSSProperties = {
  padding: 14,
  minWidth: 275,
  maxWidth: 400,
};

export function CastPicker(props: CastPicker.Props) {
  return (
    <div style={FlexContainerStyle}>
      <div style={AppContainerStyle}>
        <Container textAlign="center">
          <Header as='h1'>Cast Picker</Header>
          <Button primary={true} onClick={props.startPick}>Pick</Button>
        </Container>
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
