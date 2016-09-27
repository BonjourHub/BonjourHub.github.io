---
layout: post
title: "【iOS进阶】Runtime简单应用"
date: 2016-03-21
categories: iOS进阶
---

本文主要介绍了runtime函数的大体用法，如需更多的了解可以查看[官方文档](https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/ObjCRuntimeGuide/Articles/ocrtInteracting.html#//apple_ref/doc/uid/TP40008048-CH103-SW1),或查看官方相关[源码](http://opensource.apple.com/tarballs/objc4/)

***

Objective-C是一门动态语言，而OC语言的运行时runtime是一个被称作runtime的库，使用runtime库可以动态的管理OC的属性，我们写代码时能够更具灵活性，如我们可以把消息转发给我们想要的对象，或者随意交换一个方法的实现等。这个库函数可以被任何使用了OC语言的APP链接调用。   
**注意：当仅需要使用OC语言运行程序的情况下，你不需要直接使用runtime库函数，这时候使用OC就够了。Runtime库函数的API主要适用于OC语言和其他语言的桥接，或进行底层系统调试。**   

> 编码要求：
    runtime的API中所有的 char * 被要求尽量使用UTF-8编码


下面我们来了解Runtime库函数中的一些函数及其调用方法

### 类系列函数   
**class_getName（Class cls）**   
参数：一个类对象   
返回值：返回给定类的名称；如果给定的类是nil,则返回一个空字符串。

    RuntimeStudy *runtimeStudy = [[RuntimeStudy alloc] init];

    //获取类名(两种传参方式)    
    const char *className = class_getName([RuntimeStudy class]);    
    SLog(@"方法1_获取类名：%s",className);    
    const char *className2 = class_getName([runtimeStudy class]);    
    SLog(@"方法2_获取类名：%s",className2);   

输出：   
方法1_获取类名：RuntimeStudy   
方法2_获取类名：RuntimeStudy   

**class_getSuperclass(Class cls)**   
参数：类对象   
返回值：给定类的父类   

    //获取父类名   
    Class superClass = class_getSuperclass([RuntimeStudy class]);   
    SLog(@"父类名称是:%s",class_getName(superClass));

输出：   
父类名称是：NSObject

**class_isMetaClass(Class cls)**   
参数：类对象   
返回值：给定值是否是一个元类,YES是，NO不是；

    //判断是否是元类   
    BOOL isMeta = class_isMetaClass([RuntimeStudy class]);   
    SLog(@"RuntimeStudy是否是元类：%d",isMeta);    
    SLog(@"NSObject是否是元类：%d",class_isMetaClass([NSObject class]));

输出：   
RuntimeStudy是否元类：0   
NSObject是否元类：0

什么是[元类](http://ios.jobbole.com/81657/)？    
元类的定义：**元类是类对象的类。**    
简单说就是：    
+ **当你给对象发送消息时，消息是在寻找这个对象的类的方法列表。**    
+ **当你给类发消息时，消息是在寻找这个类的元类的方法列表。**

元类是必不可少的，因为它存储了类的类方法。每个类都必须有独一无二的元类，因为每个类都有独一无二的类方法。

**class_getInstanceVariable(Class cls,const char *name)**    
参数：cls-类对象 name-实例变量的名字（如果是属性，需要下划线开头）    
返回值：变量信息ivar

    //获取类的实例的成员变量(person对象的_age变量)的地址    
    Ivar ivar = class_getInstanceVariable([Person class], "_age");    
    SLog(@"类的实例变量ivar是:%p",ivar);

输出：    
十六进制的实例变量内存地址

在objc_class中，所有的成员变量、属性的信息是放在链表ivars中的。ivars是一个数组，数组中每个元素是指向Ivar(变量信息)
的指针。Ivar是一个数据结构体，它包含了某个变量的信息；




### 动态创建一个类

动态创建一个类必须同时使用两个函数:**objc_allocateClassPair(Class superClass, const char *name, size_t extraBytes)**和**objc_registerClassPair(Class cls)**
。第一个函数主要是开辟内存空间创建一个新的类，要使用这个新的类必须使用第二个函数是将这个新类进行注册。如果要给这个类添加成员变量和新方法需要放在上面两个函数之间操作。

    //动态创建NSObject类的子类Person类    
    Class Man = objc_allocateClassPair([NSObject class], "Person", 0);   
    //给Person类添加成员变量    
    NSUInteger size;    
    NSUInteger alingment;     
    NSGetSizeAndAlignment("*", &size, &alingment);//"*"等同于@ecode(char *)     
    class_addIvar(Person, "addr", size, alingment, "*");    
    //注册类    
    objc_registerClassPair(Person);    
    SLog(@"注册成功，成员变量:%p",class_getInstanceVariable(Person,"addr"));

输出：    
正确输出了成员变量addr的十六进制地址

***BOOL class_addIvar(Class cls, const char *name, size_t size, uint8_t alignment, const char *types)***函数中有几个参数需要注意：   
cls - 类对象    
name - 变量名    
size - 内存大小    
+ 可以使用sizeof(<#expression-or-type#>)获得，如：sizeof(NSString *);

alignmet - 内存对齐    
+ 如果变量类型为指针，则传log2(sizeof(pointer_type))，如：log2(sizeof(NSString *))；    
+ 如果变量类型为其他类型，则传sizeof(value_type)，如：sizeof(int);

types - [编码类型](https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/ObjCRuntimeGuide/Articles/ocrtTypeEncodings.html#//apple_ref/doc/uid/TP40008048-CH100-SW1)    
+ "*"等同于 @encode(char *);    
+ "i"等同于 @encode(int);

这里重点说一下aigment内存对齐：CPU从内存中读取数据是成块读取的，如：一颗64-bit的CPU每次读取和操作的字节数都是64bit/8(bit/byte) = 8byte。可以将Ivar列表想象成一个C中的struct,假设有如下struct：

    struct ivar {
      BOOL b;
      int i;
      short s;
    }

如果没有内存对齐，这个struct结构体在内存中的布局是这样的：b|iiii|ss总共占用7bytes,明显是CPU不友好的。   
如果使用了内存对齐，它是这样的：bbbb|iiii|ssss|总共是12bytes,CPU可以成块读取。    
但是这样增加了内存占用，所以实际上我们还会对内存布局进行调整：
bb|ss|iiii这样总共占八个字节，是这个struct数据类型组合中最佳内存布局。

我们上面使用的是**NSGetSizeAndAlignment**函数获取size和aligenmengt,而没有只用如下方法：    
设置参数的另一种方法    

    size_t size = sizeof(NSString *);    
    alingment = log2(sizeof(NSString *));   
    char *type = @encode(char *);    
    class_addIvar(Person, "addr", size, alingment, type);

上面这种方法也可以设置参数，但是我们推荐使用**NSGetSizeAndAlignment**函数函数。

### 方法系列函数
假设我们有一个Person类，类中有两个实例方法：

    - (void)goToScholl {
        NSLog("去学校");
    }
    - (void)goToHome {
        NSLog("回家");
    }    

现在我们想交换两个方法内部的实现,goToScholl打印回家，goToHome打印去学校：    
首先获取这两个方法

    Method m1 = class_getInstanceMethod([Person class], @selector(goToSchool));
    Method m2 = class_getInstanceMethod([Person class], @selector(gotoHome));

交换方法m1和m2的内部实现

    method_exchangeImplementations(m1, m2);

如果我们不想交换两个方法内部的实现，只想m2使用m1的实现，m1保持不变，只需要如下操作：
获取m1方法的内部实现

    IMP imp1 = method_getImplementation(m1);

设置m2的实现

    method_setImplementation(m2, imp1);

**class的方法列表其实是一个字典，key为selectors，IMPs为value。一个IMP是指向方法在内存中的实现。很重要的一点是，selector和IMP之间的关系是在运行时才决定的，而不是编译时。**

最后附上一张总结图：

![runtime.png](http://upload-images.jianshu.io/upload_images/2280423-b327efb87260dc94.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)