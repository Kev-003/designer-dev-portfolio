import { useEffect, useState } from 'react';

type UseTypingOptions = {
    isActive: boolean;
    activeText: string;
    inactiveText: string;
    activeDelayMs?: number;
    inactiveDelayMs?: number;
    charDelayMs?: number;
};

export function useBrandNavTyping({
    isActive,
    activeText,
    inactiveText,
    activeDelayMs = 200,
    inactiveDelayMs = 550,
    charDelayMs = 80,
}: UseTypingOptions) {
    const [displayedText, setDisplayedText] = useState<string>(inactiveText);

    useEffect(() => {
        const fullText = isActive ? activeText : inactiveText;
        let index = 0;
        let typingInterval: NodeJS.Timeout | undefined;
        let isCancelled = false;

        const initialDelay = isActive ? activeDelayMs : inactiveDelayMs;

        const delayTimeout = setTimeout(() => {
            if (isCancelled) {
                return;
            }

            // Clear immediately and start from empty
            setDisplayedText('');

            typingInterval = setInterval(() => {
                if (isCancelled) {
                    return;
                }

                index += 1;
                setDisplayedText(fullText.slice(0, index));

                if (index >= fullText.length && typingInterval) {
                    clearInterval(typingInterval);
                }
            }, charDelayMs);
        }, initialDelay);

        return () => {
            isCancelled = true;
            clearTimeout(delayTimeout);

            if (typingInterval) {
                clearInterval(typingInterval);
            }
        };
    }, [isActive, activeText, inactiveText, activeDelayMs, inactiveDelayMs, charDelayMs]);

    return displayedText;
}
