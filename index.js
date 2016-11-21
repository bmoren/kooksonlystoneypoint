$(function(){

  $('body').masonry({
    // options
    itemSelector: '.outter'
    // columnWidth: 200
  });

//~+~+~+~+~+~+~+~+~+~+~+~+LSMMA STATIC / LIVE TOGGLE +~+~+~~+~+~+~+~+~+~+~+~+~+//
var lsmma = true;
$('.lsmmaToggle').click(function(){
  if(lsmma == true){
    $('.lsmmaCam').html('<img src="http://webpages.charter.net/dohara12/cameras/lsmmacam/lsmvc800.jpg">')
    $('.lsmmaToggle').html('Live Cam')
    lsmma = false
  }else if(lsmma == false){
    $('.lsmmaCam').html('<iframe src="https://v.angelcam.com/iframe?v=vbolkpk8y8&amp;mute=1&amp;autoplay=1&amp;uuid=865e6d33-f2db-6d70-fccb-1ace015ef654" id="865e6d33-f2db-6d70-fccb-1ace015ef654" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>')
    $('.lsmmaToggle').html('Static Cam')
    lsmma = true
  }

})

// +~+~+~+~+~+~+~+~+~+~+~+~+ SOLGIMT WEBCAM REFRESH ~+~+~+~+~+~+~+~~++~+~+~+~+~ //
  var refreshRate = 20
  setInterval(function(){
    refreshRate --
    if(refreshRate <= 0){
    d = new Date();
    $('.solgimt').attr('src', 'http://solglimt.com/webcam/netcam.jpg?'+d.getTime())
    refreshRate = 20
    }
    $('.count').text(refreshRate)
  },1000 )

  // +~+~+~+~+~+~+~+~+~+~+~+~+ Nearshore PARSE ~+~+~+~+~+~+~+~~++~+~+~+~+~ //
  const nearshore_url = 'http://forecast.weather.gov/product.php?site=DLH&issuedby=DLH&product=NSH&format=TXT&version=1&glossary=0'

  $.get(nearshore_url, function(data){
    page = $.parseHTML(data);
    // console.log(data)
    forecast = $.parseHTML(page[40].children[2].firstElementChild.innerHTML)
    // console.log(forecast)
    forecastText = forecast[10].innerText
    // console.log(forecastText)
    re = /TWO\ HARBORS[\s\S]*?\$\$/; //regular expression to get duluth/two harbors only.
    choppedForecast = forecastText.match(re)[0]
    // console.log(choppedForecast)
    finalForecast = choppedForecast.replace(/(\n\.)/g , "</p><p>")
    // console.log(finalForecast)
    $('.nearshore').append( finalForecast )
  }).fail(function() {
    console.error( "could not get nearshore forecast" );
  })

  // +~+~+~+~+~+~+~+~+~+~+~+~+ Offshore PARSE ~+~+~+~+~+~+~+~~++~+~+~+~+~ //
  const offshore_url = 'http://forecast.weather.gov/product.php?site=DLH&issuedby=LS&product=GLF&format=txt&version=1&glossary=0'

  $.get(offshore_url, function(data){
    page = $.parseHTML(data);
    // console.log(page)
    forecast = $.parseHTML(page[40].innerHTML)
    forecastText = forecast[4].innerHTML
    // console.log(forecastText)
    re = /LAKE\ SUPERIOR\ WEST\ OF\ A\ LINE[\s\S]*?\$\$/; //regular expression to get duluth/two harbors only.
    choppedForecast = forecastText.match(re)[0]
    finalForecast = choppedForecast.replace(/(\n\.)/g , "</p><p>")
    $('.offshore').append( finalForecast )

  }).fail(function() {
    console.error( "could not get nearshore forecast" );
  })







})