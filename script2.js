composed-mason-368404:southamerica-east1:projetoajuda

// calcular tamanho tela

function calc_size(){
    var largura = $(window).width();  
}
$(document).ready(function(){
 calc_size();
   $(window).resize(function() {
     calc_size();
   });
});

//

$(document).ready(function(){
    var $doc = $('html, body');
      $('.scroll').click(function() {
        console.log("[scroll] - Desliza");
          $doc.animate({
              scrollTop: $( $.attr(this, 'href') ).offset().top
          }, 500);
          return false;
      });
    });

//

$(document).ready(function(){
    /*fechando as duvidas*/
    duvidas_change('one');

    /*quando clica na bolinha co mo numero da pergunta*/
    $(".duvidas_open").click(function(){
      /*pegando o numero da questão*/
      var num = $(this).attr("key");
      /*fechando as questões*/
      duvidas_change(num);
      /*dando destaque a bolinha*/
      $(this).attr("id", "active");
    });
  });

  /*função para trocar as perguntas*/
  function duvidas_change(number){
    /*se não for o primeiro ele fecha o que estiver aberto*/
    if(number != "one"){
      /*tirando o destaque das bolinhas*/
      $(".duvidas_open").removeAttr("id");
      /*Fechando todas as perguntas*/
      for(var i = 1; i <= 10; i++){
        $(".number"+i).hide();
      }
      /*abrindo a pergunta selecionada*/
      $(".number"+number).slideToggle( "slow" );
    }else if (number == "one"){
      /*fechando todas as perguntas exceto a 1*/
      for(var i = 2; i <= 10; i++){
        $(".number"+i).hide();
      }
      $(".one").attr("id", "active");//dando destaque na bolinha 1
      $(".number1").attr("id", "p_active"); //colocando id na pergunta
    }
  }

  function vermais(){
    let pontos=document.getElementById("pontos");
    let maisTexto=document.getElementById("mais");
    let btnVermais=document.getElementById("btnVerMais");


    if(pontos.style.display === "none"){
      pontos.style.display="inline";
      maisTexto.style.display="none";
      btnVermais.innerHTML="Ver mais";


    }else{
      pontos.style.display="none";
      maisTexto.style.display="inline";
      btnVermais.innerHTML="Ver menos";
    }
}
/* ESTILIZAÇÃO DA PÁG NOSSA HISTÓRIA */

