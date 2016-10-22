#!/usr/local/bin/python

import random
import sys

class Selectable:
    def pick(self):
        return random.choice(self.weighted_values)

class Sides(Selectable):
    LEFT = 'Left'
    RIGHT = 'Right'
    weighted_values = [LEFT, RIGHT]

class CastSizes(Selectable):
    SHORT = 'short'
    LONG = 'long'
    weighted_values = [SHORT, SHORT, SHORT, LONG, LONG]

class Limbs(Selectable):
    ARM = 'arm'
    LEG = 'leg'
    weighted_values = [ARM, LEG]

class Spicas(Selectable):
    THUMB = 'thumb spica'
    FINGER = 'finger spica'

class ShortArmSpicas(Spicas):
    weighted_values = [Spicas.THUMB, Spicas.THUMB, Spicas.FINGER, None, None]

class LongArmSpicas(Spicas):
    weighted_values = [Spicas.THUMB, None, None]

class Cast:
    CAST_NAME = 'cast'

    # Generates a random cast
    @staticmethod
    def generate():
        c = Cast()
        c.side = Sides().pick()
        c.cast_size = CastSizes().pick()
        c.limb = Limbs().pick()
        if c.limb == Limbs.ARM:
            if c.cast_size == CastSizes.SHORT:
                c.spica = ShortArmSpicas().pick()
            else:
                c.spica = LongArmSpicas().pick()
        else:
            c.spica = None
        return c

    # Returns True if the two casts are on the same limb
    def is_same_limb(self, other):
        return (self.side == other.side and self.limb == other.limb)

    def short_name(self):
        # Short name consists of the first character of each word
        short_name = self.cast_size[0] + self.limb[0]
        if self.spica:
            for word in self.spica.split(' '):
                short_name += word[0]
        else:
            short_name += Cast.CAST_NAME[0]
        return short_name.upper()

    def long_name(self):
        long_name = self.cast_size + ' ' + self.limb
        if self.spica:
            long_name += ' ' + self.spica
        else:
            long_name += ' ' + Cast.CAST_NAME
        return long_name

    def __str__(self):
        return self.side + ' ' + self.short_name() + ' (' + self.long_name() + ')'
        # return self.side + ' ' + self.long_name()


def generate_casts(num_casts, unique):
    casts = []
    if unique and num_casts > 4:
        raise Exception('There are only four limbs; cannot generate %d unique casts.' % num_casts)

    while len(casts) < num_casts:
        new_cast = Cast.generate()
        if not unique or not any(map(new_cast.is_same_limb, casts)):
            casts.append(new_cast)
    return casts


def print_casts_human_readable(casts):
    print
    if len(casts) > 2:
        print 'Combo casts!!!'
    elif len(casts) == 2:
        print 'Dual casts!!!'

    for cast in casts:
        print cast
    print

def print_casts_csv(casts):
    print 'Side,Limb,Cast Size,Spica, Long Name'
    for cast in casts:
        s = cast.side + ',' + cast.limb + ',' + cast.cast_size + ',' + str(cast.spica) + ',' + str(cast)
        print s


if __name__ == "__main__":
    if len(sys.argv) > 1:
        # Argument is the number of casts to generate
        # Don't filter out unique ones, and print result as CSV.
        num_casts = int(sys.argv[1])
        casts = generate_casts(num_casts, False)
        print_casts_csv(casts)

    else:
        # No arguments; generate "single" cast
        num = random.random()
        if num > 0.95:
            num_casts = 3
        elif num > 0.85:
            num_casts = 2
        else:
            num_casts = 1
        casts = generate_casts(num_casts, True)
        print_casts_human_readable(casts)
