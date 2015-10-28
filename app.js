var todoData = [
  {id: 0, content: 'show up', completed: false },
  {id: 1, content: 'something up', completed: false }
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
      if ($(this).attr('data-completed') === 'true') {
        $(this).attr('data-completed', false);
      } else {
        $(this).attr('data-completed', true);
      };
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

    $('.all').on('click', function(event){
      event.preventDefault();
      $.each($('.formstuff li'), function(idx, el) {
      $(el).css('display', 'block');
      console.log('lay');
    })
  });

    $('.active').on('click', function(event){
      event.preventDefault();
      $.each($('.formstuff li'), function(idx, el) {
        console.log($(el).attr('data-completed') === 'true')
        console.log($(el));
        if($(el).attr('data-completed') === 'true'){
          $(el).css('display', 'none');
        } else{
          $(el).css('display', 'block');
        }
        console.log('nay');
      })
    });

    $('.done').on('click', function(event){
      event.preventDefault();
      $.each($('.formstuff li'), function(idx, el) {
      if($(el).attr('data-completed') === 'true') {
        $(el).css('display', 'block');
      } else {
          $(el).css('display', 'none');
      }
      console.log('yay');
    })
  });

  $('.clearCompleted').on('click', function(event){
    event.preventDefault();
  $.each($('.formstuff li'), function(idx, el) {
    if($(el).attr('data-completed') === 'true') {
    console.log(idx);
    todoPage.deleteLi(idx);
    }
  })
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
        var submittableObject = {
          content: input_value,
          completed: false
        }
        submittableObject.id = todoData.length
        todoData.push(submittableObject);
        $('.formstuff ul').append('<li class="todoClick" data-id="' + submittableObject.id +'" data-completed="' + submittableObject.completed + '"><i class="fa fa-square-o"></i>' + input_value + '</li>');
        $('input').val('');
      };


  },

  deleteLi: function (idx) {

    todoData.splice(idx,1);
    $('.formstuff li').html('');
    todoPage.loadTodo(todoData);
  },

}
