$(document).ready(function( ) {

  $('#markdown').scroll( function() { 
  $('#right').scrollTop($(this).scrollTop()); 
  $('#right').scrollLeft($(this).scrollLeft()); 
  }); 

  if(!localStorage.getItem('page')) {
    populateStorage();
  } else {
    setStorage();
  }

  function populateStorage() {
    localStorage.setItem('page', $('#markdown').val());
  }

  function setStorage() {
    var currentPage = localStorage.getItem('page');
    $('#markdown').val(currentPage);
  }

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
  }

  var autoSave = setInterval(function(){
    populateStorage();

    var myDate = new Date();
    var mytime=myDate.toLocaleTimeString();

    if(localStorage.getItem('page')){
      alertMessage(mytime+" 保存成功 ");
    }else{
      alertMessage("未保存成功");
    }
  },60000);

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
  });


  $('#switchshort').on('click',function(){  
    var longLink = $('#inputlink').val();
    var shortlist = $('#shortlist');
    shortlist.prepend('<li id="list">'+longLink+'<span id="del">X</span>'+'</li>');
    // $.ajax({
    //   url: 'http://api.weibo.com/2/short_url/shorten.json?source=2849184197&url_long=http://www.baidu.com',  
    //   method: "get",
    //   dataType: "jsonp",
    //   cache: false,
    //   jsonp: "jsonpCallback",
    //   jsonpCallback: '?',
    //   success: function (data) {
    //     alert('success');
    //   },
    //   error: function (XMLHttpRequest, textStatus, errorThrown) {
    //     alert("请求数据异常，状态码：" + XMLHttpRequest.status);
    //   }
    //   // success: function(data){
    //   //   alert('success');
    //   //   // console.log(data.data.urls[0].url_short);
    //   // },
    //   // error: function(){
    //   //   alert('error');
    //   // }
    // });
  });

  $(document).on('click','#del',function(){
    $(this).parent().remove();
  });

  function insertimg(file){
    var endPos = document.getElementById('markdown').value.length;
    document.getElementById('markdown').setCurPos(endPos);
    document.getElementById('markdown').insertAtCaret('\n'+'http://7xjufd.dl1.z0.glb.clouddn.com/'+file.name+'\n');
  }

  jQuery.fn.extend({
    insertAtCaret: function(myValue){
      return this.each(function(i) {
        if (document.selection) {
          //For browsers like Internet Explorer
          this.focus();
          var sel = document.selection.createRange();
          sel.text = myValue;
          this.focus();
        }
        else if (this.selectionStart || this.selectionStart == '0') {
          //For browsers like Firefox and Webkit based
          var startPos = this.selectionStart;
          var endPos = this.selectionEnd;
          var scrollTop = this.scrollTop;
          this.value = this.value.substring(0, startPos)+myValue+this.value.substring(endPos,this.value.length);
          this.focus();
          this.selectionStart = startPos + myValue.length;
          this.selectionEnd = startPos + myValue.length;
          this.scrollTop = scrollTop;
        } else {
          this.value += myValue;
          this.focus();
        }
      });
    }
  });

  jQuery.fn.extend({
    getCurPos: function(){
      var e=$(this).get(0);
      e.focus();
      if(e.selectionStart){    //FF
        return e.selectionStart;
      }
      if(document.selection){    //IE
        var r = document.selection.createRange();
        if (r === null) {
            return e.value.length;
        }
        var re = e.createTextRange();
        var rc = re.duplicate();
        re.moveToBookmark(r.getBookmark());
        rc.setEndPoint('EndToStart', re);
        return rc.text.length;
      }
      return e.value.length;
    },
    setCurPos: function(pos) {
      var e=$(this).get(0);
      e.focus();
      if (e.setSelectionRange) {
        e.setSelectionRange(pos, pos);
      } else if (e.createTextRange) {
        var range = e.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
      }
    }        
  });


  $('#endinserttext').on('change',function(){
    var endPos = $('#markdown').val().length;
    $('#markdown').setCurPos(endPos);
    var endinserttext = $('#endinserttext').find("option:selected").text();
    $('#markdown').insertAtCaret('\n'+endinserttext+'\n');
  });

  $('#startinsertjekylltext').on('click',function(){
    var pagetitle = $('#right p:first').text();
    $('#markdown').insertAtCaret('\n'+'---'+'\n'+'layout: post'+'\n'+'title: '+ pagetitle +'\n'+'---'+'\n');
  });

  $('#startinserttext').on('click',function(){
    var startinserttext = $('#createbymyself').text().trim();
    $('#markdown').insertAtCaret('\n'+startinserttext+'\n');
  });

  var clipboard = new Clipboard('#copyall', {
    target: function() {
        return document.getElementById('right');
    }
  });
  clipboard.on('success', function(e) {
    alertMessage('复制成功');
  });
  clipboard.on('error', function(e) {
    alertMessage('复制失败，请手动复制');
  });

  $(function() {
    var uploader = Qiniu.uploader({
      runtimes: 'html5,flash,html4',
      browse_button: document.getElementById('pickfiles'),
      container: 'container',
      drop_element: 'container',
      max_file_size: '1000mb',
      flash_swf_url: 'bower_components/plupload/js/Moxie.swf',
      dragdrop: true,
      chunk_size: '4mb',
      uptoken_url: '/uptoken',
      domain: '7xjufd.dl1.z0.glb.clouddn.com',
      get_new_uptoken: false,
          // downtoken_url: '/downtoken',
          // unique_names: true,
          // save_key: true,
          // x_vars: {
          //     'id': '1234',
          //     'time': function(up, file) {
          //         var time = (new Date()).getTime();
          //         // do something with 'time'
          //         return time;
          //     },
          // },
      auto_start: true,
      log_level: 5,
      init: {
        // 'FilesAdded': function(up, files) {
        //   $('table').show();
        //   plupload.each(files, function(file) {
        //     var progress = new FileProgress(file, 'fsUploadProgress');
        //     progress.setStatus("等待...");
        //     progress.bindUploadCancel(up);
        //   });
        // },
        // 'BeforeUpload': function(up, file) {
        //   var progress = new FileProgress(file, 'fsUploadProgress');
        //   var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
        //   if (up.runtime === 'html5' && chunk_size) {
        //     progress.setChunkProgess(chunk_size);
        //   }
        // },
        // 'UploadProgress': function(up, file) {
        //   var progress = new FileProgress(file, 'fsUploadProgress');
        //   var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
        //   progress.setProgress(file.percent + "%", file.speed, chunk_size);
        // },
        'UploadComplete': function() {
        },
        'FileUploaded': function(up, file, info) {
          alertMessage('上传成功');
          var endPos = document.getElementById('markdown').value.length;
          document.getElementById('markdown').setCurPos(endPos);
          document.getElementById('markdown').insertAtCaret('\n'+'http://7xjufd.dl1.z0.glb.clouddn.com/'+file.name+'\n');
        },
        'Error': function(up, err, errTip) {
          alertMessage('上传失败');
        }
              // ,
              // 'Key': function(up, file) {
              //     var key = "";
              //     // do something with key
              //     return key
              // }
      }
    });
  });
});
