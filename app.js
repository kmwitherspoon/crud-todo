var todoData = [
  {id: 1, content: 'show up', completed: false },
  {id: 2, content: 'something up', completed: true }
]



$(document).ready(function () {

  todoPage.init();

  // anything in here is dom ready!

});

var todoPage = {
  init: function(){
    todoPage.styling();
    todoPage.events();
  },
  events: function(){

    $(document).on('click', '.add', function(event) {
      event.preventDefault();
        $(this).parent().remove();
    });

    $('form').on('submit', function(event) {
      event.preventDefault();
      todoPage.submit();
    });

    $('.formstuff').on('click', 'li', function(event){
      $(this).find('i').toggleClass('fa fa-square-o fa fa-check-square-o');
      $(this).find('li').addClass('complete');
      $(this).toggleClass('complete');
    });

// Thanks for the help Daniel Cook on stack exchange

    $('.formstuff').on('dblclick', 'li', function(event){
      oriVal = $(this).text();
      $(this).text("");
      $("<i class='fa fa-square-o'></i><input type='text'>").appendTo(this).focus();
    });

    $('.formstuff').on('focusout', 'li > input',function (event){
      var $this = $(this);
    $this.parent().text($this.val() || oriVal).prepend("<i class='fa fa-square-o'></i>");
    $this.remove();
    todoPage.todoData=($this.val()).content = this.content;
    });

    $('.formstuff').on('click', '.clearCompleted', function (event) {
        event.preventDefault();
        var liId = $(this).closest('li').data('id');
        todoPage.deleteLi(liId);
      });

    $('.bottom').on('click', '.all', function(event){
      event.preventDefault();
      $('.todoClick').append('.todoClick');
      console.log('lay');
    });

    $('.bottom').on('click', '.active', function(event){
      event.preventDefault();
      if($('.formstuff','li').hasClass('complete')){
        $('.formstuff','li').css('display', 'none');
      } else{
        $('.formstuff','li').css('display', 'block');
      }
      console.log('nay');
    });

    $('.bottom').on('click', '.done', function(event){
      event.preventDefault();
      if($('.formstuff','li').hasClass('complete')) {
        $('.formstuff','li').css('display', 'block');
      } else {
          $('.formstuff','li').css('display', 'none');
      }
      console.log('yay');
    });

  },

  styling: function(){
    todoPage.loadTodo();
  },
  loadTemplate: function ($el, data, tmpl) {

      var template = _.template(tmpl);
      var html = template(data);
      $el.append(html);
    },
  loadTodo: function(){
      var keysToLife = _.each(todoData, function (currEl, idx, arr) {

        todoPage.loadTemplate($('.formstuff ul'), currEl, $('#allTmpl').html());
      });

      // var keyString = "";
      // keysToLife.forEach(function(thing) {
      //   keyString += doTemplate(thing)
      // })
      // $('.todo').html(keyString);
  },

  submit: function(){
    if($('input').val() !== ''){
      var input_value = $('input').val();
        $('.formstuff ul').append('<li class="todoClick"><i class="fa fa-square-o"></i>' + input_value + '</li>');
    };

    var submittableObject = {
      content: input_value,
      completed: false
    }
    submittableObject.id = todoData.length
    todoData.push(submittableObject);
    $('input').val('');
  },

  deleteLi: function (idx) {

    todoData.splice(idx,1);
    $('.formstuff').html('');
    todoPage.loadTodo(todoData);
  },

}
