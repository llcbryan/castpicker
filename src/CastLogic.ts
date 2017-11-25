import { Cast } from './Cast';

export function pickRandomCastSet(): Cast[] {
  const n = Math.random();
  let numCasts = 1;
  if (n > 0.95) {
    numCasts = 3;
  } else if (n > 0.85) {
    numCasts = 2;
  }

  return generateCasts(numCasts, true);
}

function generateCasts(numCasts: number, unique: boolean): Cast[] {
  const casts: Cast[] = [];

  if (unique && numCasts > 4) {
    throw `There are only four limbs; cannot generate ${numCasts} unique casts.`;
  }

  while (casts.length < numCasts) {
    let newCast = Cast.random();
    let overlappingLimb = casts.some(c => newCast.isSameLimb(c));
    if (!unique || !overlappingLimb) {
      casts.push(newCast);
    }
  }

  return casts;
}
