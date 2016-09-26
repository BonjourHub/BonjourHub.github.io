/**
 * Created by chengpengfei on 16/9/22.
 */
var app= angular.module('myApp',[]);
app.controller('homeCtrl',function($scope) {



  //数据对象
  var iOS = {title:'iOS开发',subTitle:['iOS基础','iOS进阶','iOS高级','iOS项目分析','iOS其它']
  };
  var services = {title:'服务端',subTitle:['PHP基础','PHP进阶','PHP高级','Linux基础','Linux进阶','Linux高级']};
  var dbs = {title:'数据库',subTitle:['MySQL','SQLite']};
  var devTool = {title:'开发工具',subTitle:['Cocoapods','Git','Xcode','WebStorm','PHPEclipse']};
  var js = {title:'JavaScript',subTitle:['AngularJS','JSON']};
  var web = {title:'Web服务',subTitle:['HTML/CSS','博客']};
  var netRef = {title:'网络基础',subTitle:['HTTP/HTTPS','TCP/IP']};


  $scope.items = [
    iOS,
    services,
    dbs,
    devTool,
    js,
    web,
    netRef
  ];


  $scope.clickToCategories = function (cat) {


    var href = "/categories/";
    switch (cat) {
      /*iOS*/
      case 'iOS基础':
          href += 'iOS/iOS.html?';

            break;
      case 'iOS进阶':
            href += 'iOS/iOS2.html?';
            break;
      /*case 'iOS高级':
        href += 'iOS/iOS3.html?'
        break;
      case 'iOS项目分析':
        href += 'iOS/iOS4.html?'
        break;
      case 'iOS其它':
        href += 'iOS/iOS5.html?'
        break; 暂无*/
      /*服务端*/
        /*
      case 'PHP基础':
        href += 'servers/PHPBase.html';
        break;
      case 'PHP进阶':
        href += 'servers/PHPAd.html';
        break;
      case 'PHP高级':
        href += 'servers/PHPSE.html';
        break;
      case 'Linux基础':
        href += 'servers/Linuxbase.html';
        break;
      case 'Linux进阶':
        href += 'servers/LinuxAd.html';
        break;
      case 'Linux高级':
        href += 'servers/LinuxSE.html';
        break;*/
        /*开发工具*/
        /*
      case 'Cocoapods':
        href += 'devTool/Cocoapods.html';
        break;
      case 'Git':
        href += 'devTool/Git.html';
        break;*/
        /*web服务*/
        /*
      case 'HTML/CSS':
        href += 'web/htmlCss.html';
        break;
      case 'HTML/CSS':
        href += 'web/blog.html';
        break;
        */
        /*网络基础*/
        /*
      case 'HTTP/HTTPS':
        href += 'netBase/https.html';
        break;
      case 'TCP/IP':
        href += 'netBase/TCPIP.html';
        break;*/

      default :
            href = '';
            break;
    }

    if (!href) {
      
      alert('暂无内容！');

      return ;
    }
    window.location.href = href;

  }



});