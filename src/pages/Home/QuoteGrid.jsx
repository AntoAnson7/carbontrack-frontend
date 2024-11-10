import React, { useState, useEffect } from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

const quotes = [
    { text: "The Earth is what we all have in common." },
    { text: "Reduce what you buy, reuse what you have, and recycle what you cannot use." },
    { text: "The greatest threat to our planet is the belief that someone else will save it." },
    { text: "A small change can make a big impact. Start with your carbon footprint." },
    { text: "There is no Planet B. Protect Earth, reduce your emissions." },
    { text: "Our actions today will determine our tomorrow. Act wisely." },
    { text: "Act as if what you do makes a difference. It does." },
    { text: "Be the change you wish to see for the planet." },
    { text: "The future depends on what we do in the present." },
    { text: "Let’s join hands to reduce our carbon footprint." },
    { text: "Small changes in everyday habits can create a big impact." },
    { text: "Our planet's future is not a luxury; it’s a necessity." },
    { text: "Change starts with awareness and a commitment to act." },
    { text: "The climate is changing. Are we?" },
    { text: "Living sustainably means thinking of the planet with every action." },
    { text: "Protecting our planet is not a choice; it’s a responsibility." },
    { text: "Save the Earth. It’s the only planet with coffee and chocolate!" },
    { text: "Reducing your carbon footprint is a step toward a greener tomorrow." },
    { text: "Think globally, act locally. Our planet is our responsibility." },
    { text: "Let’s leave a green footprint, not a carbon footprint." },
];


const Quotes = () => {
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [index, setIndex] = useState(0);
    const [blink, setBlink] = useState(true);
    const [quoteIndex, setQuoteIndex] = useState(0);

    useEffect(() => {
        let timer;
        const quote = quotes[quoteIndex].text;

        if (isDeleting) {
            timer = setTimeout(() => {
                setDisplayedText((prev) => prev.slice(0, -1));
                if (displayedText === '') {
                    setIsDeleting(false);
                    setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
                    setIndex(0);
                }
            }, 35);
        } else {
            timer = setTimeout(() => {
                setDisplayedText(quote.slice(0, displayedText.length + 1));
                if (displayedText === quote) {
                    setIsDeleting(true);
                }
            }, 50);
        }
        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, quoteIndex]);

    // Blinking cursor effect
    useEffect(() => {
        const blinkInterval = setInterval(() => setBlink((prev) => !prev), 500);
        return () => clearInterval(blinkInterval);
    }, []);

    return (
        <div className="quote-container" style={{ paddingTop: '25px' }}>
            <Text style={{ fontSize: '20px', color: 'black', fontWeight: '200',fontStyle:'italic',backgroundColor:'rgba(171, 222, 4,0.3)' }}>
                 - {displayedText}
                <span style={{ opacity: blink ? 1 : 0 }}>|</span>
            </Text>
        </div>
    );
};

export default Quotes;