jQuery(document).ready(function($){
	var timelines = $('.cd-horizontal-timeline'),
		eventsMinDistance = 60;

	(timelines.length > 0) && initTimeline(timelines);

	function initTimeline(timelines) {
		timelines.each(function(){
			var timeline = $(this),
				timelineComponents = {};
			//cache timeline components 
			timelineComponents['timelineWrapper'] = timeline.find('.events-wrapper');
			timelineComponents['eventsWrapper'] = timelineComponents['timelineWrapper'].children('.events');
			timelineComponents['fillingLine'] = timelineComponents['eventsWrapper'].children('.filling-line');
			timelineComponents['timelineEvents'] = timelineComponents['eventsWrapper'].find('a');
			timelineComponents['timelineDates'] = parseDate(timelineComponents['timelineEvents']);
			timelineComponents['eventsMinLapse'] = minLapse(timelineComponents['timelineDates']);
			timelineComponents['timelineNavigation'] = timeline.find('.cd-timeline-navigation');
			timelineComponents['eventsContent'] = timeline.children('.events-content');

			setDatePosition(timelineComponents, eventsMinDistance);
			var timelineTotWidth = setTimelineWidth(timelineComponents, eventsMinDistance);
			timeline.addClass('loaded');

			//detect click on the next arrow
			timelineComponents['timelineNavigation'].on('click', '.next', function(event){
				event.preventDefault();
				updateSlide(timelineComponents, timelineTotWidth, 'next');
			});
			//detect click on the prev arrow
			timelineComponents['timelineNavigation'].on('click', '.prev', function(event){
				event.preventDefault();
				updateSlide(timelineComponents, timelineTotWidth, 'prev');
			});
			//detect click on the a single event - show new event content
			timelineComponents['eventsWrapper'].on('click', 'a', function(event){
				event.preventDefault();
				timelineComponents['timelineEvents'].removeClass('selected');
				$(this).addClass('selected');
				updateOlderEvents($(this));
				updateFilling($(this), timelineComponents['fillingLine'], timelineTotWidth);
				updateVisibleContent($(this), timelineComponents['eventsContent']);
			});

			//on swipe, show next/prev event content
			timelineComponents['eventsContent'].on('swipeleft', function(){
				var mq = checkMQ();
				( mq == 'mobile' ) && showNewContent(timelineComponents, timelineTotWidth, 'next');
			});
			timelineComponents['eventsContent'].on('swiperight', function(){
				var mq = checkMQ();
				( mq == 'mobile' ) && showNewContent(timelineComponents, timelineTotWidth, 'prev');
			});

			//keyboard navigation
			$(document).keyup(function(event){
				if(event.which=='37' && elementInViewport(timeline.get(0)) ) {
					showNewContent(timelineComponents, timelineTotWidth, 'prev');
				} else if( event.which=='39' && elementInViewport(timeline.get(0))) {
					showNewContent(timelineComponents, timelineTotWidth, 'next');
				}
			});
		});
	}

	function updateSlide(timelineComponents, timelineTotWidth, string) {
		//retrieve translateX value of timelineComponents['eventsWrapper']
		var translateValue = getTranslateValue(timelineComponents['eventsWrapper']),
			wrapperWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', ''));
		//translate the timeline to the left('next')/right('prev') 
		(string == 'next') 
			? translateTimeline(timelineComponents, translateValue - wrapperWidth + eventsMinDistance, wrapperWidth - timelineTotWidth)
			: translateTimeline(timelineComponents, translateValue + wrapperWidth - eventsMinDistance);
	}

	function showNewContent(timelineComponents, timelineTotWidth, string) {
		//go from one event to the next/previous one
		var visibleContent =  timelineComponents['eventsContent'].find('.selected'),
			newContent = ( string == 'next' ) ? visibleContent.next() : visibleContent.prev();

		if ( newContent.length > 0 ) { //if there's a next/prev event - show it
			var selectedDate = timelineComponents['eventsWrapper'].find('.selected'),
				newEvent = ( string == 'next' ) ? selectedDate.parent('li').next('li').children('a') : selectedDate.parent('li').prev('li').children('a');
			
			updateFilling(newEvent, timelineComponents['fillingLine'], timelineTotWidth);
			updateVisibleContent(newEvent, timelineComponents['eventsContent']);
			newEvent.addClass('selected');
			selectedDate.removeClass('selected');
			updateOlderEvents(newEvent);
			updateTimelinePosition(string, newEvent, timelineComponents, timelineTotWidth);
		}
	}

	function updateTimelinePosition(string, event, timelineComponents, timelineTotWidth) {
		//translate timeline to the left/right according to the position of the selected event
		var eventStyle = window.getComputedStyle(event.get(0), null),
			eventLeft = Number(eventStyle.getPropertyValue("left").replace('px', '')),
			timelineWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', '')),
			timelineTotWidth = Number(timelineComponents['eventsWrapper'].css('width').replace('px', ''));
		var timelineTranslate = getTranslateValue(timelineComponents['eventsWrapper']);

        if( (string == 'next' && eventLeft > timelineWidth - timelineTranslate) || (string == 'prev' && eventLeft < - timelineTranslate) ) {
        	translateTimeline(timelineComponents, - eventLeft + timelineWidth/2, timelineWidth - timelineTotWidth);
        }
	}

	function translateTimeline(timelineComponents, value, totWidth) {
		var eventsWrapper = timelineComponents['eventsWrapper'].get(0);
		value = (value > 0) ? 0 : value; //only negative translate value
		value = ( !(typeof totWidth === 'undefined') &&  value < totWidth ) ? totWidth : value; //do not translate more than timeline width
		setTransformValue(eventsWrapper, 'translateX', value+'px');
		//update navigation arrows visibility
		(value == 0 ) ? timelineComponents['timelineNavigation'].find('.prev').addClass('inactive') : timelineComponents['timelineNavigation'].find('.prev').removeClass('inactive');
		(value == totWidth ) ? timelineComponents['timelineNavigation'].find('.next').addClass('inactive') : timelineComponents['timelineNavigation'].find('.next').removeClass('inactive');
	}

	function updateFilling(selectedEvent, filling, totWidth) {
		//change .filling-line length according to the selected event
		var eventStyle = window.getComputedStyle(selectedEvent.get(0), null),
			eventLeft = eventStyle.getPropertyValue("left"),
			eventWidth = eventStyle.getPropertyValue("width");
		eventLeft = Number(eventLeft.replace('px', '')) + Number(eventWidth.replace('px', ''))/2;
		var scaleValue = eventLeft/totWidth;
		setTransformValue(filling.get(0), 'scaleX', scaleValue);
	}

	function setDatePosition(timelineComponents, min) {
		for (i = 0; i < timelineComponents['timelineDates'].length; i++) { 
		    var distance = daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][i]),
		    	distanceNorm = Math.round(distance/timelineComponents['eventsMinLapse']) + 2;
		    timelineComponents['timelineEvents'].eq(i).css('left', distanceNorm*min+'px');
		}
	}

	function setTimelineWidth(timelineComponents, width) {
		var timeSpan = daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][timelineComponents['timelineDates'].length-1]),
			timeSpanNorm = timeSpan/timelineComponents['eventsMinLapse'],
			timeSpanNorm = Math.round(timeSpanNorm) + 4,
			totalWidth = timeSpanNorm*width;
		timelineComponents['eventsWrapper'].css('width', totalWidth+'px');
		updateFilling(timelineComponents['timelineEvents'].eq(0), timelineComponents['fillingLine'], totalWidth);
	
		return totalWidth;
	}

	function updateVisibleContent(event, eventsContent) {
		var eventDate = event.data('date'),
			visibleContent = eventsContent.find('.selected'),
			selectedContent = eventsContent.find('[data-date="'+ eventDate +'"]'),
			selectedContentHeight = selectedContent.height();

		if (selectedContent.index() > visibleContent.index()) {
			var classEnetering = 'selected enter-right',
				classLeaving = 'leave-left';
		} else {
			var classEnetering = 'selected enter-left',
				classLeaving = 'leave-right';
		}

		selectedContent.attr('class', classEnetering);
		visibleContent.attr('class', classLeaving).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
			visibleContent.removeClass('leave-right leave-left');
			selectedContent.removeClass('enter-left enter-right');
		});
		eventsContent.css('height', selectedContentHeight+'px');
	}

	function updateOlderEvents(event) {
		event.parent('li').prevAll('li').children('a').addClass('older-event').end().end().nextAll('li').children('a').removeClass('older-event');
	}

	function getTranslateValue(timeline) {
		var timelineStyle = window.getComputedStyle(timeline.get(0), null),
			timelineTranslate = timelineStyle.getPropertyValue("-webkit-transform") ||
         		timelineStyle.getPropertyValue("-moz-transform") ||
         		timelineStyle.getPropertyValue("-ms-transform") ||
         		timelineStyle.getPropertyValue("-o-transform") ||
         		timelineStyle.getPropertyValue("transform");

        if( timelineTranslate.indexOf('(') >=0 ) {
        	var timelineTranslate = timelineTranslate.split('(')[1];
    		timelineTranslate = timelineTranslate.split(')')[0];
    		timelineTranslate = timelineTranslate.split(',');
    		var translateValue = timelineTranslate[4];
        } else {
        	var translateValue = 0;
        }

        return Number(translateValue);
	}

	function setTransformValue(element, property, value) {
		element.style["-webkit-transform"] = property+"("+value+")";
		element.style["-moz-transform"] = property+"("+value+")";
		element.style["-ms-transform"] = property+"("+value+")";
		element.style["-o-transform"] = property+"("+value+")";
		element.style["transform"] = property+"("+value+")";
	}

	//based on http://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript
	function parseDate(events) {
		var dateArrays = [];
		events.each(function(){
			var dateComp = $(this).data('date').split('/'),
				newDate = new Date(dateComp[2], dateComp[1]-1, dateComp[0]);
			dateArrays.push(newDate);
		});
	    return dateArrays;
	}

	function parseDate2(events) {
		var dateArrays = [];
		events.each(function(){
			var singleDate = $(this),
				dateComp = singleDate.data('date').split('T');
			if( dateComp.length > 1 ) { //both DD/MM/YEAR and time are provided
				var dayComp = dateComp[0].split('/'),
					timeComp = dateComp[1].split(':');
			} else if( dateComp[0].indexOf(':') >=0 ) { //only time is provide
				var dayComp = ["2000", "0", "0"],
					timeComp = dateComp[0].split(':');
			} else { //only DD/MM/YEAR
				var dayComp = dateComp[0].split('/'),
					timeComp = ["0", "0"];
			}
			var	newDate = new Date(dayComp[2], dayComp[1]-1, dayComp[0], timeComp[0], timeComp[1]);
			dateArrays.push(newDate);
		});
	    return dateArrays;
	}

	function daydiff(first, second) {
	    return Math.round((second-first));
	}

	function minLapse(dates) {
		//determine the minimum distance among events
		var dateDistances = [];
		for (i = 1; i < dates.length; i++) { 
		    var distance = daydiff(dates[i-1], dates[i]);
		    dateDistances.push(distance);
		}
		return Math.min.apply(null, dateDistances);
	}

	/*
		How to tell if a DOM element is visible in the current viewport?
		http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
	*/
	function elementInViewport(el) {
		var top = el.offsetTop;
		var left = el.offsetLeft;
		var width = el.offsetWidth;
		var height = el.offsetHeight;

		while(el.offsetParent) {
		    el = el.offsetParent;
		    top += el.offsetTop;
		    left += el.offsetLeft;
		}

		return (
		    top < (window.pageYOffset + window.innerHeight) &&
		    left < (window.pageXOffset + window.innerWidth) &&
		    (top + height) > window.pageYOffset &&
		    (left + width) > window.pageXOffset
		);
	}

	function checkMQ() {
		//check if mobile or desktop device
		return window.getComputedStyle(document.querySelector('.cd-horizontal-timeline'), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "");
	}
});

