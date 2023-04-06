/**
 * 阅读器
 *
 * @author keepsilent
 * @version 1.0.0
 */
var ddlReader = (function () {

    var options = {
        list: [],
        files: [],
        UnZipArchive: '',
        title: '#ddl-comic-title',
        subtitle: '#ddl-comic-subtitle',
        wrap: '#ddl-comic-wrap',
        main: '#ddl-comic-main',
        item: '#ddl-comic-item',
        menu: '#ddl-comic-menu',
        totalPage: '#ddl-comic-total-page',//当前页数
        currentPage: '#ddl-comic-current-page', //总页数
        settingBox: '#ddl-comic-reader-setting', //目录
        sceneBox: '#ddl-comic-reader-scene',

        sceneBtn: '#ddl-comic-reader-scene-btn',
        lightBtn: '#ddl-comic-light-btn',
        settingBtn: '#ddl-comic-setting-btn',
        restoreBtn: '#ddl-comic-restore-btn',
        playBtn: '#ddl-comic-play-btn',
        exitBtn: '#ddl-comic-exit-btn',
        launchBtn: '#ddl-comic-launch',
        uploadBtn: '#ddl-reader-upload-file-btn',
        bugBtn: '#ddl-comic-reader-bug-btn',


        area: '#ddl-comic-reader-area',
        setting: { zoom: 100,space: 25},
        bodyScrollTop: 0,
    }

    /**
     * 初始化
     * @method init
     */
    var init = function () {
        $(options.uploadBtn).change(function(){operateFile(this.files);});
        $(options.sceneBtn).click(function (evnet) { event.stopPropagation(); switchScene($(this));});
        $(options.sceneBox).find('li').click(function () {selectScene($(this));});
        $(options.bugBtn).click(function () {
           tipsBox.alert('请将Bug问题发送到:326311036@qq.com邮箱,谢谢');
        });

        $('body').click( function (event) {
            event.stopPropagation();
            $(options.sceneBox).find('em').hide();
            $(options.sceneBox).find('ul').hide();
            $('#ddl-comic-reader-scene-btn').attr('data-status',0);
        });

        cookie.get('reader_scene',function (data) {
            var object = data.reader_scene || { title: 'Zip压缩包',type: 'zip'};
            setScene(object.title,object.type);
        });

        loadSetting();
        listenDropEvent();
        listenAreaDropEvent();
    }

    /**
     * 开启场景
     * @method switchScene
     * @param {Object} _this 当前对象
     */
    var switchScene = function (_this) {
        var status = _this.attr('data-status');
        showScene(status);
    }

    /**
     * 显示场景
     * @method showScene
     * @param {Number} status 状态
     */
    var showScene = function (status) {
        if(status == 1) {
            $(options.sceneBox).find('em').hide();
            $(options.sceneBox).find('ul').hide();
            $('#ddl-comic-reader-scene-btn').attr('data-status',0);
            return false;
        }

        $(options.sceneBox).find('em').show();
        $(options.sceneBox).find('ul').show();
        $('#ddl-comic-reader-scene-btn').attr('data-status',1);
    }

    /**
     * 选择场景
     * @method selectScene
     * @param {Object} _this 当前对象
     */
    var selectScene = function (_this) {
        var title = _this.html();
        var type = _this.attr('data-type');

        setScene(title,type);
        showScene(0);
    }

    /**
     * 设置场景
     * @method setScene
     * @param {String} title
     * @param {String} type
     */
    var setScene = function (title,type) {
        $(options.uploadBtn).removeAttr('accept').removeAttr('multiple').removeAttr('webkitdirectory');
        switch (type) {
            case 'zip':
                $(options.uploadBtn).attr('accept','application/zip');
                $(options.uploadBtn).parent().find('span').html('选择 Zip压缩文件');
                break;
            case 'file':
                $(options.uploadBtn).attr('webkitdirectory','webkitdirectory');
                $(options.uploadBtn).parent().find('span').html('选择 纯文件夹');
                break;
            case 'image':
                $(options.uploadBtn).attr('multiple','multiple');
                $(options.uploadBtn).parent().find('span').html('选择 批量图片');
                break;
        }

        $('#ddl-comic-reader-scene-title').html(title);
        cookie.set('reader_scene',{ title: title, type: type});
    }

    /**
     * 操作文件
     * @method operateFile
     * @param {Object} files 上传文件对象
     */
    var operateFile = function (files) {
        if (files.length == 0) {
            tipsBox.alert('请选择上传的文件');
            $(options.uploadBtn).val('');
            return false;
        }

        switch (files[0].type) {
            case 'application/zip':
                loadZipFile(files[0]);
                break;
            default:
                loadFiles(files);
                break;
        }
    }

    /**
     * 加载漫画
     * @method loadComic
     * @param {String} index 索引号
     */
    var loadComic = function (index) {
        if(options.list[index].status) {
            return false;
        }

        var _this = $(options.item + '-'+index);
        var type = _this.attr('data-type');
        var data = {
            url : _this.attr('data-url'),
            type: _this.attr('data-type'),
            index: index
        }

        options.list[index].status = true;
        switch(type) {
            case 'drop':
                options.UnZipArchive.loadImage(index,data.url);
                break;
            case 'file':
                loadSingleImage(index,data.url);
                break;
        }
    }



    /**
     * 监听区域拖动事件
     * @method listenAreaDropEvent
     */
    var listenAreaDropEvent = function () {
        var id = base.ltrim(options.area,'#');
        var box = document.getElementById(id); //拖拽区域
        box.addEventListener("drop", function(e) {
            e.preventDefault(); //取消默认浏览器拖拽效果
            var files = e.dataTransfer.files; //获取文件对象
            operateFile(files);
        }, false);
    }


    /**
     * 加载Zip文件
     * @method loadZipFile
     * @param {Object} file 文件
     */
    var loadZipFile = function (file) {
        options.UnZipArchive = new UnZipArchive( file );
        options.UnZipArchive.getData( function() {
            var list = [];
            var arr = options.UnZipArchive.getEntries(); //获取所以的文件和文件夹列表;
            for(var i in arr) {
                if(isImage(arr[i])) {
                    list.push({url: arr[i], type: 'drop', status: false, mode: 'load'});
                }
            }
            var data = {
                list: list,
                total: base.getDataLength(list),
                title: (file.name).replace('.zip',''),
                space: 'margin-bottom: '+options.setting.space+'px;'
            }

            run(data);
        });
    }

    /**
     * 加载文件
     * @method loadFiles
     */
    var loadFiles = function (files) {
        var list = [],title = '';
        options.files = files;
        for(var i in files) {
            console.log('files[i].type',files[i].type,files[i].name,files[i].webkitRelativePath);
            if(isImage(files[i].name)) {
                list.push({url: i, type: 'file', status: false, mode: 'load'});
            }
        }

        if(base.getDataLength(list) > 0) {
            var value = options.files[list[0].url].webkitRelativePath;
            var end = (value).indexOf('/');
            title = (value).substr(0,end);
        }

        title = title || '图片预览';

        console.log('list',list);
        var data = {
            list: list,
            total: base.getDataLength(list),
            title: title,
            space: 'margin-bottom: '+options.setting.space+'px;'
        }

        run(data);
    }

    /**
     * 是否图片
     * @method isImage
     * @param {String} str
     * @param {String} split 分隔符
     * @return {boolean}
     */
    var isImage = function(str,split) {
        if(base.isEmptyValue(str)) {
            return false;
        }

        var split = split || '.';
        var index = str.lastIndexOf(split);
        var ext = str.substr(index+1);
        return ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'tiff'].indexOf(ext.toLowerCase()) !== -1;
    }

    /**
     * 运行图片模式
     * @method run
     * @param {Object} data
     */
    var run = function (data) {
        console.log('data',data);

        if(data.total == 0) {
            tipsBox.alert('无法匹配到相对应的文件');
            $(options.uploadBtn).val('');
            return false;
        }

        var template = 'reader/index';
        tpl.renderTpl('body',template,data,3);
        options.list = data.list;

        launch();
        loadComic(0);
        bindEvent();
        loadSkin();
        listenScroll();
    }

    /**
     * 加载皮肤外观
     * @method loadSkin
     */
    var loadSkin = function () {
        cookie.get('reader_light',function (data) {
            var light = data.reader_light || 'on';
            if(light == 'on') {
                setLight('off');
            } else {
                setLight('on');
            }
        });
    }

    /**
     * 加载设置
     * @method loadSetting
     */
    var loadSetting = function () {
        cookie.get('reader_setting',function (data) {
            var setting = data.reader_setting || {};
            var space = setting.space || 25;
            var zoom = setting.zoom || 100;
            options.setting = { zoom: zoom, space: space};
        });
    }

    /**
     * 绑定事件
     * @method bindEvent
     */
    var bindEvent = function () {
        $(options.playBtn).click(play);
        $(options.exitBtn).click(exit);
        $(options.launchBtn).click(launch);
        $(options.settingBtn).click(switchSetting);
        $(options.lightBtn).click(function () {
            var status = $(this).attr('data-status');
            setLight(status);
        });

        $(options.restoreBtn).click(restore);

        $(options.wrap).click(function (event) {
            event.stopPropagation();
            $(options.settingBtn).parent().removeClass('active');
            $(options.settingBtn).parent().find('i.ddl-comic-right-icon').hide();
            $(options.settingBtn).parent().find('div.ddl-comic-reader-setting').hide();
            $(options.settingBtn).attr('data-status',0);
        });

        $(options.settingBox).click(function (event) {
            event.stopPropagation();
        });
    }

    /**
     * 启动
     * @method launch
     */
    var launch = function () {
        var height = config.getOptions('height');
        options.bodyScrollTop = $(document).scrollTop();
        $('html,body').animate({'scrollTop':0},0);

        $('body').css('height',height);
        $('body').css('overflow','hidden');
        $('body').css('display','none');
        $(options.main).css('height',height - 75);
        $(options.wrap).show();
        $(options.menu).show();
        $(options.launchBtn).hide();
    }

    /**
     * 设置灯状态
     * @method setLight
     * @param {String} status
     */
    var setLight = function (status) {
        if(status == 'on') {
            cookie.set('reader_light','off');
            $(options.wrap).find('div.ddl-comic-inner').addClass('ddl-close-light-inner');
            $(options.menu).find('ul.ddl-comic-menu-inner').addClass('ddl-close-light-inner');
            $(options.lightBtn).addClass('icon-off-light').removeClass('icon-on-light');
            $(options.lightBtn).attr('data-status','off');
            return false;
        }

        cookie.set('reader_light','on');
        $(options.wrap).find('div.ddl-comic-inner').removeClass('ddl-close-light-inner');
        $(options.menu).find('ul.ddl-comic-menu-inner').removeClass('ddl-close-light-inner');
        $(options.lightBtn).removeClass('icon-off-light').addClass('icon-on-light');
        $(options.lightBtn).attr('data-status','on');

    }

    /**
     * 退出
     * @method exit
     */
    var exit = function () {
        var height = config.getOptions('height');
        var style = $('body').attr('style');
        style = style.replace('height: '+height+'px;','');
        style = style.replace('overflow: hidden;','');
        style = style.replace('display: none;','');

        $('body').attr('style',base.trim(style));
        $(options.wrap).hide();
        $(options.menu).hide();
        $(options.launchBtn).show();
        $('html,body').animate({'scrollTop':options.bodyScrollTop},0);
    }

    /**
     * 打开设置
     * @method switchSetting
     */
    var switchSetting = function () {
        var status = $(options.settingBtn).attr('data-status');

        if(status == 1) {
            $(options.settingBtn).parent().removeClass('active');
            $(options.settingBtn).parent().find('i.ddl-comic-right-icon').hide();
            $(options.settingBtn).parent().find('div.ddl-comic-reader-setting').hide();
            $(options.settingBtn).attr('data-status',0);
            return false;
        }

        $(options.settingBtn).parent().addClass('active');
        $(options.settingBtn).parent().find('i.ddl-comic-right-icon').show();
        $(options.settingBtn).parent().find('div.ddl-comic-reader-setting').show();
        $(options.settingBtn).attr('data-status',1);

        cookie.get('reader_setting',function (data) {
            var setting = data.reader_setting || {};
            var zoom = setting.zoom || 100;
            var space = setting.space || 25;

            powerange('ddl-comic-reader-zoom',zoom,20,300);
            powerange('ddl-comic-reader-space',space,0,100);
        });
    }

    /**
     * 加载图片
     * @method loadImage
     * @param {Number} index 索引
     * @param {String} src 图片地址
     */
    var loadImage = function (index,src) {
        var _this  = $(options.item + '-'+index);
        var img = new Image();
        img.src = src;
        img.onload = function() {
            options.list[index].width = img.width;
            options.list[index].height = img.height;
            $(options.item + '-' + index).css('width', img.width * options.setting.zoom / 100);
            $(options.item + '-' + index).css('height', img.height * options.setting.zoom / 100);
            var html = '<div class="ddl-comic-image-main"><img src="' + src + '" draggable="false"/></div>';
            _this.html(html);
        }

        img.onerror = function () {
            options.list[index].status = false;
            console.log('图片加载失败',index);
        }
    }

    /**
     * 加载单个文件
     * @method loadSingleImage
     * @param {Number} index 图片显示序号
     * @param {Number} key 文件数组关键字
     */
    var loadSingleImage = function (index,key) {
        var file = options.files[key];

        console.log('files',options.files);
        console.log(key,options.files[key]);
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function(){
            loadImage(index,this.result);
        }
    }

    /**
     * 监听拖动事件
     * @method listenDropEvent
     */
    var listenDropEvent = function () {
        $(document).on({
            dragleave:function(e){      //拖离
                e.preventDefault();
            },
            drop:function(e){           //拖后放
                e.preventDefault();
            },
            dragenter:function(e){      //拖进
                e.preventDefault();
            },
            dragover:function(e){       //拖来拖去
                e.preventDefault();
            }
        });
    }


    /**
     * 监听滚动条事件
     * @method listenScroll
     */
    var listenScroll = function () {
        var beforeScrollTop = $(options.main).scrollTop();

        $(options.main).scroll(function() {
            var total = parseInt($(options.totalPage).html()) - 1;
            var scrollTop = $(this).scrollTop();
            var direct = scrollTop - beforeScrollTop;
            if(direct > 0 && scrollTop >= 52) {
                $('.ddl-comic-top').css('background','transparent');
                $('.ddl-comic-top').css('box-shadow','inherit');
                $('.ddl-comic-top').css('z-index','2');
                $('.ddl-comic-top div.ddl-comic-title').hide();
                $('#ddl-comic-exit-btn').hide();
            }

            if(direct < 0 && scrollTop > 52) {
                $('.ddl-comic-top').removeAttr('style');
                $('.ddl-comic-top div.ddl-comic-title').show();
                $('#ddl-comic-exit-btn').show();
            }

            beforeScrollTop = scrollTop;

            for(var i in options.list) {
                if(options.list[i].status == false) {
                    var id = options.item + '-' + i;
                    var top = $(id).offset().top;
                    if(scrollTop > top + 100){
                        loadComic(i);
                    }
                }
            }

            for(var i in options.list) {
                var next = (parseInt(i)+1) > total ? total : (parseInt(i)+1);
                var topId = document.getElementById('ddl-comic-item-'+i);
                var bottomId = document.getElementById('ddl-comic-item-'+next);
                var topPosition = getElementPagePosition(topId);
                var bottomPostion = getElementPagePosition(bottomId);
                var top = topPosition.y;
                var bottom = bottomPostion.y;
                var offset = parseInt( $(window).height() * 1 / 2);

                if(scrollTop >= top && scrollTop < bottom - offset && i != total ){
                    $(options.currentPage).html(parseInt(i)+1);
                    break;
                }

                if(scrollTop >= bottom - offset && i == total ){
                    $(options.currentPage).html(parseInt(i)+1);
                    break;
                }
            }
        });
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
        });
    }

    /**
     * 还原设置
     * @method restore
     */
    var restore = function () {
        var setting = { zoom: 100, space: 25 };
        powerange('ddl-comic-reader-zoom',setting.zoom,20,300);
        setTimeout(function () { powerange('ddl-comic-reader-space',setting.space,0,100);},10);
    }

    /**
     * 设置
     * @method settings
     * @param {String} key 键名
     * @param {String} value 键值
     */
    var settings = function (key,value) {
        options.setting[key] = value;
        switch (key) {
            case 'zoom':
                for(var i in options.list) {
                    $(options.item + '-' + i).css('width', options.list[i].width * options.setting.zoom / 100);
                    $(options.item + '-' + i).css('height', options.list[i].height * options.setting.zoom / 100);
                }
                break;
            case 'space':
                $('.ddl-comic-image-box').css('margin-bottom',value+'px');
                break;
        }
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
     * 滑动模块
     * @method powerange
     * @param {String} key 关键字
     * @param {Number} start 默认值
     * @param {Number} min 最小值
     * @param {Number} max 最大值
     */
    var powerange = function (key,start,min,max) {
        tpl.renderTpl('#'+key+'-box', 'reader/powerange', {'key': key});
        var selector = document.querySelector('#'+key);
        document.getElementById(key+'-value').innerHTML = start;
        new Powerange(selector, { key: key, start: start, min: min, max: max, hideRange: true, callback: function () {
            var _this = this;
            var value = $('#'+this.key).val();
            document.getElementById(this.key+'-value').innerHTML = value;

            cookie.get('reader_setting',function (data) {
                var setting = data.reader_setting || {};
                var key = (_this.key).replace('ddl-comic-reader-','');
                setting[key] = value;
                settings(key,value);
            });
        }});
    }

    return {
        init: init,
        loadImage: loadImage
    }
})();


