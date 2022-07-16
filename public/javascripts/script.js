$(() => {
    $(document).ready(() => {
        if ($(window).width() < 421) {
            $.ajax({
                type: 'GET', 
                url: '/get-card',
                data: {userIndex: 1},
                success: (response) => {
                    $('#mobileTableContentDiv').html(response);
                }
            })
        }
        $('#mobileMenuDiv').toggle();
        $('#menuBackdrop').toggle();
        $.ajax({
            type: 'GET', 
            url: '/get-users',
            success: (response) => {
                $('#tableListContainer').html(response);
            }
        })
    });
    $("#signUpButton").on("click", () => {
        let name = $("#nameInput").val();
        let email = $("#emailInput").val();
        let birthDate = $("#birthDateInput").val();
        let telephone = $("#telephoneInput").val();
        let userData = {
            userName: name,
            userEmail: email,
            userBirthDate: birthDate,
            userTelephone: telephone
        };
        if ($(window).width() < 421) {
            $.ajax({
                type: 'POST', 
                url: '/add-card',
                data: userData,
                success: (response) => {
                    $('#mobileTableContentDiv').html(response);
                }
            })
        } else {
            $.ajax({
                type: 'POST', 
                url: '/add-users',
                data: userData,
                success: (response) => {
                    $('#tableListContainer').html(response);
                }
            })
        }
    });
    let isMenuOpen = false;
    $('#menuHamburguer').on("click", () => {
       isMenuOpen = toggleMenu(isMenuOpen); 
    });
    $('.mobileMenuItem').on("click", () => {
        isMenuOpen = toggleMenu(isMenuOpen);
    });
    $('.mobileTableIndex').on("click", (event) => {
        $('.mobileTableIndex').removeClass('selectedMobileButton');
        let target = $(event.target);
        if (target.attr('class') == 'mobileIndexNumber') {
            target = target.parent();
        }
        target.addClass('selectedMobileButton');
        $.ajax({
            type: 'GET', 
            url: '/get-card',
            data: {userIndex: event.target.innerText},
            success: (response) => {
                $('#mobileTableContentDiv').html(response);
            }
        })
    });
})

function toggleMenu(isMenuOpen) {
    if (isMenuOpen) {
        $('#menuHamburguer').attr('src', '../assets/icons/hamburguer.svg');  
    } else {
        $('#menuHamburguer').attr('src', '../assets/icons/hamburguer-aberto0.svg');
    }
    isMenuOpen = !isMenuOpen;
    $('#mobileMenuDiv').toggle('slow');
    $('#menuBackdrop').toggle();
    return isMenuOpen;
}