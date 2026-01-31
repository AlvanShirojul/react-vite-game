import React from 'react';

interface QuestionModalProps {
  isOpen: boolean;
  message: string;
  onComplete: (success: boolean) => void;
}

const QuestionModal: React.FC<QuestionModalProps> = ({ isOpen, message, onComplete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] backdrop-blur-sm">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full text-center border-4 border-yellow-400">
        <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-4xl">⚡</span>
        </div>
        
        <h2 className="text-3xl font-black text-yellow-600 mb-2 font-display">Questions!</h2>
        <div className="bg-gray-50 p-6 rounded-xl mb-6 border-2 border-dashed border-gray-200">
          <p className="text-xl font-bold text-gray-800 leading-relaxed italic">
            "{message}"
          </p>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={() => onComplete(true)}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-black text-lg shadow-lg transform transition active:scale-95"
          >
            BERHASIL
          </button>
          <button 
            onClick={() => onComplete(false)}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl font-black text-lg shadow-lg transform transition active:scale-95"
          >
            GAGAL
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;