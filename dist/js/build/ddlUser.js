/**
 * 用户
 *
 * @author keepsilent
 * @version 1.0.0
 */
var ddlUser = (function () {

    var options = {
        playBtn: '#ddl-comic-user-play',
        versionBtn: '#ddl-comic-version'
    }


    /**
     * 初始化
     * @method init
     */
    var init = function () {
        var id = '.ddl-comic-main';
        var template = 'user/index';

        tpl.renderTpl(id,template);
        cookie.get('setting',function (data) {
            var setting = data.setting || {};
            var zoom = setting.zoom || 100;
            var space = setting.space || 25;

            powerange('ddl-comic-zoom',zoom,20,300);
            powerange('ddl-comic-space',space,0,100);
        });

        $(options.playBtn).click(play);
        ajRequest.get('./manifest.json',{},function (result) {
            $(options.versionBtn).html(result.version);
        });
    }


    /**
     * 滑动模块
     * @method powerange
     * @param {String} key 关键字
     * @param {Number} start 默认值
     * @param {Number} min 最小值
     * @param {Number} max 最大值
     */
    var powerange = function (key,start,min,max) {
        tpl.renderTpl('#'+key+'-box', 'user/powerange', {'key': key});
        var selector = document.querySelector('#'+key);
        document.getElementById(key+'-value').innerHTML = start;
        new Powerange(selector, { key: key, start: start, min: min, max: max, hideRange: true, callback: function () {
            var _this = this;
            var value = $('#'+this.key).val();
            document.getElementById(this.key+'-value').innerHTML = value;

            cookie.get('setting',function (data) {
                var setting = data.setting || {};
                var key = (_this.key).replace('ddl-comic-','');
                setting[key] = value;

                cookie.set('setting',setting);
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    var params = { type: 'personalSetting',key: key,value: value};
                    chrome.tabs.sendMessage(tabs[0].id, params, function(response) {});
                });
            });
        }});
    }

    /**
     * 打赏
     * @method play
     */
    var play = function () {
        var object = {template: 'user/play'};
        tipsBox.floating(object);
        $('#ddl-play-close-btn').click(function () {
            tipsBox.hideFloating();
        })
    }

    return {
        init: init
    }
})();