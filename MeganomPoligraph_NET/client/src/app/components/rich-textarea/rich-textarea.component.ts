import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  OnInit
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Component({
  selector: "app-rich-textarea",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./rich-textarea.component.html",
  styleUrls: ["./rich-textarea.component.css"]
})
export class RichTextareaComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() id: string = "custom-textarea";
  @Input() text: string = "";
  @Input() placeholder: string = "Введіть текст...";
  @Output() textChange = new EventEmitter<string>();

  @ViewChild("editor", { static: true }) editor!: ElementRef<HTMLDivElement>;

  sanitizedText: SafeHtml = "";
  private isInternalUpdate = false;
  private lastCaretPosition = 0;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.updateSanitizedText();
  }

  ngAfterViewInit() {
    if (this.text) {
      this.editor.nativeElement.focus();
      this.setCaretToEnd();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes["text"] &&
      changes["text"].currentValue !== changes["text"].previousValue &&
      !this.isInternalUpdate
    ) {
      this.updateSanitizedText();

      setTimeout(() => {
        this.setCaretToEnd();
      }, 0);
    }
  }

  private updateSanitizedText() {
    this.sanitizedText = this.sanitizer.bypassSecurityTrustHtml(this.text);
  }

  private setCaretToEnd() {
    const editor = this.editor.nativeElement;
    const range = document.createRange();
    const selection = window.getSelection();

    if (editor.childNodes.length > 0) {
      const lastChild = editor.childNodes[editor.childNodes.length - 1];
      range.setStartAfter(lastChild);
    } else {
      range.setStart(editor, 0);
    }

    range.collapse(true);

    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  private saveCaretPosition() {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);

      this.lastCaretPosition = this.getCaretPosition(range);
    }
  }

  private getCaretPosition(range: Range): number {
    const editor = this.editor.nativeElement;
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(editor);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    return preCaretRange.toString().length;
  }

  private restoreCaretPosition() {
    const editor = this.editor.nativeElement;
    const selection = window.getSelection();
    if (!selection) return;

    let charCount = 0;
    let foundPosition = false;

    const traverseNodes = (node: Node): boolean => {
      if (node.nodeType === Node.TEXT_NODE) {
        const textLength = node.textContent?.length || 0;
        if (charCount + textLength >= this.lastCaretPosition) {
          const range = document.createRange();
          range.setStart(node, this.lastCaretPosition - charCount);
          range.collapse(true);
          selection.removeAllRanges();
          selection.addRange(range);
          foundPosition = true;
          return true;
        }
        charCount += textLength;
      } else {
        for (let i = 0; i < node.childNodes.length && !foundPosition; i++) {
          if (traverseNodes(node.childNodes[i])) {
            return true;
          }
        }
      }
      return false;
    };

    traverseNodes(editor);
  }

  onEditorInput(event: Event) {
    this.saveCaretPosition();

    this.isInternalUpdate = true;

    this.updateText();

    setTimeout(() => {
      this.restoreCaretPosition();
      this.isInternalUpdate = false;
    }, 0);
  }

  updateText() {
    const updatedText = this.editor.nativeElement.innerHTML
      .replace(/<div>/g, "<p>")
      .replace(/<\/div>/g, "</p>");

    this.text = updatedText;
    this.textChange.emit(this.text);
    this.updateSanitizedText();
  }

  applyFormatting(tag: string) {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);

    if (tag === "br") {
      const br = document.createElement("br");
      range.insertNode(br);

      const extraBr = document.createElement("br");
      range.insertNode(extraBr);

      range.setStartAfter(extraBr);
      range.setEndAfter(extraBr);
      selection.removeAllRanges();
      selection.addRange(range);

      this.updateText();
      return;
    }

    const selectedText = range.toString();
    if (!selectedText) return;

    let targetElement: HTMLElement | null = null;

    const findParentWithTag = (node: Node, tagName: string): HTMLElement | null => {
      let current: Node | null = node;

      while (current && current !== this.editor.nativeElement) {
        if (
          current.nodeType === Node.ELEMENT_NODE &&
          (current as HTMLElement).tagName.toLowerCase() === tagName.toLowerCase()
        ) {
          return current as HTMLElement;
        }
        current = current.parentNode;
      }

      return null;
    };

    const startParent = findParentWithTag(range.startContainer, tag);
    const endParent = findParentWithTag(range.endContainer, tag);

    if (startParent && startParent === endParent) {
      targetElement = startParent;
    }

    if (targetElement) {
      const fullText = targetElement.textContent || "";

      const textNode = document.createTextNode(fullText);

      targetElement.parentNode?.replaceChild(textNode, targetElement);

      try {
        const newRange = document.createRange();

        newRange.setStart(textNode, 0);
        newRange.setEnd(textNode, fullText.length);

        selection.removeAllRanges();
        selection.addRange(newRange);
      } catch (e) {
        console.error("Помилка відновлення виділення:", e);
      }
    } else {
      const element = document.createElement(tag);
      element.innerHTML = selectedText;
      range.deleteContents();
      range.insertNode(element);

      range.setStartAfter(element);
      range.setEndAfter(element);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    this.updateText();
  }

  clearStyles() {
    const editor = this.editor.nativeElement;

    this.saveCaretPosition();

    const processH5Tags = () => {
      const h5Elements = editor.querySelectorAll("h5");
      h5Elements.forEach(h5 => {
        const textContent = h5.textContent || "";
        const textNode = document.createTextNode(textContent);

        h5.parentNode?.replaceChild(textNode, h5);
      });
    };

    const processBTags = () => {
      const bElements = editor.querySelectorAll("b");
      bElements.forEach(b => {
        const textContent = b.textContent || "";
        const textNode = document.createTextNode(textContent);

        b.parentNode?.replaceChild(textNode, b);
      });
    };

    processH5Tags();
    processBTags();

    this.updateText();

    setTimeout(() => {
      this.restoreCaretPosition();
    }, 0);
  }
}
