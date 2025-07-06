import React from 'react';

const ChatInput = ({
  input,
  setInput,
  isTyping,
  isLoading,
  handleSubmit,
  handleSelect,
  currentQuestion,
}) => {
  if (!currentQuestion) return null;

  const isSelect = currentQuestion.type === 'select';

  return (
    <div className="w-full mt-4">
      {isLoading && (
        <div className="text-center text-gold-muted py-4 text-lg animate-pulse">
          Finding the best matches for you...
        </div>
      )}

      {isSelect && (
        <div className="flex flex-wrap gap-2 mb-4">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(option)}
              disabled={isTyping}
              className="bg-brand-seafoam hover:bg-brand-mint text-black font-medium px-4 py-2 rounded"
            >
              {option}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isTyping}
          placeholder={currentQuestion.placeholder || 'Type your answer...'}
          className="flex-1 px-4 py-2 rounded-md
                     bg-black bg-opacity-30
                     text-white border border-gray-500
                     focus:outline-none focus:ring-2 focus:ring-brand-seafoam"
        />
        <button
          type="submit"
          disabled={isTyping}
          className="bg-brand-mint hover:bg-brand-seafoam text-black font-semibold px-4 py-2 rounded disabled:opacity-50 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatInput;