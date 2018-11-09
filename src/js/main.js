/*jshint unused: false, undef:false */
$(document).ready(function(){
  'use strict';

  $('video,audio').mediaelementplayer({
    // if the <video width> is not specified, this is the default
    defaultVideoWidth: 640,
    // if the <video height> is not specified, this is the default
    defaultVideoHeight: 385,
    // if set, overrides <video width>
    videoWidth: -1,
    // if set, overrides <video height>
    videoHeight: -1,
    // width of audio player
    audioWidth: 940,
    // height of audio player
    audioHeight: 40,
    // initial volume when the player starts
    startVolume: 0.6,
    // useful for <audio> player loops
    loop: false,
    // enables Flash and Silverlight to resize to content size
    enableAutosize: true,
    // the order of controls you want on the control bar (and other plugins below)
    features: ['playpause','progress','current','duration','tracks','volume','fullscreen'],
    //features: ['playpause'],
    // Hide controls when playing and mouse is not over the video
    alwaysShowControls: false,
    // force iPad's native controls
    iPadUseNativeControls: false,
    // force iPhone's native controls
    iPhoneUseNativeControls: false,
    // force Android's native controls
    AndroidUseNativeControls: false,
    // forces the hour marker (##:00:00)
    alwaysShowHours: false,
    // show framecount in timecode (##:00:00:00)
    showTimecodeFrameCount: false,
    // used when showTimecodeFrameCount is set to true
    framesPerSecond: 25,
    // turns keyboard support on and off for this instance
    enableKeyboard: true,
    // when this player starts, it will pause other players
    pauseOtherPlayers: true,
    // array of keyboard commands
    keyActions: []

  });

  $('.accordion .card').on('collapse', function () {
    $(this).find('.card-header h5').find('i').replaceWith('<i class="fa fa-arrow-circle-down"></i>');
    $(this).find('.card-header').addClass('accordion-tab-selected');
    console.log('.accordion .card clicked...');
  })

  $('.accordion .card').on('collapse show', function () {
    $(this).find('.card-header h5').find('i').replaceWith('<i class="fa fa-arrow-circle-right"></i>');
    $(this).find('.card-header').removeClass('accordion-tab-selected');
    console.log('.accordion .card clicked...');
  })



  console.log('app initiated...');

});
