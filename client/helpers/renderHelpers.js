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

    var select = $('select');
    if (select.length > 0 ){
        select.selectpicker({
            container:'body',
            style:'btn-white'
        });
    }

    var bootstrapSelect = $('.bootstrap-select');
    var dropDownMenu = $('.dropdown-menu').not('.bs');

    bootstrapSelect.on('shown.bs.dropdown', function () {
        dropDownMenu.removeClass('animation-fade-out');
        dropDownMenu.addClass('animation-fade-in');
    });

    bootstrapSelect.on('hide.bs.dropdown', function () {
        dropDownMenu.removeClass('animation-fade-in');
        dropDownMenu.addClass('animation-fade-out');
    });

    bootstrapSelect.on('hidden.bs.dropdown', function () {
        var _this = $(this);
        $(_this).addClass('open');
        setTimeout(function() {
            $(_this).removeClass('open');
        }, 100);
    });
}
