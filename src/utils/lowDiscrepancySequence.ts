const PHI = (1 + Math.sqrt(5)) / 2;

/**
 * Additive recurrence over the golden ratio,
 * equidistributed over [0, 1) & reproducible from the offset alone,
 * so a seeded draw replays exactly.
 * Two sequences only diverge when their offsets differ,
 * which is what gives racing workers something to race over.
 */
export default (offset = 0) => {
  // from 1 rather than 0, because the fractional part of PHI * 0 is 0
  // & a leading zero makes every reservoir sample take the later candidate
  let counter = 1;
  return () => {
    const value = (PHI * counter + offset) % 1;
    ++counter;
    return value;
  };
};
