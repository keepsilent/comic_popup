var ajRequest=function(){var a=function(t){return""==t||null==t||null==t};return{post:function(t){var n=t.url,e=t.data,o=t.success,u=t.error,c=t.complete,r=t.timeout||5e3;if(a(n))return!1;$.ajax({type:"post",url:n,data:e,async:!1,timeout:r,dataType:"json",success:function(t){"function"==typeof o&&o(t)},error:function(t){"function"==typeof u&&u(t)},complete:function(){"function"==typeof c&&c()}})}}}();$(document).ready(function(){chrome.extension.onMessage.addListener(function(t,n,e){ajRequest.post({url:t.url,data:t.data,success:e})})});