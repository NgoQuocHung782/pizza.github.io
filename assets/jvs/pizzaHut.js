function Validator (selector) {
    var logIn = document.querySelector(selector)
    var inputs = logIn.querySelectorAll('.log-in__user-input')
    
    // Get value from each inputs of form log-in and validation
    inputs.forEach(function (input, index) {
        var inputParent = input.parentElement
        var listClass= inputParent.classList
        
        switch (input.type) {
            case 'checkbox':
                // Check if user don't fill need alert them
                
                input.onblur = function (e) {
                    var checked = checkedResult(e.target.parentElement)

                    function checkedResult(parentElement) {
                        var checkbox = parentElement.querySelector('input[name="condition_agree"]' + ':checked')
                        if (!checkbox) {
                            inputParent.querySelector('.form-message').innerText = `Fill in the blank please`
                            listClass.add('active')    
                        }
                    }
                }
                
                input.oninput = function (e) {
                    var checked = checkedResult(e.target.parentElement)
                    

                    function checkedResult(parentElement) {
                        var checkbox = parentElement.querySelector('input[name="condition_agree"]' + ':checked')
                        
                        if (checkbox === null) {
                            return undefined
                        } else {
                            var result = rules.required(checkbox.value)
                            return result
                        }
                    }

                    if (!checked) {
                        inputParent.querySelector('.form-message').innerText = ''
                        listClass.remove('active')
                    }
                }

                break
            case 'radio':
                break
            default:
                // Event handling
                input.onblur = function (e) {
                    if (e.target.type === 'email') {
                        var inputResult = rules.required(e.target.value)
                        if (!inputResult) {
                            var inputResult = rules.email(e.target.value)
                        }
                    } else {
                        var inputResult = rules.required(e.target.value)
                    }
                    
                    // In the case inputResult = false
                    // Appear the text error message to form
                    if (inputResult) {
                        if (inputResult) {
                            inputParent.querySelector('.form-message').innerText = inputResult
                            listClass.add('active')
                        } else {
                            inputParent.querySelector('.form-message').innerText = ''
                            listClass.remove('active')
                        }
                    }
            
                }

            // If have user put/fill value into input
            // --> Clear the error message
            input.oninput = function (e) {
                var inputResult = rules.required(e.target.value)
                if (!inputResult) {
                   inputParent.querySelector('.form-message').innerText = ''
                   listClass.remove('.active')
                }            
            }

        }
    })

    // Validation each input
    var rules = {
        required: function(value) {
               // Test each input and check if it have value this is valid
               return value.length > 0 ? undefined : 'Please fill in the blank!'
        },
        email: function(value) {
            // With the rules email need validate the data user put inner input is email type data
            var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            // Use method test() to search to weather the data correct is email or not
            return emailRegex.test(value) ? undefined : `Required fill an email please!`
        },
        min: function(value, min) {
            return value.length <= min ? undefined : `Fill least is ${min} words please`
        },
        max: function(value, max) {
            return value.length <= max ? undefined : `Fill most is ${max} words please`
        },
    }
}

// CHANGE INTERFACE FORM TOGGLE BETWEEN LOG-IN AND REGISTER

function AccountForm (logIn, register, headerAccount) {
    var logInForm = document.querySelector(logIn),
    registerForm = document.querySelector(register),
    btnRegister = logInForm.querySelector('.log-in__form-register'),
    btnLogIn = registerForm.querySelector('.register__form-log-in'),
    formGroup = document.querySelector('#form-group')
    
    function accountChangeForm () {
            // Handle event click to change form
        btnRegister.onclick = function (e) {
            // LOGIC: while click btn register. Toggle form from log-in to register form
            logInForm.classList.remove('active')
            registerForm.classList.add('active')
        }

        btnLogIn.onclick = function (e) {
            registerForm.classList.remove('active')
            logInForm.classList.add('active')
        }
    }

    function accountDisplay (headerAccount, formGroup, logInForm, registerForm) {
        var headerAccount = document.querySelector(headerAccount),
        logInLink = headerAccount.querySelector('.header__account-login'),
        registerLink = headerAccount.querySelector('.header__account-register')

        // Handle Event When Click On Account Link
        logInLink.onclick = function (e) {
            formGroup.classList.add('active')
            logInForm.classList.add('active')
        }
        registerLink.onclick = function (e) {
            formGroup.classList.add('active')
            registerForm.classList.add('active')
        }
    }

    
    function accountClose (formGroup, logInForm, registerForm) {
        var closeList = formGroup.querySelectorAll('.log-in__close')
        Array.from(closeList).forEach(function (closeBtn) {
            closeBtn.onclick = function (e) {
                formGroup.classList.remove('active')
                logInForm.classList.remove('active')
                registerForm.classList.remove('active')
            }
        })

        window.onkeydown = function (e) {
            if (e.keyCode === 27) {
                formGroup.classList.remove('active')
                logInForm.classList.remove('active')
                registerForm.classList.remove('active')
            }
        }

    }

    accountDisplay(headerAccount, formGroup, logInForm, registerForm)
    accountChangeForm(logInForm, registerForm)
    accountClose(formGroup, logInForm, registerForm)

}

