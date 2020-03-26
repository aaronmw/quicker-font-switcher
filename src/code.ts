import { isTextNode, getAllFonts } from '@figma-plugin/helpers';

figma.showUI(__html__);

const storeClientData = async (key, val) => {
    await figma.clientStorage.setAsync(key, val);
};

const retrieveClientData = async (key) => {
    return await figma.clientStorage.getAsync(key);
};

const getTextNodes = nodes =>
    nodes.reduce((acc, node) => {
        if (isTextNode(node)) {
            acc.push(node);
        }
        return acc;
    }, []);

figma.ui.onmessage = async msg => {
    if (msg.type === 'saveShouldKeepOpenStatus') {
        await storeClientData('shouldKeepOpen', msg.shouldKeepOpen);
    }

    if (msg.type === 'loadInitialState') {
        const nodes = figma.currentPage.children;
        const textNodes = getTextNodes(nodes);
        const fontNames = getAllFonts(textNodes);
        const shouldKeepOpen = await retrieveClientData('shouldKeepOpen');

        figma.ui.postMessage({
            fontNames,
            shouldKeepOpen
        });
    }

    if (msg.type === 'applyFont') {
        const selectedTextNodes = getTextNodes(figma.currentPage.selection);

        if (selectedTextNodes.length === 0) {
            // No idea why I need to cast this...
            (figma as any).notify('Select some text objects first!');
            return;
        }

        const { family, style } = msg.fontName;

        await figma.loadFontAsync({
            family,
            style,
        });

        selectedTextNodes.map(textNode => {
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
