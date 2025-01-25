const selectors = {
  result_links: '.g div span > a[href*="www.w3schools.com"]',
  link_parent_node: "#rso div.g",
  main_google_node: "main",
  accordion_expander: "g-accordion-expander",
  huge_card_on_the_right: "#wp-tabs-container",
};

function remove() {
  const w3SchoolsLinks = Array.from(
    document.querySelectorAll(selectors.result_links)
  );

  /* ignoring dropdown items and huge card on the right */
  const links = w3SchoolsLinks.filter(function (link) {
    const isAccordionItem = Boolean(link.closest(selectors.accordion_expander));
    const isHugeCardOnTheRight = Boolean(
      link.closest(selectors.huge_card_on_the_right)
    );

    return !isAccordionItem && !isHugeCardOnTheRight;
  });

  links.forEach((el) => {
    const parent = el.closest(selectors.link_parent_node);

    if (!parent) {
      return console.warn(
        "W3SchoolsRemover link selectors need to be updated, please raise an issue!"
      );
    }

    parent.style.display = "none";
  });

  console.info(
    `${links.length} W3Schools links were removed from this search.`
  );
}

function init() {
  /* avoiding google new tab page and other variations */
  const mainGoogleNode = document.getElementById(selectors.main_google_node);

  if (!mainGoogleNode) {
    return console.warn(
      "W3SchoolsRemover main selector needs to be updated, please raise an issue!"
    );
  }

  remove();

  const observer = new MutationObserver(remove);
  observer.observe(mainGoogleNode, { childList: true, subtree: true });
}

/**
 * may need to tune this timeout in the future
 * otherwise we get progressive removals instead of all them together
 */
setTimeout(() => {
  init();
}, 250);
