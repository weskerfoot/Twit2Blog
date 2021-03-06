(function() {
  function getLastXPath(xpexp) {
    var iterator = document.evaluate(xpexp, document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    var result = iterator.iterateNext();
    var lastEl = result;

    while(result != null) {
      result = iterator.iterateNext();
      if (result == null) {
        break;
      }
      lastEl = result;
    }
    return lastEl;
  }

  function getLastTweet() {
    var author = window.location.pathname.split('/')[1];
    var xp = "//a[contains(@href, '"+author+"/status') and not(contains(@href, 'photo')) and not(contains(@href, 'like')) and not(contains(@href, 'retweet'))]";
    return getLastXPath(xp).pathname;
  }

  function queueTweet() {
    /* TODO check the current URL */
    var lastTweet = getLastTweet();
    var url = "http://localhost:8080/thread"+lastTweet;
    window.open(url, "_blank");
  }

  queueTweet();

})()
