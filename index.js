$(function() {

  var $body = $('body')

  $body.packery({
      // options
      itemSelector: '.outter'
          // columnWidth: 200
  });

  $body.imagesLoaded(function() {
      $body.packery('layout');
  })

  //~+~+~+~+~+~+~+~+~+~+~+~+LSMMA STATIC / LIVE TOGGLE +~+~+~~+~+~+~+~+~+~+~+~+~+//
  var lsmma = true;
  $('.lsmmaToggle').click(function() {
      if (lsmma == true) {
          $('.lsmmaCam').html('<img src="http://webpages.charter.net/dohara12/cameras/lsmmacam/lsmvc800.jpg">')
          $('.lsmmaToggle').html('Live Cam')
          lsmma = false
      } else if (lsmma == false) {
          $('.lsmmaCam').html('<iframe src="https://v.angelcam.com/iframe?v=vbolkpk8y8&amp;mute=1&amp;autoplay=1&amp;uuid=865e6d33-f2db-6d70-fccb-1ace015ef654" id="865e6d33-f2db-6d70-fccb-1ace015ef654" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>')
          $('.lsmmaToggle').html('Static Cam')
          lsmma = true
      }

  })

  // +~+~+~+~+~+~+~+~+~+~+~+~+ SOLGIMT WEBCAM REFRESH ~+~+~+~+~+~+~+~~++~+~+~+~+~ //
  var refreshRate = 20
  setInterval(function() {
      refreshRate--
      if (refreshRate <= 0) {
          d = new Date();
          $('.solgimt').attr('src', 'http://solglimt.com/webcam/netcam.jpg?' + d.getTime())
          refreshRate = 20
      }
      $('.count').text(refreshRate)
  }, 1000)


  // +~+~+~+~+~+~+~+~+~+~+~+~+ Nearshore PARSE ~+~+~+~+~+~+~+~~++~+~+~+~+~ //
  const nearshore_url = 'http://forecast.weather.gov/product.php?site=DLH&issuedby=DLH&product=NSH&format=TXT&version=1&glossary=0'

  $.get(nearshore_url, function(data) {
      re = /TWO\ HARBORS\ TO[\s\S]*?\$\$/g; //regular expression to get duluth/two harbors only. ///THIS IS GETTING CUT OFF ON THE TOP, CHECK IT OUT!
      choppedForecast = data.match(re)[0]
          // console.log(choppedForecast)
      finalForecast = choppedForecast.replace(/(\n\.)/g, "</p><p>")
          // console.log(finalForecast)
      $('.nearshore').append(finalForecast)
      $body.packery('layout');
  }).fail(function() {
      console.error("could not get nearshore forecast");
  })

  // +~+~+~+~+~+~+~+~+~+~+~+~+ Offshore PARSE ~+~+~+~+~+~+~+~~++~+~+~+~+~ //
  const offshore_url = 'http://forecast.weather.gov/product.php?site=DLH&issuedby=LS&product=GLF&format=txt&version=1&glossary=0'

  $.get(offshore_url, function(data) {
      re = /LAKE\ SUPERIOR\ WEST\ OF\ A\ LINE[\s\S]*?\$\$/; //regular expression to get duluth/two harbors only.
      choppedForecast = data.match(re)[0]
      finalForecast = choppedForecast.replace(/(\n\.)/g, "</p><p>")
      $('.offshore').append(finalForecast)
      $body.packery('layout');
      highlight();

  }).fail(function() {
      console.error("could not get offshore forecast");
  })

  // +~+~+~+~+~+~+~+~+~+~+~+~+ Wind & Wave & Surface Analysis Select ~+~+~+~+~+~+~+~~++~+~+~+~+~ //
  var values = ['01', '02', '03', '04', '05', '06', '07', '08', '09', 10, 11, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 60, 63, 66, 69, 72, 75, 78, 81, 84, 87, 90, 93, 96, 99, 102, 105, 108, 111, 114, 117, 120]
  for (var i = 0; i < values.length; i++) {
      if( i == 11){
        $('.surface select').append('<option selected value="' + values[i] + '">+' + values[i] + '</option>')

      }else if(i < 14){
        $('.surface select').append('<option value="' + values[i] + '">+' + values[i] + '</option>')
      }

      if (i == 15) {
          $('.windmap select').append('<option selected value="' + values[i] + '">+' + values[i] + '</option>')
          $('.wavemap select').append('<option selected value="' + values[i] + '">+' + values[i] + '</option>')

      } else {
          $('.windmap select').append('<option value="' + values[i] + '">+' + values[i] + '</option>')
          $('.wavemap select').append('<option value="' + values[i] + '">+' + values[i] + '</option>')

      }
  }

  $('.windmap select').change(function(d) {
      var newmap = $('.windmap select').val()
          // console.log(newmap)
      $('.windmap img').attr('src', 'https://www.glerl.noaa.gov//res/glcfs/fcast/swn+' + newmap + '.gif')
  })

  $('.wavemap select').change(function(d) {
      var newmap = $('.wavemap select').val()
          // console.log(newmap)
      $('.wavemap img').attr('src', 'https://www.glerl.noaa.gov//res/glcfs/fcast/swv+' + newmap + '.gif')
  })

  $('.surface select').change(function(d) {
      var newmap = $('.surface select').val()
          // console.log(newmap)
      $('.surface img').attr('src', 'http://weather.rap.ucar.edu/model/ruc'+ newmap + 'hr_sfc_wind.gif')
  })
  // +~+~+~+~+~+~+~+~+~+~+~+~+ Water Temp ~+~+~+~+~+~+~+~~++~+~+~+~+~ //

  $.get('temp.php', function(data) {
      data = $.parseHTML(data)
      // console.log(data)
      $('.waterTemp').append('<br>' + data[12].children[1].children[1].children["0"].children[1].childNodes[1].data.replace(/:/," "))
      // $('.waterTemp').append('<br>' + Math.round(data.data[6][1] * 10) / 10 + '&deg;')
      $body.packery('layout');
  }).fail(function() {
      console.error("could not get water temp");
  })

  // +~+~+~+~+~+~+~+~+~+~+~+~+ ROAM4 Table ~+~+~+~+~+~+~+~~++~+~+~+~+~ //

  $.get('roam4.php', function(data) {
      // data = data.replace(/\n/g,"\r\n")
      data = data.replace(/(\w)([ ]{1,})(\w)/g, "$1,$3") // replace spaces with commas
          // console.log(data)
          //{delimiter:" "}
      var json = Papa.parse(data)
          // console.log(json)
      var json = json.data

      var content = "";
      var count = 0 //for getting the most recent 24 hours...
      var localDate;
      json.forEach(function(row, i) {
          if (row[4] == '00') { //only on the hour
              count++
              if (count < 24) { //only get the 24 most recent results
                  content += "<tr>";

                  var d = new Date();
                  d.setUTCHours(row[3], row[4], '00')
                  d.setUTCDate(row[2])
                  d.setUTCMonth(row[1]-1)
                  d.setUTCFullYear(row[0])
                   localDate = new Date(d.toLocaleString())
                  // console.log(d.toLocaleString())

                  row.forEach(function(cell, i) {
                      if ( i != 2 && i != 3 &&  i != 4 && i != 9) { //dont get the year, min, or gust time
                        if( i == 0){
                          content += "<td>" + (localDate.getMonth()+1) + '/' + localDate.getDate() + "</td>"; //convert to KTS
                        }else if(i == 1){
                          content += "<td>" + formatHours(localDate.getHours()) + "</td>";
                        }else if (i == 5 || i == 7){ // wind and gust speed

                          if(DegreesToCardinal(cell) == 'N' ||DegreesToCardinal(cell) == 'NNE' || DegreesToCardinal(cell) == 'ENE' || DegreesToCardinal(cell) == 'NE' || DegreesToCardinal(cell) == 'E' ){
                            content += "<td><span class='marked-text'>" + DegreesToCardinal(cell) + ' <span class="small">(' + cell + '&deg;)</span></span>'+ "</td>"; //convert to KTS

                          }else{
                            content += "<td>" + DegreesToCardinal(cell) + ' <span class="small">(' + cell + '&deg;)</span>'+ "</td>"; //convert to KTS
                          }

                        }else if (i == 6 || i == 8) { //wind and gust speed need to be converted from meters/sec to KTS
                              content += "<td>" + Math.round((cell * 1.94384)*10)/10 + "</td>"; //convert to KTS and one decimal place
                          } else {
                              content += "<td>" + cell + "</td>";
                          }
                      }
                  });
                  content += "</tr>";
              }
          }
      });
      $('.roam4 table').append(content)
      $('.roam4 .spinner').remove();



      $body.packery('layout');
  }).fail(function() {
      console.error("could not get ROAM4");
  })


// +~+~+~+~+~+~+~+~+~+~+~+~+ DULM5 Table ~+~+~+~+~+~+~+~~++~+~+~+~+~ //

$.get('dulm5.php', function(data) {
    // data = data.replace(/\n/g,"\r\n")
    data = data.replace(/(\w)([ ]{1,})(\w)/g, "$1,$3") // replace spaces with commas
        // console.log(data)
        //{delimiter:" "}
    var json = Papa.parse(data)
        // console.log(json)
    var json = json.data

    var content = "";
    var count = 0 //for getting the most recent 24 hours...
    var localDate;
    json.forEach(function(row, i) {
        if (row[4] == '00') { //only on the hour
            count++
            if (count < 24) { //only get the 24 most recent results
                content += "<tr>";

                var d = new Date();
                d.setUTCHours(row[3], row[4], '00')
                d.setUTCDate(row[2])
                d.setUTCMonth(row[1]-1)
                d.setUTCFullYear(row[0])
                 localDate = new Date(d.toLocaleString())
                // console.log(d.toLocaleString())

                row.forEach(function(cell, i) {
                    if ( i != 2 && i != 3 &&  i != 4 && i < 8) { //dont get the year, min, or gust time
                      if( i == 0){
                        content += "<td>" + (localDate.getMonth()+1) + '/' + localDate.getDate() + "</td>"; //convert to KTS
                      }else if(i == 1){
                        content += "<td>" + formatHours(localDate.getHours()) + "</td>";
                      }else if (i == 5){ // wind and gust speed

                        if(DegreesToCardinal(cell) == 'N' ||DegreesToCardinal(cell) == 'NNE' || DegreesToCardinal(cell) == 'ENE' || DegreesToCardinal(cell) == 'NE' || DegreesToCardinal(cell) == 'E' ){
                          content += "<td><span class='marked-text'>" + DegreesToCardinal(cell) + ' <span class="small">(' + cell + '&deg;)</span></span>'+ "</td>"; //convert to KTS

                        }else{
                          content += "<td>" + DegreesToCardinal(cell) + ' <span class="small">(' + cell + '&deg;)</span>'+ "</td>"; //convert to KTS
                        }

                      }else if (i == 6 || i == 7 ) { //wind and gust speed need to be converted from meters/sec to KTS
                            content += "<td>" + Math.round((cell * 1.94384)*10)/10 + "</td>"; //convert to KTS and one decimal place
                        } else {
                            content += "<td>" + cell + "</td>";
                        }
                    }
                });
                content += "</tr>";
            }
        }
    });
    $('.dulm5 table').append(content)
    $('.dulm5 .spinner').remove();



    $body.packery('layout');
}).fail(function() {
    console.error("could not get DULM5");
})

// +~+~+~+~+~+~+~+~+~+~+~+~+ SLVM5 Table ~+~+~+~+~+~+~+~~++~+~+~+~+~ //

$.get('slvm5.php', function(data) {
    // data = data.replace(/\n/g,"\r\n")
    data = data.replace(/(\w)([ ]{1,})(\w)/g, "$1,$3") // replace spaces with commas
        // console.log(data)
        //{delimiter:" "}
    var json = Papa.parse(data)
        // console.log(json)
    var json = json.data

    var content = "";
    var count = 0 //for getting the most recent 24 hours...
    var localDate;
    json.forEach(function(row, i) {
        if (row[4] == '00') { //only on the hour
            count++
            if (count < 24) { //only get the 24 most recent results
                content += "<tr>";

                var d = new Date();
                d.setUTCHours(row[3], row[4], '00')
                d.setUTCDate(row[2])
                d.setUTCMonth(row[1]-1)
                d.setUTCFullYear(row[0])
                 localDate = new Date(d.toLocaleString())
                // console.log(d.toLocaleString())

                row.forEach(function(cell, i) {
                    if ( i != 2 && i != 3 &&  i != 4 && i < 8) { //dont get the year, min, or gust time
                      if( i == 0){
                        content += "<td>" + (localDate.getMonth()+1) + '/' + localDate.getDate() + "</td>"; //convert to KTS
                      }else if(i == 1){
                        content += "<td>" + formatHours(localDate.getHours()) + "</td>";
                      }else if (i == 5){ // wind and gust speed

                        if(DegreesToCardinal(cell) == 'N' ||DegreesToCardinal(cell) == 'NNE' || DegreesToCardinal(cell) == 'ENE' || DegreesToCardinal(cell) == 'NE' || DegreesToCardinal(cell) == 'E' ){
                          content += "<td><span class='marked-text'>" + DegreesToCardinal(cell) + ' <span class="small">(' + cell + '&deg;)</span></span>'+ "</td>"; //convert to KTS

                        }else{
                          content += "<td>" + DegreesToCardinal(cell) + ' <span class="small">(' + cell + '&deg;)</span>'+ "</td>"; //convert to KTS
                        }

                      }else if (i == 6 || i == 7 ) { //wind and gust speed need to be converted from meters/sec to KTS
                            content += "<td>" + Math.round((cell * 1.94384)*10)/10 + "</td>"; //convert to KTS and one decimal place
                        } else {
                            content += "<td>" + cell + "</td>";
                        }
                    }
                });
                content += "</tr>";
            }
        }
    });
    $('.slvm5 table').append(content)
    $('.slvm5 .spinner').remove();



    $body.packery('layout');
}).fail(function() {
    console.error("could not get SLVM5");
})



// +~+~+~+~+~+~+~+~+~+~+~+~+ UTILITIES ~+~+~+~+~+~+~+~~++~+~+~+~+~ //
function DegreesToCardinal(degrees){
    degrees *= 10;

    caridnals = [ "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N" ];
    return caridnals[Math.round((degrees % 3600) / 225)];
}


function formatHours(hours){
suffix = (hours >= 12)? 'pm' : 'am';   //it is pm if hours from 12 onwards
hours = (hours > 12)? hours -12 : hours; //only -12 from hours if it is greater than 12 (if not back at mid night)
hours = (hours == '00')? 12 : hours; //if 00 then it is 12 am
return hours + ' ' + suffix;
}


function highlight(){
  $('body').mark('NORTH', {useSmartBehavior: true,
    beforeMark: function (match) {
        // exclude SOUTHEAST
        return match !== "NORTHWEST"
    }
  })
  $('body').mark('NORTHEAST')
  $('body').mark('EAST', {useSmartBehavior: true,
    beforeMark: function (match) {
        // exclude SOUTHEAST
        return match !== "SOUTHEAST"
    }
  })

}

})
