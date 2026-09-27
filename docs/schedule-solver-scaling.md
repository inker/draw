# Schedule solver scaling

How long `assignGamesToMatchdays` takes to spread a fixture list over matchdays
as the number of teams & games per team grows,
from the Champions League league phase up to a full double round robin the size of the Premier League.

## Summary

- Nothing tried at a realistic size gets stuck.
  A 20-team double round robin (380 games over 38 matchdays) solves in a median of 7.4s,
  or 148ms with the home counts in the walking check packed into bits.
- The league phase (36 teams, 8 games each) solves in 10-83ms with the real solver.
  By solve time it sits alongside a 14-team double round robin.
- Solve time does not follow a clean formula.
  It climbs until it hits a cliff, around 44-52 teams at 8-12 games per team,
  where backtracking takes over.
- More games per team is not always harder.
  At 44 teams, 6 games per team is the hardest by far & 8 is the easiest,
  because at 6 the rules pin every club's whole season into home-away pairs.
- The spread between seeds is as large as the growth between sizes,
  often 10x between the median & the worst run.
- 8 games per team is the solver's easiest region,
  so the current format is comfortable.
  Growing to 44+ teams or cutting to 6 games would cause trouble long before an EPL-sized season does.

## Setup

- `src/engine/dfs/ls/generateSchedule/assignGamesToMatchdays.ts` as it stands:
  matchdays filled in the fixed order used then (the last two, then from the start),
  MRV over teams, most constrained opponent first,
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

