import { memo, useLayoutEffect } from 'react';
import styled from 'styled-components';

import ContentWithFlag from '#ui/table/ContentWithFlag';
import { type Country } from '#model/types';
import type Tournament from '#model/Tournament';

const Root = styled.div`
  width: 100%;
  container-type: inline-size;
`;

const CalendarContainer = styled.div`
  display: grid;
  gap: 16px;
  align-items: self-start;
  grid-template-columns: repeat(4, 1fr);
  width: fit-content;

  @container (max-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @container (max-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const MatchdayRoot = styled.div`
  border: 1px solid rgb(192 192 192);
  font-size: 12px;
`;

const MatchdayHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const DayHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  border-top: 1px solid rgb(192 192 192);
  background-color: rgb(240 240 240);
`;

const MatchPair = styled.div`
  display: flex;
  align-items: center;
  height: 20px;
  border-top: 1px solid rgb(192 192 192);

  > :first-child {
    align-items: end;
  }
`;

const MatchPairCenter = styled.span`
  display: flex;
  justify-content: center;
  width: 20px;
`;

const ScheduleTeamWrapper = styled.span`
  /* width: 300px; */
  /* padding: 1px 3px; */
`;

interface Team {
  name: string;
  country: Country;
}

interface Props {
  tournament: Tournament;
  schedule: readonly (readonly (readonly (readonly [Team, Team])[])[])[];
}

function Schedule({ tournament, schedule }: Props) {
  useLayoutEffect(() => {
    if (schedule.some(md => md.length > 0)) {
      const elements = document.getElementsByClassName(
        ScheduleTeamWrapper.styledComponentId,
      );
      const offsetWidths = [...elements].map(
        el => (el as HTMLElement).offsetWidth ?? 0,
      );
      const maxOffsetWidth = Math.max(...offsetWidths);
      for (const element of elements) {
        (element as HTMLElement).style.minWidth = `${maxOffsetWidth}px`;
      }
    }
  }, [schedule]);

  return (
    <Root>
      <CalendarContainer>
        {schedule.map((md, i) => (
          <MatchdayRoot className="matchday">
            <MatchdayHeader>MATCHDAY {i + 1}</MatchdayHeader>
            {md.map((day, dayIndex) => (
              <>
                <DayHeader>
                  {tournament === 'cl'
                    ? dayIndex === 2
                      ? 'Thursday'
                      : dayIndex === 1 || md.length === 1
                        ? 'Wednesday'
                        : 'Tuesday'
                    : dayIndex === 1 || md.length === 1
                      ? 'Night'
                      : 'Evening'}
                </DayHeader>
                {day.map(m => (
                  <MatchPair>
                    <ScheduleTeamWrapper>
                      <ContentWithFlag $country={m[0].country}>
                        {m[0].name}
                      </ContentWithFlag>
                    </ScheduleTeamWrapper>
                    <MatchPairCenter>-</MatchPairCenter>
                    <ScheduleTeamWrapper>
                      <ContentWithFlag $country={m[1].country}>
                        {m[1].name}
                      </ContentWithFlag>
                    </ScheduleTeamWrapper>
                  </MatchPair>
                ))}
              </>
            ))}
          </MatchdayRoot>
        ))}
      </CalendarContainer>
    </Root>
  );
}

export default memo(Schedule);
