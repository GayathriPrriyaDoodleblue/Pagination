var currentPage = 1;
var dataPerPage = 10;
var data;

window.onload = function() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://jsonplaceholder.typicode.com/posts", true);
    xhr.send();
  
    xhr.onreadystatechange = function() {
      try{
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        data = JSON.parse(xhr.responseText);
        showPage(data, currentPage);
      }}
      catch(e){
        document.getElementById("showerror").innerText=e;
      }
    };
     
  
  document.getElementById("next").addEventListener("click", function() {
    currentPage ++;
    showPage(data, currentPage);
  });
  document.getElementById("previous").addEventListener("click", function() {
    currentPage --;
    showPage(data, currentPage);
  });
 
};
 

function showPage(data, page) {
    var startIndex = (page - 1) * dataPerPage;
    var endIndex = startIndex + dataPerPage;
  
    var tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";
  
    for (var i = startIndex; i < endIndex && i < data.length; i++) {
      var tr = document.createElement("tr");
  
      var td1 = document.createElement("td");
      td1.innerHTML = data[i].userId;
      tr.appendChild(td1);
  
      var td2 = document.createElement("td");
      td2.innerHTML = data[i].id;
      tr.appendChild(td2);
  
      var td3 = document.createElement("td");
      td3.innerHTML = data[i].title;
      tr.appendChild(td3);
     
      var td4 = document.createElement("td");
      td4.innerHTML = data[i].body;
      tr.appendChild(td4);

      tableBody.appendChild(tr);
    }
  
    document.getElementById("page-number").innerHTML =
      "Page " + page + " of " + Math.ceil(data.length / dataPerPage);
      
      // if(currentPage <= 1){
      //   document.getElementById('previous').disabled=true;
      // }
      if(currentPage < 1){
        document.getElementById('previous').disabled=true;
      }
      
      else if(currentPage===Math.ceil(data.length / dataPerPage)){
        document.getElementById('next').disabled=true;
      }
      else if(currentPage > 0){
        document.getElementById('next').disabled=false;
      }
      
  }
  
