var selection = document.getSelection();

for (var rangeIx = 0; rangeIx < selection.rangeCount; rangeIx++) {
    var range = selection.getRangeAt(rangeIx);
    makeElementReadable($(range.commonAncestorContainer));
}