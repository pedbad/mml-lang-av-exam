/*jshint unused: false, undef:false */
$(document).ready(function(){
  'use strict';

  /*Add new accordion content here*/

  var accordion_content = {
    exam_2017 : {title:"2017: Maternidad tardía", acclink:"2017", color:"bg-l", hidden:false},
    exam_2016 : {title:"2016: Semillas de Uruguay", acclink:"2016", color:"bg-m", hidden:false},
    exam_2014 : {title:"2014: Confesando al estado: aconfesionalidad a la española", acclink:"2014", color:"bg-d", hidden:false},
    exam_additional : {title:"Additional listening practice", acclink:"additional", color:"bg-l", hidden:false}
  };

  $.each( accordion_content, function(key, value){
    if(!value.hidden){
      $('#accordion').append(
      '<div class="card mb-1">'+
          '<div class="card-header ' + value.color + '" role="tab" data-parent="#accordion" data-toggle="collapse" data-target="#exam'+ value.acclink +'">'+
              '<h5 class="mb-0">'+
                  '<a href="#exam'+ value.acclink +'" data-parent="#accordion" data-toggle="collapse"> <i class="far fa-arrow-alt-circle-right mr-3"></i>'+
                      value.title+
                  '</a>'+
              '</h5>'+
          '</div><!-- eof card-header -->'+
          '<div id="exam'+ value.acclink +'" class="collapse" aria-labelledby="heading'+ value.acclink +'">'+
              '<div class="card-body"></div>'+
          '</div><!-- eof id="exam'+ value.acclink +' -->'+
      '</div><!-- eof card -->'
      );
    }
    $('#exam'+value.acclink+' .card-body').loadAccordionContent(['acc-content/'+ value.acclink +'.html']);
  });



  $('#accordion .card').on('show.bs.collapse', function(){
    $(this).find('.card-header h5').find('i').replaceWith('<i class="far fa-arrow-alt-circle-down mr-3"></i>');
    $('video,audio').trigger('pause');

  });

  $('#accordion .card').on('hide.bs.collapse', function(){
    $(this).find('.card-header h5').find('i').replaceWith('<i class="far fa-arrow-alt-circle-right mr-3"></i>');
    $('video,audio').trigger('pause');
  });

});


(function($){
  'use strict';
  $.fn.loadAccordionContent = function (arrArg){
    var $content = this;

    $content.load(arrArg[0], function(responseTxt, statusTxt, jqXHR){
      if(statusTxt == "success"){
        var $transBtn = $content.find("button.show-transcript");
        var $transcript = $content.find(".video-transcript");
        var $ansBtn = $content.find("button.show-answer");
        var $answer = $content.find(".sample-answer");

        $transBtn.click(function(){
          $transcript.slideToggle();
          $(this).toggleClass("expanded");
    			if($(this).hasClass("expanded")){
    				$(this).html('<i class="far fa-eye-slash"></i> Hide transcript');
    			}else{
    				$(this).html('<i class="far fa-eye"></i> Show transcript');
    			}
        });

        $ansBtn.click(function(){
          $answer.slideToggle();
          $(this).toggleClass("expanded");
    			if($(this).hasClass("expanded")){
    				$(this).html('<i class="far fa-eye-slash"></i> Hide sample answer');
    			}else{
    				$(this).html('<i class="far fa-eye"></i> Show sample answer');
    			}
        });

        $('video').mediaelementplayer({
      		pluginPath: "/mediaelement/",
          shimScriptAccess: 'always',
          features: ['playpause','progress','current','duration','tracks','volume','fullscreen'],
        	// When using jQuery's `mediaelementplayer`, an `instance` argument
        	// is available in the `success` callback
      		success: function(mediaElement, originalNode, instance) {
      			// do things
      		}
      	});

      }
      if(statusTxt == "error"){
          console.log("Error: " + jqXHR.status + " " + jqXHR.statusText);
      }
    });

    return $content;
  };

}(jQuery));
