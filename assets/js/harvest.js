$(document).ready(function () {
    loadHarvest()
    $('#harvest-js').addClass('hover-sidebar')
    //  Get
    function loadHarvest() {
        $.ajax(
            {
                url: "https://6268ffffaa65b5d23e7df656.mockapi.io/ThienAnform",
                type: "GET",
                dataType: "json"
            }
        ).done(function (result) {
            var tableBody = $('#tblHarvest tbody');
            tableBody.empty();
            $(result).each(function (index, item) {
                tableBody.append(
                    '<tr>    <td>' + item.stt + '</td>' +
                    '<td>' + item.name + '</td>' +
                    '<td>' + item.quantity + '</td>' +
                    '<td>' + " ' ' " + '</td>' +
                    '<td>' + item.start + '</td>' +
                    '<td>' + item.end + '</td>' +
                    '<td>' + item.state + '</td>' +
                    '<td> <button class="edit-btn harvest-edit" onclick=editHarvest(' + item.stt + ')> <i class="fa-solid fa-pen-to-square icon-edit"></i> </button> </td>' +
                    '<td> <button class="delete-btn" onclick=deleteHarvest(' + item.stt + ')><i class="fa-solid fa-trash-can icon-delete"></i> </button> </td> </tr>',
                )
            })
        })
    }

    // Delete
    deleteHarvest = function (idHarvest) {
        $.ajax({
            url: `https://6268ffffaa65b5d23e7df656.mockapi.io/ThienAnform/${idHarvest}`,
            method: "DELETE",
            success: function () {
                text2.text('Delete Successfully')
                showToast();
                successToast();
                loadHarvest();
            },
            error: function () {
                text2.text('Delete Error')
                showToast();
                errToast()
            }
        })
    }

    const inputHarvest = $('.text-harvest')
    // console.log(inputHarvest)
    // PUT
    const backBtn = $('.back-btn')


    editHarvest = function (idHarvest) {
       editPageHarvestShow()
        $.ajax({
            url: `https://6268ffffaa65b5d23e7df656.mockapi.io/ThienAnform/${idHarvest}`,
            method: "GET",
            success: function (result) {
                inputHarvest.eq(0).val(result.name)
                inputHarvest.eq(1).val(result.quantity)
            },
            error: function (error) {
                text2.text('Error!')
                showToast()
                errToast()
            }
        })

        $('.harvest-btn').click(function () {
            if (inputHarvest.eq(2).val() != '' && inputHarvest.eq(3).val() != '') {
                // Date start
                var dateStartHarvest = new Date(inputHarvest.eq(2).val());
                var dayStartHarvest = dateStartHarvest.getDate();
                var monthStartHarvest = dateStartHarvest.getMonth() + 1;
                var yearStart = dateStartHarvest.getFullYear();
                var fulldateStartHarvest = [dayStartHarvest, monthStartHarvest, yearStart].join('/');

                // dateEndHarvest
                var dateEndHarvest = new Date(inputHarvest.eq(3).val());
                var dayEndHarvest = dateEndHarvest.getDate();
                var monthEndHarvest = dateEndHarvest.getMonth() + 1;
                var yearEnd = dateEndHarvest.getFullYear();
                var fulldateEndHarvest = [dayEndHarvest, monthEndHarvest, yearEnd].join('/');
                if(dateEndHarvest.getTime() > dateStartHarvest.getTime()){
                    $.ajax({
                        url: `https://6268ffffaa65b5d23e7df656.mockapi.io/ThienAnform/${idHarvest}`,
                        method: "PUT",
                        data: {
                            name: inputHarvest.eq(0).val(),
                            quantity: inputHarvest.eq(1).val(),
                            start: fulldateStartHarvest,
                            end: fulldateEndHarvest
                        },
                        success: function (result) {
                            text2.text('Edit Harvest Info Successfully')
                            showToast();
                            successToast();
                            harvestPageShow();
                            loadHarvest();
                        },
    
                        error: function () {
                            text2.text('Edit Error!')
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

            else {
                text2.text('Please update the start and end dates!')
                showToast()
                errToast()
            }
        })
    }

    resetInfo = function () {
        inputHarvest.eq(1).attr('placeholder', 'UserName')
        inputHarvest.eq(2).attr('placeholder', 'Email')
        inputHarvest.eq(3).attr('type', 'text')
        inputHarvest.eq(4).attr('type', 'text')
        inputHarvest.eq(5).show()
    }
})