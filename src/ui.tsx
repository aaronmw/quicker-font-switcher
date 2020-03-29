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
        background: radial-gradient(white, hsl(0, 0%, 95%));
    }
`;

const StyledAppContainer = styled.div``;

const BaseCard = styled.div`
    background: white;
    padding: 10px 16px;
    border-bottom: 1px solid #e8e8e8;
`;

const OptionBar = styled(BaseCard)`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    border-top: 1px solid #e8e8e8;
    display: flex;
    justify-content: flex-end;
    background-color: hsl(0, 0%, 95%);

    & > * {
        margin-left: 16px;
    }
`;

const FontCard = styled(BaseCard)`
    cursor: pointer;

    &:hover {
        background-color: rgba(0, 186, 255, 0.2);
    }
    &:focus {
        background-color: rgba(0, 186, 255, 1);
        color: white;
    }
`;

const FullScreenMessage = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 30px;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
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
    const [shouldKeepOpen, setShouldKeepOpen] = React.useState(false);
    const [
        shouldSearchEntireDocument,
        setShouldSearchEntireDocument,
    ] = React.useState(false);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const fontRefs = {};

    React.useEffect(() => {
        onmessage = (message) => {
            const {
                fontNames: storedFontNames,
                shouldKeepOpen: storedShouldKeepOpen,
                shouldSearchEntireDocument: storedShouldSearchEntireDocument,
            } = message.data.pluginMessage;
            const sortedFontNames = storedFontNames.sort((a, b) => {
                const aKey = getUniqueKey(a);
                const bKey = getUniqueKey(b);
                return aKey < bKey ? -1 : bKey < aKey ? 1 : 0;
            });
            setFontNames(sortedFontNames);
            setShouldKeepOpen(storedShouldKeepOpen);
            setShouldSearchEntireDocument(storedShouldSearchEntireDocument);
            setIsLoaded(true);
        };

        sendMessage({ type: 'loadInitialState' });

        addEventListener('focus', (e) => {
            sendMessage({ type: 'loadInitialState' });
        });
    }, []);

    React.useEffect(() => {
        if (!isLoaded || fontNames.length === 0) {
            return;
        }

        const firstFontRef = fontRefs[getUniqueKey(fontNames[0])];

        firstFontRef.focus();
    }, [fontRefs, fontNames, isLoaded]);

    React.useEffect(() => {
        if (isLoaded) {
            sendMessage({
                type: 'saveOptions',
                shouldKeepOpen,
                shouldSearchEntireDocument,
            });
        }
    }, [isLoaded, shouldKeepOpen, shouldSearchEntireDocument]);

    const handleClick = (fontName) => {
        sendMessage({
            type: 'applyFont',
            fontName,
            shouldKeepOpen,
            shouldSearchEntireDocument,
        });
    };

    const handleKeyDown = (evt, fontName) => {
        evt.preventDefault();

        if (evt.key === 'Escape') {
            sendMessage({ type: 'close' });
            return;
        }

        if (evt.key === 'Enter') {
            sendMessage({
                type: 'applyFont',
                fontName,
                shouldKeepOpen,
                shouldSearchEntireDocument,
            });
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

    const hasFonts = fontNames.length > 0;

    return (
        <StyledAppContainer>
            <GlobalStyles />

            {!isLoaded && <FullScreenMessage>...loading... </FullScreenMessage>}
            {isLoaded && !hasFonts && (
                <FullScreenMessage>No text nodes found 🤔</FullScreenMessage>
            )}
            {isLoaded && (
                <OptionBar>
                    <label>
                        <input
                            type="checkbox"
                            checked={shouldSearchEntireDocument}
                            onChange={() =>
                                setShouldSearchEntireDocument(
                                    !shouldSearchEntireDocument,
                                )
                            }
                        />{' '}
                        Scan Entire Document
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={shouldKeepOpen}
                            onChange={() => setShouldKeepOpen(!shouldKeepOpen)}
                        />{' '}
                        Keep Open
                    </label>
                </OptionBar>
            )}
            {isLoaded &&
                hasFonts &&
                fontNames.map((fontName) => {
                    const key = getUniqueKey(fontName);
                    return (
                        <FontCard
                            key={key}
                            ref={(ref) => (fontRefs[key] = ref)}
                            tabIndex={0}
                            onClick={() => handleClick(fontName)}
                            onKeyDown={(evt) => handleKeyDown(evt, fontName)}
                        >
                            {fontName.family}{' '}
                            {fontName.style !== 'Regular' && fontName.style}
                        </FontCard>
                    );
                })}
        </StyledAppContainer>
    );
};

ReactDOM.render(<App />, document.getElementById('react-page'));
