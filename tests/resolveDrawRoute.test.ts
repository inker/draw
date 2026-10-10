import type Availability from '#model/Availability';
import resolveDrawRoute from '#model/resolveDrawRoute';

const availability: Availability = {
  cl: {
    ls: [2025, 2024],
    gs: [2023, 2022, 2020],
    ko: [2023, 2021],
  },
  wc: {
    gs: [2026, 2022],
  },
};

describe('resolveDrawRoute', () => {
  it('keeps a draw that exists', () => {
    expect(
      resolveDrawRoute(availability, {
        tournament: 'cl',
        slot: 'main',
        season: 2022,
      }),
    ).toStrictEqual({
      tournament: 'cl',
      stage: 'gs',
      season: 2022,
    });
  });

  it('picks the newest season when none is asked for', () => {
    expect(
      resolveDrawRoute(availability, {
        tournament: 'cl',
        slot: 'main',
      }),
    ).toStrictEqual({
      tournament: 'cl',
      stage: 'ls',
      season: 2025,
    });
  });

  it('moves a missing season to the nearest one', () => {
    expect(
      resolveDrawRoute(availability, {
        tournament: 'cl',
        slot: 'main',
        season: 2019,
      }),
    ).toStrictEqual({
      tournament: 'cl',
      stage: 'gs',
      season: 2020,
    });
    expect(
      resolveDrawRoute(availability, {
        tournament: 'cl',
        slot: 'main',
        season: 2030,
      }),
    ).toStrictEqual({
      tournament: 'cl',
      stage: 'ls',
      season: 2025,
    });
  });

  it('breaks a tie between two seasons towards the newer', () => {
    expect(
      resolveDrawRoute(availability, {
        tournament: 'cl',
        slot: 'main',
        season: 2021,
      }),
    ).toStrictEqual({
      tournament: 'cl',
      stage: 'gs',
      season: 2022,
    });
    expect(
      resolveDrawRoute(availability, {
        tournament: 'cl',
        slot: 'ko',
        season: 2022,
      }),
    ).toStrictEqual({
      tournament: 'cl',
      stage: 'ko',
      season: 2023,
    });
  });

  it('files the main draw under whichever format that season used', () => {
    expect(
      resolveDrawRoute(availability, {
        tournament: 'cl',
        slot: 'main',
        season: 2023,
      }),
    ).toStrictEqual({
      tournament: 'cl',
      stage: 'gs',
      season: 2023,
    });
    expect(
      resolveDrawRoute(availability, {
        tournament: 'cl',
        slot: 'main',
        season: 2024,
      }),
    ).toStrictEqual({
      tournament: 'cl',
      stage: 'ls',
      season: 2024,
    });
  });

  it('falls back to the main draw for a tournament with no knockout draw', () => {
    expect(
      resolveDrawRoute(availability, {
        tournament: 'wc',
        slot: 'ko',
        season: 2022,
      }),
    ).toStrictEqual({
      tournament: 'wc',
      stage: 'gs',
      season: 2022,
    });
  });

  it('gives up on a tournament with no data at all', () => {
    expect(
      resolveDrawRoute(availability, {
        tournament: 'el',
        slot: 'main',
      }),
    ).toBeNull();
  });
});
