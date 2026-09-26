# Schedule solver scaling

How long `assignGamesToMatchdays` takes to spread a fixture list over matchdays
as the number of teams & games per team grows,
from the Champions League league phase up to a full double round robin the size of the Premier League.

## Summary

- Nothing tried at a realistic size gets stuck.
  A 20-team double round robin (380 games over 38 matchdays) solves in a median of 7.4s.
- The league phase (36 teams, 8 games each) solves in 10-83ms with the real solver.
  By solve time it sits alongside a 14-team double round robin.
- Solve time does not follow a clean formula.
  It climbs until it hits a cliff, around 44-52 teams at 8-12 games per team,
  where backtracking takes over.
- More games per team is not always harder.
  At 44 teams, 6 games per team is the hardest by far & 8 is the easiest.
- The spread between seeds is as large as the growth between sizes,
  often 10x between the median & the worst run.
- 8 games per team is the solver's easiest region,
  so the current format is comfortable.
  Growing to 44+ teams or cutting to 6 games would cause trouble long before an EPL-sized season does.

## Setup

- `src/engine/dfs/ls/generateSchedule/assignGamesToMatchdays.ts` as it stands:
  matchdays filled boundary-first, MRV over teams, most constrained opponent first,
  restarts with a doubling node budget.
- Only the home/away pattern rules are active:
  a balanced split, no more than two of the same venue in a row
  & alternation across the first two & last two matchdays.
  No same-day hosting pairs, no cold teams, no opening-match host.
- Double round robins use every ordered pair of teams.
  League-phase-style instances use a random G-regular graph
  (a circulant graph scrambled by degree-preserving edge swaps)
  oriented along an Euler circuit, so every team has G/2 home & G/2 away games.
- Games are shuffled per seed & the solver's own seed varies with it.
- Apple M2, Node 24, single thread, timed around the solver call only.

### The pattern check does not scale past 31 matchdays

`homeAwayPatterns.ts` enumerates every legal pattern as a 32-bit mask,
so it throws above 31 matchdays (an 18-team double round robin needs 34).
Raising the cap would not help, since the set explodes:

| Matchdays | Legal patterns per team |
| --------- | ----------------------- |
| 6         | 8                       |
| 8         | 18                      |
| 14        | 242                     |
| 18        | 1,460                   |
| 22        | 9,042                   |
| 26        | 56,970                  |
| 30        | 363,348                 |
| 34        | 2,338,566               |
| 38        | 15,157,874              |

For the larger runs the bitset was swapped in a scratch copy
for a check that walks the matchdays
& asks whether any legal pattern still fits the club's pinned venues.
The rules are identical (it reproduces the 363,348 count at 30 matchdays).
It is about n^2 per check rather than one word per check,
so it is slower than the bitset on short seasons & faster on long ones.
Every table below except the first uses it.

## Double round robin

Real bitset check, 3 seeds:

| Teams                            | Matchdays | Solve time |
| -------------------------------- | --------- | ---------- |
| 8                                | 14        | 3ms        |
| 10                               | 18        | 4-5ms      |
| 12                               | 22        | 13-14ms    |
| 14                               | 26        | 60-76ms    |
| 16                               | 30        | 0.5-4.8s   |
| League phase (36 teams, 8 games) | 8         | 10-83ms    |

Part of the jump at 16 teams is the bitset itself,
since every check scans 363k bits per team.

Walking check, 10 seeds:

| Teams | Games | Median | 9th of 10 | Worst | Median nodes per game |
| ----- | ----- | ------ | --------- | ----- | --------------------- |
| 10    | 90    | 39ms   | 51ms      | 162ms | 1.3                   |
| 12    | 132   | 123ms  | 219ms     | 515ms | 3.2                   |
| 14    | 182   | 303ms  | 357ms     | 413ms | 4.4                   |
| 16    | 240   | 0.65s  | 3.3s      | 5.4s  | 4.0                   |
| 18    | 306   | 2.2s   | 4.5s      | 20s   | 17                    |
| 20    | 380   | 7.4s   | 60s       | 64s   | 38                    |

