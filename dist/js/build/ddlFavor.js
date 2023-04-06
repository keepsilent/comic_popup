/**
 * 收藏
 *
 * @author keepsilent
 * @version 1.0.0
 */
var ddlFavor = (function () {

    var options = {
        operaBtn: '#ddl-favor-opera-btn',
        continueBtn: '.ddl-comic-favor span.continue-btn',
        deleteBtn: '.ddl-comic-favor span.delete-btn',
        itemBtn: '.ddl-comic-favor li.item-box'
    }

    /**
     * 初始化
     * @method init
     */
    var init = function () {
        // var favor = [
        //     { id: '16',title: "极主夫道",author: "おおのこうすけ ", type: "manhua_dmzj", cover: "https://images.dmzj.com/webpic/7/fu20190531.jpg", current: {title: "第36话", url: "https://manhua.dmzj.com/jizhufudao/92501.shtml",time: new Date().getTime()}, home: "https://manhua.dmzj.com/jizhufudao/", last: {link: "https://manhua.dmzj.com/jizhufudao/92501.shtml", title: "第36话",total:41}},
        //     { id: '3',title: "看得见的女孩",author: "泉朝树 ", type: "manhua_dmzj", cover: "https://images.dmzj.com/webpic/4/kandejiandenvhai111.jpg", current: {title: "连载15", url: "https://manhua.dmzj.com/kandejiandenvhai/88635.shtml",time: (new Date(" 2018/06/22 08:00:20")).getTime()}, home: "https://manhua.dmzj.com/kandejiandenvhai/", last: {link: "https://manhua.dmzj.com/kandejiandenvhai/88028.shtml", title: "番外篇2",total:26}}
        //     // ,{home: "https://manhua.dmzj.com/kandejiandenvhai/",type: "manhua_dmzj"}
        //     // ,{home: "https://manhua.fzdm.com/146/",type: "fzdm"}
        // ];

        var id = '.ddl-comic-main';
        var template = 'favor/index';

        cookie.get('favor',function (data) {
            var favor = data.favor || [];

            var ids = '';
            for(var i in favor) {
                ids += favor[i].id+',';
            }

            if(!base.isEmptyValue(ids)) {
                ids = base.rtrim(ids,',');
            }

            if(base.getDataLength(favor) <= 0) {
                tpl.renderTpl(id,'favor/nothing');
            } else {
                tpl.renderTpl(id, template, {list: favor});
                loadFavorCoverImg();
            }

            console.log('fff',favor);
            bindEvent();
            return favor;
            ajRequest.post('comic/getComicList',{ids: ids},function (result) {
                var num = 0;
                if(base.getDataLength(result.data) > 0) {
                    //console.log('result.data',result.data);

                    for (var i in favor) {
                        console.log('getComicList',result,result.data[i]);
                        if (!base.isEmptyValue(result.data[i])) { //数据不为空
                            //console.log(' favor[i].current.url', favor[i].current.url);
                            var catalog = ddlUnit.getCurrentCatalogList(result.data[i].comic_catalog, favor[i].current.url, favor[i].type);
                            var total = base.getDataLength(catalog.list);

                            console.log('catalog',catalog);

                            favor[i].updated = false;
                            favor[i].current.type = catalog.title;

                            if (parseInt(favor[i].last.total) < parseInt(total)) {
                                var index = parseInt(total) - 1;
                                favor[i].updated = true;
                                favor[i].last.link = catalog.list[index].link;
                                favor[i].last.title = catalog.list[index].title;
                                num++;
                            }
                        }
                    }
                }

                console.log('fff',favor);
                if(base.getDataLength(favor) <= 0) {
                    tpl.renderTpl(id,'favor/nothing');
                } else {
                    tpl.renderTpl(id, template, {list: favor});
                    $('#ddl-comic-updated-num').html(num+'本');
                    loadFavorCoverImg();
                }

                bindEvent();
            });
        });
    }

    /**
     * 加载喜欢漫画图片
     * @method loadFavorCoverImg
     */
    var loadFavorCoverImg = function () {
        $('.ddl-comic-favor img.cover').each(function () {
            var _this = $(this), src = $(this).attr('data-src');
            if(!base.isEmptyValue(src)) {
                var img = new Image();
                img.src = src;
                if (img.fileSize > 0 || (img.width > 0 && img.height > 0)) {
                    _this.attr('src',src);
                }

                img.onload = function(){
                    _this.attr('src',src);
                }
            }
        });
    }


    /**
     * 绑定事件
     * @method bindEvent
     */
    var bindEvent = function () {
        $(options.continueBtn).click(function (event) { //继续查看阅读按钮
            event.stopPropagation();
            base.jumpUrl($(this).attr('data-url'),'_blank');
        });

        $(options.itemBtn).click(function (event) { //漫画
            event.stopPropagation();
            base.jumpUrl($(this).attr('data-url'),'_blank');
        });

        $(options.deleteBtn).click(function (event) { //删除按钮
            event.stopPropagation();
            $(this).parent().remove();
            var home = $(this).attr('data-url');

            cookie.get('favor',function (data) {
                var favor = data.favor || [];
                for (var i in favor) {
                    if(favor[i].home == home) {
                        favor.splice(i,1);
                    }
                }

                if(base.getDataLength(favor) <= 0) {
                    tpl.renderTpl('.ddl-comic-main','favor/nothing');
                }
                chrome.runtime.sendMessage({type: "removeFavor", key: 'home', value: home});
                cookie.set('favor',favor);
            });
        });

        $(options.operaBtn).click(function () { //编辑按钮
            var status = $(this).attr('data-status');
            if(status == 'normal') {
                $(this).css('color','#ffc459');
                $(this).attr('data-status','opera');
                $('.ddl-comic-favor ul').find('span.continue-btn').hide();
                $('.ddl-comic-favor ul').find('span.delete-btn').show();
                return false;
            }

            $(this).removeAttr('style');
            $(this).attr('data-status','normal');
            $('.ddl-comic-favor ul').find('span.continue-btn').show();
            $('.ddl-comic-favor ul').find('span.delete-btn').hide();
        });
    }

    /**
     * 重设章节名称
     * @method resetChapterName
     * @param {String} chapter 章节名称
     * @param {String} name 漫画名称
     * @return {String}
     */
    var resetChapterName = function (chapter,name) {
        chapter = chapter.replace(base.trim(name),'');
        chapter = base.trim(chapter);
        chapter = chapter.replace(/(^_*)/g,"");
        chapter = chapter.replace(/(^\-*)/g,"");

        return chapter;
    }

    /**
     * 时间之前
     * @method getTimeAgo
     * @param {Nubmer} timestamp 时间戳
     * @return {string}
     */
    var getTimeAgo = function(timestamp){
        var result = '';
        var minute = 1000 * 60;      //把分，时，天，周，半个月，一个月用毫秒表示
        var hour = minute * 60;
        var day = hour * 24;
        var week = day * 7;
        var month = day * 30;
        var now = new Date().getTime();   //获取当前时间毫秒
        var diffValue = now - timestamp;//时间差

        if(diffValue < 0){
            return;
        }
        var minC = diffValue/minute;  //计算时间差的分，时，天，周，月
        var hourC = diffValue/hour;
        var dayC = diffValue/day;
        var weekC = diffValue/week;
        var monthC = diffValue/month;
        if(monthC >= 1 && monthC <= 3){
            result = " " + parseInt(monthC) + "月前";
        }else if(weekC >= 1 && weekC <= 3){
            result = " " + parseInt(weekC) + "周前";
        }else if(dayC >= 1 && dayC <= 6){
            result = " " + parseInt(dayC) + "天前";
        }else if(hourC >= 1 && hourC <= 23){
            result = " " + parseInt(hourC) + "小时前";
        }else if(minC >= 1 && minC <= 59){
            result =" " + parseInt(minC) + "分钟前";
        }else if(diffValue >= 0 && diffValue <= minute){
            result = "刚刚";
        }else {
            var datetime = new Date();
            datetime.setTime(timestamp);
            var Nyear = datetime.getFullYear();
            var Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
            var Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
            result = Nyear + "-" + Nmonth + "-" + Ndate
        }
        return result;
    }



    return {
        init:init,
        getTimeAgo: getTimeAgo,
        resetChapterName: resetChapterName
    }
})();

