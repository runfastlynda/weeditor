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

  $('#save').on('click',function(){
    populateStorage();
  })

  function populateStorage() {
    localStorage.setItem('page', $('#markdown').val());
    console.log(localStorage.getItem('page'));
  };

  function setStorage() {
    var currentPage = localStorage.getItem('page');
    $('#markdown').val(currentPage);
  };

  $('#selector').on('change',function(){
    var selector = $('#selector').find("option:selected").text();
    console.log(selector);
    $('#right').removeClass();
    $('#right').addClass(selector);
  });
});
