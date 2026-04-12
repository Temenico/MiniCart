function FeedbackMessage({ feedback, onClose }) {
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
      <button type="button" onClick={onClose} aria-label="Cerrar mensaje">
        Cerrar ×
      </button>
    </div>
  );
}

export default FeedbackMessage;
