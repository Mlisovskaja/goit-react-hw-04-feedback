import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from './section.module.css';

import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Statistics from './Statistics/Statistics';

const options = ['good', 'neutral', 'bad'];

const Section = () => {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });

  const onLeaveFeedback = name => {
    setFeedback(prevState => {
      const value = prevState[name];
      return {
        ...prevState,
        [name]: value + 1,
      };
    });
  };

  const calcTotal = () => {
    const { good, neutral, bad } = feedback;
    const total = good + neutral + bad;
    return total;
  };

  const calcPercentage = propName => {
    const total = calcTotal();
    if (!total) {
      return 0;
    }
    const value = feedback[propName];
    const result = ((value / total) * 100).toFixed(2);
    return Number(result);
  };

  const total = calcTotal();
  const positivePercentage = calcPercentage('good');

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Please leave your feedback</h2>
      <FeedbackOptions options={options} onLeaveFeedback={onLeaveFeedback} />
      <Statistics
        good={feedback.good}
        neutral={feedback.neutral}
        bad={feedback.bad}
        total={total}
        positivePercentage={positivePercentage}
      />
    </div>
  );
};

export default Section;

Section.prototypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};
