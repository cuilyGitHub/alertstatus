//ajax
var Ajax = {
    get:function (url, fn) {
        var obj = new XMLHttpRequest();
        obj.open('GET',url,true);
        obj.onreadystatechange = function () {
            if(obj.readyState === 4 && obj.status === 200 || obj.status === 304){
                fn.call(this,obj.responseText);
            }
        };
        obj.send();
    },
    post:function (url, data, fn) {
        var obj = new XMLHttpRequest();
        obj.open("POST", url, true);
        obj.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
        obj.onreadystatechange = function () {
            if(obj.readyState === 4 && obj.status === 200 || obj.status === 304){
                fn.call(this,obj.responseText);
            }
        }
        obj.send(data);
    }
}
/* ------------------------------------------------------------------------------------ */

Ajax.get('data.json',renderDom);

function renderDom (data) {
    data = JSON.parse(data);
    var immediatelyData = data.immediatelyData;
    var floatData = data.floatData;
    renderTable(immediatelyData,'immediately');
    renderTable(floatData,'floatData');
}
function renderTable (data,type) {
    if(type === 'immediately'){
        var targetDom = document.getElementById('immediately');
    }else if(type === 'floatData'){
        var targetDom = document.getElementById('float');
    }

    var str = '';
    for(var i=0;i<data.length;i++){
        if(data[i].type === 'driver'){
            var td = '<td></td><td>'+data[i].name+'</td>';
        }else if(data[i].type === 'stop'){
            var td = '<td>'+data[i].name+'</td><td></td>';
        }else if(data[i].type === 'all'){
            var td = '<td colspan="2">'+data[i].name+'</td>';
        }
        str += '<tr class="content">'
                    +td
                    +'<td>'+data[i].expireAfter+'小时</td>'
                    +'<td>'+data[i].description+'</td>'
                '</tr>';
        console.log(data[i]);
    }
    targetDom.innerHTML = str;
}