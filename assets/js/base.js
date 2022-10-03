// Sidebar
var btn = $('#btn');
var sidebar = $('.sidebar')
var searchBtn = $('#search-js')
var body = $('.content')

btn.click(function () {
    sidebar.toggleClass('active')
    body.toggleClass('to-left-right')
})

searchBtn.click(function () {
    sidebar.toggleClass('active')
    body.toggleClass('to-left-right')

})

// Toast
// Toast
const toast = $('.noti')
const closeIcon = $('.close')
const progress = $('.progress')
const text1 = $('.text-2')
const text2 = $('.text-1')

closeIcon.click(function () {
    toast.removeClass('active')
    progress.removeClass('active')
    setTimeout(() => {
        progress.removeClass('active')
    }, 300)
})

showToast = function () {
    toast.addClass('active')
    progress.addClass('active')
    setTimeout(() => {
        toast.removeClass('active')
    }, 5000)

    setTimeout(() => {
        progress.removeClass('active')
    }, 5300)
}

successToast = function(){
    text1.text('Successful!')
    $(':root').css('--success-color', '#27b46f')
    $('.noti-content i').removeClass('fa-solid fa-xmark')
    $('.noti-content i').addClass('fa-solid fa-check')
}


errToast = function(){
    text1.text('Error!')
    $(':root').css('--success-color', '#A61C35')
    $('.noti-content i').removeClass('fa-solid fa-check')
    $('.noti-content i').addClass('fa-solid fa-xmark')
}