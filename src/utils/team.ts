import { uniqueId } from 'lodash'

export class Team {
    id = uniqueId('team-')
    name: string
    country: string
    constructor(name: string, country: string) {
        this.name = name
        this.country = country
    }
}

export class GSTeam extends Team {
    coefficient: number
    pairing?: GSTeam
    constructor(name: string, country: string, coefficient: number, pairing?: GSTeam) {
        super(name, country)
        this.coefficient = coefficient
        this.pairing = pairing
    }
}

export class Last16Team extends Team {
    group: number
    constructor(name: string, country: string, group: number) {
        super(name, country)
        this.group = group
    }
}
