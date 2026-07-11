import { type UefaCountry } from '#model/types';

// Commercial-popularity order of clubs within a country, most popular first.
// Used to form TV pairings:
// the two most-followed clubs from a country are grouped together,
// then the next two & so on.
//
// Only countries that can field three or more teams in a single competition
// need listing.
// Two-team countries always pair their two clubs regardless of order &
// clubs missing from a list fall back to their seeding position in the pots
// (earlier in the pots = more popular).
//
// Ordering reflects global fanbase & social-media following rather than
// sporting strength, since that is what UEFA's TV pairings track.
const popularity: Partial<Record<UefaCountry, readonly string[]>> = {
  England: [
    'Man United',
    'Liverpool',
    'Arsenal',
    'Man City',
    'Chelsea',
    'Tottenham',
    'Newcastle',
    'Aston Villa',
    'Nottingham',
    'Crystal Palace',
    'Bournemouth',
  ],
  Spain: [
    'Real Madrid',
    'Barcelona',
    'Atlético',
    'Sevilla',
    'Valencia',
    'Villarreal',
    'Betis',
    'Real Sociedad',
    'Athletic',
    'Celta',
    'Espanyol',
    'Girona',
  ],
  Italy: [
    'Juventus',
    'Internazionale',
    'Milan',
    'Roma',
    'Napoli',
    'Lazio',
    'Atalanta',
    'Bologna',
    'Como',
  ],
  Germany: [
    'Bayern',
    'Dortmund',
    'Leipzig',
    'Leverkusen',
    'Frankfurt',
    'Schalke',
    'Stuttgart',
    'Mönchengladbach',
    'Wolfsburg',
    'Hoffenheim',
    'Union Berlin',
    'Freiburg',
  ],
  France: [
    'Paris SG',
    'Marseille',
    'Lyon',
    'Lille',
    'Monaco',
    'Lens',
    'Nice',
    'Rennes',
    'Brest',
    'Bordeaux',
    'St-Étienne',
  ],
  Portugal: [
    'Benfica',
    'Porto',
    'Sporting CP',
    'Braga',
    'Guimarães',
    'Torreense',
  ],
  Greece: ['Olympiacos', 'Panathinaikos', 'AEK', 'PAOK', 'OFI'],
  Türkiye: [
    'Galatasaray',
    'Fenerbahçe',
    'Beşiktaş',
    'Trabzonspor',
    'Başakşehir',
  ],
  Poland: ['Legia', 'Lech', 'Jagiellonia', 'Raków'],
};

export default popularity;