// SLIDER SECTION
function sliderHandle() {
    
    // SLIDER PART HANDLING
    var slider = document.querySelector('#slider'),
    sliderList = slider.querySelector('.slider__img-list'),
    sliderItems = slider.querySelectorAll('.slider__img-item')

    // Button on Slider
    var prevBtn = slider.querySelector('#prevBtn'),
    nextBtn = slider.querySelector('#nextBtn')

    // Counter and handling
    var counter = 1,
    size = sliderItems[0].clientWidth,
    sizeNegative = -size,
    flexValue = 30,
    loop1 = false

    // Default Interface while log in website
    sliderList.style.transform = "translateX(" + (sizeNegative * counter - flexValue) + "px)"
    
    // AUTO SLIDER MO-DUN
        setInterval(function () {
            sliderList.style.transition = "transform 0.4s ease-in-out"
            counter++
            switch (counter) {
                case 1:
                    flexValue = 30
                    break
                case 2:
                    flexValue = 50
                    break
                case 3:
                    flexValue = 70
                    break
                case 4:
                    flexValue = 90
                    break
                case 5:
                    flexValue = 110
                }
                sliderList.style.transform = "translateX(" + (sizeNegative * counter - flexValue) + "px)"
        }, 2900)

    // Handle event while click Button
    nextBtn.onclick = function (e) {
        if (counter >= sliderItems.length - 1) return
        sliderList.style.transition = "transform 0.4s ease-in-out"
        // Should put operator postfix counter++ after
        // And before we setting value to handle move of slide
        // Cause it will plus the value into counter for each time we click
        counter++
         switch (counter) {
                case 1:
                    flexValue = 30
                    break
                case 2:
                    flexValue = 50
                    break
                case 3:
                    flexValue = 70
                    break
                case 4:
                    flexValue = 90
                    break
                case 5:
                    flexValue = 110
                }
        sliderList.style.transform = "translateX(" + (sizeNegative * counter - flexValue) + "px)"
    }
    prevBtn.onclick = function (e) {
        if (counter <= 0) return
        sliderList.style.transition = "transform 0.4s ease-in-out"
        // Should put operator postfix counter++ after
        // And before we setting value to handle move of slide
        // Cause it will plus the value into counter for each time we click
        counter--
         switch (counter) {
                case 1:
                    flexValue = 30
                    break
                case 2:
                    flexValue = 50
                    break
                case 3:
                    flexValue = 70
                    break
                case 4:
                    flexValue = 90
                    break
                case 5:
                    flexValue = 110
                }
        sliderList.style.transform = "translateX(" + (sizeNegative * counter - flexValue) + "px)"
    }

    // Handling while click to last image
    sliderList.addEventListener('transitionend', function () {
        // With condition if img = last pic. Jump to the last pic without transition effect
        if (sliderItems[counter].id === 'lastClone') {
            sliderList.style.transition = "none"
            counter = sliderItems.length - 2
            flexValue = 110
            sliderList.style.transform = "translateX(" + (sizeNegative * counter - flexValue) + "px)"
        }
        if (sliderItems[counter].id === 'firstClone') {
            sliderList.style.transition = "none"
            counter = sliderItems.length - counter
            flexValue = 30
            sliderList.style.transform = "translateX(" + (sizeNegative * counter - flexValue) + "px)"
        }
    })
}

function promotionHandleSlide() {
    var promotionList = document.querySelector('.product__promotion-list'),
    wrapItems = promotionList.querySelectorAll('.product__promotion-wrap-item'),
    promotionPrevBtn = promotionList.querySelectorAll('.promotion__btn-prev'),
    promotionNextBtn = promotionList.querySelectorAll('.promotion__btn-next')
    
    // Some stuff to support handle slide
    var counterPromotion = 1
    var sizeWrapItem = wrapItems[0].clientWidth,
    sizeNegativeWrapItem = -sizeWrapItem

    // Interface default of promotion layout
    promotionList.style.transform = "translateX(" + (sizeNegativeWrapItem * counterPromotion) + "px)"
    
    // Need listen the event of pair button to handling it
    // Previous button
    promotionPrevBtn.forEach(function (btn, index) {
        btn.onclick = function (e) {
            promotionList.style.transition = "transform 0.4s ease-in-out"
            counterPromotion--
            promotionList.style.transform = "translateX(" + (sizeNegativeWrapItem * counterPromotion) + "px)"
        }
    })

    // Next button
    promotionNextBtn.forEach(function (btn, index) {
        btn.onclick = function (e) {
            promotionList.style.transition = "transform 0.4s ease-in-out"
            counterPromotion++
            promotionList.style.transform = "translateX(" + (sizeNegativeWrapItem * counterPromotion) + "px)"
        }
    })

    // Handling if move on to the last or first img (last image)
    promotionList.addEventListener('transitionend', function () {
        // In case move on last promotion
        console.log(wrapItems[counterPromotion].id)
       if (wrapItems[counterPromotion].id === 'first_promotion') {
           promotionList.style.transition = "none"
           var counterPromotion = wrapItems.length - counterPromotion
           promotionList.style.transform = "translateX("  (sizeNegativeWrapItem * counterPromotion) + "px)"
       }
        // // In case move on first promotion
        // if (counterPromotion == 0) {
        //     promotionList.style.transition = "none"
        //     var counterPromotion = wrapItems.length - counterPromotion
        //     promotionList.style.transform = "translateX(" + (sizeNegativeWrapItem * counterPromotion) + "px)"
        // }
    })
}




promotionHandleSlide()
sliderHandle()
Validator('#form-group')
AccountForm('#log-in', '#register', '.header__account')