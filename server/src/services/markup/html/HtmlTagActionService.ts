import { SvelteDocument } from "../../../SvelteDocument";
import { CompletionItem } from "vscode-languageserver";
import { BaseService } from "../../Common";
import { findLastDirectiveIndex } from "../TagHelpers";
import { HtmlTagScopeContext } from "./HtmlTagInnerService";

export class HtmlTagActionService extends BaseService {
    public getCompletitionItems(document: SvelteDocument, context: HtmlTagScopeContext): Array<CompletionItem> {
        const index = findLastDirectiveIndex(context.content, context.offset, 'use');
        if (index < 0) {
            return null;
        }

        const contentPart = context.content.substring(index, context.offset);
        if (/use:[\w\d_]*$/g.test(contentPart)) {
            return document.metadata.actions;
        }

        return null;
    }
}