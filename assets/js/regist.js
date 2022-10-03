
$(document).ready(function () {
  // Xem mật khẩu
  var passInput = $(".input");
  var eyeOpen = $(".eye-open");
  var eyeClose = $(".eye-close");
  eyeOpen.eq(0).click(function () {
    eyeOpen.eq(0).addClass("hidden");
    eyeClose.eq(0).removeClass("hidden");
    passInput.eq(0).attr("type", "password");
  });

  eyeClose.eq(0).click(function () {
    eyeOpen.eq(0).removeClass("hidden");
    eyeClose.eq(0).addClass("hidden");
    passInput.eq(0).attr("type", "text");
  });

  eyeOpen.eq(1).click(function () {
    eyeOpen.eq(1).addClass("hidden");
    eyeClose.eq(1).removeClass("hidden");
    passInput.eq(1).attr("type", "password");
  });

  eyeClose.eq(1).click(function () {
    eyeOpen.eq(1).removeClass("hidden");
    eyeClose.eq(1).addClass("hidden");
    passInput.eq(1).attr("type", "text");
  });


  // Set avatar
  const avatarUser = $('.avatar');




  $('.avatar-choosen').change(function (e) {
    const file = e.target.files[0]
    avatarUser.attr('src', URL.createObjectURL(file))

  })

  // $('select').change( function () {
  //   //ways to retrieve selected option and text outside handler
  //   console.log('Changed option text: ' + $(this).find('option').filter(':selected').text());
  // });

  
  //   load thông tin
  var btn = $("#log-in");
  var input = $("input");
  
  btn.click(function () {

    if ((input.eq(0).val() != "") && (input.eq(1).val() != "") && (input.eq(2).val() != "") && (input.eq(3).val() != "")&& (avatarUser.attr('src') != "") && (input.eq(2).val() === input.eq(3).val()) && (input.eq(2).val().length > 4)) {
      $.ajax({
        // Post dữ liệu
        url: "https://6268ffffaa65b5d23e7df656.mockapi.io/ThienAntable",
        type: "POST",
        data: {
          name: input.eq(0).val(),
          email: input.eq(1).val(),
          pass: input.eq(2).val(),
          authorities: $('select').find('option').filter(':selected').text(),
          avatar: avatarUser.attr('src')
        },
      }).done(function (result) {

        console.log(result);
        window.location.href = "App.html" 
      });

    }



      // Check login
    if (input.eq(2).val() != input.eq(3).val() && input.eq(3).val() != "" && input.eq(2).val().length >= 4) {
      // alert('Please enter the correct password')
      text2.text('Please enter the correct password')
      showToast();
      errToast();
    }

    if (input.eq(2).val().length <= 4 && input.eq(2).val() != "") {
      text2.text('Password must be longer than 4 characters')
      showToast();
      errToast();
    }

    else{
      text2.text('Please fill out this field')
      showToast();
      errToast();
    }
  });


});


