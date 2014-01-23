(function( $ ) {
 	var ajustes={accion:'init',onSelect:null,data:null}//Un array con los ajustes por defecto
	
    $.fn.disponibilidadhoras = function( args ) {//Función principal del plugin que recibe un array con argumentos
 		var settings=$.extend(ajustes,args);//Mezclo los dos arrays para tener valores por defecto en caso de que no me pasen valores
		
		///FUNHCION DE INICIO
		if(settings.accion=='init'){//Si la acción es init (valor por defecto)
				if(settings.data!=null){
					this.html('<p class="disp">HORAS DISPONIBLES</p><div class="ui-select"><div data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-icon="arrow-d" data-iconpos="right" data-theme="c" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-icon-right ui-btn-up-c"><span class="ui-btn-inner"><span class="ui-btn-text"></span><span class="ui-icon ui-icon-arrow-d ui-icon-shadow">&nbsp;</span></span><select name="selechoradisp" id="selechoradisp"></select></div></div>');    	 	
					                      
				    						
					
					 
					for(hora in settings.data){
						//h=jQuery.parseJSON(hora);
						
						jQuery("#selechoradisp").append('<option value="'+settings.data[hora].value+'">'+settings.data[hora].title+'</option><br>');
					}
					
					if(settings.onSelect!=null){
						console.log("Has fijado una función de llamada");
					this.find('select#selechoradisp').on('change',function(){
						console.log("Me has picado");
						settings.onSelect(jQuery(this).val());
					})
					}
				}
		}
		
		
		
		

    };
 
}( jQuery ));

