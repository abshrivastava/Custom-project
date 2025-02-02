(function(window, undefined) {
  var dictionary = {
    "35977c2b-852b-496a-a857-16bb671acdd9": "Dashboard - Redeem (Desktop)",
    "237d2074-94c7-47c6-a764-4c01c53072c5": "Dashboard - Earn (Tablet)",
    "d12245cc-1680-458d-89dd-4f0d7fb22724": "Dashboard - Earn (Desktop)",
    "80c3cedb-4e48-4602-bd61-96aa60736d9b": "Dashboard - Earn (Mobile)",
    "0e2b2fe6-c3e3-45b3-bd4e-0787faf0a040": "Dashboard - Offers (Desktop)",
    "87db3cf7-6bd4-40c3-b29c-45680fb11462": "960 grid - 16 columns",
    "e5f958a4-53ae-426e-8c05-2f7d8e00b762": "960 grid - 12 columns",
    "f39803f7-df02-4169-93eb-7547fb8c961a": "Template 1",
    "bb8abf58-f55e-472d-af05-a7d1bb0cc014": "default"
  };

  var uriRE = /^(\/#)?(screens|templates|masters|scenarios)\/(.*)(\.html)?/;
  window.lookUpURL = function(fragment) {
    var matches = uriRE.exec(fragment || "") || [],
        folder = matches[2] || "",
        canvas = matches[3] || "",
        name, url;
    if(dictionary.hasOwnProperty(canvas)) { /* search by name */
      url = folder + "/" + canvas;
    }
    return url;
  };

  window.lookUpName = function(fragment) {
    var matches = uriRE.exec(fragment || "") || [],
        folder = matches[2] || "",
        canvas = matches[3] || "",
        name, canvasName;
    if(dictionary.hasOwnProperty(canvas)) { /* search by name */
      canvasName = dictionary[canvas];
    }
    return canvasName;
  };
})(window);