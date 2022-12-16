function fridaProcess(){
  Java.perform(function () {
    var enumMoudle = Process.enumerateModules();
    for (var i = 0; i < enumMoudle.length; i++){
      console.log("", enumMoudle[i].name)
    }
  });
}
setImmediate(fridaProcess,0)
