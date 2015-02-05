function request(e) {
  var f = e ? $(e).closest("form") : null, d = {a: e ? f.attr('action') : null}, t = e ? f.attr('method') : 'POST';
  if(e) { f.find('input, textarea, select').each(function(i, e) { d[e.name] = e.value; }) }
  $.ajax({ type: t, url: 'manager.php', data: d}).done(function( msg ) {
    // alert(msg);
    $('#errors, #debug, #infos').empty();
    $(msg).find('msg item').each(function() {
      switch($(this).parent()[0].tagName.toLowerCase()) {
        case 'errors' :  $('#errors').append($('<p>').text('- '+$(this).text())); break; 
        case 'infos' : $('#infos').append($('<p>').text('- '+$(this).text())); break;
      }
    });
    $('#content').html($(msg).find('out'));
  });
}

function updateSliders(e) {
  for(var i = 0; i < services.length; i++) {
    if(services[i][0] == $(e).val()) { var s = services[i]; break; }
  }
  $("#sliderD").slider("option", "min", s[2]);
  $("#sliderD").slider("option", "max", s[3]);
  $("#sliderD").slider("value", s[2] + Math.ceil((s[3]-s[2])/2));
  $("#duration" ).val($( "#sliderD" ).slider( "value" ));
  $("#sliderA").slider("option", "min", s[4]);
  $("#sliderA").slider("option", "max", s[5]);
  $("#sliderA").slider("value", s[4] + Math.ceil((s[5]-s[4])/2));
  $("#amount" ).val($( "#sliderA" ).slider( "value" ));
}

function initCalculator() {
  for(var i = 0; i < services.length; i++) $('#services').append( $('<option>').val(services[i][0]).text(services[i][1]));
  $("#sliderD").slider({ value: 0, min: 0, max: 0, step : 12, slide: function(event, ui) { $("#duration").val(ui.value); }});
  $("#sliderA").slider({ value: 0, min: 0, max: 0, step : 2500, slide: function(event, ui) { $("#amount").val(ui.value); }});
  $('#services').change();
  $('.calc').button({ icons: { primary: "ui-icon-calculator"}, text: true });
}