$(document).ready(function(){console.log("popup.load"),chrome.runtime.onMessage.addListener(function(e,o,n){console.log("runtime",e,o,n),$("#ddl-test").html("test")})});