import { memoize } from 'lodash';

/**
 * The shirt colour, then the colour of the ring around it.
 * Colours stand in for the crests, which are copyrighted.
 * Several clubs share red & white,
 * so the names still do the telling apart.
 */
const colorsByClub: Readonly<Record<string, readonly [string, string]>> = {
  Arsenal: ['#ef0107', '#ffffff'],
  'Aston Villa': ['#670e36', '#95bfe5'],
  Bournemouth: ['#da291c', '#000000'],
  Brentford: ['#e30613', '#ffffff'],
  Brighton: ['#0057b8', '#ffffff'],
  Chelsea: ['#034694', '#ffffff'],
  Coventry: ['#59cbe8', '#ffffff'],
  'Crystal Palace': ['#1b458f', '#c4122e'],
  Everton: ['#003399', '#ffffff'],
  Fulham: ['#ffffff', '#000000'],
  Hull: ['#f5a12d', '#000000'],
  Ipswich: ['#0044a9', '#ffffff'],
  Leeds: ['#ffffff', '#ffcd00'],
  Liverpool: ['#c8102e', '#c8102e'],
  'Man City': ['#6cabdd', '#ffffff'],
  'Man United': ['#da291c', '#000000'],
  Newcastle: ['#241f20', '#ffffff'],
  Nottingham: ['#dd0000', '#ffffff'],
  Sunderland: ['#eb172b', '#ffffff'],
  Tottenham: ['#ffffff', '#132257'],
};

interface Team {
  name: string;
}

function getClubIconUrl(team: Team) {
  const colors = colorsByClub[team.name];
  if (!colors) {
    return undefined;
  }
  const [shirt, ring] = colors;
  // The square box matches the --flag-aspect-ratio the page sets,
  // so the icon fills the space the layout gives it.
  // The grey outline keeps white rings visible on a light background.
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 3"><circle cx="1.5" cy="1.5" r="1.45" fill="${ring}" stroke="#808080" stroke-width="0.1"/><circle cx="1.5" cy="1.5" r="0.9" fill="${shirt}"/></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export default memoize(getClubIconUrl, team => team.name);
