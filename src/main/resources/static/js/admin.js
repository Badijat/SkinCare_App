
//======== admin=========// 
var adminURL = "http://localhost:9094/admin-products";
var customerURL = "http://localhost:9094/admin-customers";
let currentProduct;

function findAllpro() {
	//console.log("Find all Product");
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

 // console.log("Product List:", list); // Corrected logging statement

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
  //console.log(product.description);
  $('#proddescription').val(product.description);
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
  $('#proddescription').val("");
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
    "description": $('#proddescription').val()
  });
};

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

$(document).on('click', '#btnDelete', function(){
	deleteProduct();
	return false;
});

    $(document).on('click', '#btnSearch', function() {
        search($('#searchKey').val());
        return false;
    });

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


    
});


var productQuantities = [];
var productNames = [];
var myChart;

// When the DOM is ready
$(document).ready(function() {
   
    var productTable = $('#productTable').DataTable({
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
            { "data": "skinConcern" },
            { "data": "ingredients" },
            { "data": "usage" },
            { "data": "benefits" },
            { "data": "quantity_in_stock" },
            { 
              "data": "description", 
              "render": function (data, type, row) {
                  return type === 'display' && data.length > 30 ?
                         data.substr(0, 30) + '…' :
                         data;
              },
              "width": "40%" 
            }
        ],
        "columnDefs": [
            { "width": "5%", "targets": 0 }, 
         
        ]
    });

    // Fetch data for the chart
    function fetchDataForChart() {
        // Clear previous data
        productQuantities = [];
        productNames = [];
        
        // Fetch data from the DataTable
        productTable.rows().every(function() {
            var data = this.data();
            productQuantities.push(parseInt(data.quantity_in_stock)); 
            productNames.push(data.name);
        });
        
        console.log('Quantities:', productQuantities);
        console.log('Names:', productNames);
    }

    // Create the chart
    function createChart() {
        var ctx = document.getElementById('productChart').getContext('2d');
        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: productNames,
                datasets: [{
                    label: 'Quantity',
                    data: productQuantities,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        
        console.log('Chart should be initialized now.');
    }
    
        $('#dataTableContainer').addClass('d-none');

    // Button to display the DataTable of products
        $('#btnShowProducts').click(function() {
        $('#admin-section').addClass('d-none'); // Hide admin section
        $('#dataTableContainer').removeClass('d-none'); // Show DataTable section
    });

// Event handler for "Display Chart" button
$('#btnDisplayChart').click(function() {
    $('#dataTableContainer').addClass('d-none'); 
    $('#chartContainer').removeClass('d-none'); 

    if (!myChart) {
        // Fetch data and create the chart if not already initialized
        fetchDataForChart();
        createChart();
    }
});

// Event handler for "Back" button
$('#btnBackToTable').click(function() {
    $('#chartContainer').addClass('d-none'); // Hide the chart container
    $('#dataTableContainer').removeClass('d-none'); // Show the DataTable container

    // Optionally, destroy the chart if you want to reinitialize it every time
    if (myChart) {
        myChart.destroy();
        myChart = null;
    }
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


//Admin DataTable Order Side
$(document).ready(function() {
    // Initialize the DataTable
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

    // Function to create pie chart
    function createOrdersPieChart() {
        // Fetch the data from the DataTable
        table.ajax.reload(function(json) {
            var customerOrders = {};
            
            for (var i = 0; i < json.length; i++) {
                var customer_id = json[i].customer_id;
                var quantity = parseInt(json[i].quantity, 10);
                
                if (!customerOrders[customer_id]) {
                    customerOrders[customer_id] = 0;
                }
                
                customerOrders[customer_id] += quantity;
            }

            // Prepare the data for the pie chart
            var pieData = {
                labels: Object.keys(customerOrders),
                datasets: [{
                    data: Object.values(customerOrders),
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        // ...add more colors as needed
                        
                    ]
                    
                }]
                
                
            };

            // Get the canvas context
            var ctx = document.getElementById('ordersPieChart').getContext('2d');

            // Create a new Chart instance
            window.ordersPieChart = new Chart(ctx, {
                type: 'pie',
                data: pieData,
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    title: {
                        display: true,
                        text: 'Orders per Customer'
                    }
                }
            });
            
            // Show the chart container and hide the DataTable container
            $('#orderDataTable').addClass('d-none');
            $('#piechartContainer').removeClass('d-none');
        });
        
        console.log('Chart should be initialized now.');
    }

    // Button to generate the pie chart
    $('#btnGeneratePieChart').click(function() {
	$('#orderDataTable').addClass('d-none'); // Hide the DataTable container
    $('#piechartContainer').removeClass('d-none'); // Show the chart container	
		
        createOrdersPieChart(); // Call the function to create the pie chart
    });
    

    // Click event for the "Show Orders" button
    $('#btnShowOrders').click(function() {
        $('#admin-section').addClass('d-none');
        $('#orderDataTable').removeClass('d-none');
        $('#piechartContainer').addClass('d-none'); // Hide the chart when showing the orders
    });

    // Back button event handler for chart
    $('#btnBackForTable').click(function() {
        $('#piechartContainer').addClass('d-none'); // Hide the chart container
        $('#orderDataTable').removeClass('d-none'); // Show the DataTable container
    });

    // Back button event handler for admin section
    $('#btnBackForAdmin').click(function() {
        $('#orderDataTable').addClass('d-none');
        $('#piechartContainer').addClass('d-none'); // Hide the chart container too
        $('#admin-section').removeClass('d-none');
    });

});
