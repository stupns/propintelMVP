import { useEffect, useRef, useState } from 'react';
import questionSteps from './questionSteps';
import typeWriter from './typeWriter';

const useChatState = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [showSuggested, setShowSuggested] = useState(false);
  const [step, setStep] = useState(0);
  const scrollRef = useRef(null);

  const currentQuestion = questionSteps[step];

  // START — greeting + first question with animation
  useEffect(() => {
    const greeting = '👋 Hi! I’m your AI Property Consultant. Let’s get started.';
    const firstQuestion = questionSteps[0];

    typeWriter({
      text: greeting,
      setDisplayedText,
      setIsTyping,
      callback: () => {
        setMessages([{ role: 'ai', text: greeting }]);

        typeWriter({
          text: firstQuestion,
          setDisplayedText,
          setIsTyping,
          callback: () => {
            setMessages((prev) => [...prev, { role: 'ai', text: firstQuestion }]);
            setStep(1);
            setShowInput(true);
          },
        });
      },
    });
  }, []);

  const handleSubmit = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: 'user', text: input }]);
    setInput('');
    setShowInput(false);
    setDisplayedText('');
    setIsTyping(true);

    if (step >= questionSteps.length) {
      const finalMsg = '🔎 Finding the best matches for you...';

      typeWriter({
        text: finalMsg,
        setDisplayedText,
        setIsTyping,
        callback: () => {
          setMessages((prev) => [...prev, { role: 'ai', text: finalMsg }]);
          setShowSuggested(true);
        },
      });
      return;
    }

    const next = questionSteps[step];

    typeWriter({
      text: next,
      setDisplayedText,
      setIsTyping,
      callback: () => {
        setMessages((prev) => [...prev, { role: 'ai', text: next }]);
        setStep((prev) => prev + 1);
        setShowInput(true);
      },
    });
  };

  return {
    messages,
    input,
    isTyping,
    displayedText,
    showInput,
    showSuggested,
    scrollRef,
    setInput,
    handleSubmit,
    currentQuestion,
  };
};

export default useChatState;