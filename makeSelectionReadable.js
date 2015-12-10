var selection = document.getSelection();

for (var rangeIx = 0; rangeIx < selection.rangeCount; rangeIx++) {
    var range = selection.getRangeAt(rangeIx);
    var startNode = findParentToLetterify(range.startContainer);
    var endNode = findParentToLetterify(range.endContainer);

    var node = startNode;
    makeElementReadable($(node));
    while (node != endNode) {
        node = node.nextElementSibling;
        makeElementReadable($(node));
    }
}


