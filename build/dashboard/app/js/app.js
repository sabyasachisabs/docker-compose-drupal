// Docker Compose Drupal minimal dashboard js.

jQuery( document ).ready(function( $ ) {
  // Clipboard copy js.
  $('.copy').each(function(i, e) {
    $(this).after('<button class="copy btn btn-xs" data-clipboard-text="' + $(this).text() + '"><span class="glyphicon glyphicon-copy"></span></button>');
  });
  var clipboard = new Clipboard('.copy');
  clipboard.on('success', function(e) {
    $(e.trigger).after(' <span class="label label-default">Copied!</span>');
    $(e.trigger).next('.label').delay(2000).fadeOut('slow');
    e.clearSelection();
  });

  // Modal actions.
  $('#myModal').on('show.bs.modal', function (event) {
    var $btn = $(event.relatedTarget);
    var $id = $btn.data('container');
    var $action = $btn.data('action');
    var modal = $(this);

    modal.find('.modal-title').text($action + ' for ' + $id);
    // Request to endpoint.
    $.getJSON("/index.php", { action : $action, id: $id }, function(response) {
      if (response != "null") {
        modal.find('.modal-title').html(response.message);
        modal.find('.modal-body pre').html(response.result);
      }
    });
    $(this).find('button.refresh').on('click', function (event) {
      var $btnrefresh = $(this).button('loading');
      $.getJSON("/index.php", { action : $action, id: $id }, function(response) {
        if (response != "null") {
          modal.find('.modal-body pre').html(response.result);
        }
      });
      $btnrefresh.button('reset');
    });
  });

  // Let simulate a terminal.
  $('#terminal .body').terminal(function($command) {
    if ($command !== '') {
      var $id = $('select[name=id]').val();
      var $terminal = this;
      // Request to endpoint.
      $.getJSON("/index.php", { action : 'exec', id: $id, cmd: $command }, function(response) {
        if (response != "null") {
          $terminal.echo(response.result);
        }
      });
    }
  }, {
      greetings: '',
      name: 'bash',
      height: 300,
      width: 800,
      prompt: 'sh> '
  });
  // Handle container taret changes.
  $('select#exec').on('change', function () {
    var $val = $(this).val();
    if ($val == '_none') {
      $('#terminal').hide();
    }
    else {
      $('#terminal').show();
    }
  });

  // Other actions.
  $('.action').on('click', function () {
    var $btn = $(this).button('loading');
    var $id = $(this).data('container');
    var $action = $(this).data('action');
    // Request to endpoint.
    $.getJSON("/index.php", { action : $action, id: $id }, function(response) {
      if (response != "null") {
        $('#message .message').html(response.message);
        $('#message').show();
      }
      $btn.button('reset');
    });
  });

});
