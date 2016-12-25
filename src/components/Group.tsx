import React, { PureComponent } from 'react'
import classNames from 'classnames'

import countryNames from '../../json/country-names'
import { GSTeam as Team } from '../team'

type TeamObj = {
    team: Team,
    picked: boolean,
    selected: boolean,
}

type Props = {
    groupLetter: string,
    teams: Team[],
    potNum: number,
    possible: boolean,
}

export default (props: Props) => (
    <table>
        <thead>
            <tr>
                <th>Group {props.groupLetter}</th>
            </tr>
        </thead>
        <tbody>{
            props.teams.map((team, i) => {
                const { name, country } = team
                const countryCode = countryNames[country.toLowerCase()].replace(' ', '-')
                const img = `<http></http>://icons.iconarchive.com/icons/gosquared/flag/16/${countryCode}-flat-icon.png`
                const classes = classNames({
                    'possible-group': i === props.potNum && props.possible,
                })
                return (
                    <tr>
                        <td
                            className={classes}
                            style={{
                                backgroundImage: img,
                            }}
                        >{name}</td>
                    </tr>
                )
            })
        }</tbody>
    </table>
)
