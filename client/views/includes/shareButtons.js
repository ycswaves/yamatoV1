Template.wechatPopup.rendered = function(){
	//分享到微信
	$('#wechatModalContent').qrcode({
		text: Router.current().originalUrl
	});
}

Template.shareButtons.rendered = function(){
	//分享到微博
	$('body').off('click','#weiboBtn').on('click','#weiboBtn',function(){
		CommonHelper.popupWindow('http://service.weibo.com/share/share.php?url='+Router.current().originalUrl, '分享至新浪微博', 200, 200);
	})
	//分享到人人
	$('body').off('click','#renrenBtn').on('click','#renrenBtn',function(){
		CommonHelper.popupWindow('http://widget.renren.com/dialog/share?resourceUrl='+Router.current().originalUrl, '分享至人人', 200, 200);
	})
	//分享到Facebook
	$('body').off('click','#facebookBtn').on('click','#facebookBtn',function(){
		CommonHelper.popupWindow('https://www.facebook.com/sharer/sharer.php?u='+Router.current().originalUrl, '分享至Facebook', 600, 300);
	})
}