$(document).ready(function() {
  
    var descMinHeight = 120;
    var desc = $('.desc');
    var descWrapper = $('.desc-wrapper');
  
    // show more button if desc too long
    if (desc.height() > descWrapper.height()) {
      $('.more-info').show();
    }
    
    // When clicking more/less button
    $('.more-info').click(function() {
      
      var fullHeight = $('.desc').height();
  
      if ($(this).hasClass('expand')) {
        // contract
        $('.desc-wrapper').animate({'height': descMinHeight}, 'slow');
      }
      else {
        // expand 
        $('.desc-wrapper').css({'height': descMinHeight, 'max-height': 'none'}).animate({'height': fullHeight}, 'slow');
      }
  
      $(this).toggleClass('expand');
      return false;
    });
  
  });

  /*/*/

  $(document).ready(function() {
	var closeHeight = '18em'; /* Default "closed" height */
	  var moreText 	= 'Leia Mais'; 
	  var lessText	= 'Leia Menos';
	  var duration	= '1000'; 
	var easing = 'linear'; 
  
	  // Limit height of .entry-content div
	  $('.page-template-page_blog-php #content .entry, .archive #content .entry').each(function() {
		  
		  // Set data attribute to record original height
		  var current = $(this).children('.entry-content');
		  current.data('fullHeight', current.height()).css('height', closeHeight);
  
		  // Insert "Read More" link
		  current.after('<a href="javascript:void(0);" class="more-link closed">' + moreText + '</a>');
  
	  });
	
	// Link functinoality
	  var openSlider = function() {
		  link = $(this);
		  var openHeight = link.prev('.entry-content').data('fullHeight') + 'px';
		  link.prev('.entry-content').animate({'height': openHeight}, {duration: duration }, easing);
		  link.text(lessText).addClass('open').removeClass('closed');
		  link.unbind('click', openSlider);
		  link.bind('click', closeSlider);
	  }
  
	  var closeSlider = function() {
		  link = $(this);
		  link.prev('.entry-content').animate({'height': closeHeight}, {duration: duration }, easing);
		  link.text(moreText).addClass('closed').removeClass('open');
		  link.unbind('click');
		  link.bind('click', openSlider);
	  }
	
		// Attach link click functionality
	  $('.more-link').bind('click', openSlider);
	
  });
	
	/**/

	const slidePage = document.querySelector(".slide-page");
