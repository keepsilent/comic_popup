var ddlUnit=function(){var options={webList:{manhua_dmzj:{title:"动漫之家",url:"https://manhua.dmzj.com/",describe:"动漫之家漫画网提供海量漫画,全天更新在线漫画欣赏,详尽的动漫资料库、动画资讯、用户评论社区于一体,它与在线动画站、动漫之家宅新闻三站合一，将成为国内更新较快,动漫视听享受较全,资料库较详尽的社区型动漫爱好者的交流互动平台",type:"chinese"},ikkdm:{title:"KuKu动漫",url:"http://comic.ikkdm.com/",describe:"kuku动漫,国内最早在线漫画站点之一,提供海量漫画,更新最快在线漫画欣赏,是动漫爱好者的交流互动平台",type:"chinese"},fzdm:{title:"风之动漫",url:"https://www.fzdm.com/",describe:"在线漫画 日本动漫 火影忍者漫画 海贼王漫画",type:"chinese"},sfacg:{title:"SF动漫",url:"https://manhua.sfacg.com/",describe:"SF漫画提供海量漫画,更新最快在线漫画欣赏、无弹窗清爽阅读环境，老牌漫画网站一直陪伴在你身旁。",type:"chinese"},hhimm:{title:"汗汗酷漫",url:"http://www.hhimm.com/",describe:"HH漫画 汗汗酷漫",type:"chinese"},pufei:{title:"扑飞漫画",url:"http://www.pufei.net/",describe:"扑飞漫画主打耽美BL系列漫画，立志于做耽美BL免费漫画第一站,免费全集漫画就来扑飞漫画",type:"chinese"},imanhuaw:{title:"爱漫画",url:"https://www.imanhuaw.com/",describe:"火影忍者704周四更新，爱漫画是国内更新火影忍者漫画速度最快、画质最好的火影忍者漫画网。同时每周四以最快速 度更新海贼王漫画、死神漫画等热门在线漫画。",type:"chinese"},hhxxee:{title:"九九漫畫",url:"http://99.hhxxee.com/",describe:"火影忍者584于4月25日火速更新,九九漫畫是國內更新火影忍者漫畫速度最快,畫質最好的火影忍者漫畫網,同時每周三以最快速度更新海賊",type:"chinese"},"52wuxing":{title:"爱漫之家",url:"http://www.52wuxing.net/",describe:"爱漫之家网是一个在线漫画网站，专人24小时不间断更新漫画，BL漫画，耽美漫画。- 腐之有道，宅之有理，你我有爱，尽在耽美。",type:"chinese"},gufengmh:{title:"古风漫画网",url:"https://www.gufengmh.com/",describe:"古风漫画网专注古风漫画，言情漫画，少女爱情等类型的漫画。古风漫画网第一时间更新天才小毒妃漫画，大角虫漫画，王牌校草漫画，指染成婚漫画等好看的漫画，看古风、少女爱情等类型漫画最好的网站！",type:"chinese"},fmhuaaa:{title:"腐漫画",url:"http://www.fmhuaaa.com/",describe:"欢迎来到腐漫画网。这里有最新的耽美漫画，BL漫画。",type:"chinese"},u17:{title:"有妖气",url:"http://www.u17.com/",describe:"中国唯一且最大的纯原创漫画网站，数千名中国原创漫画作者汇聚于此，在线连载最热门的全新漫画作品，为中国原创漫画作者提供最肥沃的漫画创作土壤。",type:"chinese"},mangapanda:{title:"Mangapanda",url:"https://www.mangapanda.com/",describe:"Read your favorite manga scans and scanlations online at Manga Reader. Read Manga Online, Absolutely Free and Updated Daily",type:"english"},mangareader:{title:"Mangareader",url:"https://www.mangareader.net/",describe:"Read your favorite manga scans and scanlations online at Manga Reader. Read Manga Online, Absolutely Free and Updated Daily",type:"english"},mangahere:{title:"Mangahere",url:"http://mangahere.us",describe:"MangaHere,Manga Here - Read your favorite manga scans and scanlations online at MangaHere.us.Read manga online for free at MangaHere.us .Read Manga Online - Abdolutely Free, Updated Daily!",type:"english"},dmzj:{title:"动漫之家",url:"https://www.dmzj.com/",describe:"动漫之家是国内最全最专业的在线漫画、原创漫画、最好看的动漫网站,每周更新各种原创漫画、日本动漫,动画片大全、漫画大全、好看的漫画尽在动漫之家漫画网。",type:"chinese"},acgn:{title:"動漫戲說",url:"https://comic.acgn.cc/",describe:'提供免費在線漫畫、線上漫畫(Comic) ~ 線上觀看!" ',type:"chinese"},huhudm:{title:"虎虎漫画",url:"http://www.huhudm.com/",describe:"漫画,在线漫画,免费漫画,日本漫画,虎虎漫画",type:"chinese"}}},setComicSort=function(e,t,a){var n=[];switch(t){case"ikkdm":case"manhua_dmzj":case"mangapanda":case"mangareader":case"gufengmh":case"fmhuaaa":case"u17":for(var i in e)n.push(e[i]);break;default:for(i=a-1;0<=i;i--)n.push(e[i])}return n},getPageLink=function(e,t){var a=getPageLinkFormat(e,t).replace(/%/i,1);switch(t){case"ikkdm":a=(a=a.replace("comic2","comic")).replace("comic3","comic");break;case"dmzj":case"manhua_dmzj":a=a.replace(/#@page=[0-9]+/i,"");break;case"fzdm":a=a.replace(/index_[0-9]+.html/i,"");break;case"sfacg":case"gufengmh":a=a.replace(/#p=[0-9]+/i,"");break;case"mangapanda":case"mangareader":a=a.substr(0,a.lastIndexOf("/"));break;case"hhimm":a=a.substr(0,a.lastIndexOf("?"))+"?s=8";break;case"pufei":a=a.replace(/\?\/page=[0-9]+/i,"");break;case"imanhuaw":case"52wuxing":a=a.replace(/\?\/p=[0-9]+/i,"");break;case"hhxxee":-1!=a.lastIndexOf("?")&&(a=a.substr(0,a.lastIndexOf("?")));break;case"fmhuaaa":a=a.replace(/[0-9]+.html/i,""),a+=$("select option:first-child").val()+".html";break;case"u17":a=a.replace(/#image_id=[0-9]+/i,"");break;case"mangahere":a=a.replace(/#[0-9]+/i,"");break;case"acgn":a=a.replace(/#show/i,"")}return a},getPageLinkFormat=function(e,t){switch(t){case"ikkdm":case"acgn":e=e.replace(/\/[0-9]+\.htm/i,"/%.htm");break;case"fzdm":-1!=e.indexOf("html")?e=e.replace(/\/index_[0-9]+\.html/i,"/index_%.html"):e+="index_%.html";break;case"mangapanda":/^https:\/\/www\.mangapanda\.com\/[a-zA-Z\-0-9]+\/[0-9]+\/[0-9]+/i.test(e)&&(e=e.substr(0,e.lastIndexOf("/"))),e+="/%";break;case"mangareader":/^https:\/\/www\.mangareader\.com\/[a-zA-Z\-0-9]+\/[0-9]+\/[0-9]+/i.test(e)&&(e=e.substr(0,e.lastIndexOf("/"))),e+="/%";break;case"hhimm":case"fmhuaaa":e=e.replace(/\/[0-9]+\.html/i,"/%.html");break;case"pufei":e=e.replace(/page=[0-9]+/i,"/page=%");break;case"imanhuaw":case"hhxxee":case"52wuxing":case"gufengmh":e=e.replace(/p=[0-9]+/i,"/p=%");break;case"mangahere":e=e.replace(/#[0-9]+/i,"#%")}return e},getCurrentCatalogList=function(e,t,a){var n=getPageLink(t,a);for(var i in n=n.replace(/(https:|http:)/i,""),e)for(var r in e[i].list)if(n==e[i].list[r].link.replace(/(https:|http:)/i,""))return e[i];return[]},hhimmUnsuan=function(s){for(var sw="44123.com|hhcool.com|hhimm.com",su=location.hostname.toLowerCase(),b=!1,len=sw.split("|").length,i=0;i<len;i++)if(-1<su.indexOf(sw.split("|")[i])){b=!0;break}if(!b)return"";var x=s.substring(s.length-1),w="abcdefghijklmnopqrstuvwxyz",xi=w.indexOf(x)+1,sk=s.substring(s.length-xi-12,s.length-xi-1),s=s.substring(0,s.length-xi-12),k=sk.substring(0,sk.length-1),f=sk.substring(sk.length-1);for(i=0;i<k.length;i++)eval("s=s.replace(/"+k.substring(i,i+1)+"/g,'"+i+"')");for(var ss=s.split(f),s="",i=0;i<ss.length;i++)s+=String.fromCharCode(ss[i]);return s},getElementPagePosition=function(e){for(var t=e.offsetLeft,a=e.offsetParent;null!==a;)t+=a.offsetLeft,a=a.offsetParent;var n=e.offsetTop;for(a=e.offsetParent;null!==a;)n+=a.offsetTop+a.clientTop,a=a.offsetParent;return{x:t,y:n}},getPhxxeeImagePath=function(e){var t=base.getQueryString("s"),a="http://99.94201314.net/dm01/|http://99.94201314.net/dm02/|http://99.94201314.net/dm03/|http://99.94201314.net/dm04/|http://99.94201314.net/dm05/|http://99.94201314.net/dm06/|http://99.94201314.net/dm07/|http://99.94201314.net/dm08/|http://99.94201314.net/dm09/|http://99.94201314.net/dm10/|http://99.94201314.net/dm11/|http://99.94201314.net/dm12/|http://99.94201314.net/dm13/|http://173.231.57.238/dm14/|http://99.94201314.net/dm15/|http://142.4.34.102/dm16/";return a=a.split("|"),base.isEmptyValue(t)&&(null==$("#hdCuD")||(t=$("#hdCuD").val(),base.isEmptyValue(t)))?(e=(e=(e=e.substr(1,e.length)).substr(0,e.indexOf("/"))).replace(/[a-zA-z\-]+/i,""),a[parseInt(e)-1]):a[parseInt(t)-1]},getGufengmhImagePath=function(e,t){var a=document.body.getAttribute("data-path");return-1==e.indexOf("http")?t+a:""},getU17PageTotal=function(){return $(".pagenum").html().replace(/<em>[0-9]+<\/em>\//g,"")},setU17BodyPath=function(){for(var e="",t=getU17PageTotal(),a=1;a<=t;a++)e+="document.body.setAttribute('data-path"+a+"', image_config.image_list["+a+"].src);";return e},setU17Images=function(){for(var e=[],t=getU17PageTotal(),a=1;a<=t;a++)e[parseInt(a)-1]=base64.decode($("body").attr("data-path"+a));return e},addIframe=function(){$("body").append('<iframe src="" width="0" height="0" id="ddl-comic-iframe" name="ddl-comic-iframe" frameborder="no" style="display: none;"></iframe>')},destroyIframe=function(e){var t=$(e).prop("contentWindow");$(e).attr("src","about:blank");try{t.document.write(""),t.document.clear()}catch(e){}},getWebList=function(){return options.webList},resetChapterTitle=function(e,t){for(var a in e)e[a].title=base.trim(e[a].title),e[a].title=e[a].title.replace(t,""),e[a].title=base.trim(e[a].title),e[a].title=e[a].title.replace(/(^_*)/g,""),e[a].title=e[a].title.replace(/(^\-*)/g,"");return e};return{hhimmUnsuan:hhimmUnsuan,getElementPagePosition:getElementPagePosition,getGufengmhImagePath:getGufengmhImagePath,getPhxxeeImagePath:getPhxxeeImagePath,getU17PageTotal:getU17PageTotal,setU17BodyPath:setU17BodyPath,setU17Images:setU17Images,getPageLink:getPageLink,setComicSort:setComicSort,getPageLinkFormat:getPageLinkFormat,getCurrentCatalogList:getCurrentCatalogList,addIframe:addIframe,destroyIframe:destroyIframe,getWebList:getWebList,resetChapterTitle:resetChapterTitle}}();