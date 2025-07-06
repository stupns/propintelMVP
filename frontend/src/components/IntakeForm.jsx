import React, { useState } from 'react';

const IntakeForm = () => {
  const [budget, setBudget] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Budget submitted:', budget);
  };

  return (
    <section className="flex items-center justify-center min-h-[50vh] bg-gradient-to-b from-gray-50 to-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6 w-full max-w-md"
      >
        <label htmlFor="budget" className="block text-lg font-semibold mb-2 text-gray-800">
          What is your budget range?
        </label>
        <input
          id="budget"
          type="text"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="e.g., $500,000 - $1,000,000"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
        <button
          type="submit"
          className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded"
        >
          Next
        </button>
      </form>
    </section>
  );
};

export default IntakeForm;