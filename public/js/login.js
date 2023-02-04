const loginFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the login form
    const email = $('#floatingEmail').val();
    const password = $('#floatingPassword').val();

    if (email && password) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // If successful, redirect the browser to the profile page
            document.location.replace('/account');
        } else {
            alert(response.statusText);
        }
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();

    const name = $('#floatingName').val();
    const email = $('#floatingEmail').val();
    const password = $('#floatingPassword').val();

    if (name && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/account');
        } else {
            alert(response.statusText);
        }
    }
};

$('#login-form').on( "submit", loginFormHandler );
$('#signup-form').on( "submit", signupFormHandler );
