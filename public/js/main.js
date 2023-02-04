// Dark Mode / Light Mode
body = $("body");
buttonMode = $("#buttonMode");
buttonLogout = $("#buttonLogout");
buttonLogin = $("#buttonLogin");

buttonMode.on("click", function()
{
    if( body.hasClass( "bg-dark text-white" ))
    {
        body.removeClass( "bg-dark text-white" );
        body.addClass( "bg-light text-black" );
        buttonMode.text( "Dark Mode" );
    }
    else
    {
        body.removeClass( "bg-light text-black" );
        body.addClass( "bg-dark text-white" );
        buttonMode.text( "Light Mode" );
    }
});

buttonLogin.on("click", function()
{
    document.location.replace('/login');
});
