/*
=======================================
微信公众号iosrule  2020.5.22更新 by 红鲤鱼与绿鲤鱼与驴
   更新loon和圈叉通用
#火山签到
http-request ^https:\/\/ib-hl\.snssdk\.com\/luckycat\/hotsoon\/v1\/task\/done\/* script-path=huoshan520.js, timeout=60, tag=huoshan520.js
====================================






MITM=ib-hl.snssdk.com
====================================
*/



//====================================

//以上是配置说明
const $iosrule = iosrule();//声明必须

//++++++++++++++++++++++++++++++++

const huoshan="火山极速";

const hsdaysign_url="https://ib-hl.snssdk.com/luckycat/hotsoon/v1/task/sign_in_detail?version_code=7.3.1&app_name=live_stream_lite&aid=1350";
const hstreasure_url="https://ib-hl.snssdk.com/luckycat/hotsoon/v1/task/done/treasure_task?version_code=7.3.1&app_name=live_stream_lite&aid=1350";
const hschecktr_url="https://ib-hl.snssdk.com/luckycat/hotsoon/v1/task/treasure_detail?version_code=7.3.1&app_name=live_stream_lite&aid=1350";

var hsvideourl="https://ib-hl.snssdk.com";

var hsuser_ck="";//宝箱ck
const hstreasurename="hstreasurename"+"A";

//2.程序主体部分
function hs_readme()
{
  

  hsuser_ck=$iosrule.read(hstreasurename);
}



function hs_gettreasure()
{
var result1="";
var result2="";
        var tt=huoshan;
  hs_readme();
  console.log(hsuser_ck)

 const llUrl1 = {url:hstreasure_url,headers:{"User-Agent":"HotsoonLite 7.3.1 rv:7311 (iPhone; iOS 12.4; zh_CN) Cronet",Cookie:hsuser_ck}};
 const llUrl2 = {url:hschecktr_url,headers:{"User-Agent":"HotsoonLite 7.3.1 rv:7311 (iPhone; iOS 12.4; zh_CN) Cronet",Cookie:hsuser_ck}};

        $iosrule.post(llUrl1, function(error, response, data) {
    var obj=JSON.parse(data);
 console.log("火山开宝箱:"+data)
    if(obj.err_tips=="成功")
    {
      result1="[开宝箱]";
      var hsjiange1=parseInt(obj.data.next_time-obj.data.cur_time)+2;
    result2="获得金币:"+obj.data.amount+",下次开宝箱时间:"+cotime(obj.data.next_time)+",服务器当前时间:"+cotime(obj.data.cur_time)+",间隔:"+hsjiange1+"秒";
      setTimeout(function(){
       hs_gettreasure();
                     
                   
          }, hsjiange1* 1000);
    console.log(result2)
    papa(tt,result1,result2);
    }
     else
    {
  $iosrule.get(llUrl2, function(error, response, data) {
    var obj=JSON.parse(data);
 console.log("火山查开宝箱:"+data);
var hsjiange2=parseInt(obj.data.next_time-obj.data.cur_time)+2;

    result2="下次开宝箱时间:"+cotime(obj.data.next_time)+",服务器当前时间:"+cotime(obj.data.cur_time)+",间隔:"+hsjiange2+"秒";
      setTimeout(function(){
   hs_gettreasure();
                 
               
                   }, hsjiange2* 1000);
               
    console.log(result2);
    papa(tt,result1,result2);
    })
    }
    })}
    




function hs_getvideo(url,head)
{
var result1="";
var result2="";
        var tt=huoshan;
  
 var jishi=url.substring(url.indexOf("daily_read_")+11,url.indexOf("?version"));
 const llUrl = {url:url,headers:head,timeout:60};
        $iosrule.post(llUrl, function(error, response, data) {
    var obj=JSON.parse(data);
 console.log(jishi+"火山看视频数据:"+data)
 var str=JSON.stringify(obj);

    if(obj.err_tips=="UidHasCompleted")
    {
      result2=jishi+"任务完成";
      
      console.log(result2);

           papa(tt,result1,result2);
       }
     else if(obj.err_tips.indexOf("spam")<0&&obj.err_tips.indexOf("lock")<0)
     {result2=jishi+"看视频获得金币:"+obj.data.amount;
     console.log(result2)
     papa(tt,result1,result2);
     
             hs_getvideo(url,head);


     }
     else
 papa(tt,obj.err_tips,"发现机器人")
         


              })
    
}
        
        
        
        
        

