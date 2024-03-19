
//======== admin=========// 
var adminURL = "http://localhost:9094/admin-products";
var customerURL = "http://localhost:9094/admin-customers";
let currentProduct;

function findAllpro() {
	console.log("Find all Product");
  $.ajax({
    type: 'GET',
    url: adminURL,
    dataType: "json",
    success: renderListPro
  });
};

function findByIdpro(id) {
  console.log('findByIdpro: ' + id);
  $.ajax({
    type: 'GET',
    url: adminURL + '/' + id,
    dataType: "json",
    success: function(data) {
      $('#btnDelete').show();
      console.log('findByIdpro success: ' + data.name);
      currentProduct = data;
      renderDetailsPro(currentProduct);
    },
    error: function(error) {
      console.error('Error fetching product details: ', error);
    }
  });
};



function renderListPro(data) {
  var list = data == null ? [] : (data instanceof Array ? data : [data]);
  $('#productList').empty(); // Clear the current list

  console.log("Product List:", list); // Corrected logging statement

  $.each(list, function(index, product) {
	$('#productList').append('<li><a href="#" data-id="' + product.id + '">' + product.name + '</a></li>');
  });
}

function renderDetailsPro(product) {
  $('#productId').val(product.id);
  $('#productName').val(product.name);
  $('#productRrp').val(product.rrp);
  $('#productOnline').val(product.online);
  $('#productScent').val(product.scent);
  $('#productBrand').val(product.brand);
  $('#productType').val(product.type);
  $('#productVolume').val(product.volume);
  //console.log(product.skinConcern);
  $('#productConcern').val(product.skinConcern);
  $('#productIngredient').val(product.ingredients);
  $('#productUsage').val(product.usage);
  $('#productBenefit').val(product.benefits);
  $('#productQuantity').val(product.quantity_in_stock);
  //console.log('images/' + product.images);
  $('#pics').attr('src', 'images/' + product.images);
  console.log(product.description);
  $('#description').val(product.description);
};

function resetForm() {
  $('#productId').val("");
  $('#productName').val("");
  $('#productRrp').val("");
  $('#productOnline').val("");
  $('#productScent').val("");
  $('#productBrand').val("");
  $('#productType').val("");
  $('#productVolume').val("");
  $('#productConcern').val("");
  $('#productIngredient').val("");
  $('#productUsage').val("");
  $('#productBenefit').val("");
  $('#productQuantity').val("");
  $('#pic').attr('src', "");
  $('#description').val("");
}

function newProduct() {
  $('#btnDelete').hide();
  resetForm();
};

// Helper function to serialize all the form fields into a JSON string
function formToJSON() {
  return JSON.stringify({
	 "id": $('#productId').val() || null,
    "name": $('#productName').val(),
    "rrp": $('#productRrp').val(),
    "online": $('#productOnline').val(),
    "scent": $('#productScent').val(),
    "brand": $('#productBrand').val(),
    "type": $('#productType').val() || null,
    "volume": $('#productVolume').val(),
    "skin_concern": $('#productConcern').val(),
    "ingredients": $('#productIngredient').val(),
    "usage": $('#productUsage').val(),
    "benefits": $('#productBenefit').val(),
    "quantity_in_stock": $('#productQuantity').val(), // Make sure this matches your actual input's ID
    "picture": currentProduct ? currentProduct.images : "generic.jpg",
    "description": $('#description').val()
  });
};

/*function addProduct() {
  console.log('addProduct');
  $.ajax({
    type: 'POST',
    contentType: 'application/json',
    url: adminURL,
    dataType: "json",
    data: formToJSON(),
    success: function(data, textStatus, jqXHR) {
      alert('Product created successfully');
      $('#btnDelete').show();
      $('#productId').val(data.id);
      findAllpro();
    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert('addProduct error: ' + textStatus);
    }
  });
};*/

  function addProduct() {
  console.log('addProduct');
  $.ajax({
    type: 'POST',
    contentType: 'application/json',
    url: adminURL,
    dataType: "json",
    data: formToJSON(),
    success: function(data, textStatus, jqXHR) {
      alert('Product created successfully');
      $('#btnDelete').show();
      $('#productId').val(data.id);
      findAllpro();
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.error('addProduct error: ', textStatus, errorThrown);
      console.error('Response:', jqXHR.responseText);
      alert('addProduct error: ' + textStatus + ', ' + errorThrown);
    }
  });
}


