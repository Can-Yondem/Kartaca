const url = "http://localhost:3000/log";
var isUpdate = true;
var lastId;
setInterval(()=>{
    var xhr = new XMLHttpRequest();
    xhr.open("GET",url,true);
    xhr.send();

    xhr.onload = ()=>{
        if(xhr.status == 200 && xhr.readyState == 4){
          var jsonpost = JSON.parse(xhr.responseText);

          try{
            if(isUpdate){
              //GET
              var get = jsonpost.filter(item => item.method === "GET");
              var responsetimeget = get.map(item => item.responsetime/1000);
              var dateget = get.map(item => item.timestamp);
              var trace1 = {
                  x: dateget,
                  y: responsetimeget,
                  type: 'scatter',
                  name: 'GET',
                  mode: "lines+markers",
                  //fill: 'tozeroy',
                  
                };
  
  
              //POST
              var post = jsonpost.filter(item => item.method === "POST");
              var responsetimepost = post.map(item => item.responsetime/1000);
              var datepost = post.map(item => item.timestamp);
              var trace2 = {
                  x: datepost,
                  y: responsetimepost,
                  type: 'scatter',
                  name: 'POST',
                  mode: "lines+markers",
                  //fill: 'tozeroy',
                  
                };
  
              //PUT
              var put = jsonpost.filter(item => item.method === "PUT");
              var responsetimeput = put.map(item => item.responsetime/1000);
              var dateput = put.map(item => item.timestamp);
              var trace3 = {
                  x: dateput,
                  y: responsetimeput,
                  type: 'scatter',
                  name: 'PUT',
                  mode: "lines+markers",
                  //fill: 'tozeroy',
                };
  
              //DELETE
              var dlt = jsonpost.filter(item => item.method === "DELETE");
              var responsetimedlt = dlt.map(item => item.responsetime/1000);
              var datedlt = dlt.map(item => item.timestamp);
              var trace4 = {
                  x: datedlt,
                  y: responsetimedlt,
                  type: 'scatter',
                  name: 'DELETE',
                  mode: "lines+markers",
                  //fill: 'tozeroy',
                };
  
                var data = [trace1,trace2,trace3,trace4];

                var layout = {
                  title: 'HTTP Request Monitor',
                  xaxis: {
                    autorange: false,
                    range: [Date.now()-50000,Date.now()+3600000],
                    type : "date"
                  },
                  yaxis: {
                    autorange: false,
                    range: [0, 3],
                    type: 'linear'
                  },
                  
                };
                
                Plotly.newPlot('myDiv', data,layout,{scrollZoom: true});
                isUpdate = false;
                lastId = jsonpost[jsonpost.length-1]._id;
              }
              else{
                if(jsonpost[jsonpost.length-1]._id !== lastId){
                  isUpdate = true;
                }
              }
          }catch(err){
            if(err.name == "TypeError"){
              isUpdate = true;
              dateget = [];
              responsetimeget = [];

              datepost = [];
              responsetimepost = [];

              dateput = [];
              responsetimeput = [];

              datedlt = [];
              responsetimedlt = [];

            }
          }

        }
           
    }
},150);







