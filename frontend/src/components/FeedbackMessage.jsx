function FeedbackMessage({ feedback }) {
  if (!feedback) {
    return null;
  }

  return (
    <div
      className={`feedback-message ${feedback.type}`}
      role="status"
      aria-live="polite"
    >
      <span className="feedback-text">{feedback.text}</span>
    </div>
  );
}

export default FeedbackMessage;
