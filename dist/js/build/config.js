/**
 * 系统配置
 *
 * @author keepsilent
 * @version 1.0.0
 */
var config = (function () {

    var options = {
        width: $(window).width()
        ,height: $(window).height()
        ,domain: 'www.didaolan.cn'
        ,templateUrl: 'dist/template/'
        ,apiUrl: 'https://api.didaolan.cn/v1/'
        //,apiUrl: 'http://m.com/api/public/v1/'
        ,debug: (window.location.host == 'm.com') ? 1 : 0
    }

    /**
     * 系统初始化
     * @method init
     */
    var init = function () {
        var page = $('#ddl-comic-page').val();
        switch (page) {
            case 'search':
                ddlSearch.init();
                break;
            case 'reader':
                ddlReader.init();
                console.log('sssss');
                break;
            default:
                ddlFavor.init();
                bindEvent();
        }

        window.onresize = function() {
            options.width = $(window).width();
            options.height = $(window).height();
        }

        window.addEventListener('online',  function(){});//在线中
        window.addEventListener('offline', function(){});//离线中
    }


    /**
     * 获取参数
     * @method getOptions
     * @param {String} key 键名
     * @return {String}
     */
    var getOptions = function (key) {
        return options[key];
    }

    /**
     * 获取 Api 地址
     * @method getApiUrl
     * @param {String} url 地址
     * @return {String}
     */
    var getApiUrl = function (url) {
        return options.apiUrl+url;
    }


    /**
     * 绑定事件
     * @method bindEvent
     */
    var bindEvent = function () {
        $('.ddl-comic-foot-tab').click(function () {
            var type = $(this).attr('data-type');

            $(this).addClass('active');
            $(this).siblings().removeClass('active');

            $(this).parent().find('span.iconfont').each(function () {
                $(this).addClass($(this).attr('data-class'));
            });
            $(this).parent().find('span.iconfont').removeClass('icon-shujiaxuanzhong').removeClass('icon-discoverfill').removeClass('icon-wodexuanzhong');

            switch (type) {
                case 'site':
                    ddlSite.init();
                    $(this).find('span.iconfont').removeClass('icon-discover').addClass('icon-discoverfill');
                    break;
                case 'favor':
                    ddlFavor.init();
                    $(this).find('span.iconfont').removeClass('icon-shujia').addClass('icon-shujiaxuanzhong');
                    break;
                case 'user':
                    ddlUser.init();
                    $(this).find('span.iconfont').removeClass('icon-31wode').addClass('icon-wodexuanzhong');
                    break;
                case 'reader':
                    base.jumpUrl('./reader.html', '_blank');
                    break;
            }
        })

        $('#ddl-comic-popup-search-input').bind('keypress',function(event){ //回车搜索
            event.stopPropagation();
            if(event.keyCode == '13') {
                var keyword = $(this).val();
                if(!base.isEmptyValue(keyword)) {
                    var url = './search.html?keyword=' + encodeURIComponent(keyword);
                    base.jumpUrl(url, '_blank');
                }
            }
        });
    }

    return {
        init: init
        ,getOptions: getOptions
        ,getApiUrl: getApiUrl
    }
})();

$(document).ready(function(){
    config.init();

    if(!base.isEmptyValue(chrome.runtime)) {
        chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
            switch (request.type) {
                case 'flushFavor':
                    if($('.ddl-comic-foot li:first-child').hasClass('active')) {
                        ddlFavor.init();
                    }
                    break;
            }
        });
    }
});
