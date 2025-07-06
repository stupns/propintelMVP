import React from 'react';
import {
  HomeIcon,
  MessageSquareQuestionIcon,
  HeartIcon,
  ContactIcon,
} from 'lucide-react'; // або заміни на свої SVG

const features = [
  {
    icon: <HomeIcon className="w-8 h-8 text-black" />,
    title: 'Conversational Intake',
    description: 'Buyer tells AI their needs (budget, location, size, lifestyle, etc.)',
  },
  {
    icon: <MessageSquareQuestionIcon className="w-8 h-8 text-black" />,
    title: 'Dynamic Follow-up',
    description: 'AI asks clarifying questions in real time',
  },
  {
    icon: <HeartIcon className="w-8 h-8 text-black" />,
    title: 'Smart Matching',
    description: 'AI searches developer listings to suggest ideal units',
  },
  {
    icon: <ContactIcon className="w-8 h-8 text-black" />,
    title: 'Direct Connection',
    description: 'Schedule viewing or chat with an agent',
  },
];

const HowItWorksSection = () => {
  return (
    <section className="relative bg-rich-black py-24 px-6 text-white">
      {/* Overlay for consistency */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-0" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white uppercase">How It Works</h2>
        <h3 className="text-2xl md:text-3xl font-bold mb-10 bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-white to-emerald-400">
          Buyer Side
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((item, index) => (
            <div key={index} className="flex items-start gap-4 bg-amber-200/90 text-black p-6 rounded-lg shadow">
              <div className="flex-shrink-0">{item.icon}</div>
              <div>
                <h4 className="text-lg font-semibold mb-1">{item.title}</h4>
                <p className="text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;