//++++++++++++++++++++++++++++++++

//3.需要执行的函数都写这里
function main()
{
	hs_gettreasure();

}




//++++++++++++++++++++++++++++++++++++
//4.基础模板




if ($iosrule.isRequest) {

sub_writeck();
  
  $iosrule.end()
} else {
  
   main();
  $iosrule.end()
  }






function sub_writeck() {

  if ($request.headers) {

 var urlval = $request.url;

var md_header=$request.headers;
var md_bd=$request.body;

//🐟🐟🐟🐟🐟🐟🐟🐟🐟🐟🐟
        var tt=huoshan;





//🐰🐰🐰🐰🐰🐰🐰🐰🐰🐰🐰
console.log("匹配所有路径:"+urlval)


if(urlval.indexOf("v1/task/done/daily_read")>=0)
{
  papa("发现火山阅读数据","","")
  var hsvhd=md_header;
  var randme=getRandom(0.5,5,3);
           setTimeout(function(){
  hs_getvideo(urlval,hsvhd);
                   
                   
                   
                   }, randme* 1000);
  
  
  
  }
  
  else if(urlval.indexOf("v1/task/sign_in_detail")>=0||urlval.indexOf("v1/task/done/treasure_task")>=0)
 {
   papa("发现火山宝箱数据","","")
   var hstreasck=md_header.Cookie;
   var hsok=$iosrule.write(hstreasck,hstreasurename);
if(hsok==true)
  papa("写入火山签到和宝箱ck", "⭕", "写入"+tt + "成功");
   
   
   }

}}







function getRandom(start, end, fixed=0) {
            let differ = end - start
            let random = Math.random()
            return (start + differ * random).toFixed(fixed)
}






function cotime(timestamp) {
  const date = new Date(timestamp * 1000)
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  const D = (date.getDate() + 1 < 10 ? '0' + date.getDate() : date.getDate()) + ' '
  const h = date.getHours() + ':'
  const m = (date.getMinutes() + 1 < 10 ? '0' + (date.getMinutes() + 1) : date.getMinutes() + 1) + ''
  return M + D + h + m
}



function papa(x,y,z){

 $iosrule.notify(x,y,z);}


function iosrule() {
    const isRequest = typeof $request != "undefined"
    const isSurge = typeof $httpClient != "undefined"
    const isQuanX = typeof $task != "undefined"
    const notify = (title, subtitle, message) => {
        if (isQuanX) $notify(title, subtitle, message)
        if (isSurge) $notification.post(title, subtitle, message)
    }
    const write = (value, key) => {
        if (isQuanX) return $prefs.setValueForKey(value, key)
        if (isSurge) return $persistentStore.write(value, key)
    }
    const read = (key) => {
        if (isQuanX) return $prefs.valueForKey(key)
        if (isSurge) return $persistentStore.read(key)
    }
    const get = (options, callback) => {
        if (isQuanX) {
            if (typeof options == "string") options = { url: options }
            options["method"] = "GET"
            $task.fetch(options).then(response => {
                response["status"] = response.statusCode
                callback(null, response, response.body)
            }, reason => callback(reason.error, null, null))
        }
        if (isSurge) $httpClient.get(options, callback)
    }
    const post = (options, callback) => {
        if (isQuanX) {
            if (typeof options == "string") options = { url: options }
            options["method"] = "POST"
            $task.fetch(options).then(response => {
                response["status"] = response.statusCode
                callback(null, response, response.body)
            }, reason => callback(reason.error, null, null))
        }
        if (isSurge) $httpClient.post(options, callback)
    }
    const end = () => {
        if (isQuanX) isRequest ? $done({}) : ""
        if (isSurge) isRequest ? $done({}) : $done()
    }
    return { isRequest, isQuanX, isSurge, notify, write, read, get, post, end }
};


