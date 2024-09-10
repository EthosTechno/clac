window.onscroll = () => {
  const Header = document.querySelector("header");
  if (window.scrollY >= 20) {
    Header.classList.add("sticked");
  } else {
    Header.classList.remove("sticked");
  }
};

jQuery(document).on("mouseup", function (e) {
  var container = jQuery(".menu-wrapper");
  var MobileToggler = jQuery(".mobile-toggler");

  if (
    !container.is(e.target) &&
    container.has(e.target).length === 0 &&
    !MobileToggler.is(e.target) &&
    MobileToggler.has(e.target).length === 0
  ) {
    container.removeClass("opened");
    MobileToggler.removeClass("close");
  }
});
