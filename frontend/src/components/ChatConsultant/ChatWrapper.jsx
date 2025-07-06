import React from 'react';
import useChatState from './useChatState';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import SuggestedPropertiesSection from '../SuggestedPropertiesSection';
import mockProperties from '../../data/mockProperties.json';

const ChatWrapper = () => {
  const {
    messages,
    input,
    step,
    isTyping,
    isLoading,
    displayedText,
    showInput,
    showSuggested,
    scrollRef,
    setInput,
    handleSubmit,
  } = useChatState();

  return (
    <>
      {!showSuggested && (
        <div
          className="relative z-10 w-full max-w-4xl p-[2px] rounded-xl 
                     animate-gradient-x 
                     bg-gradient-to-r from-brand-mint via-brand-seafoam to-brand-cloud 
                     shadow-xl"
        >
          <div
            className="rounded-xl p-6 bg-brand-cloud font-sans 
                       flex flex-col min-h-[500px] justify-between"
          >
            <MessageList
              messages={messages}
              isTyping={isTyping}
              displayedText={displayedText}
              scrollRef={null}
            />
            <ChatInput
              input={input}
              setInput={setInput}
              isTyping={isTyping}
              isLoading={isLoading}
              showInput={showInput}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      )}

      {showSuggested && (
        <div className="w-full max-w-6xl p-4 transition-opacity duration-700 ease-in-out opacity-0 animate-fade-in relative z-10">
          <SuggestedPropertiesSection properties={mockProperties} />
        </div>
      )}
    </>
  );
};

export default ChatWrapper;