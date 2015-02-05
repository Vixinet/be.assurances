
// Responsive Prestashop

		(function(doc) {
		var addEvent = 'addEventListener',
		type = 'gesturestart',
		qsa = 'querySelectorAll',
		scales = [1, 1],
		meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];
		function fix() {
		meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
		doc.removeEventListener(type, fix, true);
		}
		if ((meta = meta[meta.length - 1]) && addEvent in doc) {
		fix();
		scales = [.25, 1.6];
		doc[addEvent](type, fix, true);
		}
		}(document));

/*
 * 	Easy Tooltip 1.0 - jQuery plugin
 */
 
(function($) {

	$.fn.easyTooltip = function(options){
	  
		// default configuration properties
		var defaults = {	
			xOffset: -50,		
			yOffset: 35,
			tooltipId: "easyTooltip",
			clickRemove: false,
			content: "",
			useElement: ""
		}; 
			
		var options = $.extend(defaults, options);  
		var content;
				
		this.each(function() {  				
			var title = $(this).attr("title");				
			$(this).hover(function(e){											 							   
				content = (options.content != "") ? options.content : title;
				content = (options.useElement != "") ? $("#" + options.useElement).html() : content;
				$(this).attr("title","");									  				
				if (content != "" && content != undefined){			
					$("body").append("<div id='"+ options.tooltipId +"'>"+ content +"</div>");		
					$("#" + options.tooltipId)
						.css("position","absolute")
						.css("top",(e.pageY - options.yOffset) + "px")
						.css("left",(e.pageX + options.xOffset) + "px")						
						.css("display","none")
						.fadeIn("fast")
				}
			},
			function(){	
				$("#" + options.tooltipId).remove();
				$(this).attr("title",title);
			});	
			$(this).mousemove(function(e){
				$("#" + options.tooltipId)
					.css("top",(e.pageY - options.yOffset) + "px")
					.css("left",(e.pageX + options.xOffset) + "px")					
			});	
			if(options.clickRemove){
				$(this).mousedown(function(e){
					$("#" + options.tooltipId).remove();
					$(this).attr("title",title);
				});				
			}
		});
	  
	};

})(jQuery);

//////////////////////////////////////////////////////////////////////////////////
// Cloud Zoom V1.0.2
// (c) 2010 by R Cecco. <http://www.professorcloud.com>
// MIT License
//
// Please retain this copyright header in all versions of the software
//////////////////////////////////////////////////////////////////////////////////


