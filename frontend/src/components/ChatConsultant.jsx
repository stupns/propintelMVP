import React, { useState, useEffect } from 'react';
import SuggestedPropertiesSection from './SuggestedPropertiesSection';
import mockProperties from '../data/mainProperties.json';

const ChatConsultant = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [step, setStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [showInput, setShowInput] = useState(true);
  const [showSuggested, setShowSuggested] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [lastDisplayed, setLastDisplayed] = useState('');

  const questions = [
    'Select Country:',
    'Select City: ',
    'Select Property Type:',
    'Select Amenities: ',
    'What is your budget range?',
    'Great! Hang tight while I match your preferences with our database... 🔍',
  ];

  // Options for each step (by index)
  const optionsPerStep = {
    0: ['Turkey', 'Cyprus'],
    1: ['Kyrenia (Girne)', 'Esentepe', 'Lapta'],
    2: ['Villa', 'Apartment'],
    4: ['$0–$250,000', '$250,001–$750,000', '$750,001 and above'],
  };

  // Trigger first question after intro, only once at the beginning (step === 0)
  useEffect(() => {
    if (messages.length === 0 && step === 0) {
      setMessages([{ role: 'ai', text: 'Hi! I’m your AI Property Consultant. Let’s get started.' }]);
      setTimeout(() => {
        typeWriter(questions[0], () => setStep(0));
      }, 600);
    }
  }, [messages, step, questions]);

  // Add completed typed message to chat, avoiding duplicate at end and repeated questions
  useEffect(() => {
    if (
      !isTyping &&
      displayedText &&
      displayedText.trim() !== '' &&
      displayedText !== 'undefined' &&
      displayedText !== lastDisplayed &&
      !messages.some((msg) => msg.text === displayedText)
    ) {
      setMessages((prev) => [...prev, { role: 'ai', text: displayedText }]);
      setLastDisplayed(displayedText);
      setDisplayedText('');
    }
  }, [displayedText, isTyping, lastDisplayed, messages]);

  const typeWriter = (text, callback) => {
    if (isTyping) return;
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
          callback?.();
          setIsTyping(false);
        }, 400);
      }
    }, 20);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const newAnswers = [...answers, input.trim()];
    setAnswers(newAnswers);
    setMessages((prev) => [...prev, { role: 'user', text: input }]);
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
        setTimeout(() => {
          setMessages((prev) => [...prev, { role: 'ai', text: 'Ready.' }]);
          setTimeout(() => setShowSuggested(true), 1000);
        }, 2000);
      });
    }
  };

  // Handle option button selection
  const handleOptionSelect = (selectedOption) => {
    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);
    setMessages((prev) => [...prev, { role: 'user', text: selectedOption }]);

    const nextStep = step + 1;
    if (step < questions.length - 2) {
      typeWriter(questions[nextStep], () => {
        setStep(nextStep);
      });
    } else if (step === questions.length - 2) {
      typeWriter(questions[nextStep], () => {
        setStep(nextStep);
        setShowInput(false);
        setTimeout(() => {
          setMessages((prev) => [...prev, { role: 'ai', text: 'Ready.' }]);
          setTimeout(() => setShowSuggested(true), 1000);
        }, 2000);
      });
    }
  };

  const handleAmenityToggle = (option) => {
    setSelectedAmenities((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
    );
  };
  const handleAmenitySubmit = () => {
    const newAnswers = [...answers, selectedAmenities.join(', ')];
    setAnswers(newAnswers);
    setMessages((prev) => [...prev, { role: 'user', text: selectedAmenities.join(', ') }]);
    const nextStep = step + 1;
    typeWriter(questions[nextStep], () => {
      setStep(nextStep);
      setSelectedAmenities([]);
    });
  };

  // OptionButtons component
  const OptionButtons = ({ options, onSelect }) => (
    <div className="flex flex-wrap gap-2 mt-4">
      {options.map((option, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(option)}
          className="bg-brand-mint hover:bg-brand-seafoam text-black font-medium px-4 py-2 rounded transition backdrop-blur-sm shadow border border-brand-seafoam"
        >
          {option}
        </button>
      ))}
    </div>
  );

  const CheckboxOptions = ({ options, selected, onChange, onSubmit }) => (
    <div className="mt-4">
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <label
            key={option}
            onClick={() => onChange(option)}
            className={`cursor-pointer px-4 py-2 rounded font-medium shadow transition ${
              selected.includes(option)
                ? 'bg-brand-seafoam text-black'
                : 'bg-brand-mint text-black hover:bg-brand-seafoam'
            }`}
          >
            {option}
          </label>
        ))}
      </div>
      <button
        onClick={onSubmit}
        className="mt-4 bg-brand-mint hover:bg-brand-seafoam text-black font-medium px-4 py-2 rounded shadow transition"
      >
        Submit
      </button>
    </div>
  );

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-16 bg-cover bg-center font-['SF Pro Display']">
      {!showSuggested && (
        <div className="relative z-10 w-full max-w-4xl p-[2px] rounded-xl animate-gradient-x bg-gradient-to-r from-brand-mint via-brand-seafoam to-brand-cloud shadow-xl">
          <div
            className="rounded-xl p-6 font-sans flex flex-col min-h-[500px] justify-between"
            style={{
              background: 'linear-gradient(to bottom right, rgba(220,255,98,0.72), rgba(45,255,232,0.72), rgba(10,255,194,0.65))',
            }}
          >
            <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-hide">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`max-w-[80%] px-4 py-3 rounded-lg text-sm md:text-base whitespace-pre-wrap flex items-start gap-2 shadow-lg ${
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
                    />
                  )}
                  <span>{msg.text}</span>
                </div>
              ))}
              {isTyping && (
                <div className="max-w-[80%] px-4 py-3 rounded-lg bg-brand-seafoam text-black text-sm md:text-base animate-pulse">
                  {displayedText}
                  <span className="animate-blink">...</span>
                </div>
              )}
            </div>

            {showInput && (
              step === 3 ? (
                <CheckboxOptions
                  options={[
                    'Nearby Shop',
                    'Fitness Studio',
                    'eFoil Activity Center',
                    'Beach',
                    'Swimming Pool',
                    'Parking',
                    '24/7 Security',
                  ]}
                  selected={selectedAmenities}
                  onChange={handleAmenityToggle}
                  onSubmit={handleAmenitySubmit}
                />
              ) : optionsPerStep[step] ? (
                <OptionButtons options={optionsPerStep[step]} onSelect={handleOptionSelect} />
              ) : (
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
              )
            )}
          </div>
        </div>
      )}

      {showSuggested && (
        <div className="w-full max-w-6xl p-4 transition-opacity duration-700 ease-in-out opacity-0 animate-fade-in relative z-10">
          <SuggestedPropertiesSection
            properties={mockProperties.filter((property) => {
              const [country, city, type, amenitiesInput, priceRange] = answers;
              const selectedAmenities = amenitiesInput?.split(',').map((a) => a.trim().toLowerCase()) || [];

              const strEq = (a, b) =>
                (a || '').toLowerCase().trim() === (b || '').toLowerCase().trim();

              let price = 0;
              if (typeof property.price === 'string' && property.price.includes('-')) {
                const [minStr, maxStr] = property.price.split('-').map((v) => v.replace(/[$,]/g, '').trim());
                price = (parseInt(minStr, 10) + parseInt(maxStr, 10)) / 2; // average of the range
              } else {
                price = parseInt((property.price || '').toString().replace(/[$,]/g, ''), 10) || 0;
              }

              const matchesCountry = !country || strEq(property.country, country);
              const matchesCity = !city || strEq(property.city, city);
              const matchesType = !type || strEq(property.property_type, type);

              let matchesAmenities = true;
              if (selectedAmenities.length > 0) {
                const lowerAmenities = (property.amenities || []).map((a) => a.toLowerCase());
                matchesAmenities = selectedAmenities.some((amenity) =>
                  lowerAmenities.includes(amenity)
                );
              }

              let matchesPrice = true;
              if (priceRange === '$0–$250,000') {
                matchesPrice = price <= 250000;
              } else if (priceRange === '$250,001–$750,000') {
                matchesPrice = price >= 250001 && price <= 750000;
              } else if (priceRange === '$750,001 and above') {
                matchesPrice = price >= 750001;
              }

              return matchesCountry && matchesCity && matchesType && matchesAmenities && matchesPrice;
            })}
          />
        </div>
      )}
    </div>
  );
};

export default ChatConsultant;