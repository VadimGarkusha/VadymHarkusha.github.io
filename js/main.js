//FORM 
function ActiveName(i) {
    //var name = document.getElementsByClassName("Myform")[0];
    var labelF = document.getElementsByClassName("label-form")[i];
    var input = document.getElementsByClassName("Myform")[i];

    labelF.style.color = "#66cc99";
    input.setAttribute("style", "width: 100%; border: none!important; border-bottom: 2px solid #66cc99!important; border-radius: 0px!important; padding-left: 10px; padding-bottom: 5px; margin-top: 5px;");
}

function NonActiveName(i) {
    var input = document.getElementsByClassName("Myform")[i];
    if (input.value == "") {
        document.getElementsByClassName("label-form")[i].style.color = "rgb(82, 89, 107)";
    } else {
        document.getElementsByClassName("label-form")[i].style.color = "#eee";
    }
    input.setAttribute("style", "width: 100%; border: none!important; border-bottom: 2px solid white!important; border-radius: 0px!important; padding-left: 10px; padding-bottom: 5px; margin-top: 5px;");
}


//NAVIGATION
class StickyNavigation {

    constructor() {
        this.currentId = null;
        this.currentTab = null;
        this.tabContainerHeight = 70;
        this.lastScroll = 0;
        let self = this;
        $('.et-hero-tab').click(function() {
            self.onTabClick(event, $(this));
        });
        $(window).scroll(() => { this.onScroll(); });
        $(window).resize(() => { this.onResize(); });
    }

    onTabClick(event, element) {
        event.preventDefault();
        let scrollTop = $(element.attr('href')).offset().top - this.tabContainerHeight + 1;
        $('html, body').animate({ scrollTop: scrollTop }, 600);
    }

    onScroll() {
        this.checkHeaderPosition();
        this.findCurrentTabSelector();
        this.lastScroll = $(window).scrollTop();
    }

    onResize() {
        if (this.currentId) {
            this.setSliderCss();
        }
    }

    checkHeaderPosition() {
        const headerHeight = 50;
        if ($(window).scrollTop() > headerHeight) {
            $('.et-header').addClass('et-header--scrolled');
            $('.arrow').addClass('visible-arrow');
        } else {
            $('.et-header').removeClass('et-header--scrolled');
            $('.arrow').removeClass('visible-arrow');
        }
        let offset = ($('.et-hero-tabs').offset().top + $('.et-hero-tabs').height() - this.tabContainerHeight) - headerHeight;
        if ($(window).scrollTop() > this.lastScroll && $(window).scrollTop() > offset) {
            $('.et-header').addClass('et-header--move-up');
            $('.et-hero-tabs-container').removeClass('et-hero-tabs-container--top-first');
            $('.et-hero-tabs-container').addClass('et-hero-tabs-container--top-second');
        } else if ($(window).scrollTop() < this.lastScroll && $(window).scrollTop() > offset) {
            $('.et-header').removeClass('et-header--move-up');
            $('.et-hero-tabs-container').removeClass('et-hero-tabs-container--top-second');
            $('.et-hero-tabs-container').addClass('et-hero-tabs-container--top-first');
        } else {
            $('.et-header').removeClass('et-header--move-up');
            $('.et-hero-tabs-container').removeClass('et-hero-tabs-container--top-first');
            $('.et-hero-tabs-container').removeClass('et-hero-tabs-container--top-second');
        }
    }

    findCurrentTabSelector(element) {
        let newCurrentId;
        let newCurrentTab;
        let self = this;
        $('.et-hero-tab').each(function() {
            let id = $(this).attr('href');
            let offsetTop = $(id).offset().top - self.tabContainerHeight;
            let offsetBottom = $(id).offset().top + $(id).height() - self.tabContainerHeight;
            if ($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
                newCurrentId = id;
                newCurrentTab = $(this);
            }
        });
        if (this.currentId != newCurrentId || this.currentId === null) {
            this.currentId = newCurrentId;
            this.currentTab = newCurrentTab;
            this.setSliderCss();
        }
    }

    setSliderCss() {
        let width = 0;
        let left = 0;
        if (this.currentTab) {
            width = this.currentTab.css('width');
            left = this.currentTab.offset().left;
        }
        $('.et-hero-tab-slider').css('width', width);
        $('.et-hero-tab-slider').css('left', left);
    }

}

new StickyNavigation();
