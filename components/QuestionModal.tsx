
import React, { useState, useEffect } from 'react';
import type { Question } from '../types';

interface QuestionModalProps {
    isOpen: boolean;
    question: Question | null;
    onAnswer: (wasCorrect: boolean) => void;
}

const QuestionModal: React.FC<QuestionModalProps> = ({ isOpen, question, onAnswer }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

    useEffect(() => {
        // Reset state when a new question is shown
        if (isOpen) {
            setSelectedOption(null);
            setIsAnswered(false);
            setFeedback(null);
        }
    }, [isOpen, question]);
    
    if (!isOpen || !question) {
        return null;
    }

    const handleConfirm = () => {
        if (!selectedOption) return;

        const wasCorrect = selectedOption === question.answer;
        setFeedback(wasCorrect ? 'correct' : 'incorrect');
        setIsAnswered(true);

        setTimeout(() => {
            onAnswer(wasCorrect);
        }, 1500); // Wait 1.5s to show feedback before closing
    };
    
    const getButtonClass = (option: string) => {
        if (!isAnswered) {
             return selectedOption === option ? 'bg-[#1E459F] text-white' : 'bg-[#E1DCCA] hover:bg-[#FABD32]';
        }
        if (option === question.answer) {
            return 'bg-green-500 text-white'; // Correct answer
        }
        if (option === selectedOption && option !== question.answer) {
            return 'bg-red-500 text-white'; // Incorrectly selected
        }
        return 'bg-[#E1DCCA] opacity-60'; // Other options
    };

    return (
        <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="question-modal-title"
        >
            <div 
                className="bg-[#FAF8F1] rounded-2xl shadow-2xl p-8 max-w-lg w-full transform transition-all"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="text-center">
                    <h2 id="question-modal-title" className="text-3xl font-bold font-display text-[#CF2A2A] mb-2">Question!</h2>
                    <p className="text-xl text-[#1E459F]/90 mb-6">{question.question}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {question.options.map((option) => (
                        <button 
                            key={option} 
                            onClick={() => !isAnswered && setSelectedOption(option)}
                            disabled={isAnswered}
                            className={`p-4 rounded-lg font-bold text-lg transition-all duration-300 transform disabled:cursor-not-allowed ${getButtonClass(option)}`}
                            aria-label={`Answer: ${option}`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
                <button 
                    onClick={handleConfirm} 
                    disabled={!selectedOption || isAnswered}
                    className="btn-primary w-full py-3 px-6 font-bold text-xl rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
                >
                    {isAnswered ? (feedback === 'correct' ? 'Correct!' : 'Incorrect!') : 'Confirm Answer'}
                </button>
            </div>
        </div>
    );
};

export default QuestionModal;
