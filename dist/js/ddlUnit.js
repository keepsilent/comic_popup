/**
 * 部件
 *
 * @author keepsilent
 * @version 1.0.0
 */
var ddlUnit = (function () {

    var options = {
        webList: {
            'manhua_dmzj': { title: '动漫之家',url: 'https://manhua.dmzj.com/',describe: '动漫之家漫画网提供海量漫画,全天更新在线漫画欣赏,详尽的动漫资料库、动画资讯、用户评论社区于一体,它与在线动画站、动漫之家宅新闻三站合一，将成为国内更新较快,动漫视听享受较全,资料库较详尽的社区型动漫爱好者的交流互动平台',type: 'chinese'},
            'ikkdm': { title: 'KuKu动漫',url: 'http://comic.ikkdm.com/',describe: 'kuku动漫,国内最早在线漫画站点之一,提供海量漫画,更新最快在线漫画欣赏,是动漫爱好者的交流互动平台',type: 'chinese'},
            'fzdm': {  title: '风之动漫',url: 'https://www.fzdm.com/',describe: '在线漫画 日本动漫 火影忍者漫画 海贼王漫画',type: 'chinese'},
            'sfacg': { title: 'SF动漫',url: 'https://manhua.sfacg.com/',describe: 'SF漫画提供海量漫画,更新最快在线漫画欣赏、无弹窗清爽阅读环境，老牌漫画网站一直陪伴在你身旁。',type: 'chinese'},
            'hhimm': { title: '汗汗酷漫',url: 'http://www.hhimm.com/',describe: 'HH漫画 汗汗酷漫',type: 'chinese'},
            'pufei': { title: '扑飞漫画',url: 'http://www.pufei.net/',describe: '扑飞漫画主打耽美BL系列漫画，立志于做耽美BL免费漫画第一站,免费全集漫画就来扑飞漫画',type: 'chinese'},
            'imanhuaw': { title: '爱漫画',url: 'https://www.imanhuaw.com/',describe: '火影忍者704周四更新，爱漫画是国内更新火影忍者漫画速度最快、画质最好的火影忍者漫画网。同时每周四以最快速 度更新海贼王漫画、死神漫画等热门在线漫画。',type: 'chinese'},
            'hhxxee': { title: '九九漫畫',url: 'http://99.hhxxee.com/',describe: '火影忍者584于4月25日火速更新,九九漫畫是國內更新火影忍者漫畫速度最快,畫質最好的火影忍者漫畫網,同時每周三以最快速度更新海賊',type: 'chinese'},
            '52wuxing':{ title: '爱漫之家',url: 'http://www.52wuxing.net/',describe: '爱漫之家网是一个在线漫画网站，专人24小时不间断更新漫画，BL漫画，耽美漫画。- 腐之有道，宅之有理，你我有爱，尽在耽美。',type: 'chinese'},
            'gufengmh': { title: '古风漫画网',url: 'https://www.gufengmh.com/',describe: '古风漫画网专注古风漫画，言情漫画，少女爱情等类型的漫画。古风漫画网第一时间更新天才小毒妃漫画，大角虫漫画，王牌校草漫画，指染成婚漫画等好看的漫画，看古风、少女爱情等类型漫画最好的网站！',type: 'chinese'},
            'fmhuaaa': { title: '腐漫画',url: 'http://www.fmhuaaa.com/',describe: '欢迎来到腐漫画网。这里有最新的耽美漫画，BL漫画。',type: 'chinese'},
            'u17': { title: '有妖气',url: 'http://www.u17.com/',describe: '中国唯一且最大的纯原创漫画网站，数千名中国原创漫画作者汇聚于此，在线连载最热门的全新漫画作品，为中国原创漫画作者提供最肥沃的漫画创作土壤。',type: 'chinese'},
            'mangapanda': { title: 'Mangapanda',url: 'https://www.mangapanda.com/',describe: 'Read your favorite manga scans and scanlations online at Manga Reader. Read Manga Online, Absolutely Free and Updated Daily',type: 'english'},
            'mangareader': { title: 'Mangareader',url: 'https://www.mangareader.net/',describe: 'Read your favorite manga scans and scanlations online at Manga Reader. Read Manga Online, Absolutely Free and Updated Daily',type: 'english'},
            'mangahere': { title: 'Mangahere',url: 'http://mangahere.us',describe: 'MangaHere,Manga Here - Read your favorite manga scans and scanlations online at MangaHere.us.Read manga online for free at MangaHere.us .Read Manga Online - Abdolutely Free, Updated Daily!',type: 'english'},
            'dmzj': { title: '动漫之家',url: 'https://www.dmzj.com/',describe: '动漫之家是国内最全最专业的在线漫画、原创漫画、最好看的动漫网站,每周更新各种原创漫画、日本动漫,动画片大全、漫画大全、好看的漫画尽在动漫之家漫画网。',type: 'chinese'},
            'acgn': { title: '動漫戲說',url: 'https://comic.acgn.cc/',describe: '提供免費在線漫畫、線上漫畫(Comic) ~ 線上觀看!" ',type: 'chinese'},
            'huhudm': { title: '虎虎漫画',url: 'http://www.huhudm.com/',describe: '漫画,在线漫画,免费漫画,日本漫画,虎虎漫画',type: 'chinese'},
        }
    }

    /**
     * 设置漫画排序
     * @method setComicSort
     * @param {Array} catalog 目录
     * @param {String} type 类型
     * @param {Number} total 数量
     * @return {Array}
     */
    var setComicSort = function (catalog,type,total) {
        var arr = [];
        switch (type) {
            case 'ikkdm':
            case 'manhua_dmzj':
            case 'mangapanda':
            case 'mangareader':
            case 'gufengmh':
            case 'fmhuaaa':
            case 'u17':
                for(var i in catalog) {
                    arr.push(catalog[i]);
                }
                break;
            default:
                for(var i = total - 1 ; i >= 0; i--) {
                    arr.push(catalog[i]);
                }
                break;
        }

        return arr;
    }

    /**
     * 获取分页链接
     * @member getPageLink
     * @param {String} url 链接
     * @param {String} type 类型
     * @return {String}
     */
    var getPageLink = function (url,type) {
        var linkFormat = getPageLinkFormat(url,type);
        var link = linkFormat.replace(/%/i,1);

        switch(type) {
            case 'ikkdm':
                link = link.replace('comic2','comic');
                link = link.replace('comic3','comic');
                break;
            case 'dmzj':
            case 'manhua_dmzj':
                link = link.replace(/#@page=[0-9]+/i, '');
                break;
            case 'fzdm':
                link = link.replace(/index_[0-9]+.html/i, '');
                break;
            case 'sfacg':
            case 'gufengmh':
                link = link.replace(/#p=[0-9]+/i, '');
                break;
            case 'mangapanda':
            case 'mangareader':
                link = link.substr(0,link.lastIndexOf('/'));
                break;
            case 'hhimm':
                link = link.substr(0, link.lastIndexOf('?')) + '?s=8';
                break;
            case 'pufei':
                link = link.replace(/\?\/page=[0-9]+/i, '');
                break;
            case 'imanhuaw':
            case '52wuxing':
                link = link.replace(/\?\/p=[0-9]+/i, '');
                break;
            case 'hhxxee':
                if(link.lastIndexOf('?') != -1) {
                    link = link.substr(0, link.lastIndexOf('?'));
                }
                break;
            case 'fmhuaaa':
                link = link.replace(/[0-9]+.html/i, '');
                link += $('select option:first-child').val()+'.html';
                break;
            case 'u17':
                link = link.replace(/#image_id=[0-9]+/i, '');
                break;
            case 'mangahere':
                link = link.replace(/#[0-9]+/i, '');
                break;
            case 'acgn':
                link = link.replace(/#show/i, '');
                break;
        }


        return link;
    }

    /**
     * 获取页面链接格式
     * @method getPageLinkFormat
     * @param {String} url 连接
     * @param {String} type 类型
     */
    var getPageLinkFormat = function (url,type) {
        switch (type) {
            case 'ikkdm':
            case 'acgn':
                url = url.replace(/\/[0-9]+\.htm/i,'/%.htm');
                break;
            case 'fzdm':
                if(url.indexOf("html") != -1) {
                    url = url.replace(/\/index_[0-9]+\.html/i,'/index_%.html');
                } else {
                    url += 'index_%.html';
                }
                break;
            case 'mangapanda':
                var reg = /^https:\/\/www\.mangapanda\.com\/[a-zA-Z\-0-9]+\/[0-9]+\/[0-9]+/i;
                if(reg.test(url)) {
                    url = url.substr(0,url.lastIndexOf('/'));
                    url += '/%';
                } else {
                    url += '/%';
                }
                break;
            case 'mangareader':
                var reg = /^https:\/\/www\.mangareader\.com\/[a-zA-Z\-0-9]+\/[0-9]+\/[0-9]+/i;
                if(reg.test(url)) {
                    url = url.substr(0,url.lastIndexOf('/'));
                    url += '/%';
                } else {
                    url += '/%';
                }
                break;
            case 'hhimm':
            case 'fmhuaaa':
                url = url.replace(/\/[0-9]+\.html/i,'/%.html');
                break;
            case 'pufei':
                url = url.replace(/page=[0-9]+/i,'/page=%');
                break;
            case 'imanhuaw':
            case 'hhxxee':
            case '52wuxing':
            case 'gufengmh':
                url = url.replace(/p=[0-9]+/i,'/p=%');
                break;
            case 'mangahere':
                url = url.replace(/#[0-9]+/i,'#%');
                break;
        }

        return url;
    }

    /**
     * 获取当前目录列表
     * @method getCurrentCatalogList
     * @param {Array} catalog 目录数组
     * @param {String} url 链接
     * @param {String} type 类型
     */
    var getCurrentCatalogList = function (catalog,url,type) {
        var link = getPageLink(url,type);
        link = link.replace(/(https:|http:)/i, '');
        for(var i in catalog) {
            for(var j in catalog[i].list) {
                if (link == (catalog[i].list[j].link).replace(/(https:|http:)/i, '')) {
                    return catalog[i];
                }
            }
        }

        return [];
    }

    /**
     * 汗汗酷漫解释图片名字
     * @member hhimmUnsuan
     * @param {String} s 加密字符
     * @return {string}
     */
    var hhimmUnsuan = function(s) {
        var sw = "44123.com|hhcool.com|hhimm.com";
        var su = location.hostname.toLowerCase();
        //var su = "www.hhimm.com";
        var b = false;
        var len = sw.split("|").length;
        for(var i=0;i< len;i++) {
            if(su.indexOf(sw.split("|")[i])>-1) {
                b=true;
                break;
            }
        }
        if(!b)return "";

        var x = s.substring(s.length-1);
        var w = "abcdefghijklmnopqrstuvwxyz";
        var xi = w.indexOf(x)+1;
        var sk = s.substring(s.length-xi-12,s.length-xi-1);
        var s = s.substring(0,s.length-xi-12);
        var k = sk.substring(0,sk.length-1);
        var f = sk.substring(sk.length-1);
        for(i=0;i<k.length;i++) {
            eval("s=s.replace(/"+ k.substring(i,i+1) +"/g,'"+ i +"')");
        }

        var ss = s.split(f);
        var s = "";
        for(var i=0;i<ss.length;i++) {
            s+=String.fromCharCode(ss[i]);
        }

        return s;
    }


    /**
     *  获取元素的绝对位置坐标（像对于页面左上角）
     *  @member  getElementPagePosition
     *  @param {String} element 元素id
     */
    var getElementPagePosition = function(element){
        //计算x坐标
        var actualLeft = element.offsetLeft;
        var current = element.offsetParent;
        while (current !== null){
            actualLeft += current.offsetLeft;
            current = current.offsetParent;
        }
        //计算y坐标
        var actualTop = element.offsetTop;
        var current = element.offsetParent;
        while (current !== null){
            actualTop += (current.offsetTop+current.clientTop);
            current = current.offsetParent;
        }
        //返回结果
        return {x: actualLeft, y: actualTop};
    }

    /**
     * 获得九九漫画图片路径
     * @member getPhxxeeImagePath
     * @param {String} img
     * @return {String}
     */
    var getPhxxeeImagePath = function (img) {
        var s = base.getQueryString("s");
        var paths = "http://99.94201314.net/dm01/|http://99.94201314.net/dm02/|http://99.94201314.net/dm03/|http://99.94201314.net/dm04/|http://99.94201314.net/dm05/|http://99.94201314.net/dm06/|http://99.94201314.net/dm07/|http://99.94201314.net/dm08/|http://99.94201314.net/dm09/|http://99.94201314.net/dm10/|http://99.94201314.net/dm11/|http://99.94201314.net/dm12/|http://99.94201314.net/dm13/|http://173.231.57.238/dm14/|http://99.94201314.net/dm15/|http://142.4.34.102/dm16/";
        paths = paths.split('|');

        if(!base.isEmptyValue(s)) {
            return paths[parseInt(s) - 1];
        }

        if($('#hdCuD') != null) {
            s = $('#hdCuD').val();
            if(!base.isEmptyValue(s)) {
                return paths[parseInt(s) - 1];
            }
        }

        img = img.substr(1,img.length);
        img = img.substr(0,img.indexOf('/'));
        img = img.replace(/[a-zA-z\-]+/i,'');
        return  paths[parseInt(img) - 1 ];
    }

    /**
     * 获取古风漫画图片路径
     * @method getGufengmhImagePath
     * @param {String} domain 域名
     * @return {String}
     */
    var getGufengmhImagePath = function (img,domain) {
        var path = document.body.getAttribute('data-path');

        if(img.indexOf('http') == -1) {
            return domain+path;
        }

        return '';
    }

    /**
     * 获得有妖气页面总数
     * @method getU17PageTotal
     */
    var getU17PageTotal = function () {
        var html = $('.pagenum').html();
        return html.replace(/<em>[0-9]+<\/em>\//g,'');
    }

    /**
     * 设置有妖气Body路径
     * @method setU17BodyPath
     */
    var setU17BodyPath = function () {
        var str = '';
        var total = getU17PageTotal();
        for(var i = 1; i<= total; i++) {
            str += "document.body.setAttribute('data-path"+i+"', image_config.image_list["+i+"].src);";
        }

        return str;
    }

    /**
     * 获取有妖气图片
     * @method setU17Images
     */
    var setU17Images = function () {
        var arr = [];
        var total = getU17PageTotal();
        for(var i = 1; i<= total; i++) {
           arr[parseInt(i)-1] = base64.decode($('body').attr('data-path'+i));
        }

        return arr;
    }


    /**
     * 添加Iframe
     * @method addIframe
     */
    var addIframe = function () {
        var html = '<iframe src="" width="0" height="0" id="ddl-comic-iframe" name="ddl-comic-iframe" frameborder="no" style="display: none;"></iframe>';
        $('body').append(html);
    }

    /**
     * 销毁Iframe
     * @method destroyIframe
     * @param {String} id 元素id
     */
    var destroyIframe = function(id) {
        var iframe = $(id).prop('contentWindow');

        $(id).attr('src', 'about:blank');

        try{
            iframe.document.write('');
            iframe.document.clear();
        } catch(e){

        }

        //把iframe从页面移除
        //$(id).remove();
    }

    /**
     * 获取网站列表
     * @method getWebList
     */
    var getWebList = function () {
        return options.webList;
    }

    /**
     * 重设章节标题
     * @method resetChapterTitle
     * @param {Array} list 目录
     * @param {String} title 标题
     * @return {Array}
     */
    var resetChapterTitle = function (list,title) {
        for(var i in list) {
            list[i].title = base.trim(list[i].title);
            list[i].title = list[i].title.replace(title,'');
            list[i].title = base.trim(list[i].title);
            list[i].title = list[i].title.replace(/(^_*)/g,"");
            list[i].title = list[i].title.replace(/(^\-*)/g,"");
        }

        return list;
    }

    return {
        hhimmUnsuan: hhimmUnsuan,
        getElementPagePosition: getElementPagePosition,
        getGufengmhImagePath: getGufengmhImagePath,
        getPhxxeeImagePath: getPhxxeeImagePath,
        getU17PageTotal: getU17PageTotal,
        setU17BodyPath: setU17BodyPath,
        setU17Images: setU17Images,


        getPageLink: getPageLink,
        setComicSort: setComicSort,
        getPageLinkFormat: getPageLinkFormat,
        getCurrentCatalogList: getCurrentCatalogList,

        addIframe: addIframe,
        destroyIframe: destroyIframe,
        getWebList: getWebList,
        resetChapterTitle: resetChapterTitle
    }
})();