const nextBtnFirst = document.querySelector(".firstNext");
const prevBtnSec = document.querySelector(".prev-1");
const nextBtnSec = document.querySelector(".next-1");
const prevBtnThird = document.querySelector(".prev-2");
const nextBtnThird = document.querySelector(".next-2");
const prevBtnFourth = document.querySelector(".prev-3");
const submitBtn = document.querySelector(".submit");
const progressText = document.querySelectorAll(".step p");
const progressCheck = document.querySelectorAll(".step .check");
const bullet = document.querySelectorAll(".step .bullet");
let current = 1;

nextBtnFirst.addEventListener("click", function(event){
 event.preventDefault();
 slidePage.style.marginLeft = "-25%";
 bullet[current - 1].classList.add("active");
 progressCheck[current - 1].classList.add("active");
 progressText[current - 1].classList.add("active");
 current += 1;
});
nextBtnSec.addEventListener("click", function(event){
 event.preventDefault();
 slidePage.style.marginLeft = "-50%";
 bullet[current - 1].classList.add("active");
 progressCheck[current - 1].classList.add("active");
 progressText[current - 1].classList.add("active");
 current += 1;
});
nextBtnThird.addEventListener("click", function(event){
 event.preventDefault();
 slidePage.style.marginLeft = "-75%";
 bullet[current - 1].classList.add("active");
 progressCheck[current - 1].classList.add("active");
 progressText[current - 1].classList.add("active");
 current += 1;
});
submitBtn.addEventListener("click", function(){
 bullet[current - 1].classList.add("active");
 progressCheck[current - 1].classList.add("active");
 progressText[current - 1].classList.add("active");
 current += 1;
 setTimeout(function(){
 alert("Alerta emitido com sucesso!");
 location.reload();
 },800);
});
prevBtnSec.addEventListener("click", function(event){
 event.preventDefault();
 slidePage.style.marginLeft = "0%";
 bullet[current - 2].classList.remove("active");
 progressCheck[current - 2].classList.remove("active");
 progressText[current - 2].classList.remove("active");
 current -= 1;
});
prevBtnThird.addEventListener("click", function(event){
 event.preventDefault();
 slidePage.style.marginLeft = "-25%";
 bullet[current - 2].classList.remove("active");
 progressCheck[current - 2].classList.remove("active");
 progressText[current - 2].classList.remove("active");
 current -= 1;
});
prevBtnFourth.addEventListener("click", function(event){
 event.preventDefault();
 slidePage.style.marginLeft = "-50%";
 bullet[current - 2].classList.remove("active");
 progressCheck[current - 2].classList.remove("active");
 progressText[current - 2].classList.remove("active");
 current -= 1;
});

/** */

document.getElementById("btn-registro").addEventListener("click", readmore);
    function readmore() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-no'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'AMÁLIA BJORGH',
      text: "Amália desapareceu no dia 15/09 em Florianópolis - SC. A garota saiu para dar um passeio com seus amigos naquela tarde e desapareceu ao ir em um quiosque sozinha. Sua melhor amiga diz que acompanhou Amália até lá, porém, esqueceu sua carteira com os outros amigos e voltou para buscar, e quando retornou ao quiosque, sua amiga já havia sumido. Os amigos relatam ter procurado pela garota durante 3h, até decidirem contatar a PM. Amália tem 18 anos, é parda, possui cabelos pretos na altura do pescoço, utilizava um maio preto e uma saída de praia de cor roxa, na ocasião não andava com nenhum pertence além de sua carteira branca. Foi vista pela última vez no quiosque 15 da praia de Garopaba.",
            imageUrl: 'img/arm-reg3.png',
            imageWidth: '400px',
            imageHeight: '450px',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Enviado!',
          'O Relato foi enviado corretamente.',
          'success'
        )
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Oh Oh, seu arquivo não foi enviado',
          'error'
        )
      }
    })
  };