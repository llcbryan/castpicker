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

type Side = 'Left' | 'Right';
const Sides: Side[] = [ 'Left', 'Right' ];

type Size = 'short' | 'long';
const Sizes: Size[] = [ 'short', 'short', 'short', 'long', 'long' ];

type Limb = 'arm' | 'leg';
const Limbs: Limb[] = [ 'arm', 'leg' ];

type Spica = 'thumb spica' | 'finger spica';
const ShortArmSpicas: (Spica | null)[] = [ 'thumb spica', 'thumb spica', 'finger spica', null, null ];
const LongArmSpicas: (Spica | null)[] = [ 'thumb spica', null, null ];

class Cast {
  private static CAST_NAME = 'cast';

  public constructor(
    private side: Side,
    private size: Size,
    private limb: Limb
  ) {}

  private spica: Spica | null = null;

  public static random(): Cast {
    const c = new Cast(
      pick(Sides),
      pick(Sizes),
      pick(Limbs)
    );

    if (c.limb === 'arm') {
      c.spica = pick((c.size === 'short') ? ShortArmSpicas : LongArmSpicas);
    }

    return c;
  }

  public isSameLimb(other: Cast) {
    return this.side === other.side && this.limb === other.limb;
  }

  public shortName() {
    // Short name consists of the first character of each word
    function initial(str: string) {
      return str.substr(0, 1);
    }

    let shortName = initial(this.size) + initial(this.limb);
    if (this.spica) {
      let spicaInitials = this.spica.split(' ').map(initial).join('');
      shortName += spicaInitials;
    } else {
      shortName += initial(Cast.CAST_NAME);
    }
    return shortName.toUpperCase();
  }

  public longName() {
    let longName = `${this.size} ${this.limb}`;
    if (this.spica) {
      longName = `${longName} ${this.spica}`;
    } else {
      longName = `${longName} ${Cast.CAST_NAME}`;
    }
    return longName;
  }

  public toString() {
    return `${this.side} ${this.shortName()} (${this.longName()})`;
  }
}