(function($){$(document).ready(function(){$('.cloud-zoom, .cloud-zoom-gallery').CloudZoom();});
function format(str){for(var i=1;i<arguments.length;i++){str=str.replace('%'+(i-1),arguments[i]);}
	return str;}
function CloudZoom(jWin,opts){var sImg=$('img',jWin);
		var img1;
		var img2;
		var zoomDiv=null;
		var $mouseTrap=null;
		var lens=null;
		var $tint=null;
		var softFocus=null;
		var $ie6Fix=null;
		var zoomImage;
		var controlTimer=0;
		var cw,ch;
		var destU=0;
		var destV=0;
		var currV=0;
		var currU=0;
		var filesLoaded=0;
		var mx,my;
		var ctx=this,zw;
		
setTimeout(function(){if($mouseTrap===null){var w=jWin.width();
jWin.parent().append(format('<div style="width:%0px;position:absolute;top:75%;left:%1px;text-align:center" class="cloud-zoom-loading" >Loading...</div>',w/3,(w/2)-(w/6))).find(':last').css('opacity',0.5);}},200);
	var ie6FixRemove=function(){if($ie6Fix!==null){$ie6Fix.remove();$ie6Fix=null;}};
	this.removeBits=function(){if(lens){lens.remove();
	lens=null;};if($tint){$tint.remove();
	$tint=null;};

if(softFocus){softFocus.remove();
	softFocus=null;};
	ie6FixRemove();
$('.cloud-zoom-loading',jWin.parent()).remove();};
	this.destroy=function(){jWin.data('zoom',null);
if($mouseTrap){$mouseTrap.unbind();
	$mouseTrap.remove();
	$mouseTrap=null;};
if(zoomDiv){zoomDiv.remove();
	zoomDiv=null;};
this.removeBits();};
this.fadedOut=function(){if(zoomDiv){zoomDiv.remove();
	zoomDiv=null;};
this.removeBits();};
this.controlLoop=function(){if(lens){var x=(mx-sImg.offset().left-(cw*0.5))>>0;


var y=(my-sImg.offset().top-(ch*0.5))>>0;
if(x<0){x=0;}else if(x>(sImg.outerWidth()-cw)){x=(sImg.outerWidth()-cw);}
if(y<0){y=0;}else if(y>(sImg.outerHeight()-ch)){y=(sImg.outerHeight()-ch);}
	lens.css({left:x,top:y});
	lens.css('background-position',(-x)+'px '+(-y)+'px');
	destU=(((x)/sImg.outerWidth())*zoomImage.width)>>0;destV=(((y)/sImg.outerHeight())*zoomImage.height)>>0;
	currU+=(destU-currU)/opts.smoothMove;currV+=(destV-currV)/opts.smoothMove;
	zoomDiv.css('background-position',(-(currU>>0)+'px ')+(-(currV>>0)+'px'));}
	controlTimer=setTimeout(function(){ctx.controlLoop();},30);};
this.init2=function(img,id){filesLoaded++;
if(id===1){zoomImage=img;}
if(filesLoaded===2){this.init();}};
this.init=function(){$('.cloud-zoom-loading',jWin.parent()).remove();

$mouseTrap=jWin.parent().append(format("<div class='mousetrap' style='background-image:url(\".\");z-index:999;position:absolute;width:%0px;height:%1px;left:%2px;top:%3px;\'></div>",sImg.outerWidth(),sImg.outerHeight(),0,0)).find(':last');
	var touchy=("ontouchstart"in document.documentElement)?true:false;
	var m_move='touchmove mousemove';
	var m_end='touchend mouseleave';
	var m_ent='touchstart mouseenter';
	var m_click='click';
	
$mouseTrap.bind(m_move,this,function(e){mx=(typeof(e.originalEvent.touches)!='undefined')?e.originalEvent.touches[0].pageX:e.pageX;my=(typeof(e.originalEvent.touches)!='undefined')?e.originalEvent.touches[0].pageY:e.pageY;});$mouseTrap.bind(m_end,this,function(event){clearTimeout(controlTimer);
	if(lens){lens.fadeOut(299);}
	if($tint){$tint.fadeOut(299);}
	if(softFocus){softFocus.fadeOut(299);}
zoomDiv.fadeOut(300,function(){ctx.fadedOut();
	if($mouseTrap!=null)$mouseTrap.css("z-index","auto");});
		return false;});
$mouseTrap.bind(m_ent,this,function(event){$mouseTrap.css("z-index","999");
	if(touchy){event.preventDefault();}
mx=(typeof(event.originalEvent.touches)!='undefined')?event.originalEvent.touches[0].pageX:event.pageX;
my=(typeof(event.originalEvent.touches)!='undefined')?event.originalEvent.touches[0].pageY:event.pageY;
zw=event.data;
	if(zoomDiv){zoomDiv.stop(true,false);zoomDiv.remove();}
		var xPos=opts.adjustX,yPos=opts.adjustY;
		var siw=sImg.outerWidth();
		var sih=sImg.outerHeight();
		var w=opts.zoomWidth;
		var h=opts.zoomHeight;
		
if(opts.zoomWidth=='auto'){w=siw;}
if(opts.zoomHeight=='auto'){h=sih;}
		var appendTo=jWin.parent();
switch(opts.position)
	{case'top':yPos-=h;break;
	case'right':xPos+=siw;break;
	case'bottom':yPos+=sih;break;
	case'left':xPos-=w;break;
	case'inside':w=siw;h=sih;break;
	default:appendTo=$('#'+opts.position);
if(!appendTo.length){appendTo=jWin;xPos+=siw;yPos+=sih;}
	else{w=appendTo.innerWidth();
h=appendTo.innerHeight();}}


zoomDiv=appendTo.append(format('<div id="cloud-zoom-big" class="cloud-zoom-big" style="display:none;position:absolute;left:%0px;top:%1px;width:298px;height:298px;background-image:url(\'%4\');z-index:99;background-color:#ffffff; "></div>',xPos,yPos,w,h,zoomImage.src)).find(':last');
	if(sImg.attr('title')&&opts.showTitle){zoomDiv.append(format('<div class="cloud-zoom-title">%0</div>',sImg.attr('title'))).find(':last').css('opacity',opts.titleOpacity);}
	if($.browser.msie&&$.browser.version<7)
{$ie6Fix=$('<iframe frameborder="0" src="#"></iframe>').css({position:"absolute",left:xPos,top:yPos,zIndex:0});}
zoomDiv.fadeIn(500);
	if(lens){lens.remove();
	lens=null;}
cw=(sImg.outerWidth()/zoomImage.width)*zoomDiv.width();ch=(sImg.outerHeight()/zoomImage.height)*zoomDiv.height();
lens=jWin.append(format("<div class = 'cloud-zoom-lens' style='display:none;z-index:98;position:absolute;width:%0px;height:%1px;'></div>",cw,ch)).find(':last');
$mouseTrap.css('cursor',lens.css('cursor'));
	var noTrans=false;
	if(opts.tint){lens.css('background','url("'+sImg.attr('src')+'")');
	
	
	
$tint=jWin.append(format('<div style="display:none;position:absolute; left:0px; top:0px; width:%0px; height:%1px; background-color:%2;" />',sImg.outerWidth(),sImg.outerHeight(),opts.tint)).find(':last');
$tint.css('opacity',opts.tintOpacity);
	noTrans=true;
$tint.fadeIn(500);}
	if(opts.softFocus){lens.css('background','url("'+sImg.attr('src')+'")');
softFocus=jWin.append(format('<div style="position:absolute;display:none;top:2px; left:2px; width:%0px; height:%1px;" />',sImg.outerWidth()-2,sImg.outerHeight()-2,opts.tint)).find(':last');
softFocus.css('background','url("'+sImg.attr('src')+'")');
softFocus.css('opacity',0.5);
	noTrans=true;
softFocus.fadeIn(500);}
	if(!noTrans){lens.css('opacity',opts.lensOpacity);}
	if(opts.position!=='inside'){lens.fadeIn(500);}zw.controlLoop();
		return;});};
		
		
		
img1=new Image();
$(img1).load(function(){ctx.init2(this,0);});
img1.src=sImg.attr('src');
img2=new Image();$(img2).load(function(){ctx.init2(this,1);});
img2.src=jWin.attr('href');}
$.fn.CloudZoom=function(options){try{document.execCommand("BackgroundImageCache",false,true);}
catch(e){}this.each(function(){var relOpts,opts;eval('var a = {'+$(this).attr('rel')+'}');
	relOpts=a;
if($(this).is('.cloud-zoom')){$(this).css({'position':'relative','display':'block'});
$('img',$(this)).css({'display':'block'});
if($(this).parent().attr('id')!='wrap'){$(this).wrap('<div id="wrap" style="top:0px;z-index:auto;position:relative;"></div>');}
	opts=$.extend({},$.fn.CloudZoom.defaults,options);
	opts=$.extend({},opts,relOpts);
$(this).data('zoom',new CloudZoom($(this),opts));}
	else if($(this).is('.cloud-zoom-gallery')){opts=$.extend({},relOpts,options);
$(this).data('relOpts',opts);
	var m_click='click';
$(this).bind(m_click,$(this),function(event){var data=event.data.data('relOpts');
$('#'+data.useZoom).data('zoom').destroy();
$('#'+data.useZoom).attr('href',event.data.attr('href'));
$('#'+data.useZoom+' img').attr('src',event.data.data('relOpts').smallImage);
$('#'+event.data.data('relOpts').useZoom).CloudZoom();
	return false;});}});
	return this;};
	
$.fn.CloudZoom.defaults={zoomWidth:106,zoomHeight:106,position:'right',tint:false,tintOpacity:0.5,lensOpacity:0.5,softFocus:false,smoothMove:3,showTitle:true,titleOpacity:0.5,adjustX:0,adjustY:0};})(jQuery);


