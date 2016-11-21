init();

function removeW3Results(){
    var allW3Links = allW3Links();
    allW3Links.forEach(deleteOldGrandpaNode);
    if(allW3Links.length) console.info(allW3Links.length + ' W3Schools links were removed from this search.');

    function allW3Links() {
        var resultLinksQuery = 'div.g .r > a';
        var links = document.querySelectorAll(resultLinksQuery);
        return Array.prototype.filter.call(links, isFromW3);
    }

    function deleteOldGrandpaNode(el) {
        var parent = el.parentNode;
        if(!parent) return;
        parent = parent.parentNode;
        if(!parent) return;
        parent = parent.parentNode;
        if(!parent) return;
        parent.remove();
    }

    function isFromW3(link) {
        return link.getAttribute('href').indexOf('w3schools') > 0;
    }
}

function init() {
    /* avoiding google new tab page, etc */
    if(window.location.pathname !== '/search') return;
    attachEvents();
    delayedRemoveW3Results();
}

function attachEvents() {
    var searchInputSelector = 'lst-ib';
    /* handling searching again from the results page */
    window.document.body.addEventListener('change', delayedRemoveW3Results);
    /* search input, as a new search is triggered on every keystroke */
    var searchInput = document.getElementById(searchInputSelector);
    searchInput.addEventListener('keypress', delayedRemoveW3Results);
    /* new page */
}

function delayedRemoveW3Results() {
    setTimeout(removeW3Results, 800);
}
