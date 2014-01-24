// JavaScript Document
var bItem={id:null,servicios:null,serviciosN:null,idprofesional:null,profesionalN:null,time:null};
var servicio1;
var servicio2;

var times;
var user={email:null,pass:null};
var fech={dia:null,hora:null};

/*document.addEventListener('mousedown',function(e){
	
})*/
	
jQuery(document).ready(function(e) {
//jQuery( "[data-role='navbar']" ).navbar();
//jQuery( "[data-role='header'], [data-role='footer']" ).toolbar();
//COPIAMOS LA RESERVA ORIGINAL
servicio1=jQuery('#selecservicio').html();
servicio2=jQuery('#selecprofesional').html();
servicio3=jQuery('.calendario').html();



actualizarServicios();
actualizarProfesional();
actualizarOfertas();


	jQuery('select#selecservicio').on('change',function(){
    	var valor = jQuery(this).val();
	
		var minombreServ;
		var nombreServ;
	jQuery(this).children('option').each(function(){
		
		nombreServ=jQuery(this).val();
		//console.log("El valor buscado es "+valor+" y este tiene "+nombreServ);
			if(nombreServ==valor){
				//console.log("COINCIDENCIA "+jQuery(this).text());
				minombreServ=jQuery(this).text();
				minombreServ=MaysPrimera(minombreServ);
			}
		})
	
	//console.log("el id es " + valor + "y el nombre servicio" + minombreServ);
	//jQuery('#seleccionadoServ').data("idserv",jQuery('#seleccionadoServ').data('idserv')+valor+",");
	jQuery('#seleccioneidServ').append(valor+", ");
    jQuery('#seleccionadoServ').append(minombreServ+", ");
	
	
	jQuery(this).children('option').each(function(){
		var valors=jQuery(this).val();
			if(valors==valor){
				jQuery(this).remove();
			}
			})
		
	});
	
	
		//select la hora
	jQuery('select#selechora').on('change',function(){
    	var mihora = jQuery(this).val();
			//console.log(mihora);
	jQuery(this).parents(".calendario").children("#mydate1").text(mihora+":");
	
	
			
	});
	
		//SELECCION DE MINUTOS
	jQuery('select#selecminutos').on('change',function(){
    	var miminuto = jQuery(this).val();
			//console.log(miminuto);
	jQuery(this).parents(".calendario").children("#mydate1").append(miminuto);
	
			
	});
	
	
	 jQuery("input[name=reserv]").on('change',function(){
		  //console.log("Queremos cambiar  la disponibilidad");
		 jQuery(".calend").addClass('no_visible');
		jQuery(".disponibilidad").html('');
		 var mival=jQuery(this).val();
		
			
				var data = {
					servicios: bItem.servicios,
					time:bItem.time,
					profesional:bItem.idprofesional,
					request_type:mival
		
				};
		jQuery.mobile.loading('show',{text:'Obteniendo disponibilidad',textVisible:true,theme:'b'});
	jQuery.getJSON("http://www.aidiapp.com/demodamehora/api/get_booking_av/", data, function(objjson3) {
		//console.log('El servidor me ha dicho: ' + objjson3);
				jQuery.mobile.loading('hide');
	//UNA COSA: hAY QUE COMPROBAR SI ES DIAS U HORAS PORQUE CARGAREMOS DIFERENTESP LUGINS JQUERY EN FUNCIÓN DE UNA COSA U OTRA
	//SI SON DÍAS CARGAMOS disponibilidad
	//SI SON HORAS CARGAMOS disponiblidadHoras
			if(objjson3.status=="ok"){
				if(mival=="days"){
					 //console.log("Queremos mirar la disponibilidad DIAS");
						var dias={'dias':objjson3.dias};
						//console.log("la variable dias es "+dias);
				
				//PRIMERO HAY QUE INICIALIZARLO
				jQuery(".disponibilidad").disponibilidad({accion:'init',onSelect:function(t){
					var dates = new Date(t*1000);
							var dia=dates.getDate();
							var mes=dates.getMonth()+1;
							var ado=dates.getFullYear();
							var hora = "0" + (dates.getHours());
							hora = hora.substring(hora.length-2, hora.length);
							
							var minu = "0" + (dates.getMinutes());
							minu = minu.substring(minu.length-2, minu.length);

							
							var dat=dia+'/'+mes+'/'+ado;
							var date=dia+'-'+mes+'-'+ado+' '+hora+':'+minu;	
							var daten= hora+':'+minu;	
							//console.log("Has seleccionado el dia "+date);
							
							  jQuery(".ups").addClass('no_visible');
							   jQuery(".calend").removeClass('no_visible');
							  jQuery("#seleccionefecha").text(date);
							  jQuery("#mydate").val(dat);
							   jQuery("#mydate1").text(daten);
							   jQuery(".disponibilidad").html('');
								jQuery(".ui-radio label").removeClass('ui-radio-on').addClass('ui-radio-off');
							  jQuery(".ui-radio label").data('icon','radio-off');
							  jQuery(".ui-radio label span span").removeClass('ui-icon-radio-on').addClass('ui-icon-radio-off');
							  
},onNavigate:function(r){
					if(r==-1){
						//console.log("has seleccionado hacia atras");
						times=(times)-604800;
						var data = {
							servicios: bItem.servicios,
							time:times,
							profesional:bItem.idprofesional,
							request_type:mival
		
						};
						jQuery.mobile.loading('show',{text:'Obteniendo disponibilidad',textVisible:true,theme:'b'});
					jQuery.getJSON("http://www.aidiapp.com/demodamehora/api/get_booking_av/", data, function(objjson5) {
		//console.log('El servidor me ha dicho dias atras: ' + objjson5);
				jQuery.mobile.loading('hide');
				jQuery(".calend").addClass('no_visible');

				var diasatras={'dias':objjson5.dias};
								
				jQuery(".disponibilidad").disponibilidad({accion:'loadData',data:diasatras});
					})
						}else{
							//console.log("has seleccionado hacia adelante");
							 times=(times)+604800;
						var data = {
							servicios: bItem.servicios,
							time:times,
							profesional:bItem.idprofesional,
							request_type:mival
		
						};
						jQuery.mobile.loading('show',{text:'Obteniendo disponibilidad',textVisible:true,theme:'b'});
					jQuery.getJSON("http://www.aidiapp.com/demodamehora/api/get_booking_av/", data, function(objjson5) {
		//console.log('El servidor me ha dicho dias atras: ' + objjson5);
				jQuery.mobile.loading('hide');
				jQuery(".calend").addClass('no_visible');
				var diasadelante={'dias':objjson5.dias};
								
				jQuery(".disponibilidad").disponibilidad({accion:'loadData',data:diasadelante});
					})
													}


}});//Aquí podrían ir las funciones de llamada
				jQuery(".disponibilidad").disponibilidad({accion:'loadData',data:dias});
				jQuery(".disponibilidad").focus();
				jQuery.mobile.silentScroll(jQuery(".disponibilidad").offset().top);
				}else{
					var horas=objjson3.horas;
					 //console.log("Queremos mirar la disponibilidad HORAS");
					jQuery(".disponibilidad").disponibilidadhoras({onSelect:function(t){
						var dates = new Date(t*1000);
							var dia=dates.getDate();
							var mes=dates.getMonth()+1;
							var ado=dates.getFullYear();
							var hora = "0" + (dates.getHours());
							hora = hora.substring(hora.length-2, hora.length);
							
							var minu = "0" + (dates.getMinutes());
							minu = minu.substring(minu.length-2, minu.length);

							
							var dat=dia+'/'+mes+'/'+ado;
							var date=dia+'-'+mes+'-'+ado+' '+hora+':'+minu;	
							var daten= hora+':'+minu;	
							//console.log("Has seleccionado el dia "+date);
							 jQuery(".edit").addClass('no_visible');
							  jQuery(".ups").addClass('no_visible');
							   jQuery(".calend").removeClass('no_visible');
							   jQuery(".calendario").addClass('no_visible');
							  jQuery("#seleccionefecha").text(date);
							  jQuery("#mydate").val(dat);
							   jQuery("#mydate1").text(daten);
						
					}});
					jQuery(".disponibilidad").disponibilidadhoras({data:horas});
					
					jQuery.mobile.silentScroll(jQuery(".disponibilidad").offset().top);
				}
			}
	});
			
		
		 
	 });
	 
	
	
	
	
	  jQuery('select#selecprofesional').on('change',function(){
  			 var valor = jQuery(this).val();
	
			var minombrePro;
			var nombrePro;
	jQuery(this).children('option').each(function(){
		
		nombrePro=jQuery(this).val();
		//console.log("El valor buscado es "+valor+" y este tiene "+nombrePro);
			if(nombrePro==valor){
				//console.log("COINCIDENCIA "+jQuery(this).text());
				minombrePro=jQuery(this).text();
				minombrePro=MaysPrimera(minombrePro);
			}
		})
	
	//console.log("el id es " + valor + "y el nombre servicio" + minombrePro);
	//jQuery('#seleccionadoServ').data("idserv",jQuery('#seleccionadoServ').data('idserv')+valor+",");
	jQuery('#seleccioneidPro').text(valor);
    jQuery('#seleccionadoPro').text(minombrePro+", ");
	
 
			
	});
	
	

	
	jQuery("h3.tit_seleccion").on('mousedown',function(event){
		
		jQuery(this).parent(".servicios").find(".ui-input-datebox").removeClass();
		jQuery(this).parents(".contenido").children(".servicios").addClass('no_activo');
		jQuery(this).parents(".contenido").find(".add").addClass('no_visible');
		jQuery(this).parent(".servicios").removeClass('no_activo');
		jQuery(this).parent(".servicios").children(".add").removeClass('no_visible');
		jQuery.mobile.silentScroll(jQuery(this).parent(".servicios").offset().top);
event.preventDefault();
	});
	jQuery("h3.tit_seleccion").on('mouseup',function(event){
		event.preventDefault();
	})
		
	
	jQuery(".atras3").on('tap',function(){
		jQuery(".misdatos").addClass('no_visible');
		jQuery(".proximacita").removeClass('no_visible');
		
	});
	
	jQuery(".atras1").on('tap',function(){
		jQuery(".reg").removeClass('no_visible');
		jQuery(".proximacita").addClass('no_visible');
		
	});
	
	jQuery(".atras2").on('tap',function(){
		jQuery(".cuenta").addClass('no_visible');
		jQuery(".reg").removeClass('no_visible');
		
	});
	
	jQuery(".atras4").on('tap',function(){
		jQuery(".mihistorico").addClass('no_visible');
		jQuery(".mihistoric").html('');
		jQuery(".proximacita").removeClass('no_visible');
		
	});
	//BOTON ENTRAR DANDO USER Y PASS
	jQuery(".entrar").on('tap',function(){
		//console.log("me vas a mandar los datos");
		var data = {
				usr: jQuery("#email").val(),
				pass:jQuery.sha256(jQuery("#contrase").val()),
				token1:"111"
			}	   
	jQuery.mobile.loading('show',{text:'Iniciando sesion',textVisible:true,theme:'b'});
		jQuery.getJSON("http://www.aidiapp.com/demodamehora/api/userLog/", data, function(objjson7) {
		//console.log('El servidor me ha dicho dias atras: ' + objjson7);
				jQuery.mobile.loading('hide');
				if(objjson7.status=="error"){
			//alert(objjson7.error);
		}else{
			user.email=jQuery("#email").val();
			user.pass=jQuery.sha256(jQuery("#contrase").val());
			jQuery(".reg").addClass('no_visible');
			
	
			jQuery(".proximacita").removeClass('no_visible');
			//SI HAY UNA RESERVA EN CURSO EJECUTAR EL PROCEDIMIENTO DE CONFIRMAR
			if(bItem.id!=null){
				jQuery('.confirmar').trigger('tap');
			}
		}
		
	})	
	});	
		
	//BOTON HISTORICO CITAS
	jQuery(".hcitas").on('tap',function(){
						
					var data = {
						
						user:user.email,
						pass:user.pass,
						token1:"111",
					};
					jQuery.mobile.loading('show',{text:'Obteniendo historial de reservas',textVisible:true,theme:'b'});
					jQuery.getJSON("http://www.aidiapp.com/demodamehora/api/get_Bookings_History/", data, function(objjson4) {
		//console.log('El servidor me ha dicho: ' + objjson4);
		jQuery.mobile.loading('hide');
		
					if(objjson4.status=="ok"){
						jQuery(".ad").addClass('no_visible');
						jQuery(".mihistorico").removeClass('no_visible');
						
						//console.log("mi history es "+objjson4.historial);
						//console.log("hay "+objjson4.historial.length);
						for(var i=0; i<objjson4.historial.length; i++){
							var dates = new Date(objjson4.historial[i].fecha*1000);
							var dia=dates.getDate();
							var mes=dates.getMonth()+1;
							var ado=dates.getFullYear();
							var hora = "0" + (dates.getHours());
							hora = hora.substring(hora.length-2, hora.length);
							
							var minu = "0" + (dates.getMinutes());
							minu = minu.substring(minu.length-2, minu.length);
							var date=dia+'-'+mes+'-'+ado+' '+hora+':'+minu;	
									
							var fe=jQuery('<div class="boton" style="width:175px;margin-left:0px;">'+date+'</div>');
							jQuery(".mihistoric").append(fe);
							var tex=jQuery('<div class="izq">Ha reservado '+date+' los servicios '+objjson4.historial[i].tServicios+' con el profesional '+objjson4.historial[i].tProfesional+'</div><div class="boton anul izq" data-idb='+objjson4.historial[i].idBooking+'>Anular</div>');	
							jQuery(".mihistoric").append(tex);
							
						
						}
					}
		
		
		});
					
						
						
				});
			
	
	
	//BOTON MIS DATOS

	jQuery(".mdatos").on('tap',function(){
		var contrasvieja=jQuery("#contrase").val();
		var data = {
		
		usr: jQuery("#email").val(),
		pass:jQuery.sha256(jQuery("#contrase").val()),
		token1:"111",
	};
	jQuery.mobile.loading('show',{text:'Obteniendo datos del usuario',textVisible:true,theme:'b'});
	jQuery.getJSON("http://www.aidiapp.com/demodamehora/api/getUserData/", data, function(objjson8) {
		//console.log('El servidor me ha dicho: ' + objjson8);
		jQuery.mobile.loading('hide');
		if(objjson8.status=="ok"){
			
			jQuery(".proximacita").addClass('no_visible');
			jQuery(".misdatos").removeClass('no_visible');
			jQuery("#nombre").val(objjson8.nombre);
			jQuery("#apellidos").val(objjson8.apellidos);
			jQuery("#tfno").val(objjson8.telefono);
			jQuery("#mail").val(objjson8.mail);
			jQuery("#contrasena").val(contrasvieja);
		}
		
	})
	});
	
	
	//BOTON MODIFICAR DATOS
		jQuery(".modificar").on('tap',function(){
		//console.log(jQuery("#nombre").val());
		var data = {
		
		usr: jQuery("#email").val(),
		oldpass:jQuery.sha256(jQuery("#contrase").val()),
		pass:jQuery.sha256(jQuery("#contrasena").val()),
		phone:jQuery("#tfno").val(),
		surname:jQuery("#apellidos").val(),mail:jQuery("#mail").val(),
		username:jQuery("#nombre").val()
		/*,
		,
		
		,
		,*/
		
	};
		jQuery.mobile.loading('show',{text:'Procesando cambios',textVisible:true,theme:'b'});
	jQuery.getJSON("http://www.aidiapp.com/demodamehora/api/modUser/", data, function(objjson9) {
		//console.log('El servidor me ha dicho: ' + objjson9);
		jQuery.mobile.loading('hide');
		if(objjson9.userModified==true){
			//alert("Tus datos han sido modificados");
			jQuery(".proximacita").removeClass('no_visible');
			jQuery(".misdatos").addClass('no_visible');
		}
		
	})
	});
	
	//BOTON CREAR CUENTA
	
	jQuery(".crear").on('tap',function(){
		jQuery(".cuenta").removeClass('no_visible');
		jQuery(".reg").addClass('no_visible');
		
	});
	
	
	
	jQuery(".registrarse").on('tap',function(){
		
		var data = {
		
		usr: jQuery("#email1").val(),
		pass:jQuery.sha256(jQuery("#contrase1").val()),
		username:jQuery("#nombre1").val(),
		surname:jQuery("#apellidos1").val(),
		phone:jQuery("#tfno1").val(),
		mail:jQuery("#mail1").val(),
		
	};
		jQuery.mobile.loading('show',{text:'Creando usuario',textVisible:true,theme:'b'});
		
		
	jQuery.getJSON("http://www.aidiapp.com/demodamehora/api/createUser/", data, function(objjson10) {
		//console.log('El servidor me ha dicho: ' + objjson10);
		jQuery.mobile.loading('hide');
		if(objjson10.status=="error"){
			//alert(objjson10.error);
			
		}
		if(objjson10.userCreated==true){
			
			jQuery(".proximacita").removeClass('no_visible');
			jQuery(".misdatos").addClass('no_visible');
			//alert(objjson10.mailSended);
		}
		
	})
	});
	
	//BOTON PARA CONFIRMAR RESERVA
	jQuery(".confirmar").on('tap',function(){
		recargarReserva();
		jQuery(".edit").addClass('no_visible');
						if(user.email==null){
							jQuery.mobile.changePage("#micuenta");
								
							jQuery(".proxresev").html("<p>PENDIENTE DE LOGIN: Ha reservado el dia "+fech.dia+" a las "+fech.hora+" los servicios "+bItem.serviciosN+" con el profesional "+bItem.profesionalN+"PENDIENTE DE CONFIRMAR</p>");
							jQuery(".proximacita").removeClass('no_visible');
							jQuery(".btns").addClass('no_visible');
							 
							//jQuery.mobile.changePage( "#reservas",{ reloadPage: true, transition: "slide"} );			
						}else{
			
			
					var data = {
						
						user:user.email,
						pass:user.pass,
						idBooking: bItem.id,
						token1:"111",
					};
					jQuery.mobile.loading('show',{text:'Confirmando reserva',textVisible:true,theme:'b'});
					jQuery.getJSON("http://www.aidiapp.com/demodamehora/api/confirmBooking/", data, function(objjson2) {
		//console.log('El servidor me ha dicho: ' + objjson2);
		jQuery.mobile.loading('hide');
					if(objjson2.status=="confirmado"){
						//alert(objjson2.confirmado);
						//MODIFICAR EL TEXTO DE PROXIMA CITA PONIENDO QUE ESTÁ CONFIRMADA
						jQuery(".proxresev").html("<p> Ha reservado el dia "+fech.dia+" a las "+fech.hora+" los servicios "+bItem.serviciosN+" con el profesional "+bItem.profesionalN+"</p>");
						var anula= '<div class="boton cancelar cancelarr">Cancelar</div>'
						jQuery(".proxresev").append(anula);
						jQuery(".btns").removeClass('no_visible');
						
					}
		
		
		});
						}
						
						
				});
			
	
	//BOTON CANCELAR PRESERVA
	jQuery(".cancelar").on('tap',(function(){
		recargarReserva();
		jQuery(".edit").addClass('no_visible');
					var data = {
			
						idBooking: bItem.id,
						token1:"111",
					};
					jQuery.mobile.loading('show',{text:'Cancelando reserva',textVisible:true,theme:'b'});
					jQuery.getJSON("http://www.aidiapp.com/demodamehora/api/cancelBooking/", data, function					(objjson1) {
		//console.log('El servidor me ha dicho: ' + objjson1);
		jQuery.mobile.loading('hide');
					if(objjson1.status=="deleted"){
						 
						//alert("tu prereserva ha sido eliminada");
						
					}
		
		
		});
				}));
	
	
	//BOTON CANCELAR  RESERVA EN HISTORICO
	jQuery(".anul").on('tap',(function(){
		var miidb = jQuery(this).data('idb');
		//console.log("mi idbo es"+miidb);
				var data = {
			
						idBooking: miidb,
						token1:"111",
					};
					jQuery.mobile.loading('show',{text:'Cancelando reserva',textVisible:true,theme:'b'});
					jQuery.getJSON("http://www.aidiapp.com/demodamehora/api/cancelBooking/", data, function					(objjson6) {
		//console.log('El servidor me ha dicho: ' + objjson6);
		jQuery.mobile.loading('hide');
					if(objjson6.status=="deleted"){
						 
						//alert("tu reserva ha sido eliminada");
						jQuery(".mihistoric").html('');
						jQuery(".hcitas").trigger("tap");
						
					}
		
		
		});
				}));
	//BOTON DE RESERVAR
	jQuery(".reservar").on('tap',function(){
		var time=jQuery("#mydate").val();
		//console.log("mi fecha es"+time);
		var res = time.split("/");
		//console.log("mi fecha array es"+res);
		
		var hor=jQuery("#mydate1").text();
		//console.log("mi hora es"+hor);
		var res1 = hor.split(":");
		
		var mes=res[1]-1;
		var dia=res[0];
		var año=res[2];
		var hora=res1[0];
		var minuto=res1[1];

		var fecha = new Date(año,mes,dia,hora,minuto);
		//console.log("mi 2fecha es"+fecha);
			
		var mifecha=Date.parse('"'+fecha+'"');
		//console.log("mi fecha e unix es"+mifecha);
		var ser=jQuery("#seleccioneidServ").text();
		
		bItem.servicios=ser.substring(0, ser.length-2);
		//console.log(bItem.servicios);
		bItem.idprofesional=jQuery("#seleccioneidPro").text();
		//Lo dividimos entre 1000 para pasarlo a segundos porque el ervidor lo espera así
		bItem.time=mifecha/1000;
		times=bItem.time;
		bItem.serviciosN=jQuery("#seleccionadoServ").text();
		bItem.profesionalN=jQuery("#seleccionadoPro").text();
		fech.dia=time;
		fech.hora=hor;
		//console.log(bItem);
		var data = {
			
		servicios: bItem.servicios,
		time:bItem.time,
		idProfesional:bItem.idprofesional,
		
		
	};
		
		jQuery.mobile.loading('show',{text:'Procesando Reserva',textVisible:true,theme:'b'});
	jQuery.getJSON("http://www.aidiapp.com/demodamehora/api/checkBooking/", data, function(objjson) {
		//console.log('El servidor me ha dicho: ' + objjson);
		jQuery.mobile.loading('hide');
			
		
			if(objjson.status=="ok"){
				bItem.id=objjson.idBooking;
				
				if(bItem.id==0){
					//console.log("me llamasteeee");
						jQuery(".calend").addClass('no_visible');
						jQuery(".edit").addClass('no_visible');
						jQuery(".ups").removeClass('no_visible');
						jQuery.mobile.silentScroll(jQuery(".ups").offset().top);

						jQuery("#seleccionefecha").html("<p>Fecha original "+fech.dia+"  "+fech.hora+" no disponible</p>");
						
				}else{
				
				
				
						jQuery(".edit").removeClass('no_visible');
						jQuery(".calend").addClass('no_visible');
						jQuery("#seleccionefecha").text(time).append("  "+hor);
				
				}
			
			}
		
	})
	});
	
});
function actualizarOfertas(){
	var data = {
		slug:'ofertas'
	};
	jQuery.mobile.loading('show',{text:'Cargando contenidos de la web',textVisible:true,theme:'b'});
	jQuery.getJSON("http://www.aidiapp.com/demodamehora/api/get_category_posts/", data, function(objjson13) {
		jQuery.mobile.loading('hide');
		//console.log('El servidor me ha dicho: ofertas' + objjson13.posts);
		var misofertas=objjson13.posts;
		for(oferta in misofertas){
			jQuery("#misofertas").append(
			'<div class="oferta">'
			+'<img width="100" height="100" src="'+misofertas[oferta].thumbnail+'"/><div class="tit_oferta">'+misofertas[oferta].title+'</div><div class="content_oferta">'+misofertas[oferta].content +'</div></div>');
			          	
		}
		
		})
};

