import { useState, useEffect } from "react";

interface CountdownProps {
    targetDate: Date;
}

const Countdown = ({ targetDate }: CountdownProps) => {

    function calculateTimeLeft() {
        const difference = +targetDate - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                dny: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hodiny: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minuty: Math.floor((difference / 1000 / 60) % 60),
                sekundy: Math.floor((difference / 1000) % 60)
            };
        }

        return timeLeft;
    }

    const [timeLeft, setTimeLeft] = useState<any>(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const timerComponents = Object.keys(timeLeft).map(interval => {
        if (!timeLeft[interval]) {
            return null;
        }

        return (
            <div key={interval} className="flex flex-col items-center mx-2">
                <span className="text-4xl font-bold text-butter-cup">{timeLeft[interval]}</span>
                <span className="text-sm">{interval}</span>
            </div>
        );
    });

    return (
        <div className="text-center">
            <div className="flex justify-center">
                {timerComponents.length ? timerComponents : <span>Čas vypršel!</span>}
            </div>
        </div>
    );
}

export default Countdown;