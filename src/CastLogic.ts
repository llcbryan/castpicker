import { sample } from 'lodash-es';

export function pickCast(): string {
  return Cast.random().toString();
}

function pick<T>(array: T[]): T {
  let randomItem = sample(array);
  if (randomItem === undefined) {
    throw 'There were no items to pick from!';
  }
  return randomItem;
}

function generateCasts(numCasts: number, unique: boolean): Cast[] {
  const casts: Cast[] = [];

  if (unique && numCasts > 4) {
    throw `There are only four limbs; cannot generate ${numCasts} unique casts.`;
  }

  while(casts.length < numCasts) {
    let newCast = Cast.random();
    let overlappingLimb = casts.some(c => newCast.isSameLimb(c));
    if (!unique || !overlappingLimb) {
      casts.push(newCast);
    }
  }

  return casts;
}

type Side = 'left' | 'right';
const Sides: Side[] = [ 'left', 'right' ];

type Size = 'short' | 'long';
const Sizes: Size[] = [ 'short', 'short', 'short', 'long', 'long' ];

type Limb = 'arm' | 'leg';
const Limbs: Limb[] = [ 'arm', 'leg' ];

type Spica = 'thumb spica' | 'finger spica';

class Cast {
  private static CAST_NAME = 'cast';

  public constructor(
    private side: Side,
    private size: Size,
    private limb: Limb,
    // other fields here
  ) {}

  private spica: Spica;

  public static random(): Cast {
    const c = new Cast(
      pick(Sides),
      pick(Sizes),
      pick(Limbs)
    );
    c.spica = 'thumb spica';
    return c;
  }

  public isSameLimb(other: Cast) {
    return this.side === other.side && this.limb === other.limb;
  }

  public shortName() {
    return 'short foo';
  }

  public longName() {
    return 'long foo';
  }

  public toString() {
    return `${this.side} ${this.shortName()} (${this.longName()})`;
  }
}