//Cookie grid list

(function($) {
$(function() {

	function createCookie(name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	}
	function readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}
	function eraseCookie(name) {
		createCookie(name,"",-1);
	}
	$('ul.product_view').each(function(i) {
		var cookie = readCookie('tabCookie'+i);
		if (cookie) $(this).find('li').eq(cookie).addClass('current').siblings().removeClass('current')
			.parents('#center_column').find('#product_list').addClass('list').removeClass('grid').eq(cookie).addClass('grid').removeClass('list');
	})

	$('ul.product_view').delegate('li:not(.current)', 'click', function(i) {
		$(this).addClass('current').siblings().removeClass('current')
			.parents('#center_column').find('#product_list').removeClass('grid').addClass('list').eq($(this).index()).addClass('grid').removeClass('list')
			
				var cookie = readCookie('tabCookie'+i);
		if (cookie) $(this).find('#product_list').eq(cookie).removeClass('grid').addClass('list').siblings().removeClass('list')
		
		
		
		var ulIndex = $('ul.product_view').index($(this).parents('ul.product_view'));
		eraseCookie('tabCookie'+ulIndex);
		createCookie('tabCookie'+ulIndex, $(this).index(), 365);
	})
})
})(jQuery)


//*************************************************************************************************************************************************************************************************************************
	
