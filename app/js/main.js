$(document).ready(function( ) {

  $('#markdown').scroll( function() { 
  $('#right').scrollTop($(this).scrollTop()); 
  $('#right').scrollLeft($(this).scrollLeft()); 
  }); 

  if(!localStorage.getItem('page')) {
    populateStorage();
  } else {
    setStorage();
  };

  function populateStorage() {
    localStorage.setItem('page', $('#markdown').val());
  };

  function setStorage() {
    var currentPage = localStorage.getItem('page');
    $('#markdown').val(currentPage);
  };

  $('#selector').on('change',function(){
    var selector = $('#selector').find("option:selected").text();
    $('#right').removeClass();
    $('#right').addClass(selector);
  });

  function alertMessage(s) {
    $("#message").html(s);
    $("#message").show();
    setTimeout(function() {
      $("#message").hide();
    }, 3000);
  };

  $('#save').on('click',function(){
    populateStorage();

    var myDate = new Date();
    var mytime=myDate.toLocaleTimeString();

    if(localStorage.getItem('page')){
      alertMessage(mytime+" 保存成功 ");
    }else{
      alertMessage("未保存成功");
    }
  });

  $('#markdown').focus();

  $('#more').on('click',function(){
    $('#left').toggle(100);
    if($('#right').is('.scrollin')){
      $('#right').removeClass('scrollin');
      $('#center').removeClass('scrollin');
      $('#more').removeClass('less');
    }else{
      $('#right').addClass('scrollin');
      $('#center').addClass('scrollin');
      $('#more').addClass('less');
    }
  })

});
