import { isTextNode, getAllFonts } from '@figma-plugin/helpers';

figma.showUI(__html__);

figma.ui.onmessage = async msg => {
    if (msg.type === 'getFontNames') {
        const nodes = figma.currentPage.children;

        const textNodes = nodes.reduce((acc, node) => {
            if (isTextNode(node)) {
                acc.push(node);
            }
            return acc;
        }, []);

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
