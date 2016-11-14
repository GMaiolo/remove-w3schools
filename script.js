init();

function init() {
    removeW3Results();
    /* handling searching again from the results page */
    window.document.body.onchange = function() {
        setTimeout(removeW3Results, 800);
    }
}

function removeW3Results(){
    /* avoiding google new tab page, etc */
    if(window.location.pathname !== '/search') return;
    var allW3Links = allW3Links();
    console.info(allW3Links.length + ' W3Schools links will be removed from this search.');
    allW3Links.forEach(deleteOldGrandpaNode);

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
