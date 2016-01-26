$(document).ready(function( ) {

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

});