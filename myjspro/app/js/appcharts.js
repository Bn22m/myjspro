/* 
 * appcharts.js
 * Author: Brian
 */

var ctx;
var myChart;
//var cdata = [20, 10, 15, 2, 20, 30];
//var clst = ["YexusTest", "RotoTest", "UphillTest", "TempA", "TempB", "TempC"];
var cdata = [8,10,9,11,14,13,12,14,7,7,7,6,5];
var clst = ["C++","PHP","Java","C#","SQL","MySQL","MSSQL","Oracle","PostgreSQL","JavaScript","HTML","AngularJS","NodeJS"];
var lblXaxis = "X axis";
var lblYaxis = "Y axis";
var cldata = [];
var clnames = [];
var bhmbgl = [];
var bhwln = [];
var tempx = [];
var tempy = [];
var urlList; 

function init(){
    //"/pcharts?cname="+clNames+",cdate1="+clDate1+",info=0"
    var aUrl = document.URL;
    urlList = aUrl.split("?");
    var info = urlList[1];
    var bhwl = urlList[1].split(',info');
    var d1 = bhwl[0].split(',cdate1=');
    var mbgl = d1[1];
    info +="\n#l: "+mbgl;
    var d2 = d1[0].split('=');
    var bhn = d2[1];
    info +="\n#n: "+bhn;
    $("#lblData").text(info);
    bhmbgl = mbgl.split(',');
    bhwln = bhn.split(',');
    cldata = clData(bhmbgl);
    clnames = bhwln;
    tempx = clnames;
    tempy = cldata;
    render();
};

function render(){
    ctx = document.getElementById("myChart").getContext('2d');
    myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: clnames,
        datasets: [{
            label: 'My demo2 dataset.',
            data: cldata,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            xAxes: [{
                ticks:{
                    beginAtZero:true        
                },
                scaleLabel:{
                    display: true,
                    labelString: lblXaxis
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero:true
                },
                scaleLabel: {
                    display: true,
                    labelString: lblYaxis
                }
            }]
        }
    }
});
};

$(document).ready(function(){
    $("#btnCharts").click(function(){
        $("#lblData").show("slow");
        $("#lblData").hide("slow");
        $("#myCan").hide("slow");
        //
        for(var i = 0; i < cdata.length; i++)
        {
            tempy.push(cdata[i]);
            tempx.push(clst[i]);
        }
        cldata = tempy;
        clnames = tempx;
        $("#myCan").show("slow");
        wlCharts(urlList);
    });
    $("#btnChart").click(function(){
        $("#lblData").hide("slow");
        $("#lblData").show("slow");
        $("#myCan").hide("slow");
        //
        cldata = cdata;
        clnames = clst;
        lblXaxis = "Skill set";
        lblYaxis = "Years";
        //
        $("#myCan").show("slow");
        render();
        //
    });
});

function wlCharts(url){
    //"?cname="+clNames+",cdate1="+clDate1+",info=0";
    window.location = url[0] + "?cname="+clnames+",cdate1="+cldata+",info=0";
};

function clData(cld){
    var l = cld.length;
    var cl = [];
    var dd;
    //alert(l);
    for(var i = 0; i < l; i++){
        //alert(cld[i]);
        dd = cld[i].replace('/','.');
        dd = dd.replace('/','');
        //alert(dd);
        cl.push(dd);
    }
    return cl;
}

window.onload = function(){
  init();  
};
