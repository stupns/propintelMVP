import React from 'react';

const BuyerSideSection = () => {
  return (
    <section
      className="bg-dark text-black py-20 px-6"
      id="buyer-side"
      style={{ backgroundImage: "url('/images/blue-bc.jpg')" }}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Buyer Side</h2>
        <p className="text-lg text-blue-950 mb-10 text-center">
          How it works for property seekers
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Box 1 */}
          <div className="bg-gold-light rounded-lg p-6 shadow-none flex flex-col items-center text-center">
            <img
              src="/images/icons/intake.svg"
              alt="Intake"
              className="w-8 h-8 mb-3"
            />
            <h3 className="text-xl font-bold text-dark">Conversational Intake</h3>
            <p className="text-dark mt-2 text-base max-w-md">
              Buyer tells AI their needs (budget, location, size, lifestyle, etc.)
            </p>
          </div>

          {/* Box 2 */}
          <div className="bg-gold-light rounded-lg p-6 shadow-none flex flex-col items-center text-center">
            <img
              src="/images/icons/followup.svg"
              alt="Follow-up"
              className="w-8 h-8 mb-3"
            />
            <h3 className="text-xl font-bold text-dark">Dynamic Follow-up</h3>
            <p className="text-dark mt-2 text-base max-w-md">
              AI asks clarifying questions in real time
            </p>
          </div>

          {/* Box 3 */}
          <div className="bg-gold-light rounded-lg p-6 shadow-none flex flex-col items-center text-center">
            <img
              src="/images/icons/matching.svg"
              alt="Matching"
              className="w-8 h-8 mb-3"
            />
            <h3 className="text-xl font-bold text-dark">Smart Matching</h3>
            <p className="text-dark mt-2 text-base max-w-md">
              AI searches multiple developer databases and listings to suggest ideal units
            </p>
          </div>

          {/* Box 4 */}
          <div className="bg-gold-light rounded-lg p-6 shadow-none flex flex-col items-center text-center">
            <img
              src="/images/icons/connection.svg"
              alt="Connection"
              className="w-8 h-8 mb-3"
            />
            <h3 className="text-xl font-bold text-dark">Direct Connection</h3>
            <p className="text-dark mt-2 text-base max-w-md">
              Option to schedule viewing or initiate a conversation with an agent
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuyerSideSection;