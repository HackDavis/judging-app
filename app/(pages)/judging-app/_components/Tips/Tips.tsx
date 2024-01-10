'use client';

import { useState } from 'react';
import styles from './Tips.module.scss';

export default function Tips() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const progressBarValues = [
    'M3 2.99998H48',
    'M46 2.99998H91',
    'M91 3H136',
    'M136 3H181',
    'M183 3H228',
  ];

  return (
    <div id={styles.tipSection}>
      <div id={styles.tipsExplained}>
        <p id={styles.tipsHeader}>Some tips!</p>
        <p id={styles.tipsSubHeader}>
          Whether you're a first time hacker or a hacking veteran, here are some
          useful tips for everyone!
        </p>
      </div>

      <div id={styles.tips}>
        <p className={styles.tipText}>Tip #1:</p>
        <p className={styles.tipText}>
          Take a deep breath. It'll help you both organize your thoughts and
          your presentation better!
        </p>
      </div>

      <div id={styles.scrollBar}>
        <LeftArrow />
        <Bar scrollPosition={progressBarValues[scrollPosition]} />
        <RightArrow />
      </div>
    </div>
  );
}

const Bar = (props: { scrollPosition: string }) => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="230"
        height="6"
        viewBox="0 0 230 6"
        fill="none"
      >
        <path
          d="M2.5 3.32587L227.5 3.32589"
          stroke="#E0DFD8"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d={props.scrollPosition}
          stroke="#1FBBC0"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

const LeftArrow = () => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="35"
        height="35"
        viewBox="0 0 35 35"
        fill="none"
      >
        <circle cx="17.5" cy="17.3259" r="17" fill="#005271" />
        <circle cx="17.5" cy="17.3259" r="17" fill="#005271" />
        <path
          d="M19.5 12.3259L14.5 16.6116L19.5 21.3259"
          stroke="#9EE7E5"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
const RightArrow = () => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="35"
        height="35"
        viewBox="0 0 35 35"
        fill="none"
      >
        <circle
          cx="17"
          cy="17"
          r="17"
          transform="matrix(-1 0 0 1 34.5 0.325867)"
          fill="#005271"
        />
        <path
          d="M15.5 12.3259L20.5 16.6116L15.5 21.3259"
          stroke="#9EE7E5"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