The median grows by about 1.7x per extra team (40ms x 1.7^(n - 10) fits within about 50%).
A node is one call to `getCandidates`,
so a search that never backtracks visits about one node per game.
Up to 16 teams it barely backtracks, and past that backtracking drives the growth.

Odd team counts are not covered:
the solver derives the team count as `matchdaySize * 2`
& `generateValidPatterns` returns nothing for an odd number of matchdays,
so a bye each matchday would need a phantom team exempt from the pattern rules.

## T teams, G games each

Median of 7 seeds, walking check, 30s cap per run:

| Games per team \ Teams | 12   | 20    | 28    | 36    | 44                   | 52                  | 60   |
| ---------------------- | ---- | ----- | ----- | ----- | -------------------- | ------------------- | ---- |
| 6                      | 5ms  | 29ms  | 154ms | 0.4s  | 33s                  | 26s-11min (3 seeds) | -    |
| 8                      | 9ms  | 17ms  | 73ms  | 0.16s | 0.47s                | 6.1s                | >30s |
| 10                     | 12ms | 54ms  | 0.36s | 1.4s  | 2.6s                 | >30s                | >30s |
| 12                     | -    | 42ms  | 0.13s | 2.8s  | 5.4s                 | >30s                | >30s |
| 16                     | -    | 0.36s | 1.6s  | 16s   | >30s (3 of 4 capped) | -                   | -    |

The 6-game runs up to 52 teams were not capped, which is where the minutes come from.
A dash is a size that was not run.

Median nodes per game at 8 games per team:
1, 4, 26, 36, 88, 803 & 3,580 from 12 to 60 teams.
That is the cliff: a steady climb, then backtracking swamps everything.

### Best single formula

A least-squares fit of log time on T & log G over the 23 finite medians gives

```
t ≈ 7.7µs × 1.2^T × G^2.3
```

Only the per-team factor is pinned down.
The other two terms trade off against each other & are close to undetermined:

| Term           | Fitted | 95% interval |
| -------------- | ------ | ------------ |
| Per extra team | 1.2004 | 1.15-1.25    |
| Exponent on G  | 2.31   | 0.86-3.75    |
| Base           | 7.7µs  | 0.24µs-245µs |

It is typically off by a factor of about 3 & by up to 22x.
The root-mean-square error of log time over all 23 points is a factor of 2.76,
rising to 2.97 when divided by the 20 degrees of freedom left after the fit,
& the error estimate from so few points is itself good to about 16%.
Against the two real formats:

|                              | Formula | Measured median |
| ---------------------------- | ------- | --------------- |
| Champions League (T=36, G=8) | 0.67s   | 0.16s           |
| Premier League (T=20, G=38)  | 1.3s    | 7.4s            |

Good enough for an order of magnitude, not for planning.

### Why 6 games is hardest

It is not the pattern rule.
8 of the 20 balanced 6-matchday sequences are legal,
a looser share than 18 of 70 at 8 matchdays.
The likeliest explanation is that with so few matchdays
a bad early matching leaves no room to recover later, but that has not been checked.

## Counting estimates did not predict any of this

Before running the solver, the league phase was compared with round robins
by counting schedules before any constraints:
the raw search space (8^144 ≈ 2^432)
& how much of it has to be thrown away (about 2^290).
Both put the league phase between an 11-team & a 12-team double round robin.
The solver puts it alongside 14.
Counts before constraints say nothing about where a search gets stuck,
since the pattern rules are what dominate.

## Round robin scheduling notes

- The circle method & Berger tables are the same construction.
  They give one factorisation up to relabelling teams & reordering rounds,
  which real constraints (same-city clubs, holiday pairings, home/away balance) easily rule out.
- Splitting a double round robin into halves fixes who hosts each second-half fixture,
  but not the second half's venue sequence.
  Each half can be generated on its own
  as long as the second is legal & joins legally onto the end of the first.
  The Bundesliga & La Liga do this.
  The Premier League does not, most likely because it gains nothing it requires
  & costs room for the date constraints it does care about.

## Not covered

- The other schedule constraints:
  same-day hosting pairs, cold teams, the opening-match host
  & the later split of matchdays into days.
- Real draw results. The league-phase instances are random regular graphs,
  not graphs shaped by pots & country protection.
- More seeds. 7-10 per size is enough for medians, not for tails.
