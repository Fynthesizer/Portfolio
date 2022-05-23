/*eslint-env browser*/

function getHashFilter() {
  var matches = location.hash.match(/filter=([^&]+)/i);
  var hashFilter = matches && matches[1];
  return hashFilter && decodeURIComponent(hashFilter);
}

let $grid = $("#portfolio-grid");

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

document.addEventListener("projectsLoaded", (event) => {
  const elements = document.getElementsByClassName("portfolio-item");
  console.log(elements.length);
  $grid.isotope("appended", elements);
  let grid = $grid.isotope({
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

  grid.imagesLoaded().progress(function () {
    $grid.isotope("layout");
  });
});
