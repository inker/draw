export default {
  bertHost: 'https://kassiesa.net/uefa',
  defaultTournament: 'cl',
  defaultStage: 'gs',
  currentSeason: {
    wc: 2022,
    uefa: {
      cl: {
        ls: 2024,
        ko: 2023,
      },
      el: {
        ls: 2024,
        ko: 2022,
      },
      ecl: {
        gs: 2023,
        ko: 2020,
      },
    },
  },
} as const;
