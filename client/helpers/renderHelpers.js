render = function(){
    //Scroll to top
    window.scrollTo(0, 0);
    $('.tool-tip').tooltip();

    $('body').on('mouseenter','.editable',function(){
      $(this).find('.symbol').removeClass('hidden');
    })

    $('body').on('mouseleave','.editable',function(){
      $(this).find('.symbol').addClass('hidden');
    })

    //to refresh the i18n in selectpicker
    CommonHelper.refreshSelectpickerLang();
}
