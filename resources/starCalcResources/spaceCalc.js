var calcOutput = document.getElementById('calcOutput');

var calculator = {
  
  idArray: [],
  
  inputButtonArray:
  ['zero','one','two','three',
   'four','five','six','seven',
   'eight','nine','leftPara','rightPara',
   'divide','times','minus','plus',
   'period'],
  
  functionButtonArray:
  ['del',
   'clear',
   'evaluate'],
    
  inputBind: function(){
    
    inputNodeArray = [];
    
    for (var i = 0; i < calculator.inputButtonArray.length; i++) {
      var key = calculator.inputButtonArray[i];
      var getId = document.getElementById(key);
      inputNodeArray.push(getId);
    }
    for (var j = 0; j < inputNodeArray.length; j++) {
      var calcInput = inputNodeArray[j];
      calcInput.addEventListener('click', function() {
        calcOutput.textContent += this.innerHTML;
      })  
    }
  },
  
  functionBind: function(){
    
    functionNodeArray = [];
    
    for (var i = 0; i < calculator.functionButtonArray.length; i++){
      key = calculator.functionButtonArray[i];
      var getId = document.getElementById(key);
      functionNodeArray.push(getId);
    }
    // Delete last character - binds to #del
    functionNodeArray[0].addEventListener('click', function(){
      calcOutput.textContent = calcOutput.textContent.slice(0,-1);
    })
    // Clear all characters - binds to #clear
    functionNodeArray[1].addEventListener('click', function(){
      calcOutput.textContent = "";
    })
    // Evaluate all characters - binds to #evaluate
    functionNodeArray[2].addEventListener('click', function(){
      calcOutput.textContent = eval(calcOutput.textContent);
    })
  }
}

calculator.inputBind();
calculator.functionBind();
