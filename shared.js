function makeElementReadable(jqueryElement) {
    jqueryElement.filter("p, li").lettering('lines').children('span').lettering('words').children('span').lettering();
}

function findParentToLetterify(node) {
    candidate = node;
    while (candidate != null && candidate.tagName != "P" && candidate.tagName != "LI") {
        candidate = candidate.parentNode;
    }

    if (candidate != null) {
        return candidate;
    }
    else {
        return node;
    }
}