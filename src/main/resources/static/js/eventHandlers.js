
// Application Event Handlers
$(document).ready(function() {
    // Login
    $('#loginSubmit').on('click', function(event) {
        event.preventDefault();
        login();
    });

    // Landing Page
    $('#nav-bar').on('click', '#header-content', function() {
        navigatePage('#landing-window');
    });

//Products
$('#product-sidebar-btn').on('click', function(event) {
    event.preventDefault(); // Prevent default button click behavior
    fetchProducts(); // Assuming you have this function defined to fetch and display products
    navigatePage('#product-window');
  //  $('#detailsModal').modal('show'); // If you want to show the modal immediately
});




});

const navigatePage = function(pageID) {
    $('.home-content').addClass('d-none');
    $(pageID).removeClass('d-none');
}
