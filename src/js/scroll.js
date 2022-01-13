$("#genreDropdownMenu").find('a').click(() => {
    let href = $(this).attr("href")
    let anchor = $(`#${href}`).offset()
    $('body').animate({ scrollTop: anchor.top })
    return false
})