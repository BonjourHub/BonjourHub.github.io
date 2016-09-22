/**
 * Created by chengpengfei on 16/9/22.
 */
var app= angular.module('myApp',[]);
app.controller('homeCtrl',function($scope) {
  /*
  $scope.items = [
    'iOS基础','iOS进阶', 'iOS高级'
  ];
  */

  //数据对象
  var iOS = {title:'iOS开发',subTitle:['iOS基础','iOS进阶','iOS高级','iOS多线程','iOS工具','iOS扩展']
  };
  var services = {title:'服务端',subTitle:['dd','ff']};
  var dbs = {title:'数据库',subTitle:['dd','ff']};
  var devTool = {title:'开发工具',subTitle:['dd','ff']};
  var js = {title:'JavaScript',subTitle:['dd','ff']};
  var web = {title:'Web服务',subTitle:['dd','ff']};
  var netRef = {title:'网络基础',subTitle:['dd','ff']};

  //首页左侧导航栏

  $scope.menuItems = [
    iOS.title,
    services.title,
    dbs.title,
    devTool.title,
    js.title,
    web.title,
    netRef.title
  ];
  $scope.items = [
    iOS,
    services,
    dbs,
    devTool,
    js,
    web,
    netRef
  ];

  //$scope.subItems = ['iOS基础','iOS进阶','iOS高级'];





});