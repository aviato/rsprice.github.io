document.getElementByClassName('sub-btn').addEventListener('click', function() {

  var testData  = document.getElementByClassName('test-data').value;
  var splitData = testData.split(' ');
  var total     = 0;
  
  console.log(splitData);  

  for (var i = 1; i < splitData.length; i++) {
    var StrToInt = parseInt(splitData[i], 10);
    total += StrToInt
  };
  
  console.log(total);
  document.getElementById('answer').innerHTML = total;

})
