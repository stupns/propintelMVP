import React from 'react';

const MessageList = ({ messages, isTyping, displayedText, scrollRef }) => (
  <div className="overflow-y-auto max-h-[400px] space-y-4 pr-1 scrollbar-hide">
    {messages.map((msg, index) => (
      <div
        key={index}
        className={`max-w-[80%] px-4 py-3 rounded-lg text-sm md:text-base whitespace-pre-wrap ${
          msg.role === 'ai'
            ? 'bg-brand-seafoam text-black self-start'      
            : 'bg-brand-mint text-rich-black self-end ml-auto'    
        }`}
      >
        {msg.text}
      </div>
    ))}
    {isTyping && (
      <div className="max-w-[80%] px-4 py-3 rounded-lg bg-brand-seafoam text-black text-sm md:text-base animate-pulse">
        {displayedText}
        <span className="animate-blink">|</span>
      </div>
    )}
    <div ref={scrollRef} />
  </div>
);

export default MessageList;