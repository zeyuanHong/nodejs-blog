let BootDate = new Date("2022/9/1 00:00:00");
function ShowRunTime(id) {
let NowDate = new Date();
let RunDateM = parseInt(NowDate - BootDate);
let RunDays = Math.floor(RunDateM/(24*3600*1000));
let RunHours = Math.floor(RunDateM%(24*3600*1000)/(3600*1000));
let RunMinutes = Math.floor(RunDateM%(24*3600*1000)%(3600*1000)/(60*1000));
let RunSeconds = Math.round(RunDateM%(24*3600*1000)%(3600*1000)%(60*1000)/1000);
let RunTime = RunDays + "天" + RunHours + "时" + RunMinutes + "分" + RunSeconds + "秒";
document.getElementById(id).innerHTML = "哲理源博客已运行:" + RunTime;
}
setInterval("ShowRunTime('span_dt_dt')", 1000)