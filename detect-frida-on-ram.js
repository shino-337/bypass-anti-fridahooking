function main() {
  const openPtr = Module.getExportByName('libc.so', 'open');
  const open = new NativeFunction(openPtr, 'int', ['pointer', 'int']);
  var readPtr = Module.findExportByName("libc.so", "read");
  var read = new NativeFunction(readPtr, 'int', ['int', 'pointer', "int"]);
  var fakePath = "/data/data/com.app/maps";
  var file = new File(fakePath, "w");
  var buffer = Memory.alloc(512);
  Interceptor.replace(openPtr, new NativeCallback(function (pathnameptr, flag) {
      var pathname = Memory.readUtf8String(pathnameptr);
      var realFd = open(pathnameptr, flag);
      if (pathname.indexOf("maps") >= 0) {
          while (parseInt(read(realFd, buffer, 512)) !== 0) {
              var oneLine = Memory.readCString(buffer);
              if (oneLine.indexOf("tmp") === -1) {
                  file.write(oneLine);
              }
          }
          var filename = Memory.allocUtf8String(fakePath);
          return open(filename, flag);
      }
      var fd = open(pathnameptr, flag);
      return fd;
  }, 'int', ['pointer', 'int']));
}
setImmediate(main)