function updateProduct() {
  console.log('updateProduct');
  $.ajax({
    type: 'PUT',
    contentType: 'application/json',
    url: adminURL + '/' + $('#productId').val(),
    dataType: "json",
    data: formToJSON(),
    success: function(data, textStatus, jqXHR) {
      alert('Product updated successfully');
      findAllpro();
    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert('updateProduct error: ' + textStatus);
    }
  });
};

function deleteProduct() {
	console.log('deleteProduct');
	$.ajax({
		type: 'DELETE',
        url: adminURL + '/' + $('#productId').val(),
		success: function(data, textStatus, jqXHR){
			alert('Product deleted successfully');
			resetForm();
			findAllpro();
		},
    error: function(jqXHR, textStatus, errorThrown) {
      console.error('deleteProduct error: ', textStatus, errorThrown);
      console.error('Response:', jqXHR.responseText);
      alert('deleteProduct error: ' + textStatus + ', ' + errorThrown);
    }
  });
}
	
function search(searchKey) {
	resetForm();
	if (searchKey == '')
	    findAllpro();
	 else
	    findByName(searchKey);
	};
	
function findByName(searchKey) {
    console.log('findByName: ' + searchKey + '\tRESTful' + adminURL + '/name/' + searchKey);
    $.ajax({
        type: 'GET',
        url: adminURL + '/name/' + encodeURIComponent(searchKey), // Corrected URL
        dataType: "json",
        success: renderListPro
    });
};
	


//When the DOM is ready for admin section
$(document).ready(function() {
  findAllpro();

  $('#btnDelete').hide();

  $(document).on('click', '#productList a', function() {
    findByIdpro($(this).data('id'));
  });

  $('#btnAdd').click(function() {
    newProduct();
  });

  $('#btnSave').click(function() {
    if ($('#productId').val() == '') {
      addProduct();
    } else {
      updateProduct();
    }
    return false;
  });

  // The Delete button functionality should be added here if required.
$(document).on('click', '#btnDelete', function(){
	deleteProduct();
	return false;
});

    // Event handler for search button click
    $(document).on('click', '#btnSearch', function() {
        search($('#searchKey').val());
        return false;
    });

    // Event handler for pressing Enter in the search input field
    $(document).on('keypress', '#searchKey', function(e) {
        if (e.which == 13) {
            search($('#searchKey').val());
            return false;
        }
    });
    
   // resetForm();
    $('#searchKey').val("");
    
    $('#productForm').on('submit', function(e) {
  e.preventDefault();
  if ($('#productId').val() == '') {
    addProduct();
  } else {
    updateProduct();
  }
});

/*
//Admin DataTable Product side

 var productTable  = $('#productTable').DataTable({
        "ajax": {
            "url": adminURL,
            "dataSrc": ""
        },
    "columns": [
        { "data": "id" },
        { "data": "name" },
        { "data": "rrp" },
        { "data": "online" },
        { "data": "scent" },
        { "data": "brand" },
        { "data": "type" },
        { "data": "volume" },
        { "data": "skinConcern" }, // Note: skinConcern here matches the property name in the data
        { "data": "ingredients" },
        { "data": "usage" },
        { "data": "benefits" },
        { "data": "quantity_in_stock" } // Note: quantity_in_stock matches the property name in the data
        // Add additional columns as needed
    ]
    });
    
     var customerTable  = $('#customerTable').DataTable({
        "ajax": {
            "url": customerURL,
            "dataSrc": ""
        },
    "columns": [
        { "data": "id" },
        { "data": "first_name" },
        { "data": "last_name" },
        { "data": "email" },
        { "data": "skin_type" },
        { "data": "allergies" },
    ]

});

    // Hide the DataTable on initial page load
    $('#dataTableContainer').addClass('d-none');
    
    // Click event for the "Show Products" button
    $('#btnShowDataTable').click(function() {
        $('#admin-section').addClass('d-none'); // Hide the admin section
        $('#dataTableContainer').removeClass('d-none'); // Show the DataTable container
    });

    // If you want to provide a way to go back to the admin section,
    // you would need another button or link for that. Here's an example:
    $('#btnBackToAdmin').click(function() {
        $('#dataTableContainer').addClass('d-none'); // Hide the DataTable container
        $('#admin-section').removeClass('d-none'); // Show the admin section
    });*/
    
    
    
/*$('#btnShowCustomers').click(function() {
    $('.admin-section').addClass('d-none'); // Hide all admin sections
    $('.customers-data-table').removeClass('d-none'); // Show the customers data table section
});

    
    $('#btnBackToProductAdmin').click(function() {
        // Hide the products data table section
        $('.products-data-table').addClass('d-none'); 
        // Show the main admin section
        $('#admin-section').removeClass('d-none');
    });
    
        // Event handler for returning to the main admin section from the customers section
    $('#btnBackToCustomerAdmin').click(function() {
        // Hide the customers data table section
        $('.customers-data-table').addClass('d-none'); 
        // Show the main admin section
        $('#admin-section').removeClass('d-none');
    });*/
    
});


