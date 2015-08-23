export default class Team {
    name: string;
    country: string;
    coefficient: number;
    pairing: Team;
    constructor(name: string, country: string, coefficient: number, pairing?: Team) {
        this.name = name;
        this.country = country;
        this.coefficient = coefficient;
        this.pairing = pairing;
    }
}