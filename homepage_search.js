var searchquery = "";

var searchproviders = {
  b: function(){load_items(); return "";},
  back: function(){this.b();},
  g:  function(query){return 'https://www.google.com/search?q='+query;},
  wa: function(query){return 'http://www.wolframalpha.com/input/?i='+query;},
  nyaa: function(query){return 'http://www.nyaa.se/?page=search&term='+query;},
  wiki: function(query, fullmatch){return 'http://en.wikipedia.org/w/index.php?search='+query;},
  w: function(query, fullmatch){return this.wiki(query, fullmatch);},
  yt: function(query){return 'https://www.youtube.com/results?search_query='+query;},
  mdn: function(query){return 'https://developer.mozilla.org/en-US/search?q='+query;},
  choose_category: function(cat){load_sites(cat); return "";},
  open_site: function(site){document.location.href = sites.filter(function(s_){return s_.name==site;})[0].link_properties.link;}
};
