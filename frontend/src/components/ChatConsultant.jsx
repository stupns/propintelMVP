import React, {useState, useEffect} from 'react';
import SuggestedPropertiesSection from './SuggestedPropertiesSection';
import mockProperties from '../data/mockProperties.json';

const ChatConsultant = () => {
    const [messages, setMessages] = useState([
        {role: 'ai', text: 'Hi! I’m your AI Property Consultant. Let’s get started.'},
    ]);
    const [input, setInput] = useState('');
    const [step, setStep] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [displayedText, setDisplayedText] = useState('');
    const [showInput, setShowInput] = useState(true);
    const [showSuggested, setShowSuggested] = useState(false);

    const questions = [
        'What is your budget range?',
        'What city are you looking in?',
        'What type of property are you interested in?',
        'Any lifestyle preferences? (e.g., schools, commute, parks)',
        'Great! Hang tight while I match your preferences with our database... 🔍',
    ];

    useEffect(() => {
        if (
            !isTyping &&
            displayedText &&
            displayedText.trim() !== '' &&
            displayedText !== 'undefined' &&
            !messages.some((msg) => msg.text === displayedText)
        ) {
            setMessages((prev) => [...prev, {role: 'ai', text: displayedText}]);
            setDisplayedText('');
        }
    }, [displayedText, isTyping]);

    const typeWriter = (text, callback) => {
        let i = 0;
        setIsTyping(true);
        let currentText = '';
        const interval = setInterval(() => {
            currentText += text[i];
            setDisplayedText(currentText);
            i++;
            if (i >= text.length) {
                clearInterval(interval);
                setTimeout(() => {
                    callback();
                    setIsTyping(false);
                }, 400);
            }
        }, 30);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim() || isTyping) return;

        setMessages((prev) => [...prev, {role: 'user', text: input}]);
        setInput('');
        const nextStep = step + 1;

        if (step < questions.length - 2) {
            typeWriter(questions[nextStep], () => {
                setStep(nextStep);
            });
        } else if (step === questions.length - 2) {
            typeWriter(questions[nextStep], () => {
                setStep(nextStep);
                setShowInput(false);
                setIsLoading(true);
                setTimeout(() => {
                    setMessages((prev) => [...prev, {role: 'ai', text: 'Ready.'}]);
                    setIsLoading(false);
                    setTimeout(() => setShowSuggested(true), 1000);
                }, 3000);
            });
        }
    };

    return (
        <div
            className="relative min-h-screen flex items-center justify-center px-4 py-16 bg-cover bg-center font-['SF Pro Display']">
            {!showSuggested && (
                <div
                    className="relative z-10 w-full max-w-4xl p-[2px] rounded-xl animate-gradient-x bg-gradient-to-r from-brand-mint via-brand-seafoam to-brand-cloud shadow-xl">
                    <div
                        className="rounded-xl p-6 font-sans flex flex-col min-h-[500px] justify-between"
                        style={{
                            background: "linear-gradient(to bottom right, rgba(220,255,98,0.72), rgba(45,255,232,0.72), rgba(10,255,194,0.65))"
                        }}>
                        <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-hide">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`max-w-[80%] px-4 py-3 rounded-lg text-sm md:text-base whitespace-pre-wrap flex items-start gap-2 bg-brand-seafoam text-black self-start shadow-lg ${
                                        msg.role === 'ai'
                                            ? 'bg-brand-seafoam text-black self-start'
                                            : 'bg-brand-mint text-rich-black self-end ml-auto'
                                    }`}
                                >
                                    {msg.role === 'ai' && (
                                        <img
                                            src="/images/icons/cloud.svg"
                                            alt="AI Icon"
                                            className="w-[20px] h-[20px] mt-[2px] shrink-0"
                                            style={{width: '20px', height: '23px'}}
                                        />
                                    )}
                                    <span>{msg.text}</span>
                                </div>
                            ))}
                            {isTyping && (
                                <div
                                    className="max-w-[80%] px-4 py-3 rounded-lg bg-brand-seafoam text-black text-sm md:text-base animate-pulse">
                                    {displayedText}
                                    <span className="animate-blink">|</span>
                                </div>
                            )}
                        </div>

                        {showInput ? (
                            <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-4">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    disabled={isTyping}
                                    placeholder="Type your answer..."
                                    className="flex-1 px-4 py-2 rounded-md bg-black bg-opacity-30 text-white placeholder-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-seafoam"
                                />
                                <button
                                    type="submit"
                                    disabled={isTyping}
                                    className="bg-brand-mint hover:bg-brand-seafoam text-black font-semibold px-4 py-2 rounded disabled:opacity-50 transition shadow-lg"
                                >
                                    Send
                                </button>
                            </form>
                        ) : isLoading ? (
                            <div className="text-center text-brand-mint py-4 text-lg animate-pulse">
                                Finding the best matches for you...
                            </div>
                        ) : null}
                    </div>
                </div>
            )}

            {showSuggested && (
                <div
                    className="w-full max-w-6xl p-4 transition-opacity duration-700 ease-in-out opacity-0 animate-fade-in relative z-10">
                    <SuggestedPropertiesSection properties={mockProperties}/>
                </div>
            )}
        </div>
    );
};

export default ChatConsultant;