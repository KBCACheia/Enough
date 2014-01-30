$(function(){

	var token = 'd06ndsyu6hsy';

	var url = 'http://dca.telefonicabeta.com/m2m/v2/services/{0}'.format(token);
	var light = 0;
	var temperature = 0;
	var sound = 0;
	var potencia=0;
	var time=5000;


	Circles.create({
    	id:         'circles-lighting',
	    percentage: 0,
	    radius:     40,
	    width:      10,
	    number:     0,
	    text:       '%',
	    colors:     ['#87CEFA', '#4682B4'],
	    duration:   400
	});
	Circles.create({
    	id:         'circles-temperature',
	    percentage: 0,
	    radius:     40,
	    width:      10,
	    number:     0,
	    text:       '%',
	    colors:     ['#D3B6C6', '#4B253A'],
	    duration:   400
	});
	Circles.create({
    	id:         'circles-sound',
	    percentage: 0,
	    radius:     40,
	    width:      10,
	    number:     0,
	    text:       '%',
	    colors:     ['#D3B6C6', '#4B253A'],
	    duration:   400
	});

	finder();
	setInterval(function(){ finder(); },time);

	
	function finder(){
		$.ajax({
			url:url + '/assets/' + token + '/', dataType:"json"
		})
		.done(function(r){
			temperature = r.data.sensorData[1].ms.v;
			light = r.data.sensorData[3].ms.v;
			sound = r.data.sensorData[4].ms.v;

			$('#temperature').html(temperature+'ºC');
			$('#light').html(500-light+'cd');

			console.log('Temperatura: '+temperature);
			console.log('Luminosidade: '+light);
			console.log('Nível de Ruído: '+sound);
			Circles.create({
		    	id:         'circles-lighting',
			    percentage: 100-(((((500-light)*200)/500)*100)/200),
			    radius:     40,
			    width:      10,
			    number:     100-(((((500-light)*200)/500)*100)/200),
			    text:       '%',
			    colors:     ['#87CEFA', '#4682B4'],
			    duration:   400
			});
			if(temperature>50){
				potencia=temperature-50;
				if (potencia<10){
					potencia=10;
				}
			} else {
				var potencia=10;
			}
			Circles.create({
		    	id:         'circles-temperature',
			    percentage: potencia,
			    radius:     40,
			    width:      10,
			    number:     potencia,
			    text:       '%',
			    colors:     ['#F4A460', '#A0522D'],
			    duration:   400
			});
			Circles.create({
		    	id:         'circles-sound',
			    percentage: (sound/10),
			    radius:     40,
			    width:      10,
			    number:     (sound/10),
			    text:       'db',
			    colors:     ['#98FB98', '#228B22'],
			    duration:   400
			});
		})
		.fail(function (response){

		})
	}

});

if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}