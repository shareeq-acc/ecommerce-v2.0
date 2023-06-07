type ProgressBarProps = {
  total: number;
  current: number;
};

const ProgressBar = ({ total, current }: ProgressBarProps) => {
  const percentage = (current / total) * 100;
  const styles = {
    width: `${percentage}%`,
  };
  return (
    <div className="progress-bar--wrap">
      <div className="progress-bar" style={styles}></div>
    </div>
  );
};

export default ProgressBar;
