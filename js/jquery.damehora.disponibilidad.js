(function( $ ) {
 	var ajustes={accion:'init',onNavigate:null,onSelect:null,data:null}//Un array con los ajustes por defecto
	
    $.fn.disponibilidad = function( args ) {//Función principal del plugin que recibe un array con argumentos
 		var settings=$.extend(ajustes,args);//Mezclo los dos arrays para tener valores por defecto en caso de que no me pasen valores
		
		///FUNHCION DE INICIO
		if(settings.accion=='init'){//Si la acción es init (valor por defecto)
		//INICILIAMOS EL PLUGIN
		
		this.html('<p class="disp">DIAS DISPONIBLES</p>');
		
		var mySecondDiv = $('<div class="btn atras"></div>');
		this.append(  mySecondDiv);
		var myThreeDiv=$('<div class="btn adelante"></div>');
		this.append( myThreeDiv);
		
				var tbl = '<table border="0"><tr><th>L</th><th>M</tdh><th>M</th><th>J</th><th>V</th><th>S</th><th>D</th></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></table>';
    
    
		this.append( tbl);
		
		var divhoras=$('<div class="mishoras"></div>');
		this.append(divhoras);
	//Meto en el selector una tabla	
		
			if(settings.onNavigate!=null){//Compruebo si han definido la función de callback onNavigate
				
					this.on('click','.atras',function(e){//Si la handefinido cuando hacen clic en el btn_prueba
				settings.onNavigate(-1);//Ejecutamos la acción de callback pasandole un argumento.
				
			})
				this.on('click','.adelante',function(e){//Si la handefinido cuando hacen clic en el btn_prueba
				settings.onNavigate(1);//Ejecutamos la acción de callback pasandole un argumento.
				
			})
			
			}
		}
		
		
		
		
		//FUNCIÓN DE CARGA DE DATOS
		if(settings.accion=='loadData'){//Vamos a cargar datos
			if(settings.data!=null){
				//Pintamos las celdas de la tabla según los datos recibidos
				dias=settings.data;
				this.find('table').data('dias',dias);
				  for(var i=0; i<dias.dias.length; i++){
					 this.find('td').eq(i).text(dias.dias[i].dia);
					 if(dias.dias[i].disp==0){
						 this.find('td').eq(i).css( "background-color", "red" );
					 }else{
						 this.find('td').eq(i).css( "background-color", "blue" );
					 }
					 
					 
					 
               	}
				this.on('click','td',function(){
					var dias=jQuery(this).parents('table').data('dias');
					var indice=jQuery(this).index();
					var t=dias.dias[indice].value;
					console.log("Has picado en la celda "+indice+" y su valor es "+t);
					if(dias.dias[indice].disp==1){
						console.log("tengo disponibilidad 1");
						
						jQuery(this).parents(".disponibilidad").children(".mishoras").text(t);
						if(settings.onSelect!=null){
							settings.onSelect(t);
						}
					}else if(dias.dias[indice].disp>1){
				

						jQuery(this).parents(".disponibilidad").children(".mishoras").disponibilidadhoras({data:t.horas});
						if(settings.onSelect!=null){
							jQuery(this).parents(".disponibilidad").children(".mishoras").disponibilidadhoras({onSelect:settings.onSelect});
						}
						
					}
					
					
					
				})
				
				//Si la disponibilidad es 0 NO HACEMOS NADA
				
				//SI LA DISPONIBILIDAD ES 1 ejecutamos el método onSelect pasandole el value del tiempo
				
				//Si la disponibilidad es mayor que 1 tendremos que añadir el plugin de disponibilidad de horas pasándole como datos el value y además 
				
			//this.append('<span>Los datos que me pasas son'+settings.data+'</span>');	
			}
		}
    };
 
}( jQuery ));

