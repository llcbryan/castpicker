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
  return <li key={props.key}>{props.casts[0].toString()}</li>;
}

namespace ListItem {
  export interface Props extends CastsListItem { }
}