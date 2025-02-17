'use client';

import React from 'react';

interface StepperProps {
  steps: string[];
  currentStep: number;
  onNext: () => void;
  onPrev: () => void;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep, onNext, onPrev }) => {
  return (
    <div className="w-full max-w-lg mx-auto p-4">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full text-white 
                ${currentStep === index ? 'bg-blue-500' : 'bg-gray-300'}`}
            >
              {index + 1}
            </div>
            <span className="mt-2 text-sm">{step}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-6">
        <button 
          onClick={onPrev} 
          disabled={currentStep === 0} 
          className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50">
          Previous
        </button>
        <button 
          onClick={onNext} 
          disabled={currentStep === steps.length - 1} 
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50">
          Next
        </button>
      </div>
    </div>
  );
};

export default Stepper;
