if (window.location.href != "https://atletismeatlas.es/solicitud-socio")
{
    console.log("redirecting");
    redirect();
}

function redirect()
{
    window.location.replace("http://atletismeatlas.es/solicitud-socio");
}
