import { isTextNode, getAllFonts } from '@figma-plugin/helpers';

const WINDOW_WIDTH = 300;
const DEFAULT_WINDOW_HEIGHT = 270;
const MAX_WINDOW_HEIGHT = 500;

figma.showUI(__html__, {
    width: WINDOW_WIDTH,
    height: DEFAULT_WINDOW_HEIGHT,
});

const storeClientData = async (key, val) => {
    await figma.clientStorage.setAsync(key, val);
};

const retrieveClientData = async (key) => {
    return await figma.clientStorage.getAsync(key);
};

const getTextNodes = async (nodes) => nodes.findAll((node) => isTextNode(node));

const updateUI = async () => {
    const shouldSearchEntireDocument = await retrieveClientData(
        'shouldSearchEntireDocument',
    );
    const startingNode = (await shouldSearchEntireDocument)
        ? figma.root
        : figma.currentPage;
    const textNodes = await getTextNodes(startingNode);
    const fontNames = await getAllFonts(textNodes);
    const shouldKeepOpen = await retrieveClientData('shouldKeepOpen');

    figma.ui.postMessage({
        fontNames,
        shouldKeepOpen,
        shouldSearchEntireDocument,
    });

    figma.ui.resize(
        WINDOW_WIDTH,
        Math.min(35 * (fontNames.length + 1), MAX_WINDOW_HEIGHT),
    );
};

figma.ui.onmessage = async (msg) => {
    if (msg.type === 'saveOptions') {
        await storeClientData('shouldKeepOpen', msg.shouldKeepOpen);
        await storeClientData(
            'shouldSearchEntireDocument',
            msg.shouldSearchEntireDocument,
        );
        await updateUI();
    }

    if (msg.type === 'loadInitialState') {
        await updateUI();
    }

    if (msg.type === 'applyFont') {
        const selection = figma.currentPage.selection;

        if (selection.length === 0) {
            // No idea why I need to cast this...
            (figma as any).notify('You have nothing selected 🤔');
            return;
        }

        const selectionContainsOnlyTextNodes = selection.every((node) =>
            isTextNode(node),
        );

        if (selectionContainsOnlyTextNodes === false) {
            (figma as any).notify('This only works on text nodes... 🤦');
            return;
        }

        const { family, style } = msg.fontName;

        await figma.loadFontAsync({
            family,
            style,
        });

        selection.map((textNode) => {
            (textNode as TextNode).fontName = {
                family,
                style,
            };
        });

        if (!msg.shouldKeepOpen) {
            figma.closePlugin();
        }
    }

    if (msg.type === 'close') {
        figma.closePlugin();
    }
};
