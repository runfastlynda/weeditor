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
    if(localStorage.getItem('page')){
      alert("文章已保存");
    }else{
      alert("文章未保存");
    }
  })

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

});
