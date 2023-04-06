/**
 * 站点
 *
 * @author keepsilent
 * @version 1.0.0
 */
var ddlSite = (function () {

    var options = {
        tabBtn: '.ddl-comic-site-tab',
        siteBtn: '.ddl-comic-site-jump',
    }

    /**
     * 初始化
     * @method init
     */
    var init = function () {
        var id = '.ddl-comic-main';
        var template = 'site/index';

        tpl.renderTpl(id,template,{ list: ddlUnit.getWebList()});
        bindJump();

        $(options.tabBtn).click(function () {
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
            tabs($(this).attr('data-type'));
        });
    }

    /**
     * 设置背景自动大小
     * @method setBackgroundAuto
     * @param {String} type 类型
     */
    var setBackgroundAuto = function (type) {
        switch (type) {
            case 'hhimm':
            case '52wuxing':
                return 'background-size: auto';
                break;
            case 'hhxxee':
            case 'imanhuaw':
            case 'sfacg':
                return 'background-size: 80%';
                break;
            case 'manhuagui':
                return 'background-size: 90%';
                break;
        }

        return '';
    }

    /**
     * 切换标签
     * @method tabs
     * @param type
     */
    var tabs = function (type) {
        var list = {},webList = ddlUnit.getWebList();
        var id = '.ddl-comic-main ul';
        var template = 'site/items';
        if(type == 'all') {
            list = webList;
        } else {
            for(var i in webList) {
                if(webList[i].type == type) {
                    list[i] = webList[i];
                }
            }
        }

        tpl.renderTpl(id,template,{ list: list});
        bindJump();
    }

    /**
     * 绑定跳转事件
     * @method BindJump
     */
    var bindJump = function () {
        $(options.siteBtn).click(function () {
            var url = $(this).attr('data-url');
            base.jumpUrl(url,'_blank');
        });
    }

    /**
     * 获取网站字段
     * @method getSiteField
     * @param {String} type 类型
     * @param {String} key 键名
     */
    var getSiteField = function (type,key) {
        var webList = ddlUnit.getWebList();
        if(!base.isEmptyValue(webList[type])) {
            return webList[type][key];
        }

        if(key == 'title') {
            return '未知';
        }

        return '';
    }

    return {
        init: init,
        tabs: tabs,
        getSiteField: getSiteField,
        setBackgroundAuto: setBackgroundAuto
    }
})();
