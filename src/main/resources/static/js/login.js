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
                    loadContentForRole(RoleType.ADMIN, username);
                    showHome();
                    break;
                case 'CUSTOMER':
                    loadContentForRole(RoleType.CUSTOMER, username);
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

