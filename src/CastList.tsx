import * as React from 'react';
import { List, Segment, Transition } from 'semantic-ui-react';

import { Cast } from './Cast';

export function CastList(props: CastList.Props) {
  return (
    <Transition.Group
        as={List}
        animation="fade down"
        duration={750}
    >
      {props.casts.map(ListItem)}
    </Transition.Group>
  );
}

export namespace CastList {
  export interface Props {
    casts: CastsListItem[];
  }
}

export interface CastsListItem {
  casts: Cast[];
  key: string;
}

function ListItem(props: ListItem.Props) {
  if (props.casts.length === 1) {
    return SingleCastListItem(props);
  } else {
    return MultiCastListItem(props);
  }
}

function SingleCastListItem(props: ListItem.Props) {
  return (
    <List.Item key={props.key}>
      <Segment>
        {props.casts[0].toString()}
      </Segment>
    </List.Item>
  );
}

function MultiCastListItem(props: ListItem.Props) {
  let phrase = (props.casts.length > 2) ? 'Combo casts!!!' : 'Dual casts!!!';
  return (
    <List.Item key={props.key}>
      <Segment>
        <strong>{phrase}</strong><br />
        {props.casts.map((c, i) => <span key={i}>{c.toString()}<br /></span>)}
      </Segment>
    </List.Item>
  );
}

namespace ListItem {
  export interface Props extends CastsListItem { }
}
