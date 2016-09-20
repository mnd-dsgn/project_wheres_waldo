var photoMethods = {

  friends: ["Waldo", "Wenda", "Odlaw", "Wizard Whitebeard", "Woof"],

  fixTargetEvent: function(event) {
    var friendList = $("<ul class='friends gameboard'></ul>");
    for (var i = 0; i< photoMethods.friends.length; i++) {
      var listItem = $("<li/>").text(photoMethods.friends[i])
      friendList.append(listItem);
    }

    $('.tagger').hide();

    $('img').off('mousemove', photoMethods.mousemoveEvent);

    var leftCoord = event.pageX - 50 + "px";
    var topCoord = event.pageY - 25 + "px";

    var container = $('<div/>')
                    .addClass('fixed-container')
                    .css('top', topCoord)
                    .css('left', leftCoord);

    $('body').append(container);


    container.append(
      $('<div/>')
      .addClass('fixed-tags')
      );

    container.append(friendList);

    $('img').off('click', photoMethods.fixTargetEvent);

    $('ul').click(function(e) {

      var list = $(e.currentTarget);
      list.parent().addClass('selectedCont');

      var currentEle = $(e.target);
      currentEle.addClass("selected");

      list.after(
        $('<li/>')
        .addClass('remove-tag')
        .text("Remove tag")
        );

      $('ul').children().filter(function(_, ele) {
        ele = $(ele);
        return !ele.hasClass('selected');
      }).hide();
      $('img').on('click', photoMethods.fixTargetEvent);

    });

    $('img').on('click', photoMethods.allowTagCancel);

  },

  allowTagCancel: function() {
    if (!$('.fixed-container').last().hasClass('selectedCont')) {
      $('.fixed-container').last().remove();
    }
    $('img').on('click', photoMethods.fixTargetEvent);
    $('img').off('click', photoMethods.allowTagCancel);
  },

  fixTarget: function() {
    $('img').on('click', photoMethods.fixTargetEvent);
  },

};

$(document).ready(function() {
  photoMethods.fixTarget();
  $('.gameboard').on("hover", function() {
    $(".fixed-container").show();
  })
});
