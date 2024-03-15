
const RoleType = {
    ADMIN: 'ADMIN',
    CUSTOMER: 'CUSTOMER',
};


const loadContentForRole = function(role, username) {

    // Get references to the dynamic elements
    const header = $('#header-content');
    const sidebar = $('#sidebar-content');
    const userRole = $('#user-role')
    // Set the User Content
    $('#landing-username').html($('<h3>').addClass('mb-1').text(`Welcome ` + username + `...`))

    // Set Role Content
    switch (role) {
        case RoleType.ADMIN:
            header.html(
                `<h2>System Admin Control Panel</h2>`
            );

            sidebar.html(
                `<button type="button" id="import-data-sidebar" class="dashbd-btn" onclick="handleButtonClick(this)">Import Data</button>
                 <button type="button" id="create-user-sidebar" class="dashbd-btn" onclick="handleButtonClick(this)">Create User</button>`
            );

            userRole.html(
                `<h4 class="mb-1" id="user-role">Administrator</h4>`
            );

            break;

        case RoleType.CUSTOMER:
            header.html(
                `Customer Control Panel`
            );

 //           sidebar.html(
//                ` <button type="button" id="product-sidebar" class="dashbd-btn" onclick="handleButtonClick(this)">Products</button>
 //           `);

            userRole.html(
                `<h4 class="mb-1" id="user-role">Customer </h4>`
            );
            break;
       
    }
}


function move() {
    let i = 0;
    if (i == 0) {
        i = 1;
        let elem = document.getElementById("progressBarFG");
        let width = 1;
        let id = setInterval(frame, 10);
        function frame() {
            if (width >= 100) {
                clearInterval(id);
                i = 0;
            } else {
                width++;
                elem.style.width = width + "%";
            }
        }
    }
}

let selectedButton = null;
function handleButtonClick(button) {
    if (selectedButton) {
        selectedButton.classList.remove('selected');
    }
    button.classList.add('selected');
    selectedButton = button;
}
