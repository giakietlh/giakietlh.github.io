$(document).ready(function () {
    $('#home-js').addClass('hover-sidebar')
    const createHarvestPage = $('.harvest-wrapper')
    const mainPage = $('.app')
    const fileManagerPage = $('.file-manager-wrapper')
    createHarvestPage.hide()
    fileManagerPage.hide()



    $('#harvest-js').click(function () {
        createHarvestPage.show()
        mainPage.hide()
        fileManagerPage.hide()
        $('#harvest-js').addClass('hover-sidebar')
        $('#home-js').removeClass('hover-sidebar')
        $('#file-manager').removeClass('hover-sidebar')
    })

    $('#home-js').click(function () {
        mainPage.show()
        createHarvestPage.hide()
        fileManagerPage.hide()
        $('#home-js').addClass('hover-sidebar')
        $('#harvest-js').removeClass('hover-sidebar')
        $('#file-manager').removeClass('hover-sidebar')
        reset()
    })


    $('#file-manager').click(function () {
        fileManagerPage.show()
        mainPage.hide()
        createHarvestPage.hide()
        $('#file-manager').addClass('hover-sidebar')
        $('#home-js').removeClass('hover-sidebar')
        $('#harvest-js').removeClass('hover-sidebar')
    })

    const input = $('input')


    // console.log(input)
    $('#harvest-btn').click(function () {
        // Date start
        var dateStart = new Date($('#date-start-input').val());
        var dayStart = dateStart.getDate();
        var monthStart = dateStart.getMonth() + 1;
        var yearStart = dateStart.getFullYear();
        var fullDateStart = [dayStart, monthStart, yearStart].join('/');

        // DateEnd
        var dateEnd = new Date($('#date-end-input').val());
        var dayEnd = dateEnd.getDate();
        var monthEnd = dateEnd.getMonth() + 1;
        var yearEnd = dateEnd.getFullYear();
        var fullDateEnd = [dayEnd, monthEnd, yearEnd].join('/');

        // console.log( input.eq(1).val())
        // console.log( input.eq(2).val())
        // console.log(fullDateStart)
        // console.log(fullDateEnd)


        if (input.eq(1).val() != "" && input.eq(2).val() != "" && fullDateStart != 'NaN/NaN/NaN' && fullDateEnd != 'NaN/NaN/NaN' && dateEnd.getTime() > dateStart.getTime()) {
            $.ajax({
                // Post dữ liệu
                url: "https://6268ffffaa65b5d23e7df656.mockapi.io/ThienAnform",
                method: "POST",
                data: {
                    name: input.eq(1).val(),
                    quantity: input.eq(2).val(),
                    start: fullDateStart,
                    end: fullDateEnd
                },
                success: function (result) {
                    console.log(result);
                    text2.text('Your data has been submitted successfully');
                    showToast();
                    successToast();
                    reset();
                },
                err: function () {
                    text2.text('Post Error')
                    showToast()
                    errToast()
                }
            })
        }

        if (fullDateStart == 'NaN/NaN/NaN' && input.eq(1).val() != "" && input.eq(2).val() != "" && fullDateEnd != 'NaN/NaN/NaN') {
            const currDate = new Date()
            let yearCurr = currDate.getFullYear();
            let monthCurr = currDate.getMonth() + 1;
            let dayCurr = currDate.getDate();
            let fullDayCurr = [dayCurr, monthCurr, yearCurr].join('/');
            if (currDate.getTime < dateEnd.getTime()) {
                $.ajax({
                    // Post dữ liệu
                    url: "https://6268ffffaa65b5d23e7df656.mockapi.io/ThienAnform",
                    type: "POST",
                    data: {
                        name: input.eq(1).val(),
                        quantity: input.eq(2).val(),
                        start: fullDayCurr,
                        end: fullDateEnd
                    },
                    success: function (result) {
                        console.log(result);
                        text2.text('Your data has been submitted successfully')
                        showToast();
                        successToast()
                        reset()
                    },
                    err: function () {
                        text2.text('Post Error')
                        showToast()
                        errToast()
                    }
                })
            }

            else {
                text2.text('The start date must be before the end date!')
                showToast();
                errToast()
            }
        }

        if (dateEnd.getTime() < dateStart.getTime()) {
            text2.text('The start date must be before the end date!')
            showToast();
            errToast()
        }

        else if (input.eq(1).val() == "" || input.eq(2).val() == "" || fullDateEnd == 'NaN/NaN/NaN') {
            text2.text('Please fill out this field')
            showToast();
            errToast()
        }
    })

    reset = () => {
        input.eq(1).val('')
        input.eq(2).val('')
        $('#date-start-input').val('')
        $('#date-end-input').val('')
    }
})