//Admin DataTable Product side
$(document).ready(function() {
 var productTable  = $('#productTable').DataTable({
        "ajax": {
            "url": '/admin-products',
            "dataSrc": ""
        },
    "columns": [
        { "data": "id" },
        { "data": "name" },
        { "data": "rrp" },
        { "data": "online" },
        { "data": "scent" },
        { "data": "brand" },
        { "data": "type" },
        { "data": "volume" },
        { "data": "skinConcern" }, // Note: skinConcern here matches the property name in the data
        { "data": "ingredients" },
        { "data": "usage" },
        { "data": "benefits" },
        { "data": "quantity_in_stock" } // Note: quantity_in_stock matches the property name in the data
        // Add additional columns as needed
    ]
    });
    
       // Hide the DataTable on initial page load
    $('#dataTableContainer').addClass('d-none');
    
    $('#btnShowProducts').click(function() {
        $('#admin-section').addClass('d-none'); // Hide admin section
        $('#dataTableContainer').removeClass('d-none'); // Show DataTable section
    });

    // Button to return to the admin section from the DataTable view
    $('#btnBackToAdmin').click(function() {
        $('#dataTableContainer').addClass('d-none'); // Hide DataTable section
        $('#admin-section').removeClass('d-none'); // Show admin section
    });
    
});

//Admin DataTable Customer Side
$(document).ready(function() {
 var table = $('#customerTable').DataTable({
        "ajax": {
            "url": "/admin-customers",
            "dataSrc": ""
        },
    "columns": [
        { "data": "id" },
        { "data": "first_name" },
        { "data": "last_name" },
        { "data": "email" },
        { "data": "skin_type" },
        { "data": "allergies" },
    ]
    });
    
        // Hide the DataTable on initial page load
    $('#customerDataTable').addClass('d-none');
    
    // Click event for the "Show Customer" button
    $('#btnShowCustomers').click(function() {
        $('#admin-section').addClass('d-none'); // Hide the admin section
        $('#customerDataTable').removeClass('d-none'); // Show the DataTable container
    });
    
        // If you want to provide a way to go back to the admin section,
    // you would need another button or link for that. Here's an example:
    $('#btnBackAdmin').click(function() {
        $('#customerDataTable').addClass('d-none'); // Hide the DataTable container
        $('#admin-section').removeClass('d-none'); // Show the admin section
    });
    
});

//Admin DataTable Customer Side
$(document).ready(function() {
 var table = $('#orderTable').DataTable({
        "ajax": {
            "url": "/admin-orders",
            "dataSrc": ""
        },
    "columns": [
        { "data": "id" },
        { "data": "customer_id" },
        { "data": "product_id" },
        { "data": "quantity" },
    ]
    });
    
        // Hide the DataTable on initial page load
    $('#orderDataTable').addClass('d-none');
    
    // Click event for the "Show Customer" button
    $('#btnShowOrders').click(function() {
        $('#admin-section').addClass('d-none'); // Hide the admin section
        $('#orderDataTable').removeClass('d-none'); // Show the DataTable container
    });
    
        // If you want to provide a way to go back to the admin section,
    // you would need another button or link for that. Here's an example:
    $('#btnBackForAdmin').click(function() {
        $('#orderDataTable').addClass('d-none'); // Hide the DataTable container
        $('#admin-section').removeClass('d-none'); // Show the admin section
    });
    
});




