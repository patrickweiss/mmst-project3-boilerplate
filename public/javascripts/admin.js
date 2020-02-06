console.log("Script admin.js loaded");

function generateComponents() {
  console.log("generateComponents was clicked");
  axios.get("/components")
    .then(fromServer => {

      document.getElementById("answer").innerHTML = fromServer.data;
    }).catch(err => {
      console.log("err => ", err);
    });
}

function generateCases() {
  console.log("generateCases was clicked");
  x = document.getElementById("compNumber").value;
  axios.get("/cases/" + x)
    .then(fromServer => {
      document.getElementById("casesAnswer").innerHTML = fromServer.data;
      setTimeout(function () { location.reload() }, 3000);
    }).catch(err => {
      console.log("err => ", err);
    });
}

function generateTests() {
  
  x = document.getElementById("numbTc").value;
  y = document.getElementById("caseComplexity").value;
  console.log("generate Tests was clicked" +x +" "+y);
  axios.get("/tests/" + x +"/" + y)

    .then(fromServer => {
      document.getElementById("testsAnswer").innerHTML = fromServer.data;
    }).catch(err => {
      console.log("err => ", err);
    });
}