//Tooltip
	  	$(document).ready(function() {
		$("#tmsocial li a img").easyTooltip();
		$("#header_user_info a").easyTooltip();
		$("#tmheaderlinks li:first-child a").easyTooltip();
});
	  
	  

  
//product disable img 
  $(document).ready(function() {  
$(function(){     
    $('#zoom1').parent().on('click',function(){
     var perehod = $(this).attr("perehod");
      if (perehod=="false") {
       return true;
       } else {
        return false;
       }
    });     
  });
  });



    $(document).ready(function() {
       $ ('#order_steps li:even').addClass ('even');
       $ ('#order_steps li:odd').addClass ('odd');
	   $ ('.list-order-step li').last().addClass ('last');
	   $ ('.iosSlider .slider #item').last().addClass ('last');
	     $ ('#featured_products .list_carousel li').last().addClass ('last');
		 $ ('.iosSlider2 .slider2 #item2').last().addClass ('last');
	   $ ('.iosSlider2 .slider #item').last().addClass ('last');
	   $ ('.main-mobile-menu ul ul').addClass('menu-mobile-2'); 
	   

    });

jQuery(document).ready(function() {
jQuery('.menu-mobile  li').has('.menu-mobile-2').prepend('<span class="open-mobile-2"></span>');
}); 







	/* responsive table */
jQuery(document).ready(function() {

 if (jQuery('.container_24').width() < 450) {
  jQuery('#order-list td.history_link').prepend('<strong>Order Reference:</strong>');
  jQuery('#order-list td.history_date').prepend('<strong>Date: </strong>');
  jQuery('#order-list td.history_price').prepend('<strong>Total price:</strong>');
  jQuery('#order-list td.history_method').prepend('<strong>Payment:</strong>');
  jQuery('#order-list td.history_state').prepend('<strong>Status: </strong>');
  jQuery('#order-list td.history_invoice').prepend('<strong>Invoice: </strong>');
  jQuery('#order-list td.history_detail').prepend('<strong></strong>');
 }

});


jQuery(document).ready(function() {

 if (jQuery('.container_24').width() < 450) {
  jQuery('#order-detail-content table.multishipping-cart td.cart_product').prepend('<strong>Product:</strong>');
  jQuery('#order-detail-content table.multishipping-cart  td.cart_description').prepend('<strong>Description: </strong>');
  jQuery('#order-detail-content table.multishipping-cart  td.cart_ref').prepend('<strong>Ref.:</strong>');
  jQuery('#order-detail-content table.multishipping-cart  td.cart_quantity').prepend('<strong>Qty:</strong>');
  jQuery('#order-detail-content table.multishipping-cart  td.ship-adress').prepend('<strong>Addresses: </strong>');
  jQuery('#order-detail-content table.multishipping-cart  td.cart_delete').prepend('<strong>Delete: </strong>');
 }

});






// #content column

$(document).ready(function(){
		 if (jQuery('.container_24').width() < 450) {
$(".column h4,this").toggle(
function() {
$(this).next('.column .block_content,this').slideToggle("slow"),{
duration: 'slow',
easing: 'linear'
};
jQuery(this).addClass('mobile-open');
},
function() {
$(this).next('.column .block_content,this').slideToggle("slow"),{
duration: 'slow',
easing: 'linear'
};
jQuery(this).removeClass('mobile-open');
}
);
		 }
});

