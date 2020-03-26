import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled, { createGlobalStyle } from 'styled-components';
import './ui.css';

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: none;
    }
    :root {
        font-family: Roboto, sans-serif;
        font-size: 12px;
    }
`;

const StyledAppContainer = styled.div``;

const FontCard = styled.div`
    padding: 10px 16px;

    & + & {
        border-top: 1px solid #e8e8e8;
    }
    &:focus {
        background-color: #00adfe;
        color: white;
    }
`;

const KEY_STEP_MAP = {
    ArrowUp: -1,
    ArrowDown: 1,
};

const sendMessage = (payload) => {
    parent.postMessage(
        {
            pluginMessage: {
                ...payload,
            },
        },
        '*',
    );
};

const getUniqueKey = (fontName) => `${fontName.family}-${fontName.style}`;

const App = () => {
    const [fontNames, setFontNames] = React.useState([]);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const fontRefs = {};

    React.useEffect(() => {
        onmessage = (message) => {
            const sortedFontNames = message.data.pluginMessage.fontNames.sort(
                (a, b) => {
                    return a.family < b.family
                        ? -1
                        : b.family < a.family
                        ? 1
                        : 0;
                },
            );
            setFontNames(sortedFontNames);
            setIsLoaded(true);
        };

        sendMessage({ type: 'getFontNames' });
    }, []);

    React.useEffect(() => {
        if (!isLoaded) {
            return;
        }
        const firstFontRef = fontRefs[getUniqueKey(fontNames[0])];
        firstFontRef.focus();
    }, [fontRefs, fontNames, isLoaded]);

    const handleKeyDown = (evt, fontName) => {
        evt.preventDefault();

        if (evt.key === 'Escape') {
            sendMessage({ type: 'close' });
            return;
        }

        if (evt.key === 'Enter') {
            sendMessage({ type: 'applyFont', fontName });
            return;
        }

        const step = KEY_STEP_MAP[evt.key] || null;

        if (step !== null) {
            const currentIndex = fontNames.indexOf(fontName);
            const nextIndex = (currentIndex + step) % fontNames.length;
            const newIndex = nextIndex >= 0 ? nextIndex : fontNames.length - 1;
            const newFontName = fontNames[newIndex];
            fontRefs[getUniqueKey(newFontName)].focus();
        }
    };

    return (
        <StyledAppContainer>
            <GlobalStyles />
            {!isLoaded && <div>...loading... </div>}
            {isLoaded && !fontNames.length && <div>No text nodes found 🤔</div>}
            {isLoaded &&
                fontNames.map((fontName) => {
                    const key = getUniqueKey(fontName);
                    return (
                        <FontCard
                            key={key}
                            ref={(ref) => (fontRefs[key] = ref)}
                            tabIndex={0}
                            onKeyDown={(evt) => handleKeyDown(evt, fontName)}
                        >
                            {fontName.family} {fontName.style}
                        </FontCard>
                    );
                })}
        </StyledAppContainer>
    );
};

ReactDOM.render(<App />, document.getElementById('react-page'));
