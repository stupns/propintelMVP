import React, { useState } from 'react';
import mockProperties from '../data/mockProperties.json';
import SuggestedPropertiesSection from './SuggestedPropertiesSection';
import ChatConsultant from './ChatConsultant';

const DemoPage = () => {
  const [chatFinished, setChatFinished] = useState(false);

  return (
    <div className="min-h-screen bg-rich-black text-white">
      {!chatFinished ? (
        <ChatConsultant onFinish={() => setChatFinished(true)} />
      ) : (
        <SuggestedPropertiesSection properties={mockProperties} />
      )}
    </div>
  );
};

export default DemoPage;