// #social_block script

$(document).ready(function(){
	 if (jQuery('.container_24').width() < 450) {
$(this).find("#social_block h4 ").toggle(
function() {
$(this).next('#social_block ul').slideToggle("slow"),{
duration: 'slow',
easing: 'linear'
};
$('#social_block h4 ').addClass('mobile-open');
},
function() {
$(this).next('#social_block ul').slideToggle("slow"),{
duration: 'slow',
easing: 'linear'
};
$('#social_block h4 ').removeClass('mobile-open');
}
);
	 }
});


// #social_block script

$(document).ready(function(){
	 if (jQuery('.container_24').width() < 450) {
$(this).find("#block_contact_infos h4").toggle(
function() {
$(this).next('#block_contact_infos ul').slideToggle("slow"),{
duration: 'slow',
easing: 'linear'
};
$('#block_contact_infos h4 ').addClass('mobile-open');
},
function() {
$(this).next('#block_contact_infos ul').slideToggle("slow"),{
duration: 'slow',
easing: 'linear'
};
$('#block_contact_infos h4 ').removeClass('mobile-open');
}
);
}
});












// menu-mobile script

$(document).ready(function(){
$(this).find(".wrap-title").toggle(
function() {
$(this).next('.menu-mobile').slideToggle("slow"),{
duration: 'slow',
easing: 'linear'
};
$('.open-mobile').addClass('mobile-close');
},
function() {
$(this).next('.menu-mobile').slideToggle("slow"),{
duration: 'slow',
easing: 'linear'
};
$('.open-mobile').removeClass('mobile-close');
}
);
});


// menu-mobile-2 script

$(document).ready(function(){
$(".menu-mobile > li  .open-mobile-2,this").toggle(
function() {
$(this).next().next('.menu-mobile-2,this').slideToggle("slow"),{
duration: 'slow',
easing: 'linear'
};
jQuery(this).addClass('mobile-close-2');
$('.menu-mobile-2 .open-mobile-2').addClass('mobile-close-2-2');
},
function() {
$(this).next().next('.menu-mobile-2,this').slideToggle("slow"),{
duration: 'slow',
easing: 'linear'
};
jQuery(this).removeClass('mobile-close-2');
}
)
});




// #tmfooterlinks script

$(document).ready(function(){
	 if (jQuery('.container_24').width() < 450) {
$("#tmfooterlinks h4,this").toggle(
function() {
$(this).next('#tmfooterlinks ul,this').slideToggle("slow"),{
duration: 'slow',
easing: 'linear'
};
jQuery(this).addClass('mobile-open');
},
function() {
$(this).next('#tmfooterlinks ul,this').slideToggle("slow"),{
duration: 'slow',
easing: 'linear'
};
jQuery(this).removeClass('mobile-open');
}
);
	 }
});

// menu-mobile-3 script


$(document).ready(function(){
$(".menu-mobile .menu-mobile-2 .open-mobile-2,this").toggle(
function() {
$(this).next('.menu-mobile-2,this').slideToggle("slow"),{
duration: 'slow',
easing: 'linear'
};
jQuery(this).addClass('mobile-close-3');
},
function() {
$(this).next('.menu-mobile .menu-mobile-2 .menu-mobile-2,this').slideToggle("slow"),{
duration: 'slow',
easing: 'linear'
};
jQuery(this).removeClass('mobile-close-3');
}
);
});


		// Desc 

$(document).ready(function(){
$(".more_info_inner > h3 ,this").toggle(
function() {
$(this).next('#idTab1,this').slideToggle("slow"),{
duration: 'slow',
easing: 'linear'
};
jQuery(this).addClass('mobile-open');
},
function() {
$(this).next('#idTab1,this').slideToggle("slow"),{
duration: 'slow',
easing: 'linear'
};
jQuery(this).removeClass('mobile-open');
}
);
});

		// Data sheet

$(document).ready(function(){
$(".more_info_inner2 h3 ,this").toggle(
function() {
$(this).next('#idTab22,this').slideToggle("slow"),{
duration: 'slow',
easing: 'linear'
};
jQuery(this).addClass('mobile-open');
},
function() {
$(this).next('#idTab22,this').slideToggle("slow"),{
duration: 'slow',
easing: 'linear'
};
jQuery(this).removeClass('mobile-open');
}
);
});

		// same category

