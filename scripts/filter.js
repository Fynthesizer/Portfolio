/*eslint-env browser*/

filterSelection("all");
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("portfolio-item");
  if (c == "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) {
      w3AddClass(x[i], "show");
      //$("#portfolio-grid").prepend(x[i]);
    }
  }
}

function getHashFilter() {
  var hash = location.hash;
  // get filter=filterName
  var matches = location.hash.match(/filter=([^&]+)/i);
  var hashFilter = matches && matches[1];
  return hashFilter && decodeURIComponent(hashFilter);
}

var $grid = $("#portfolio-grid");

// Show filtered elements
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

// Add active class to the current control button (highlight it)
var $filterButtonGroup = $("#filterContainer");
var btnContainer = document.getElementById("filterContainer");
var btns = btnContainer.getElementsByClassName("filterBtn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    var filterAttr = $(this).attr("data-filter");
    // set filter in hash
    location.hash = "filter=" + encodeURIComponent(filterAttr);
  });
}

var isIsotopeInit = false;

window.addEventListener("load", (event) => {
  $("#portfolio-grid").isotope({
    percentPosition: true,
    itemSelector: ".portfolio-item",
    layoutMode: "fitRows",
    stagger: 50,
    transitionDuration: "0.5s",
    hiddenStyle: {
      opacity: 0,
    },
    visibleStyle: {
      opacity: 1,
    },
  });
});

function onHashchange() {
  var hashFilter = getHashFilter();
  if (!hashFilter && isIsotopeInit) {
    return;
  }
  isIsotopeInit = true;
  // filter isotope
  //if (hashFilter != null) $("#portfolio").get(0).scrollIntoView();
  $grid.isotope({
    itemSelector: ".portfolio-item",
    layoutMode: "fitRows",
    // use filterFns
    filter: hashFilter,
  });
  // set selected class on button
  if (hashFilter) {
    $filterButtonGroup.find(".active").removeClass("active");
    $filterButtonGroup
      .find('[data-filter="' + hashFilter + '"]')
      .addClass("active");
  }
}

$(window).on("hashchange", onHashchange);

// trigger event handler to init Isotope
onHashchange();
