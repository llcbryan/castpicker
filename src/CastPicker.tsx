import * as React from 'react';
import { Button, Container, Header } from 'semantic-ui-react';

import { CastList, CastsListItem } from './CastList';

export function CastPicker(props: CastPicker.Props) {
  return (
    <Container text={true}>
      <Container textAlign="center">
        <Header as='h1'>Cast Picker</Header>
        <Button primary={true} onClick={props.startPick}>Pick</Button>
      </Container>
      <Container>
        <CastList casts={props.generatedCasts} />
      </Container>
    </Container>
  );
}

export namespace CastPicker {

  export interface Props {
    startPick: () => void;
    generatedCasts: CastsListItem[];
  }
}