$(document).ready(function(){
$(".blockproductscategory h3 ,this").toggle(
function() {
$(this).next('.container2,this').slideToggle("slow"),{
duration: 'slow',
easing: 'linear'
};
jQuery(this).addClass('mobile-open');
},
function() {
$(this).next('.container2,this').slideToggle("slow"),{
duration: 'slow',
easing: 'linear'
};
jQuery(this).removeClass('mobile-open');
}
);
});
		
		
		
// page-product

$(document).ready(function(){
$(".more_info_inner3 h3 ,this").toggle(
function() {
$(this).next('#idTab9,this').slideToggle("slow"),{
duration: 'slow',
easing: 'linear'
};
jQuery(this).addClass('mobile-open');
},
function() {
$(this).next('#idTab9,this').slideToggle("slow"),{
duration: 'slow',
easing: 'linear'
};
jQuery(this).removeClass('mobile-open');
}
);
});	
		
// page-product

$(document).ready(function(){
$(".more_info_inner4 h3 ,this").toggle(
function() {
$(this).next('#idTab4,this').slideToggle("slow"),{
duration: 'slow',
easing: 'linear'
};
jQuery(this).addClass('mobile-open');
},
function() {
$(this).next('#idTab4,this').slideToggle("slow"),{
duration: 'slow',
easing: 'linear'
};
jQuery(this).removeClass('mobile-open');
}
);
});	
// page-product
$(document).ready(function(){
$("#more_info_block > li > a ,this").toggle(
function() {
$(this).parent().next('#more_info_sheets,this').slideToggle("slow"),{
duration: 'slow',
easing: 'linear'
};
jQuery(this).addClass('mobile-open');
},
function() {
$(this).parent().next('#more_info_sheets,this').slideToggle("slow"),{
duration: 'slow',
easing: 'linear'
};
jQuery(this).removeClass('mobile-open');
}
);
});				
// page-product
$(document).ready(function(){
$("#more_info_block5 h3 ,this").toggle(
function() {
$(this).next('.customization_block,this').slideToggle("slow"),{
duration: 'slow',
easing: 'linear'
};
jQuery(this).addClass('mobile-open');
},
function() {
$(this).next('.customization_block,this').slideToggle("slow"),{
duration: 'slow',
easing: 'linear'
};
jQuery(this).removeClass('mobile-open');
}
);
});		
			
// quantityDiscount 

$(document).ready(function(){
	$("#product_comments_block_tab p a").addClass('button');
$("div#quantityDiscount h3 ,this").toggle(
function() {
$(this).next('.table-block,this').slideToggle("slow"),{
duration: 'slow',
easing: 'linear'
};
jQuery(this).addClass('mobile-open');
},
function() {
$(this).next('.table-block,this').slideToggle("slow"),{
duration: 'slow',
easing: 'linear'
};
jQuery(this).removeClass('mobile-open');
}
);
});
		



// language script
	
$(document).ready(function(){  
	if (jQuery('.container_24').width() < 780) { 
	   $('.inner-carrencies').on('click',function(event){
        event.stopPropagation();
        if ( $('.selected_language.mobile-open').length > 0 ) {
            $('.countries_ul:visible').slideToggle("slow");
            $('.selected_language').removeClass('mobile-open');
				$('.selected_language').parent().parent().removeClass('mobile-open');
				
        }
    }); 
			   $('.mobile-link-top h4').on('click',function(event){
        event.stopPropagation();
        if ( $('.selected_language.mobile-open').length > 0 ) {
            $('.countries_ul:visible').slideToggle("slow");
            $('.selected_language').removeClass('mobile-open');
			$('.selected_language').parent().parent().removeClass('mobile-open');
			$('.inner-carrencies').parent().parent().removeClass('mobile-open');
        }
    }); 
				   $('#header_user').on('click',function(event){
        event.stopPropagation();
        if ( $('.selected_language.mobile-open').length > 0 ) {
            $('.countries_ul:visible').slideToggle("slow");
            $('.selected_language').removeClass('mobile-open');
				$('.selected_language').parent().parent().removeClass('mobile-open');
				$('.inner-carrencies').parent().parent().removeClass('mobile-open');
        }
    }); 
	
	
	
	
	// mobile script language 
    $('.selected_language').click(function(event){
        event.stopPropagation();
        if ( $(this).hasClass('mobile-open') ) {
            $(this).removeClass('mobile-open');
			$(this).parent().parent().removeClass('mobile-open');	
            $(this).siblings('.countries_ul').stop(true, true).delay(400).slideUp(300),{
duration: 'slow',
easing: 'linear'
};
        } else {
            $('.selected_language.mobile-open').removeClass('.mobile-open').siblings('.countries_ul').stop(true, true).delay(400).slideUp(300),{
duration: 'slow',
easing: 'linear'
};
            $(this).addClass('mobile-open');
$(this).parent().parent().addClass('mobile-open');			
            $(this).siblings('.countries_ul').stop(true, true).slideDown(400),{
duration: 'slow',
easing: 'linear'
};
        }
    });  }
});



