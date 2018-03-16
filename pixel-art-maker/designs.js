function makeGrid() {
  var myTable = $('#js-pixelCanvas');
  var inputWidth = $('#js-inputWidth');
  var inputHeight = $('#js-inputHeight');
  var widthValue = $('#js-inputWidth').val();
  var heightValue = $('#js-inputHeight').val();

  inputHeight.on("change", function() { heightValue = $(this).val(); });
  inputWidth.on("change", function() { widthValue = $(this).val(); });

  myTable.empty(); // Clear table content.

  for (let i = 0; i < heightValue; i++) {
    var row = myTable.append('<tr class="c-table__row"></tr>');
    for (let j = 0; j < widthValue; j++) {
      row.append('<td class="c-table__cell"></td>');
    }
  }
}

function colorPaint() {
  var colorPicker = $('#js-colorPicker');
  var colorValue = $('#js-colorPicker').val();

  colorPicker.on("change", function() { colorValue = $(this).val(); });

  $('.c-table__cell').mouseover(function(event) {
    $(this).css('background-color', colorValue);
    if (event.shiftKey) {
      $(this).css('background-color', '#fcfaf7');
    }
  });
}

$('#js-submitButton').on('click', function(event) {
  var widthValue = $('#js-inputWidth').val();
  var heightValue = $('#js-inputHeight').val();
  event.preventDefault();
  makeGrid(heightValue, widthValue);
  colorPaint();
});
