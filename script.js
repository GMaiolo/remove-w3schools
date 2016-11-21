(function() {

    init();

    function removeW3Results(){
        var links = allW3Links();
        links.forEach(deleteOldGrandpaNode);
        if(links.length) console.info(links.length + ' W3Schools links were removed from this search.');
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
        var searchInputQuery = 'lst-ib';
        var clcQuery = 'taw';
        var navQuery = 'nav';
        /* handling searching again from the results page */
        window.document.body.addEventListener('change', delayedRemoveW3Results);
        /* search input, as a new search is triggered on every keystroke */
        var searchInput = document.getElementById(searchInputQuery);
        if(searchInput) searchInput.addEventListener('keypress', delayedRemoveW3Results);
        /* correction page relocation */
        var correctionLink = document.getElementById(clcQuery).querySelector('a');
        if(correctionLink) correctionLink.addEventListener('click', delayedRemoveW3Results);
    }

    function delayedRemoveW3Results() {
        setTimeout(removeW3Results, 800);
    }

})();
