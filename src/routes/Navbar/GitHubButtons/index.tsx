import { memo } from 'react';
import GitHubButton from 'react-github-btn';

import useIsDarkMode from '#utils/hooks/useIsDarkMode';

import * as styles from './styles.module.scss';

function GitHubButtons() {
  const isDarkMode = useIsDarkMode();

  return (
    <div className={styles.root}>
      <GitHubButton
        href="https://github.com/inker/draw/issues"
        data-icon="octicon-issue-opened"
        data-show-count
        aria-label="Issues on GitHub"
        data-color-scheme={isDarkMode ? 'dark' : 'light'}
      >
        Issues
      </GitHubButton>
      <GitHubButton
        href="https://github.com/inker/draw"
        data-icon="octicon-star"
        data-show-count
        aria-label="Star on GitHub"
        data-color-scheme={isDarkMode ? 'dark' : 'light'}
      >
        Star
      </GitHubButton>
    </div>
  );
}

export default memo(GitHubButtons);
