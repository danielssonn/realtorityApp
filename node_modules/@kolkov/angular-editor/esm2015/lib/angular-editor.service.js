/**
 * @fileoverview added by tsickle
 * Generated from: lib/angular-editor.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@angular/common";
/**
 * @record
 */
export function UploadResponse() { }
if (false) {
    /** @type {?} */
    UploadResponse.prototype.imageUrl;
}
export class AngularEditorService {
    /**
     * @param {?} http
     * @param {?} doc
     */
    constructor(http, doc) {
        this.http = http;
        this.doc = doc;
        /**
         * save selection when the editor is focussed out
         */
        this.saveSelection = (/**
         * @return {?}
         */
        () => {
            if (this.doc.getSelection) {
                /** @type {?} */
                const sel = this.doc.getSelection();
                if (sel.getRangeAt && sel.rangeCount) {
                    this.savedSelection = sel.getRangeAt(0);
                    this.selectedText = sel.toString();
                }
            }
            else if (this.doc.getSelection && this.doc.createRange) {
                this.savedSelection = document.createRange();
            }
            else {
                this.savedSelection = null;
            }
        });
    }
    /**
     * Executed command from editor header buttons exclude toggleEditorMode
     * @param {?} command string from triggerCommand
     * @return {?}
     */
    executeCommand(command) {
        /** @type {?} */
        const commands = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre'];
        if (commands.includes(command)) {
            this.doc.execCommand('formatBlock', false, command);
            return;
        }
        this.doc.execCommand(command, false, null);
    }
    /**
     * Create URL link
     * @param {?} url string from UI prompt
     * @return {?}
     */
    createLink(url) {
        if (!url.includes('http')) {
            this.doc.execCommand('createlink', false, url);
        }
        else {
            /** @type {?} */
            const newUrl = '<a href="' + url + '" target="_blank">' + this.selectedText + '</a>';
            this.insertHtml(newUrl);
        }
    }
    /**
     * insert color either font or background
     *
     * @param {?} color color to be inserted
     * @param {?} where where the color has to be inserted either text/background
     * @return {?}
     */
    insertColor(color, where) {
        /** @type {?} */
        const restored = this.restoreSelection();
        if (restored) {
            if (where === 'textColor') {
                this.doc.execCommand('foreColor', false, color);
            }
            else {
                this.doc.execCommand('hiliteColor', false, color);
            }
        }
    }
    /**
     * Set font name
     * @param {?} fontName string
     * @return {?}
     */
    setFontName(fontName) {
        this.doc.execCommand('fontName', false, fontName);
    }
    /**
     * Set font size
     * @param {?} fontSize string
     * @return {?}
     */
    setFontSize(fontSize) {
        this.doc.execCommand('fontSize', false, fontSize);
    }
    /**
     * Create raw HTML
     * @param {?} html HTML string
     * @return {?}
     */
    insertHtml(html) {
        /** @type {?} */
        const isHTMLInserted = this.doc.execCommand('insertHTML', false, html);
        if (!isHTMLInserted) {
            throw new Error('Unable to perform the operation');
        }
    }
    /**
     * restore selection when the editor is focused in
     *
     * saved selection when the editor is focused out
     * @return {?}
     */
    restoreSelection() {
        if (this.savedSelection) {
            if (this.doc.getSelection) {
                /** @type {?} */
                const sel = this.doc.getSelection();
                sel.removeAllRanges();
                sel.addRange(this.savedSelection);
                return true;
            }
            else if (this.doc.getSelection /*&& this.savedSelection.select*/) {
                // this.savedSelection.select();
                return true;
            }
        }
        else {
            return false;
        }
    }
    /**
     * setTimeout used for execute 'saveSelection' method in next event loop iteration
     * @param {?} callbackFn
     * @param {?=} timeout
     * @return {?}
     */
    executeInNextQueueIteration(callbackFn, timeout = 1e2) {
        setTimeout(callbackFn, timeout);
    }
    /**
     * check any selection is made or not
     * @private
     * @return {?}
     */
    checkSelection() {
        /** @type {?} */
        const selectedText = this.savedSelection.toString();
        if (selectedText.length === 0) {
            throw new Error('No Selection Made');
        }
        return true;
    }
    /**
     * Upload file to uploadUrl
     * @param {?} file The file
     * @return {?}
     */
    uploadImage(file) {
        /** @type {?} */
        const uploadData = new FormData();
        uploadData.append('file', file, file.name);
        return this.http.post(this.uploadUrl, uploadData, {
            reportProgress: true,
            observe: 'events',
        });
    }
    /**
     * Insert image with Url
     * @param {?} imageUrl The imageUrl.
     * @return {?}
     */
    insertImage(imageUrl) {
        this.doc.execCommand('insertImage', false, imageUrl);
    }
    /**
     * @param {?} separator
     * @return {?}
     */
    setDefaultParagraphSeparator(separator) {
        this.doc.execCommand('defaultParagraphSeparator', false, separator);
    }
    /**
     * @param {?} customClass
     * @return {?}
     */
    createCustomClass(customClass) {
        /** @type {?} */
        let newTag = this.selectedText;
        if (customClass) {
            /** @type {?} */
            const tagName = customClass.tag ? customClass.tag : 'span';
            newTag = '<' + tagName + ' class="' + customClass.class + '">' + this.selectedText + '</' + tagName + '>';
        }
        this.insertHtml(newTag);
    }
    /**
     * @param {?} videoUrl
     * @return {?}
     */
    insertVideo(videoUrl) {
        if (videoUrl.match('www.youtube.com')) {
            this.insertYouTubeVideoTag(videoUrl);
        }
        if (videoUrl.match('vimeo.com')) {
            this.insertVimeoVideoTag(videoUrl);
        }
    }
    /**
     * @private
     * @param {?} videoUrl
     * @return {?}
     */
    insertYouTubeVideoTag(videoUrl) {
        /** @type {?} */
        const id = videoUrl.split('v=')[1];
        /** @type {?} */
        const imageUrl = `https://img.youtube.com/vi/${id}/0.jpg`;
        /** @type {?} */
        const thumbnail = `
      <div style='position: relative'>
        <img style='position: absolute; left:200px; top:140px'
             src="https://img.icons8.com/color/96/000000/youtube-play.png"
        <a href='${videoUrl}' target='_blank'>
          <img src="${imageUrl}" alt="click to watch"/>
        </a>
      </div>`;
        this.insertHtml(thumbnail);
    }
    /**
     * @private
     * @param {?} videoUrl
     * @return {?}
     */
    insertVimeoVideoTag(videoUrl) {
        /** @type {?} */
        const sub = this.http.get(`https://vimeo.com/api/oembed.json?url=${videoUrl}`).subscribe((/**
         * @param {?} data
         * @return {?}
         */
        data => {
            /** @type {?} */
            const imageUrl = data.thumbnail_url_with_play_button;
            /** @type {?} */
            const thumbnail = `<div>
        <a href='${videoUrl}' target='_blank'>
          <img src="${imageUrl}" alt="${data.title}"/>
        </a>
      </div>`;
            this.insertHtml(thumbnail);
            sub.unsubscribe();
        }));
    }
    /**
     * @param {?} node
     * @return {?}
     */
    nextNode(node) {
        if (node.hasChildNodes()) {
            return node.firstChild;
        }
        else {
            while (node && !node.nextSibling) {
                node = node.parentNode;
            }
            if (!node) {
                return null;
            }
            return node.nextSibling;
        }
    }
    /**
     * @param {?} range
     * @param {?} includePartiallySelectedContainers
     * @return {?}
     */
    getRangeSelectedNodes(range, includePartiallySelectedContainers) {
        /** @type {?} */
        let node = range.startContainer;
        /** @type {?} */
        const endNode = range.endContainer;
        /** @type {?} */
        let rangeNodes = [];
        // Special case for a range that is contained within a single node
        if (node === endNode) {
            rangeNodes = [node];
        }
        else {
            // Iterate nodes until we hit the end container
            while (node && node !== endNode) {
                rangeNodes.push(node = this.nextNode(node));
            }
            // Add partially selected nodes at the start of the range
            node = range.startContainer;
            while (node && node !== range.commonAncestorContainer) {
                rangeNodes.unshift(node);
                node = node.parentNode;
            }
        }
        // Add ancestors of the range container, if required
        if (includePartiallySelectedContainers) {
            node = range.commonAncestorContainer;
            while (node) {
                rangeNodes.push(node);
                node = node.parentNode;
            }
        }
        return rangeNodes;
    }
    /**
     * @return {?}
     */
    getSelectedNodes() {
        /** @type {?} */
        const nodes = [];
        if (this.doc.getSelection) {
            /** @type {?} */
            const sel = this.doc.getSelection();
            for (let i = 0, len = sel.rangeCount; i < len; ++i) {
                nodes.push.apply(nodes, this.getRangeSelectedNodes(sel.getRangeAt(i), true));
            }
        }
        return nodes;
    }
    /**
     * @param {?} el
     * @return {?}
     */
    replaceWithOwnChildren(el) {
        /** @type {?} */
        const parent = el.parentNode;
        while (el.hasChildNodes()) {
            parent.insertBefore(el.firstChild, el);
        }
        parent.removeChild(el);
    }
    /**
     * @param {?} tagNames
     * @return {?}
     */
    removeSelectedElements(tagNames) {
        /** @type {?} */
        const tagNamesArray = tagNames.toLowerCase().split(',');
        this.getSelectedNodes().forEach((/**
         * @param {?} node
         * @return {?}
         */
        (node) => {
            if (node.nodeType === 1 &&
                tagNamesArray.indexOf(node.tagName.toLowerCase()) > -1) {
                // Remove the node and replace it with its children
                this.replaceWithOwnChildren(node);
            }
        }));
    }
}
AngularEditorService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
AngularEditorService.ctorParameters = () => [
    { type: HttpClient },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
/** @nocollapse */ AngularEditorService.ngInjectableDef = i0.defineInjectable({ factory: function AngularEditorService_Factory() { return new AngularEditorService(i0.inject(i1.HttpClient), i0.inject(i2.DOCUMENT)); }, token: AngularEditorService, providedIn: "root" });
if (false) {
    /** @type {?} */
    AngularEditorService.prototype.savedSelection;
    /** @type {?} */
    AngularEditorService.prototype.selectedText;
    /** @type {?} */
    AngularEditorService.prototype.uploadUrl;
    /**
     * save selection when the editor is focussed out
     * @type {?}
     */
    AngularEditorService.prototype.saveSelection;
    /**
     * @type {?}
     * @private
     */
    AngularEditorService.prototype.http;
    /**
     * @type {?}
     * @private
     */
    AngularEditorService.prototype.doc;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1lZGl0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brb2xrb3YvYW5ndWxhci1lZGl0b3IvIiwic291cmNlcyI6WyJsaWIvYW5ndWxhci1lZGl0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBQyxVQUFVLEVBQVksTUFBTSxzQkFBc0IsQ0FBQztBQUUzRCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7QUFHekMsb0NBRUM7OztJQURDLGtDQUFpQjs7QUFNbkIsTUFBTSxPQUFPLG9CQUFvQjs7Ozs7SUFNL0IsWUFDVSxJQUFnQixFQUNFLEdBQVE7UUFEMUIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNFLFFBQUcsR0FBSCxHQUFHLENBQUs7Ozs7UUE4RTdCLGtCQUFhOzs7UUFBRyxHQUFTLEVBQUU7WUFDaEMsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRTs7c0JBQ25CLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRTtnQkFDbkMsSUFBSSxHQUFHLENBQUMsVUFBVSxJQUFJLEdBQUcsQ0FBQyxVQUFVLEVBQUU7b0JBQ3BDLElBQUksQ0FBQyxjQUFjLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDeEMsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7aUJBQ3BDO2FBQ0Y7aUJBQU0sSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRTtnQkFDeEQsSUFBSSxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDOUM7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLGNBQWMsR0FBRyxJ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LENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxPQUFPOzs7O1FBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN2QyxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssQ0FBQztnQkFDckIsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3hELG1EQUFtRDtnQkFDbkQsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ25DO1FBQ0gsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7WUFuU0YsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBWE8sVUFBVTs0Q0FvQmIsTUFBTSxTQUFDLFFBQVE7Ozs7O0lBTmxCLDhDQUE2Qjs7SUFDN0IsNENBQXFCOztJQUNyQix5Q0FBa0I7Ozs7O0lBa0ZsQiw2Q0FZQzs7Ozs7SUEzRkMsb0NBQXdCOzs7OztJQUN4QixtQ0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0h0dHBDbGllbnQsIEh0dHBFdmVudH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0N1c3RvbUNsYXNzfSBmcm9tICcuL2NvbmZpZyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXBsb2FkUmVzcG9uc2Uge1xuICBpbWFnZVVybDogc3RyaW5nO1xufVxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFyRWRpdG9yU2VydmljZSB7XG5cbiAgc2F2ZWRTZWxlY3Rpb246IFJhbmdlIHwgbnVsbDtcbiAgc2VsZWN0ZWRUZXh0OiBzdHJpbmc7XG4gIHVwbG9hZFVybDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvYzogYW55XG4gICkgeyB9XG5cbiAgLyoqXG4gICAqIEV4ZWN1dGVkIGNvbW1hbmQgZnJvbSBlZGl0b3IgaGVhZGVyIGJ1dHRvbnMgZXhjbHVkZSB0b2dnbGVFZGl0b3JNb2RlXG4gICAqIEBwYXJhbSBjb21tYW5kIHN0cmluZyBmcm9tIHRyaWdnZXJDb21tYW5kXG4gICAqL1xuICBleGVjdXRlQ29tbWFuZChjb21tYW5kOiBzdHJpbmcpIHtcbiAgICBjb25zdCBjb21tYW5kcyA9IFsnaDEnLCAnaDInLCAnaDMnLCAnaDQnLCAnaDUnLCAnaDYnLCAncCcsICdwcmUnXTtcbiAgICBpZiAoY29tbWFuZHMuaW5jbHVkZXMoY29tbWFuZCkpIHtcbiAgICAgIHRoaXMuZG9jLmV4ZWNDb21tYW5kKCdmb3JtYXRCbG9jaycsIGZhbHNlLCBjb21tYW5kKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5kb2MuZXhlY0NvbW1hbmQoY29tbWFuZCwgZmFsc2UsIG51bGwpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBVUkwgbGlua1xuICAgKiBAcGFyYW0gdXJsIHN0cmluZyBmcm9tIFVJIHByb21wdFxuICAgKi9cbiAgY3JlYXRlTGluayh1cmw6IHN0cmluZykge1xuICAgIGlmICghdXJsLmluY2x1ZGVzKCdodHRwJykpIHtcbiAgICAgIHRoaXMuZG9jLmV4ZWNDb21tYW5kKCdjcmVhdGVsaW5rJywgZmFsc2UsIHVybCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG5ld1VybCA9ICc8YSBocmVmPVwiJyArIHVybCArICdcIiB0YXJnZXQ9XCJfYmxhbmtcIj4nICsgdGhpcy5zZWxlY3RlZFRleHQgKyAnPC9hPic7XG4gICAgICB0aGlzLmluc2VydEh0bWwobmV3VXJsKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogaW5zZXJ0IGNvbG9yIGVpdGhlciBmb250IG9yIGJhY2tncm91bmRcbiAgICpcbiAgICogQHBhcmFtIGNvbG9yIGNvbG9yIHRvIGJlIGluc2VydGVkXG4gICAqIEBwYXJhbSB3aGVyZSB3aGVyZSB0aGUgY29sb3IgaGFzIHRvIGJlIGluc2VydGVkIGVpdGhlciB0ZXh0L2JhY2tncm91bmRcbiAgICovXG4gIGluc2VydENvbG9yKGNvbG9yOiBzdHJpbmcsIHdoZXJlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCByZXN0b3JlZCA9IHRoaXMucmVzdG9yZVNlbGVjdGlvbigpO1xuICAgIGlmIChyZXN0b3JlZCkge1xuICAgICAgaWYgKHdoZXJlID09PSAndGV4dENvbG9yJykge1xuICAgICAgICB0aGlzLmRvYy5leGVjQ29tbWFuZCgnZm9yZUNvbG9yJywgZmFsc2UsIGNvbG9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZG9jLmV4ZWNDb21tYW5kKCdoaWxpdGVDb2xvcicsIGZhbHNlLCBjb2xvcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldCBmb250IG5hbWVcbiAgICogQHBhcmFtIGZvbnROYW1lIHN0cmluZ1xuICAgKi9cbiAgc2V0Rm9udE5hbWUoZm9udE5hbWU6IHN0cmluZykge1xuICAgIHRoaXMuZG9jLmV4ZWNDb21tYW5kKCdmb250TmFtZScsIGZhbHNlLCBmb250TmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGZvbnQgc2l6ZVxuICAgKiBAcGFyYW0gZm9udFNpemUgc3RyaW5nXG4gICAqL1xuICBzZXRGb250U2l6ZShmb250U2l6ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5kb2MuZXhlY0NvbW1hbmQoJ2ZvbnRTaXplJywgZmFsc2UsIGZvbnRTaXplKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgcmF3IEhUTUxcbiAgICogQHBhcmFtIGh0bWwgSFRNTCBzdHJpbmdcbiAgICovXG4gIGluc2VydEh0bWwoaHRtbDogc3RyaW5nKTogdm9pZCB7XG5cbiAgICBjb25zdCBpc0hUTUxJbnNlcnRlZCA9IHRoaXMuZG9jLmV4ZWNDb21tYW5kKCdpbnNlcnRIVE1MJywgZmFsc2UsIGh0bWwpO1xuXG4gICAgaWYgKCFpc0hUTUxJbnNlcnRlZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gcGVyZm9ybSB0aGUgb3BlcmF0aW9uJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHNhdmUgc2VsZWN0aW9uIHdoZW4gdGhlIGVkaXRvciBpcyBmb2N1c3NlZCBvdXRcbiAgICovXG4gIHB1YmxpYyBzYXZlU2VsZWN0aW9uID0gKCk6IHZvaWQgPT4ge1xuICAgIGlmICh0aGlzLmRvYy5nZXRTZWxlY3Rpb24pIHtcbiAgICAgIGNvbnN0IHNlbCA9IHRoaXMuZG9jLmdldFNlbGVjdGlvbigpO1xuICAgICAgaWYgKHNlbC5nZXRSYW5nZUF0ICYmIHNlbC5yYW5nZUNvdW50KSB7XG4gICAgICAgIHRoaXMuc2F2ZWRTZWxlY3Rpb24gPSBzZWwuZ2V0UmFuZ2VBdCgwKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFRleHQgPSBzZWwudG9TdHJpbmcoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuZG9jLmdldFNlbGVjdGlvbiAmJiB0aGlzLmRvYy5jcmVhdGVSYW5nZSkge1xuICAgICAgdGhpcy5zYXZlZFNlbGVjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2F2ZWRTZWxlY3Rpb24gPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiByZXN0b3JlIHNlbGVjdGlvbiB3aGVuIHRoZSBlZGl0b3IgaXMgZm9jdXNlZCBpblxuICAgKlxuICAgKiBzYXZlZCBzZWxlY3Rpb24gd2hlbiB0aGUgZWRpdG9yIGlzIGZvY3VzZWQgb3V0XG4gICAqL1xuICByZXN0b3JlU2VsZWN0aW9uKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLnNhdmVkU2VsZWN0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb2MuZ2V0U2VsZWN0aW9uKSB7XG4gICAgICAgIGNvbnN0IHNlbCA9IHRoaXMuZG9jLmdldFNlbGVjdGlvbigpO1xuICAgICAgICBzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgICAgIHNlbC5hZGRSYW5nZSh0aGlzLnNhdmVkU2VsZWN0aW9uKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuZG9jLmdldFNlbGVjdGlvbiAvKiYmIHRoaXMuc2F2ZWRTZWxlY3Rpb24uc2VsZWN0Ki8pIHtcbiAgICAgICAgLy8gdGhpcy5zYXZlZFNlbGVjdGlvbi5zZWxlY3QoKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogc2V0VGltZW91dCB1c2VkIGZvciBleGVjdXRlICdzYXZlU2VsZWN0aW9uJyBtZXRob2QgaW4gbmV4dCBldmVudCBsb29wIGl0ZXJhdGlvblxuICAgKi9cbiAgcHVibGljIGV4ZWN1dGVJbk5leHRRdWV1ZUl0ZXJhdGlvbihjYWxsYmFja0ZuOiAoLi4uYXJnczogYW55KSA9PiBhbnksIHRpbWVvdXQgPSAxZTIpOiB2b2lkIHtcbiAgICBzZXRUaW1lb3V0KGNhbGxiYWNrRm4sIHRpbWVvdXQpO1xuICB9XG5cbiAgLyoqIGNoZWNrIGFueSBzZWxlY3Rpb24gaXMgbWFkZSBvciBub3QgKi9cbiAgcHJpdmF0ZSBjaGVja1NlbGVjdGlvbigpOiBhbnkge1xuXG4gICAgY29uc3Qgc2VsZWN0ZWRUZXh0ID0gdGhpcy5zYXZlZFNlbGVjdGlvbi50b1N0cmluZygpO1xuXG4gICAgaWYgKHNlbGVjdGVkVGV4dC5sZW5ndGggPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gU2VsZWN0aW9uIE1hZGUnKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogVXBsb2FkIGZpbGUgdG8gdXBsb2FkVXJsXG4gICAqIEBwYXJhbSBmaWxlIFRoZSBmaWxlXG4gICAqL1xuICB1cGxvYWRJbWFnZShmaWxlOiBGaWxlKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8VXBsb2FkUmVzcG9uc2U+PiB7XG5cbiAgICBjb25zdCB1cGxvYWREYXRhOiBGb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuXG4gICAgdXBsb2FkRGF0YS5hcHBlbmQoJ2ZpbGUnLCBmaWxlLCBmaWxlLm5hbWUpO1xuXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PFVwbG9hZFJlc3BvbnNlPih0aGlzLnVwbG9hZFVybCwgdXBsb2FkRGF0YSwge1xuICAgICAgcmVwb3J0UHJvZ3Jlc3M6IHRydWUsXG4gICAgICBvYnNlcnZlOiAnZXZlbnRzJyxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnNlcnQgaW1hZ2Ugd2l0aCBVcmxcbiAgICogQHBhcmFtIGltYWdlVXJsIFRoZSBpbWFnZVVybC5cbiAgICovXG4gIGluc2VydEltYWdlKGltYWdlVXJsOiBzdHJpbmcpIHtcbiAgICB0aGlzLmRvYy5leGVjQ29tbWFuZCgnaW5zZXJ0SW1hZ2UnLCBmYWxzZSwgaW1hZ2VVcmwpO1xuICB9XG5cbiAgc2V0RGVmYXVsdFBhcmFncmFwaFNlcGFyYXRvcihzZXBhcmF0b3I6IHN0cmluZykge1xuICAgIHRoaXMuZG9jLmV4ZWNDb21tYW5kKCdkZWZhdWx0UGFyYWdyYXBoU2VwYXJhdG9yJywgZmFsc2UsIHNlcGFyYXRvcik7XG4gIH1cblxuICBjcmVhdGVDdXN0b21DbGFzcyhjdXN0b21DbGFzczogQ3VzdG9tQ2xhc3MpIHtcbiAgICBsZXQgbmV3VGFnID0gdGhpcy5zZWxlY3RlZFRleHQ7XG4gICAgaWYgKGN1c3RvbUNsYXNzKSB7XG4gICAgICBjb25zdCB0YWdOYW1lID0gY3VzdG9tQ2xhc3MudGFnID8gY3VzdG9tQ2xhc3MudGFnIDogJ3NwYW4nO1xuICAgICAgbmV3VGFnID0gJzwnICsgdGFnTmFtZSArICcgY2xhc3M9XCInICsgY3VzdG9tQ2xhc3MuY2xhc3MgKyAnXCI+JyArIHRoaXMuc2VsZWN0ZWRUZXh0ICsgJzwvJyArIHRhZ05hbWUgKyAnPic7XG4gICAgfVxuICAgIHRoaXMuaW5zZXJ0SHRtbChuZXdUYWcpO1xuICB9XG5cbiAgaW5zZXJ0VmlkZW8odmlkZW9Vcmw6IHN0cmluZykge1xuICAgIGlmICh2aWRlb1VybC5tYXRjaCgnd3d3LnlvdXR1YmUuY29tJykpIHtcbiAgICAgIHRoaXMuaW5zZXJ0WW91VHViZVZpZGVvVGFnKHZpZGVvVXJsKTtcbiAgICB9XG4gICAgaWYgKHZpZGVvVXJsLm1hdGNoKCd2aW1lby5jb20nKSkge1xuICAgICAgdGhpcy5pbnNlcnRWaW1lb1ZpZGVvVGFnKHZpZGVvVXJsKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGluc2VydFlvdVR1YmVWaWRlb1RhZyh2aWRlb1VybDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgaWQgPSB2aWRlb1VybC5zcGxpdCgndj0nKVsxXTtcbiAgICBjb25zdCBpbWFnZVVybCA9IGBodHRwczovL2ltZy55b3V0dWJlLmNvbS92aS8ke2lkfS8wLmpwZ2A7XG4gICAgY29uc3QgdGh1bWJuYWlsID0gYFxuICAgICAgPGRpdiBzdHlsZT0ncG9zaXRpb246IHJlbGF0aXZlJz5cbiAgICAgICAgPGltZyBzdHlsZT0ncG9zaXRpb246IGFic29sdXRlOyBsZWZ0OjIwMHB4OyB0b3A6MTQwcHgnXG4gICAgICAgICAgICAgc3JjPVwiaHR0cHM6Ly9pbWcuaWNvbnM4LmNvbS9jb2xvci85Ni8wMDAwMDAveW91dHViZS1wbGF5LnBuZ1wiXG4gICAgICAgIDxhIGhyZWY9JyR7dmlkZW9Vcmx9JyB0YXJnZXQ9J19ibGFuayc+XG4gICAgICAgICAgPGltZyBzcmM9XCIke2ltYWdlVXJsfVwiIGFsdD1cImNsaWNrIHRvIHdhdGNoXCIvPlxuICAgICAgICA8L2E+XG4gICAgICA8L2Rpdj5gO1xuICAgIHRoaXMuaW5zZXJ0SHRtbCh0aHVtYm5haWwpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbnNlcnRWaW1lb1ZpZGVvVGFnKHZpZGVvVXJsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBzdWIgPSB0aGlzLmh0dHAuZ2V0PGFueT4oYGh0dHBzOi8vdmltZW8uY29tL2FwaS9vZW1iZWQuanNvbj91cmw9JHt2aWRlb1VybH1gKS5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICBjb25zdCBpbWFnZVVybCA9IGRhdGEudGh1bWJuYWlsX3VybF93aXRoX3BsYXlfYnV0dG9uO1xuICAgICAgY29uc3QgdGh1bWJuYWlsID0gYDxkaXY+XG4gICAgICAgIDxhIGhyZWY9JyR7dmlkZW9Vcmx9JyB0YXJnZXQ9J19ibGFuayc+XG4gICAgICAgICAgPGltZyBzcmM9XCIke2ltYWdlVXJsfVwiIGFsdD1cIiR7ZGF0YS50aXRsZX1cIi8+XG4gICAgICAgIDwvYT5cbiAgICAgIDwvZGl2PmA7XG4gICAgICB0aGlzLmluc2VydEh0bWwodGh1bWJuYWlsKTtcbiAgICAgIHN1Yi51bnN1YnNjcmliZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgbmV4dE5vZGUobm9kZSkge1xuICAgIGlmIChub2RlLmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgcmV0dXJuIG5vZGUuZmlyc3RDaGlsZDtcbiAgICB9IGVsc2Uge1xuICAgICAgd2hpbGUgKG5vZGUgJiYgIW5vZGUubmV4dFNpYmxpbmcpIHtcbiAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICAgIH1cbiAgICAgIGlmICghbm9kZSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBub2RlLm5leHRTaWJsaW5nO1xuICAgIH1cbiAgfVxuXG4gIGdldFJhbmdlU2VsZWN0ZWROb2RlcyhyYW5nZSwgaW5jbHVkZVBhcnRpYWxseVNlbGVjdGVkQ29udGFpbmVycykge1xuICAgIGxldCBub2RlID0gcmFuZ2Uuc3RhcnRDb250YWluZXI7XG4gICAgY29uc3QgZW5kTm9kZSA9IHJhbmdlLmVuZENvbnRhaW5lcjtcbiAgICBsZXQgcmFuZ2VOb2RlcyA9IFtdO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIGZvciBhIHJhbmdlIHRoYXQgaXMgY29udGFpbmVkIHdpdGhpbiBhIHNpbmdsZSBub2RlXG4gICAgaWYgKG5vZGUgPT09IGVuZE5vZGUpIHtcbiAgICAgIHJhbmdlTm9kZXMgPSBbbm9kZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEl0ZXJhdGUgbm9kZXMgdW50aWwgd2UgaGl0IHRoZSBlbmQgY29udGFpbmVyXG4gICAgICB3aGlsZSAobm9kZSAmJiBub2RlICE9PSBlbmROb2RlKSB7XG4gICAgICAgIHJhbmdlTm9kZXMucHVzaCggbm9kZSA9IHRoaXMubmV4dE5vZGUobm9kZSkgKTtcbiAgICAgIH1cblxuICAgICAgLy8gQWRkIHBhcnRpYWxseSBzZWxlY3RlZCBub2RlcyBhdCB0aGUgc3RhcnQgb2YgdGhlIHJhbmdlXG4gICAgICBub2RlID0gcmFuZ2Uuc3RhcnRDb250YWluZXI7XG4gICAgICB3aGlsZSAobm9kZSAmJiBub2RlICE9PSByYW5nZS5jb21tb25BbmNlc3RvckNvbnRhaW5lcikge1xuICAgICAgICByYW5nZU5vZGVzLnVuc2hpZnQobm9kZSk7XG4gICAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQWRkIGFuY2VzdG9ycyBvZiB0aGUgcmFuZ2UgY29udGFpbmVyLCBpZiByZXF1aXJlZFxuICAgIGlmIChpbmNsdWRlUGFydGlhbGx5U2VsZWN0ZWRDb250YWluZXJzKSB7XG4gICAgICBub2RlID0gcmFuZ2UuY29tbW9uQW5jZXN0b3JDb250YWluZXI7XG4gICAgICB3aGlsZSAobm9kZSkge1xuICAgICAgICByYW5nZU5vZGVzLnB1c2gobm9kZSk7XG4gICAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJhbmdlTm9kZXM7XG4gIH1cblxuICBnZXRTZWxlY3RlZE5vZGVzKCkge1xuICAgIGNvbnN0IG5vZGVzID0gW107XG4gICAgaWYgKHRoaXMuZG9jLmdldFNlbGVjdGlvbikge1xuICAgICAgY29uc3Qgc2VsID0gdGhpcy5kb2MuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gc2VsLnJhbmdlQ291bnQ7IGkgPCBsZW47ICsraSkge1xuICAgICAgICBub2Rlcy5wdXNoLmFwcGx5KG5vZGVzLCB0aGlzLmdldFJhbmdlU2VsZWN0ZWROb2RlcyhzZWwuZ2V0UmFuZ2VBdChpKSwgdHJ1ZSkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbm9kZXM7XG4gIH1cblxuICByZXBsYWNlV2l0aE93bkNoaWxkcmVuKGVsKSB7XG4gICAgY29uc3QgcGFyZW50ID0gZWwucGFyZW50Tm9kZTtcbiAgICB3aGlsZSAoZWwuaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKGVsLmZpcnN0Q2hpbGQsIGVsKTtcbiAgICB9XG4gICAgcGFyZW50LnJlbW92ZUNoaWxkKGVsKTtcbiAgfVxuXG4gIHJlbW92ZVNlbGVjdGVkRWxlbWVudHModGFnTmFtZXMpIHtcbiAgICBjb25zdCB0YWdOYW1lc0FycmF5ID0gdGFnTmFtZXMudG9Mb3dlckNhc2UoKS5zcGxpdCgnLCcpO1xuICAgIHRoaXMuZ2V0U2VsZWN0ZWROb2RlcygpLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSAxICYmXG4gICAgICAgIHRhZ05hbWVzQXJyYXkuaW5kZXhPZihub2RlLnRhZ05hbWUudG9Mb3dlckNhc2UoKSkgPiAtMSkge1xuICAgICAgICAvLyBSZW1vdmUgdGhlIG5vZGUgYW5kIHJlcGxhY2UgaXQgd2l0aCBpdHMgY2hpbGRyZW5cbiAgICAgICAgdGhpcy5yZXBsYWNlV2l0aE93bkNoaWxkcmVuKG5vZGUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iXX0=