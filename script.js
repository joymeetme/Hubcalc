var number = document.getElementsByClassName("number");
var operator = document.getElementsByClassName("operator");
var historyValue=document.getElementById("history-value");
var outputValue=document.getElementById("output-Value");
function getHistory() {
  return historyValue.innerText;
}
function printHistory(num) {
  return (historyValue.innerText = num);
}
function getOutput() {
  return outputValue.innerText;
}
function printOutput(num) {
  if (num == "") {
    outputValue.innerText = num;
  } else {
    outputValue.innerText = getFormattedNumber(num);
  }
}

function getFormattedNumber(num) {
  if (num == "-") {
    return "";
  }

  var n = Number(num);
  var value = n.toLocaleString("en");
  return value;
}

function reverseNumberFormat(num) {
  return Number(num.replace(/,/g, ""));
}

for (var i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function () {
    if (this.id == "delete") {
      printHistory("");
      printOutput("");
    } else if (this.id == "backspace") {
      var output = reverseNumberFormat(getOutput()).toString();
      if (output) {
        // if output has a value
        output = output.substr(0, output.length - 1);
        printOutput(output);
      }
    } else {
      var output = getOutput();
      var history = getHistory();
      if (output == "" && history != "") {
        if (isNaN(history[history.length - 1])) {
            alert("invalid format used");
          history = history.substr(0, history.length - 1);

        }
      }

      if (output != "" || history != "") {
        output = output == "" ? output : reverseNumberFormat(output);
        history = history + output;
        if (this.id == "=" ) {
        
          var result = eval(history);
          printOutput(result);
          printHistory("");
        } else {
          history = history + this.id;
          printHistory(history);
          printOutput("");
        }
      }
    }
  });
}

for (var i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function () {
    var output = reverseNumberFormat(getOutput());
    if (output != NaN) {
      //if output is  a number
      output = output + this.id;
      printOutput(output);
    }
  });
}

