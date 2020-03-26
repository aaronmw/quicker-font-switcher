import { isTextNode, getAllFonts } from '@figma-plugin/helpers';

figma.showUI(__html__);

const getTextNodes = nodes => nodes.reduce((acc, node) => {
    if (isTextNode(node)) {
        acc.push(node);
    }
    return acc;
}, []);

figma.ui.onmessage = async msg => {
    if (msg.type === 'getFontNames') {
        const selectedTextNodes = getTextNodes(figma.currentPage.selection);

        if (selectedTextNodes.length === 0) {
            figma.closePlugin('Select some text objects first!');
        }

        const nodes = figma.currentPage.children;
        const textNodes = getTextNodes(nodes);
        const fontNames = getAllFonts(textNodes);

        figma.ui.postMessage({
            fontNames,
        });
    }

    if (msg.type === 'applyFont') {
        const { family, style } = msg.fontName;
        await figma.loadFontAsync({
            family,
            style,
        });
        figma.currentPage.selection
            .filter(node => node.type === 'TEXT')
            .map(textNode => {
                (textNode as TextNode).fontName = {
                    family,
                    style,
                };
            });
        figma.closePlugin();
    }

    if (msg.type === 'close') {
        figma.closePlugin();
    }
};
