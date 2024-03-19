const rootUrl = "http://localhost:9094";


const login = function() {
    let username = $('#username').val();
    let password = $('#password').val();

    $.ajax({
        type: 'POST',
        url: rootUrl + "/login",
        contentType: 'application/json',
        data: JSON.stringify({ "username": username, "password": password }),
        dataType: "json",
        success: function(response) {
            // Assuming response.data contains the role
            switch (response.data) {
                case 'ADMIN':
                    showAdminSection();
                    break;
                case 'CUSTOMER':
                    showCustomerSection();
                    break;
                default:
                    displayErrorMessage();
                    break;
            }
        },
        error: function() {
            alert('Error during request. Please try again.');
        }
    });
};

const showAdminSection = function() {
    $('#login-section').addClass('d-none');
    $('#customer-section').addClass('d-none'); // Hide customer section
    $('#admin-section').removeClass('d-none'); // Show admin section
};

const showCustomerSection = function() {
    $('#login-section').addClass('d-none');
    $('#admin-section').addClass('d-none'); // Hide admin section
    $('#customer-section').removeClass('d-none'); // Show customer section
};

const displayErrorMessage = function() {
    // Remove existing error messages to prevent duplicate messages
    $('#errorMsg').remove();

    // Append error message
    $('#login-card').append(
        `<div id="errorMsg" class="alert alert-danger" role="alert">
            <strong>Error!</strong> Incorrect Username or Password.
        </div>`
    );
};

/*// Hook up the login function to the login form's submit event
$(document).on('submit', '#productForm', function(e) {
    e.preventDefault();
    login();
});*/





//======== products=========// 

var productURL = "http://localhost:9094/products";

var findAll = function() {
	$.ajax({
		type: 'GET',
		url: productURL,
		dataType: "json",
		success: function(data) {
			$('#dashboard_title').text("All Products: ");
			renderList(data);
		}
	});
}

var findById = function(id){
	    $.ajax({
        type: 'GET',
        url: productURL + '/'+ id,
        dataType: "json", 
        success: function(product){
			$('#dashboard_title').text("Filtering by ID: " + id);
			showDetails(product);
		}
    });
}

// /products/search/brand/{queryBrand}
var findByBrand = function(brand) {
	console.log("Filter by Brand");
	$.ajax({
		type: 'GET',
		url: productURL+ '/search/brand/' + brand,
		dataType: "json",
		success: function(data) {
			$('#dashboard_title').text("Filtering by Brand: " + brand);
			renderList(data);
		}
	});
}

// /products/search/item/serum
var findByType = function(type){
	    $.ajax({
        type: 'GET',
        url: productURL + '/search/type/' + type,
        dataType: "json",
        success: function(data) {
			$('#dashboard_title').text("Filtering by Type: " + type);
			renderList(data);
			},
        error: function() {
            alert("Error fetching data");
            }
    });
};

var findBySkinConcern = function(skinConcern){
	    $.ajax({
        type: 'GET',
        url: productURL + '/search/skin_concern/' + skinConcern,
        dataType: "json",
        success: function(data) {
			$('#dashboard_title').text("Filtering by Skin Concern: " + skinConcern);
			renderList(data);
			},
        error: function() {
            alert("Error fetching data");
            }
    });
};

///products/search/deal/5
var findByDeal = function(deal){
	    $.ajax({
        type: 'GET',
        url: productURL + '/search/deal/' + deal,
        dataType: "json",
		success: function(data) {
			let dealValue = parseFloat(deal);
			$('#dashboard_title').text("Filtering by Discount of \u20AC" + dealValue.toFixed(2) + " or more..");
			renderList(data);
		}
	});
}

var renderList = function(data){
	    var list = data.map(function(product) {
        return `
            <div class="details col-sm-4 text-center p-3 d-grid" id="product-${product.id}">
                <h1>${product.name}</h1>
                <img src="${'src', 'images/' + product.images}" class="displayCenter">
                <p><b>${product.brand} ${product.price}</b></p>
                <p>${product.skinConcern}</p>
                <button type="button" class="infoButton btn btn-primary" id="${product.id}">More Details</button>
            </div>
        `;
    }).join('');
    $('#merchContent').html(list);
    feather.replace(); // This will re-initialize feather icons if they are used within the product details
};


var showDetails = function(product){
	console.log("Show Details");
	$('#detailsModal').find('.modal-title').text(product.brand + " - " + product.name);
	$('#pic').attr('src', 'images/' + product.images);
	//ingredients
	$('#ingredients').text(product.ingredients);
	$('#description').text(product.description);
	    // ... set other details fields
	$('#rrp').val(product.rrp);
	$('#online_price').val(product.online);
	var saving = product.rrp - product.online;
	var percent = (saving/product.rrp)*100;
	$('#saving').val("\u20AC" + saving.toFixed(2) + " (" + (percent).toFixed(2) + "%)");
	$('#detailsModal').modal('show');
};


//When the DOM is ready for the customer page.
$(document).ready(function () {
	 $('#loginSubmit').on('click', function(event) {
        event.preventDefault();
        login();
    });
    $(document).on("click", ".infoButton", function () { findById(this.id); });
    $(document).on("click", "#home_but", function () { 
        console.log("Home button clicked - list all");
		findAll();
     });
	$(document).on("click", "#listBrand_but", function () { 
        console.log("Search brand clicked");
		$('#filterModalBrand').modal('show');
     });	
	$(document).on("click", "#listType_but", function () { 
		$('#filterModalType').modal('show');
        console.log("Search type clicked");
     });	
   $(document).on("click", "#listConcern_but", function () { 
		$('#filterModalConcern').modal('show');
        console.log("Search skinConcern clicked");
     });	
	$(document).on("click", "#listDeals_but", function () { 
		$('#filterModalDeal').modal('show');
        console.log("List deals clicked");
     });	
	 $(document).on("click", "#submitBrandButton", function () {
		let brand = $('#brand').val();
		$('#brand').val("")
		$('#filterModalBrand').modal('hide');
		if ((brand) == "") {
			findAll();
		}
		else {
			console.log("Brand search parameter: "+$('#brand').val());
			findByBrand(brand);
		}
	});
	$(document).on("click", "#submitTypeButton", function () {
		let type = $('#type').val();
		$('#type').val("")
		$('#filterModalType').modal('hide');
		if ((type) == "") {
			findAll();
		}
		else {
			console.log("Type search parameter: "+$('#type').val());
			findByType(type);
		}
	});
		$(document).on("click", "#submitConcernButton", function () {
		let concern = $('#concern').val();
		$('#concern').val("")
		$('#filterModalType').modal('hide');
		if ((concern) == "") {
			findAll();
		}
		else {
			console.log("SkinConcern search parameter: "+$('#concern').val());
			findBySkinConcern(concern);
		}
	});
	$(document).on("click", "#submitDealButton", function () {
		let deal = $('#deal').val();
		$('#deal').val("")
		$('#filterModalDeal').modal('hide');
		if ((deal) == "") {
			findAll();
		}
		else {
			if(isNaN(deal)){
				alert("Please enter a numerical value, no letters");
			}
			else{
				console.log("deal search parameter: "+$('#deal').val());
				findByDeal(deal);
			}
		}
	});
	findAll();
});