function actualizarProfesional(){
		var data = null;
	
	jQuery.getJSON("http://www.aidiapp.com/demodamehora/api/getStaff/", data, function(objjson12) {
		//console.log('El servidor me ha dicho: ' + objjson12.profesionales[0].ID);
		 var misprofesionales=objjson12.profesionales;
		 //console.log('El servidor me ha dicho: ' + objjson12);
		 for(profesional in misprofesionales){
			 var mioptionp='<option value="'+misprofesionales[profesional].ID+'">'+misprofesionales[profesional].post_title+'</option>';
			
			 jQuery('select#selecprofesional').append(mioptionp);
			
		 }
		
		
		})
	
};

function actualizarServicios(){
		var data = null;
	
	jQuery.getJSON("http://www.aidiapp.com/demodamehora/api/getServices/", data, function(objjson11) {
		//console.log('El servidor me ha dicho: ' + objjson11.servicios[0].ID);
		 var misservicios=objjson11.servicios;
		 //console.log('El servidor me ha dicho: ' + objjson11);
		 for(serv in misservicios){
			 var mioption='<option value="'+misservicios[serv].ID+'">'+misservicios[serv].post_title+'</option>';
			 //console.log('Queremos añadir '+mioption);
			 jQuery('select#selecservicio').append(mioption);
			
		 }
		
		
		})
	
};



function recargarReserva(){
jQuery('#seleccionadoServ').html('');
jQuery('#seleccioneidServ').html('');
jQuery('#selecservicio').html(servicio1);
actualizarServicios();


jQuery('#seleccionadoPro').html('');
jQuery('#seleccioneidPro').html('');
jQuery('#selecprofesional').html(servicio2);
actualizarProfesional();

jQuery("#seleccionefecha").html('');
jQuery('.calendario').removeClass('no_visible');

jQuery('input#mydate').val('');
jQuery('#selechora option[value=--]').attr('selected', 'selected');
jQuery('#selechora').selectmenu('refresh', true);
jQuery('#selecminutos option[value=--]').attr('selected', 'selected');
jQuery('#selecminutos').selectmenu('refresh', true);

jQuery('#mydate1').html('');
jQuery(".servicios:first").removeClass('no_activo');
jQuery(".servicios:last").addClass('no_activo');
}

function MaysPrimera(string){
	 return string.charAt(0).toUpperCase() + string.slice(1); 
	 } 
jQuery(document).bind("mobileinit", function(){
  ajaxEnabled:false;
});