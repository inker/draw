import React, { PureComponent } from 'react'

import countryNames from '../../json/country-names'
import { GSTeam as Team } from '../team'

type TeamObj = {
    team: Team,
    picked: boolean,
    selected: boolean,
}

type Props = {
    potNum: number,
    teams: TeamObj[],
}

export default (props: Props) => (
    <table>
        <thead>
            <tr>
                <th>Pot {props.potNum + 1}</th>
            </tr>
        </thead>
        <tbody>{
            props.teams.map(teamObj => {
                const { team, picked, selected } = teamObj
                const { name, country, pairing } = team
                const countryCode = countryNames[country.toLowerCase()].replace(' ', '-');
                const img = `<http></http>://icons.iconarchive.com/icons/gosquared/flag/16/${countryCode}-flat-icon.png`
                const classes = classNames({
                    'team-selected': selected,
                }, {
                    greyed: picked,
                })
                return (
                    <tr>
                        <td
                            className={classes}
                            title={pairing && `paired with ${pairing.name}`}
                            style={{
                                backgroundImage: img,
                            }}
                        >
                            {name}
                        </td>
                    </tr>
            )})
        }</tbody>
    </table>
)