The count for M matchdays is [OEIS A078678](https://oeis.org/A078678) at M/2,
the number of binary strings with n ones & n zeros avoiding 101 & 010.
It matches at every even length from 4 to 60.
Part of the link is plain:
flipping the venue on every other matchday turns three in a row into a zigzag.
That flip does not preserve balance though,
& without the boundary alternation the counts are a different sequence
(6, 14, 34, 84, 208 & so on from 4 matchdays),
so the exact bijection is less direct & has not been worked out.

The entry gives a closed form & the asymptotic growth:

- the count for M matchdays is the coefficient of `x^(M/2)`
  in `sqrt((1 + x + x^2) / (1 - 3x + x^2))`
- `a(n) ~ 2 × φ^(2n) / (5^(1/4) × sqrt(πn))`,
  so the count grows by φ ≈ 1.618 per extra matchday

The bitset holds one bit per legal pattern,
so its cost per check grows by that same φ per matchday.

For the larger runs the bitset was swapped in a scratch copy
for a check that walks the matchdays
& asks whether any legal pattern still fits the club's pinned venues.
The rules are identical (it reproduces the 363,348 count at 30 matchdays).
It costs about M^2 per check for M matchdays,
against the bitset's one bit per legal pattern (a single word at 8 matchdays),
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

It is not how many patterns are legal.
8 of the 20 balanced 6-matchday sequences are legal,
a looser share than 18 of 70 at 8 matchdays.
It is how much of the season the rules pin down.

Alternation across the first two & last two matchdays fixes two matchdays at each end,
whatever the length of the season.
Every legal pattern flips venue after these matchdays:

| Matchdays | Legal patterns | Always flips after matchday |
| --------- | -------------- | --------------------------- |
| 6         | 8              | 0, 2, 4                     |
| 8         | 18             | 0, 6                        |
| 10        | 42             | 0, 8                        |

At 6 matchdays the balance rule (3 home games) forces the middle two to flip as well,
so every club's season is three pairs of matchdays with one home & one away game in each.

That makes it a different problem.
Take matchdays 0 & 1:
the clubs at home on matchday 0 are exactly the clubs away on matchday 1,
so every game in the pair is between those two groups.
Each club has one home & one away game in the pair,
so the pair's games form directed cycles,
& since every cycle keeps crossing between the two groups, each has even length.
Conversely, any such set of cycles splits into two matchdays by taking alternate games.

So a 6-game season is schedulable exactly when the fixture graph
splits into three sets of directed cycles that cover every club, all of even length.
Balance, no three in a row & the boundary rules then hold automatically.

No odd cycles is a global parity condition.
The solver fills one matchday at a time
& only finds out that a cycle is odd when it closes, often several matchdays later,
which fits the time climbing so fast as the graph grows.
From 8 matchdays the middle of the season is free & the condition never arises.

The share of the season the boundary rules fix is 4/G:
all of it at 6, half at 8 & 40% at 10.
That is still a function of G but not a smooth one,
which is why no single power of G fits the grid.
A 4-game season would be fully paired too.

## Alternatives to the bitset

Three other checks were put behind the same `isViable`/`assign`/`unassign` interface
& run inside the real solver:

- walking check: walks the matchdays on every check,
  asking whether any legal pattern still fits the club's pinned venues & bans
- reachability: keeps each club's forward & backward reachable states
  (home games so far, last venue, run length),
  recomputed on every assign & unassign,
  so a check is one pass over the states at that matchday
- gap table: relies on the fill order,
  so a club's pinned matchdays are always a prefix plus the final two.
  The prefix is a single state & the rest is a backward table shared by every club,
  so a check is one lookup.
  Bans are only checked on their own matchday

All four produced identical schedules on every run.
The walking check & reachability are exact, like the bitset.
The gap table only matches because ignoring the holders' ban
while the final two matchdays are filled happens to cost nothing at these sizes.

36 teams, random fixture graphs, up to 7 cold teams, a holder & a same-day hosting pair,
best of 3 runs:

| Check         | 8 matchdays, median | 8 matchdays, worst | 6 matchdays, median | 6 matchdays, worst |
| ------------- | ------------------- | ------------------ | ------------------- | ------------------ |
| Bitset        | 15.7ms              | 136ms              | 238ms               | 1.8s               |
| Gap table     | 21.0ms              | 176ms              | 291ms               | 2.2s               |
| Reachability  | 68.9ms              | 574ms              | 738ms               | 5.4s               |
| Walking check | 305ms               | 2.5s               | 2.7s                | 19s                |

40 cases at 8 matchdays,
& 34 of 40 at 6 (the 6 the bitset took over 2s on were left out).

24 teams, circulant fixture graphs scrambled by swaps that keep each team's home & away counts,
up to 4 cold teams, a holder & a same-day hosting pair,
20 cases each, median / worst of the best of 2 runs:

| Check         | 8 matchdays  | 12 matchdays  | 16 matchdays  | 20 matchdays |
| ------------- | ------------ | ------------- | ------------- | ------------ |
| Bitset        | 1.0 / 14.5ms | 10.6 / 37.5ms | 19.1 / 109ms  | 141 / 972ms  |
| Gap table     | 1.9 / 22.0ms | 11.1 / 40.9ms | 15.6 / 85.4ms | 36.8 / 319ms |
| Reachability  | 6.1 / 106ms  | 52.8 / 215ms  | 105 / 563ms   | 318ms / 3.1s |
| Walking check | 24.6 / 277ms | 281ms / 1.0s  | 618ms / 3.6s  | 2.6s / 19s   |

- The bitset is fastest up to 12 matchdays.
  The gap table overtakes it between 12 & 16 & is about 4x faster by 20.
- Reachability stays 2-6x behind the bitset up to 20 matchdays.
- The walking check is the slowest everywhere measured, 11-32x behind the bitset by median.
  The 16-team double round robin above (30 matchdays)
  is the only place it has been seen to beat the bitset,
  so the crossover is somewhere between 20 & 30 matchdays.

### Packed walking check

The walking check above tracks every (home count, last venue, run length) state on its own.
Packing the home counts into the bits of one integer per (last venue, run length)
leaves four words to carry from matchday to matchday,
so a check is about 15 integer operations per matchday.
It is as exact as the walking check & stores only each club's allowed venues,
with no pattern list, no undo copies & no 31-matchday cap.
Up to 60 matchdays fit in the 32-bit words.

Every solve ran in a fresh worker thread with a timeout,
with the fixed fill order the gap table needs.
Best of 3 runs for 36 teams at 8 matchdays, best of 2 for 24 teams & a single run otherwise.
The 24-team fixtures come from a re-created generator,
so they are not the same cases as the table above.
All checks produced identical schedules on every case.

36 teams, 40 cases, median / worst:

| Check         | 8 matchdays  | 6 matchdays  |
| ------------- | ------------ | ------------ |
| Bitset        | 21.5 / 113ms | 197ms / 4.3s |
| Gap table     | 25.1 / 144ms | 249ms / 5.0s |
| Packed        | 36.3 / 262ms | 395ms / 7.9s |
| Walking check | 249ms / 2.1s | not run      |

24 teams, 20 cases, median / worst:

| Check     | 8 matchdays  | 12 matchdays  | 16 matchdays  | 20 matchdays |
| --------- | ------------ | ------------- | ------------- | ------------ |
| Bitset    | 4.4 / 22.2ms | 17.8 / 40.9ms | 29.0 / 93.8ms | 100 / 734ms  |
| Gap table | 5.4 / 23.9ms | 17.9 / 42.9ms | 27.1 / 74.6ms | 40.2 / 219ms |
| Packed    | 5.6 / 34.7ms | 26.6 / 80.3ms | 44.0 / 189ms  | 82.1 / 607ms |

Double round robin, no bans, 10 cases, median / worst:

| Teams | Matchdays | Bitset       | Packed       | Walking check |
| ----- | --------- | ------------ | ------------ | ------------- |
| 16    | 30        | 894ms / 6.5s | 19.6 / 102ms | 417ms / 2.5s  |
| 18    | 34        | over the cap | 105 / 393ms  | 3.1s / 12.4s  |
| 20    | 38        | over the cap | 148 / 581ms  | 5.4s / 20.9s  |

- At the league phase's 8 matchdays the packed check is about 1.7x behind the bitset by median.
- It catches up by 20 matchdays at 24 teams.
- On double round robins it is 20-45x faster than anything else measured,
  & it solves a Premier League-sized season in a median of 148ms.

## Fill order

The solver fills one matchday at a time.
The order used to be fixed (the last two, then from the start),
which only suited a calendar whose tightest matchdays are the last two.
It is now worked out from the patterns & bans in `getFillOrder.ts`:

- pairs that every legal pattern alternates go first, back to back,
  found by checking the pattern bitsets rather than listing the rules again
- among those, the pair with more clubs forced by bans goes first
- within a pair, the matchday with more bans goes first
- the free matchdays follow, those with forced clubs first,
  then outward from the last pair filled

For CL/EL/ECL this is the old order exactly whenever the cold teams outnumber the holders.
A season whose cold matchdays came first would move the opening pair to the front,
& a Boxing Day rule added to the patterns would be picked up without a second list.

36 teams at 8 matchdays, 300 cases per row, one run each, geometric mean of new / old time per case:

| Bans                    | Ratio | 95% interval |
| ----------------------- | ----- | ------------ |
| None                    | 0.98  | 0.89-1.08    |
| Holder only             | 1.09  | 0.97-1.22    |
| Up to 7 cold & a holder | 1.05  | 0.99-1.12    |

- Putting the pair without cold teams first when there are several
  timed out (over 3s) on 2 of 150 cases, against none for the old order.
  Filling the most forced pair first is what keeps that from happening.
- A first version filled the free matchdays from the start whatever pair came last,
  & was about 10% slower where that differed from the old order.
- At 6 matchdays every matchday is in a pair,
  & the new order was neutral over 60 cases.

## Counting estimates did not predict any of this

Before running the solver, the league phase was compared with round robins
by counting schedules before any constraints:
the raw search space (8^144 ≈ 2^432)
& how much of it has to be thrown away (about 2^290).
Both put the league phase between an 11-team & a 12-team double round robin.
The solver puts it alongside 14.
Counts before constraints say nothing about where a search gets stuck,
since the pattern rules are what dominate.

## Why not Berger tables?

[Berger tables](https://en.wikipedia.org/wiki/Round-robin_tournament#Berger_tables)
(the circle method written out round by round)
schedule a round robin in closed form, with no search at all.
They do not help here, for two reasons.

They schedule a complete graph.
Berger answers "everyone plays everyone",
while the league phase plays 8 of 35 possible opponents, chosen by the draw.
A table built for the complete graph cannot take a given set of fixtures & fit it into matchdays.
The complete graph is the special case with a closed-form answer.
For an arbitrary regular graph, even deciding whether its games fit into
as many matchdays as each team has games (with no home/away rules at all) is NP-complete:
Holyer (1981) proved it for 3-regular graphs
and Leven & Galil (1983) for every degree from 3 up.
So the league phase has to be searched, whatever the constraints.

Even for a round robin, they are one schedule.
Up to relabelling teams & reordering rounds, Berger gives a single factorisation,
with a fixed home/away pattern per slot & a mirrored second half in the double version.
The patterns come in complementary pairs,
so clubs sharing a city can be given opposite ones & never host on the same day.
Date-specific constraints are what break it:
a Boxing Day & New Year pairing, police restrictions on a derby date,
a stadium unavailable for a weekend.
Once enough of those pile up, no relabelling satisfies them all
& the schedule has to be searched for, as the Premier League's is.

## Splitting a double round robin into halves

Fixing the first half fixes who hosts each second-half fixture,
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
- Graph versus search luck.
  Each seed in the T x G grid changes both the fixture graph & the solver's seed,
  so the spread there cannot be split between hard graphs & unlucky searches.
  The double round robin runs do not have this problem, since the graph is always complete.
- Team counts that are not a multiple of 4.
  Every T tried had an even number of home teams per matchday.
