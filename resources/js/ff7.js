/* Essentially what we have here is a function that adds a css class to any list item you hover over.
In order for this to keep working all my nagivigation will have to be in the form of ul's. */

$(document).ready(function () {

  $('li').hover(
    function() {
      console.log("working");
      $( this ).addClass( "glove-show" );
    }, function() {
      $( this ).removeClass( "glove-show" );
    }
  );
}
);

// var todaysDate = Date.now();
// $(document).ready(function () {
//
//   $()
//
// });