// carrencies script
$(document).ready(function(){   
	if (jQuery('.container_24').width() < 780) {
	   $('.selected_language').on('click',function(event){
        event.stopPropagation();
        if ( $('.inner-carrencies.mobile-open').length > 0 ) {
            $('.currencies_ul:visible').slideToggle("slow");
            $('.inner-carrencies').removeClass('mobile-open');
			$('.inner-carrencies').parent().parent().removeClass('mobile-open');
        }
    });
		   $('.mobile-link-top h4').on('click',function(event){
        event.stopPropagation();
        if ( $('.inner-carrencies.mobile-open').length > 0 ) {
            $('.currencies_ul:visible').slideToggle("slow");
            $('.inner-carrencies').removeClass('mobile-open');
			$('.inner-carrencies').parent().parent().removeClass('mobile-open');
        }
    }); 
	
			   $('#header_user').on('click',function(event){
        event.stopPropagation();
        if ( $('.inner-carrencies.mobile-open').length > 0 ) {
            $('.currencies_ul:visible').slideToggle("slow");
            $('.inner-carrencies').removeClass('mobile-open');
			$('.inner-carrencies').parent().parent().removeClass('mobile-open');
			
        }
    }); 
	
    $('.inner-carrencies').click(function(event){
        event.stopPropagation();
        if ( $(this).hasClass('mobile-open') ) {
            $(this).removeClass('mobile-open');
			$(this).parent().parent().removeClass('mobile-open');
            $(this).siblings('.currencies_ul').stop(true, true).delay(400).slideUp(300),{
duration: 'slow',
easing: 'linear'
};
        } else {
            $('.inner-carrencies.mobile-open').removeClass('.mobile-open').siblings('.currencies_ul').stop(true, true).delay(400).slideUp(300),{
duration: 'slow',
easing: 'linear'
};
            $(this).addClass('mobile-open');
			$(this).parent().parent().addClass('mobile-open');	
            $(this).siblings('.currencies_ul').stop(true, true).slideDown(400),{
duration: 'slow',
easing: 'linear'
};
        }
    }); }
});


// carrencies script 
$(document).ready(function(){   
	if (jQuery('.container_24').width() < 780) {
	   $('.selected_language').on('click',function(event){
        event.stopPropagation();
        if ( $('.mobile-link-top h4.act').length > 0 ) {
            $('#mobilelink:visible').slideToggle("slow");
            $('.mobile-link-top h4').removeClass('act');
        }
    }); 
	
$('.inner-carrencies').on('click',function(event){
        event.stopPropagation();
        if ( $('.mobile-link-top h4.act').length > 0 ) {
            $('#mobilelink:visible').slideToggle("slow");
            $('.mobile-link-top h4').removeClass('act');
        }
		  });
$('#header_user').on('click',function(event){
        event.stopPropagation();
        if ( $('.mobile-link-top h4.act').length > 0 ) {
            $('#mobilelink:visible').slideToggle("slow");
            $('.mobile-link-top h4').removeClass('act');
        }	
    }); 
	
	
	
    $('.mobile-link-top h4').click(function(event){
        event.stopPropagation();
        if ( $(this).hasClass('act') ) {
            $(this).removeClass('act');
            $(this).siblings('#mobilelink').stop(true, true).delay(400).slideUp(300),{
duration: 'slow',
easing: 'linear'
};
        } else {
            $('.mobile-link-top h4.act').removeClass('.act').siblings('#mobilelink').stop(true, true).delay(400).slideUp(300),{
duration: 'slow',
easing: 'linear'
};
            $(this).addClass('act');
            $(this).siblings('#mobilelink').stop(true, true).slideDown(400),{
duration: 'slow',
easing: 'linear'
};
        }
    }); }
});




