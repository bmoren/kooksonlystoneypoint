<?php

echo file_get_contents( 'http://marine.weather.gov/MapClick.php?lat=46.921&lon=-91.8022&unit=0&lg=english&FcstType=dwml' );

?>


<!--

JS SCRATCH

// +~+~+~+~+~+~+~+~+~+~+~+~+ Nearshore XML ~+~+~+~+~+~+~+~~++~+~+~+~+~ //
// $.get('nearshore.php', function(data){
//   xml = $.parseXML(data);
//   items = $(xml).find('wordedForecast').children()
//   console.log(items)
//   for (var i = 1; i < items.length; i++) {
//     $('.nearshore').append(items[i].innerHTML + '<br>')
//   }
//
//
// }).fail(function() {
//   console.error( "could not get nearshore forecast" );
// })


-->