const rootUrl = "http://localhost:9092";


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
            switch (response.data) {
                case 'ADMIN':
 //                   loadContentForRole(RoleType.ADMIN, username);
                    showHome();
                    break;
                case 'CUSTOMER':
 //                   loadContentForRole(RoleType.CUSTOMER, username);
                    showHome();
                    break;
                default:
                    $('#login-card')
                    .append("<div id=\"errorMsg\" class=\"alert alert-danger\"><strong>Error!</strong> Incorrect Username or password</div>").show();
                    break;
            }
        },
        error: function() {
            alert('Error during request. Incorrect username or password');
        }
    });
};

const showHome = function() {
    $('#login-section').addClass("d-none");
    $('#home-section').removeClass("d-none");
}



//======== main=========// 

var productURL = "http://localhost:9092/products";

var findAll = function(){
	    $.ajax({
        type: 'GET',
        url: productURL,
        dataType: "json", // data type of response
        success: renderList
    });
};

var findById = function(id){
	    $.ajax({
        type: 'GET',
        url: productURL + '/' + id,
        dataType: "json",
        success: function(data) {
            showDetails(data);
        },
    error: function(error) {
      console.error('Error fetching store details: ', error);
    }
    });
};

var findByBrand = function(brand){
	    $.ajax({
        type: 'GET',
        url: productURL + '/search/brand/' + brand,
        dataType: "json",
        success: renderList,
        error: function() {
            alert("Error fetching data");
        }
    });
};

var findByType = function(type){
	    $.ajax({
        type: 'GET',
        url: productURL + '/search/type/' + type,
        dataType: "json",
        success: renderList,
        error: function() {
            alert("Error fetching data");
        }
    });
};

var findBySkinConcern = function(type){
	    $.ajax({
        type: 'GET',
        url: productURL + '/search/skin_concern/' + type,
        dataType: "json",
        success: renderList,
        error: function() {
            alert("Error fetching data");
        }
    });
};

var findByDeal = function(deal){
	    // This would depend on how your backend is set up to handle this query.
    // Assuming there's an endpoint to search by deal:
    $.ajax({
        type: 'GET',
        url: productURL + '/search/deal/' + deal,
        dataType: "json",
        success: renderList
    });
};

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
    // Implementation of this function would depend on how you want to display the details.
    // It could fill in a modal dialog or some kind of details pane.
    // For example, assuming modal fields with IDs shown in your HTML template:
    console.log(product)
    $('.modal-title').text(product.brand +"-"+ product.scent);
    $('#pic').attr('src', 'images/' + product.images);
    $('#description').text(product.description);
    // ... set other details fields
    $('#rrp').val(product.rrp);
    $('#online_price').val(product.online);
    $('#saving').val(product.rrp - product.online);
    $('#detailsModal').modal('show');
};

//Home Button
$('#home_but').click(function() {
    findAll();
});

//Seach Brand Button
$('#listBrand_but').click(function() {
    $('#filterModalBrand').modal('show');
});

$('#submitBrandButton').click(function() {
    var minYear = $('#minYear').val();
    var maxYear = $('#maxYear').val();
    findByBrand(minYear, maxYear); // Assuming this function is defined to handle min/max year
});


//Seach Type Button
$('#listType_but').click(function() {
    $('#filterModalType').modal('show');
});

$('#submitTypeButton').click(function() {
    var minYear = $('#minYear').val();
    var maxYear = $('#maxYear').val();
    findByType(minYear, maxYear); // Assuming this function is defined to handle min/max year
});

//Seach SkinConcern Button
$('#listConcern_but').click(function() {
    $('#filterModalConcern').modal('show');
});

$('#submitConcernButton').click(function() {
    var minYear = $('#minYear').val();
    var maxYear = $('#maxYear').val();
    findBySkinConcern(minYear, maxYear); // Assuming this function is defined to handle min/max year
});


//Search Deals Button
$('#listDeals_but').click(function() {
    $('#filterModalDeal').modal('show');
});

$('#submitDealButton').click(function() {
    var minYear = $('#minYear').val();
    var maxYear = $('#maxYear').val();
    findByDeal(minYear, maxYear); // Assuming this function is defined to handle min/max year
});




//When the DOM is ready.
//Students dont have to code this section.
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