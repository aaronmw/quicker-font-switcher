var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { isTextNode, getAllFonts } from '@figma-plugin/helpers';
figma.showUI(__html__);
figma.ui.onmessage = (msg) => __awaiter(this, void 0, void 0, function* () {
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
        yield figma.loadFontAsync({
            family,
            style,
        });
        figma.currentPage.selection
            .filter(node => node.type === 'TEXT')
            .map(textNode => {
            textNode.fontName = {
                family,
                style,
            };
        });
        figma.closePlugin();
    }
    if (msg.type === 'close') {
        figma.closePlugin();
    }
});
