document.getElementById('submit-button').addEventListener('click', function() {

  var testData = document.getElementById('test-data').value;
  var splitData = testData.split(' ');
  var total = 0;
  
  console.log(splitData);  

  for (var i = 0; i < splitData.length; i++) {
    var StrToInt = parseInt(splitData[i]);
    total += StrToInt
  };
  
  console.log(total);
  document.getElementById('answer').innerHTML = total;

})
