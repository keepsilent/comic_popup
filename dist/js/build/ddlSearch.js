/**
 * 搜索
 *
 * @author keepsilent
 * @version 1.0.0
 */
var ddlSearch = (function () {

    var options = {
        keyword: '#ddl-comic-search-keyword',
        searchBtn: '#ddl-comic-search-btn',
        searchInput: '#ddl-comic-search-input',
        authorBtn:'.search-author-btn',
        unfoldBtn: '.unfold-btn',
        fewerBtn: '.fewer-btn',
        status : true
    }

    var init = function () {
        var keyword = base.getQueryString('keyword');
        if(!base.isEmptyValue(keyword)) {
            keyword = decodeURIComponent(keyword);
        }

        search(keyword);

        $(options.searchBtn).click(function (event) { //搜索
            event.stopPropagation();
            var keyword = $(options.searchInput).val();
            if(base.isEmptyValue(keyword)) {
                return false;
            }

            search(keyword);
        });

        $(options.searchInput).bind('keypress',function(event){ //回车搜索
            event.stopPropagation();
            if(event.keyCode == '13') {
                var keyword = $(this).val();
                if(base.isEmptyValue(keyword)) {
                    return false;
                }
                search(keyword);
            }
        });
    }

    /**
     * 搜索
     * @method search
     * @param {String} keyword
     */
    var search = function (keyword,type) {
        if(options.status  == false) {
            return false;
        }

        var type = type || '';
        var id = '#ddl-comic-search-items-box';
        var data = { keyword: keyword,type: type};

        options.status = false;
        $(options.keyword).html(keyword);
        $(options.searchInput).val(keyword);
        tpl.renderTpl(id,'search/loading');

        ajRequest.post('comic/search',data,function (result) {
            options.status = true;
            var list = [];
            for(var i in result.data) {
                for(var j in result.data[i].comic_catalog) {
                    var total = base.getDataLength(result.data[i].comic_catalog[j].list);
                    result.data[i].comic_catalog[j].list = ddlUnit.setComicSort(result.data[i].comic_catalog[j].list,result.data[i].comic_type,total);
                    result.data[i].comic_catalog[j].list = ddlUnit.resetChapterTitle(result.data[i].comic_catalog[j].list,result.data[i].comic_title);


                    var item = {
                        title: result.data[i].comic_title,
                        cover: result.data[i].comic_cover,
                        author: result.data[i].comic_author,
                        intro: result.data[i].comic_intro,
                        catalog: result.data[i].comic_catalog[j],
                        status: (result.data[i].comic_status) == 0 ? '连载中': '已完结',
                        type: result.data[i].comic_type,
                        total: total,
                        last: (total != 0) ? result.data[i].comic_catalog[j].list[total - 1]: {title:'',url: ''},
                        link: result.data[i].comic_link
                    }


                    list.push(item);
                }
            }

            if(base.getDataLength(list) > 0) {
                tpl.renderTpl(id, 'search/item', {list: list});
                loadCoverImg();
                bindEvent();
            } else {
                tpl.renderTpl(id, 'search/nothing');
            }
        },function (result) {
            options.status = true;
        });
    }



    /**
     * 加载漫画图片
     * @method loadCoverImg
     */
    var loadCoverImg = function () {
        $('.ddl-comic-search-item-box img.cover').each(function () {
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
        $(options.unfoldBtn).click(function (event) { //展开
            event.stopPropagation();
            $(this).hide();
            $(this).parent().css('height','auto');
        });


        $(options.fewerBtn).click(function (event) { //收起
            event.stopPropagation();
            $(this).parent().removeAttr('style');
            $(this).prev().show();
        });

        $(options.authorBtn).click(function (event) { //搜索作者
            event.stopPropagation();
            var keyword = $(this).html();
            if(!base.isEmptyValue(keyword)) {
                search(keyword,'author');
            }
        });
    }

    return {
        init: init
    }
})();
