/* 
 * reports.js
 * Author: Brian
 */

//alert("Reports...");
var now;

//Define the myApp module.
var myApp = angular.module('myApp', []);

//Define the myCtrl controller.
myApp.controller('myCtrl', function clientsList($scope, $http){
    $scope.clients2 = [{
        name: 'Yexus',
        date1: '2000-11-29',
        date2: '2010-11-23',
        date3: '2018-12-10'
    }, {
        name: 'Rotorola',
        date1: '2000-08-19',
        date2: '2014-12-12',
        date3: '2018-11-04'
    }, {
        name: 'Uphill',
        date1: '1988-10-20',
        date2: '2013-12-26',
        date3: '2018-12-25'
    }
    ];
    
    $scope.clients = clientsl($scope.clients2);
    now = new Date();
    $scope.message = now;

    $scope.listView = function(){
        //alert("View");
        $http.get('/clients').then(function(data){
            $scope.clients2 = data.data;
            $scope.clients = clientsl($scope.clients2);
            $scope.feedback = data;
        }); 
    };
    
    $scope.clientCharts = function(){
        $http.get('/clients').then(function(data){
            $scope.message = data;
            $scope.clients2 = data.data;
            $scope.clients = clientsl($scope.clients2);
            clCharts($scope.clients);
        });
    };
});

function clCharts(cdata){
    //alert(bhdata);
    var clNames = [];
    var clDate1 = [];
    var data2 = cdata;
    var aUrl = document.URL;
    var urlList = aUrl.split("/reports");
    //alert(data2[0].name);
    //alert(data2[0].date1);
    for(var i = 0; i < data2.length; i++)
    {
        clNames.push(data2[i].name);
        clDate1.push(period(data2[i].date3, data2[i].date2));
    }
    window.location = urlList[0] + "/pcharts?cname="+clNames+",cdate1="+clDate1+",info=0";
    //
    
};

function period(xdate3, xdate2){
    var y3 = new Date(xdate3);
    var y2 = new Date(xdate2);
    //alert(y3.getTime()+" = "+y3);
    var ys = new Date(y3 - y2);
    var rfy = 1970;
    var yy = ys.getFullYear();
    var mm = ys.getMonth();
    var dd = ys.getDate();
    return (yy - rfy)+"/"+mm+"/"+dd;
};

function clientsl(clist){
    var l = clist.length;
    //alert(l);
    var temp1;
    var temp2 = [];
    for(var i = 0; i < l; i++){
        temp1 = {
            name: clist[i].name,
            date1: clist[i].date1,
            date2: clist[i].date2,
            date3: clist[i].date3,
            period: period(clist[i].date3, clist[i].date2)
        };
        temp2.push(temp1);
    }
    
    return temp2;
};

$(document).ready(function(){
    $('#btnCV').click(function(){
        $("#clDv").hide('slow');
        $("#clDv").show('slow');
    });
});
    
//alert("Done");