////////////////////////////
//
// app.js
// Author: Brian
//
/////////////////////////////////

//alert("start...");
var now = new Date();

//Define the myApp module.
var myApp = angular.module('myApp', []);

//Define the myCtrl controller.
myApp.controller('myCtrl', function clientsList($scope, $http){
    $scope.clients = [
        {
            name: 'Marc',
            email: 'marc@marc.com',
            tel: "0111234567",
            date1: "2000/11/11",
            date2: "2011/11/11",
            date3: "2018/11/10"
        },
        {
            name: 'Zack',
            email: 'zack@zack.com',
            tel: '0111234567',
            date1: '1989/11/11',
            date2: '2013/11/11',
            date3: '2018/10/03'
        },
        {
            name: 'Jean',
            email: 'jean@jean.com',
            tel: '0111234567',
            date1: '1988/11/11',
            date2: '2017/10/11',
            date3: '2018/12/04'
        }
    ];
    
    $scope.sortn = [{sort:"name"},{sort:"date3"}];
    
    $scope.feedback = now;
    
    $scope.listView = function(){
        //alert("View");
        $http.get('/clients').then(function(data){
            $scope.clients = data.data;
            $scope.feedback = data;
        }); 
    };
    
    $scope.listSubmit = function(){
        //alert("Submit..");
        var listData = {
            name: $scope.name,
            email: $scope.email,
            tel: $scope.telp,
            date1: $scope.date1,
            date2: $scope.date2,
            date3: $scope.date3
        };
        $http.post('/clientPost', listData).then(function(data){
           $scope.feedback = data;
        }); 
    };
    //
    $scope.clientUpdate = function(cl){
        var cname = cl.name;
        now = new Date();
        //alert("upDate: "+ cname);
        $("#btnUpdate").show('slow');
        $("#btnOK").hide('slow');
        $("#lblCl").text("Update Client's info");
        $scope.name = cname;
        $scope.email = cl.email;
        $scope.telp = cl.tel;
        var d1 = new Date(cl.date1);
        $scope.date1 = d1.getFullYear()+"/"+d1.getMonth()+"/"+d1.getDate();
        var d2 = new Date(cl.date2);
        $scope.date2 = d2.getFullYear()+"/"+d2.getMonth()+"/"+d2.getDate();
        var d3 = now;
        $scope.date3 = d3.getFullYear()+"/"+(d3.getMonth()+1)+"/"+d3.getDate();;
        
    };
    //
    $scope.clientsUpdate = function(){
        //alert("clUpd.");
        var cData = {
            name: $scope.name,
            email: $scope.email,
            tel: $scope.telp,
            date1: $scope.date1,
            date2: $scope.date2,
            date3: $scope.date3
        };
        //alert("Processing....");
        //alert("cUpdatet: "+cData.name);
        $http.put('/upclients', cData).then(function(data){
            $scope.message = data;
        });
        $("#btnUpdate").hide('slow');
        $scope.name = "";
        $scope.email = "";
        $scope.telp = "";
        $scope.date1 = "";
        $scope.date2 = "";
        $scope.date3 = "";
        $("#btnOK").show('slow');
        $("#lblCl").text("New Clients");
    };
    //
    
    $scope.clientDelete = function(dcl){
        //alert("cDel: "+dcl.name);
        $http.post('/dclients',dcl).then(function(data){
            $scope.message = data;
        });
    };
    
});

$(document).ready(function(){
    //alert("doc...");
    $("#txbdate1").datepicker({
        dateFormat: 'yy/mm/dd',
        numberOfMonths: 1,
        showButtonPanel: true
    });
    $("#txbdate2").datepicker({
        dateFormat: 'yy/mm/dd',
        numberOfMonths: 1,
        showButtonPanel: true
    });
    $("#txbdate3").datepicker({
        dateFormat: 'yy/mm/dd',
        numberOfMonths: 1,
        showButtonPanel: true
    });
    $("li").eq(1).click(function(){
        $("#btnUpdate").hide('slow');
        $("#btnOK").show('slow');
    });
    $("li").eq(2).click(function(){
        $("#btnOK").hide('slow');
        $("#btnUpdate").show('slow');
    });
});

//alert(now);
