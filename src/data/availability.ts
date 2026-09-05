import type Tournament from '#model/Tournament';
import { isValidTournament } from '#model/Tournament';
import type Stage from '#model/Stage';
import { isValidStage } from '#model/Stage';
import type Availability from '#model/Availability';

// Weak mode lists the matching files without pulling any of them into the bundle,
// so this stays a directory listing & not a second copy of every pots.json
const context = import.meta.webpackContext('.', {
  recursive: true,
  regExp: /^\.\/(?:\w+\/\w+\/\d{4}\/pots\.json|wc-\d{4}\.txt)$/,
  mode: 'weak',
});

const uefaFile = /^\.\/(\w+)\/(\w+)\/(\d{4})\/pots\.json$/;
const wcFile = /^\.\/wc-(\d{4})\.txt$/;

interface DataFile {
  tournament: Tournament;
  stage: Stage;
  season: number;
}

const parseKey = (key: string): DataFile | null => {
  const wc = wcFile.exec(key);
  if (wc) {
    return {
      tournament: 'wc',
      stage: 'gs',
      season: +wc[1],
    };
  }

  const uefa = uefaFile.exec(key);
  if (!uefa) {
    return null;
  }

  const [, tournament, stage, season] = uefa;

  return isValidTournament(tournament) && isValidStage(stage)
    ? {
        tournament,
        stage,
        season: +season,
      }
    : null;
};

const build = (): Availability => {
  const files = context
    .keys()
    .map(parseKey)
    .filter(file => file !== null);

  // Sorting up front means every season list comes out newest first without a second pass
  files.sort((a, b) => b.season - a.season);

  const availability: Partial<
    Record<Tournament, Partial<Record<Stage, number[]>>>
  > = {};

  for (const { tournament, stage, season } of files) {
    const byStage = availability[tournament] ?? {};
    availability[tournament] = byStage;

    const seasons = byStage[stage] ?? [];
    byStage[stage] = seasons;

    seasons.push(season);
  }

  return availability;
};

export default build();