// carrencies script
$(document).ready(function(){   


	   $('.selected_language').on('click',function(event){
        event.stopPropagation();
        if ( $('#header_user.close-cart').length > 0 ) {
            $('#cart_block:visible').slideToggle("slow");
            $('#header_user').removeClass('close-cart');
        }
    }); 
	
		   $('.mobile-link-top h4').on('click',function(event){
        event.stopPropagation();
        if ( $('#header_user.close-cart').length > 0 ) {
            $('#cart_block:visible').slideToggle("slow");
            $('#header_user').removeClass('close-cart');
        }
    }); 
	
			   $('.inner-carrencies').on('click',function(event){
        event.stopPropagation();
        if ( $('#header_user.close-cart').length > 0 ) {
            $('#cart_block:visible').slideToggle("slow");
            $('#header_user').removeClass('close-cart');
        }
    }); 
	
    $('#header_user').click(function(event){
        event.stopPropagation();
        if ( $(this).hasClass('close-cart') ) {
            $(this).removeClass('close-cart');
            $(this).siblings('#cart_block').stop(true, true).delay(400).slideUp(300),{
duration: 'slow',
easing: 'linear'
};
        } else {
            $('#header_user.close-cart').removeClass('.close-cart').siblings('#cart_block').stop(true, true).delay(400).slideUp(300),{
duration: 'slow',
easing: 'linear'
};
            $(this).addClass('close-cart');
            $(this).siblings('#cart_block').stop(true, true).slideDown(400),{
duration: 'slow',
easing: 'linear'
};
        }
    }); 
});



// mobile-link-top 960 script

$(document).ready(function(){
	if (jQuery('.container_24').width() > 780) {
$(this).find(".mobile-link-top").hover(
function() {
$(this).find('#mobilelink').stop(true, true).slideDown(400),{
duration: 'slow',
easing: 'linear'
};
$('h4').addClass('mobile-open');

},
function() {
$(this).find('#mobilelink').stop(true, true).delay(400).slideUp(300),{
duration: 'slow',
easing: 'linear'
};
$('h4').removeClass('mobile-open');
}
);
     	}
});

// carrencies 960 script

$(document).ready(function(){
	if (jQuery('.container_24').width() > 780) {
$(this).find("#currencies_block_top").hover(
function() {
$(this).find('.currencies_ul').stop(true, true).slideDown(400),{
duration: 'slow',
easing: 'linear'
};
$('.inner-carrencies').addClass('mobile-open');
$(this).addClass('mobile-open');
},
function() {
$(this).find('.currencies_ul').stop(true, true).delay(400).slideUp(300),{
duration: 'slow',
easing: 'linear'
};
$('.inner-carrencies').removeClass('mobile-open');
$(this).removeClass('mobile-open');
}
);
}
});







// language 960 script

$(document).ready(function(){
	if (jQuery('.container_24').width() > 780) {
$(this).find("#languages_block_top").hover(
function() {
$(this).find('.countries_ul').stop(true, true).slideDown(400),{
duration: 'slow',
easing: 'linear'
};
$('.selected_language').addClass('mobile-open');
$(this).addClass('mobile-open');	

},
function() {
$(this).find('.countries_ul').stop(true, true).delay(400).slideUp(300),{
duration: 'slow',
easing: 'linear'
};
$('.selected_language').removeClass('mobile-open');
$(this).removeClass('mobile-open');
}
);
     	}
});





			


// back-top and special script

jQuery(document).ready(function(){
	jQuery('#tmspecials').css({visibility:'visible',display:'block'});
	// hide #back-top first
	jQuery("#back-top").hide();
	// fade in #back-top
	jQuery(function () {
		jQuery(window).scroll(function () {
			if (jQuery(this).scrollTop() > 100) {
				jQuery('#back-top').fadeIn();
			} else {
				jQuery('#back-top').fadeOut();
			}
		});
		// scroll body to 0px on click
		jQuery('#back-top a').click(function () {
			jQuery('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
	});

});








