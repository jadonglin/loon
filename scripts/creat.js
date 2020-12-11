var urls=[
"http://api.turinglabs.net/api/v1/jd/jxfactory/create/UG29wzmYwRHt-wAGfaOYVoZs-bk3MInqg5q8MhWU9s0=/",
//"http://api.turinglabs.net/api/v1/jd/ddfactory/create/xx/",
//"http://api.turinglabs.net/api/v1/jd/bean/create/xxx/",
//"http://api.turinglabs.net/api/v1/jd/pet/create/xxx=/",
//"http://api.turinglabs.net/api/v1/jd/farm/create/xxxx/"
]
urls.forEach(url => {
    $httpClient.get(url,function(error, response, data){
        console.log(response);
    });
});