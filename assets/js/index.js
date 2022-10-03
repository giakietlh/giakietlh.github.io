

$(document).ready(function () {
    // Get
    loadData();
    function loadData() {
        $.ajax(
            {
                url: "https://6268ffffaa65b5d23e7df656.mockapi.io/ThienAntable",
                type: "GET",
                dataType: "json"
            }
        ).done(function (result) {
            var tableBody = $('#tblInvoice tbody');
            tableBody.empty();
            $(result).each(function (index, item) {
                tableBody.append(
                    '<tr>    <td>' + item.id + '</td>' +
                    '<td>' + item.name + '</td>' +
                    '<td>' + item.email + '</td>' +
                    '<td>' + item.pass + '</td>' +
                    '<td>' + item.avatar + '</td>' +
                    '<td>' + item.authorities + '</td>' +
                    '<td> <button class="edit-btn user-edit-btn" onclick=editData(' + item.stt + ')> <i class="fa-solid fa-pen-to-square icon-edit"></i> </button> </td>' +
                    '<td> <button class="delete-btn" onclick=deleteData(' + item.stt + ')><i class="fa-solid fa-trash-can icon-delete"></i> </button> </td> </tr>',
                )
            })
        })
    };

    // Delete
    deleteData = function (id) {
        $.ajax({
            url: `https://6268ffffaa65b5d23e7df656.mockapi.io/ThienAntable/${id}`,
            method: "DELETE",
            success: function () {
                text2.text('Delete Successfully')
                showToast();
                successToast();
                loadData();
            },
            error: function () {
                text2.text('Delete Error')
                showToast();
                errToast()
            }
        })
    }

    // PUT

    // Page
    const harvestPage = $('#tblHarvest')
    const userPage = $('#tblInvoice')
    const title = $('.content p')
    const editPageUser = $('.main-thienan')
    const editPageHarvest = $('.main-thienan-harvest')
    const backBtn = $('.back-btn')
    // Btn
    const userBtn = $('#user-js')
    const harvestBtn =  $('#harvest-js')
    const editBtn =   $('#edit-js')
    const input = $('.text-user')

    // Logic
    userPage.hide()
    editPageUser.hide()
    editPageHarvest.hide()
    title.text('Harvest Manager')

    editData = function (id) {
       editPageUserShow()
        $.ajax({
            url: `https://6268ffffaa65b5d23e7df656.mockapi.io/ThienAntable/${id}`,
            method: "GET",
            success: function (result) {
                input.eq(0).val(result.name)
                input.eq(1).val(result.email)
                input.eq(2).val(result.pass)
                input.eq(3).val(result.avatar)
                input.eq(4).val(result.authorities)
            },
            error: function (error) {
                text2.text('Edit Error')
                showToast()
                errToast
            }
        })

        $('#log-in').click(function () {
            $.ajax({
                url: `https://6268ffffaa65b5d23e7df656.mockapi.io/ThienAntable/${id}`,
                method: "PUT",
                data: {
                    name: input.eq(0).val(),
                    email: input.eq(1).val(),
                    pass: input.eq(2).val(),
                    avatar: input.eq(3).val(),
                    authorities: input.eq(4).val()
                },
                success: function (result) {
                    text2.text('Edit User Info Successfully')
                    showToast();
                    successToast();
                    userPageShow();
                    loadData();
                    reset();
                },

                error: function () {
                    text2.text('Edit Error!')
                    showToast()
                    errToast()
                }
            })
        })
    }

    userPageShow = function(){
        editPageUser.hide()
        editPageHarvest.hide()
        harvestPage.hide()
        backBtn.hide()
        userPage.show()
        title.show()
        title.text('User Manager')
        userBtn.addClass('hover-sidebar')
        harvestBtn.removeClass('hover-sidebar')
        editBtn.removeClass('hover-sidebar')
    }

    harvestPageShow = function(){
        userPage.hide()
        editPageUser.hide()
        editPageHarvest.hide()
        backBtn.hide()
        title.show()
        title.text('Harvest Manager')
        harvestPage.show()
        harvestBtn.addClass('hover-sidebar')
        editBtn.removeClass('hover-sidebar')
        userBtn.removeClass('hover-sidebar')
    }

    editPageUserShow = ()=>{
        harvestPage.hide()
        userPage.hide()
        editPageHarvest.hide()
        title.hide()
        backBtn.show()
        editPageUser.show()
        editBtn.addClass('hover-sidebar')
        harvestBtn.removeClass('hover-sidebar')
        userBtn.removeClass('hover-sidebar')
    }

    editPageHarvestShow =()=> {
        userPage.hide()
        harvestPage.hide()
        editPageUser.hide()
        title.hide()
        editPageHarvest.show()
        backBtn.show()
        editBtn.addClass('hover-sidebar')
        userBtn.removeClass('hover-sidebar')
        harvestBtn.removeClass('hover-sidebar')
    }

    backBtn.click(function(){
       harvestPageShow()
    })

    userBtn.click(function () {
       userPageShow()
    })

    harvestBtn.click(function(){
       harvestPageShow()
    })


    function reset() {
        input.eq(1).val('')
        input.eq(2).val('')
        input.eq(3).val('')
        input.eq(4).val('')
        input.eq(5).val('')
    }

})