Java.perform(function () {
  // we create a javascript wrapper for MainActivity
  var Activity = Java.use('path.of.nativelib.SecurityLib');
  // replace the NativeLibName implementation
  Activity.checkLoadLib.implementation = function () {
    // console.log is used to report information back to us
    console.log("Inside NativeLibName now...");
    // return this number of our choice
    return true
  };
});
