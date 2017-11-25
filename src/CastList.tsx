import * as React from 'react';

import { Cast } from './Cast';

export function CastList(props: CastList.Props) {
  return (
    <ul>
      {props.casts.map(ListItem)}
    </ul>
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
  return <li key={props.key}>{props.casts[0].toString()}</li>;
}

function MultiCastListItem(props: ListItem.Props) {
  let phrase = (props.casts.length > 2) ? 'Combo casts!!!' : 'Dual casts!!!';
  return (
    <li key={props.key}>
      {phrase}<br />
      {props.casts.map((c, i) => <span key={i}>{c.toString()}<br /></span>)}
    </li>
  );
}

namespace ListItem {
  export interface Props extends CastsListItem { }
}
