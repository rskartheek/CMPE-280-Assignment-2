/**
 * Created by SaiKartheek on 3/6/2016.
 */


var passwordValidated,confirmPasswordValidated,ssnValidated,phoneNumberValidated,cardNumberValidated;
var lengthVal=true,ucaseValue=true,lcaseValue=true,scaseValue=true;


function createForm(){
if(passwordValidated && confirmPasswordValidated && ssnValidated && phoneNumberValidated && cardNumberValidated){
   var registrationObject = populateRegistrationObject();
    if(typeof(Storage) !== "undefined") {
       //Set Item in localstorage
        localStorage.setItem('registrationLocalObject', JSON.stringify(registrationObject));
        alert("Saved in Local Storage");
        var form = document.getElementsByName('registrationForm')[0];
        form.reset();
        document.getElementById("passwordValidation").style.display="none";
        location.reload();
    } else {
        console.log("Sorry! No Web Storage support..");
    }
}else{
    document.getElementById("mainHelper").style.display="block";
    return false;
}

}

function populateRegistrationObject(){
    var registrationObject={};
    registrationObject.firstName=document.getElementById("firstNameInput").value;
    registrationObject.lastName=document.getElementById("lastNameInput").value;
    registrationObject.emailID=document.getElementById("emailInput").value;
    registrationObject.password=document.getElementById("passwordInput").value;
    registrationObject.dob=document.getElementById("dateInput").value;
    registrationObject.dobWithTime=document.getElementById("dateTimeInput").value+ document.getElementById("dateTime").value;
    registrationObject.localDOB = document.getElementById("dateTimeLocalInput").value;
    registrationObject.SSN=document.getElementById("ssnInputField").value;
    registrationObject.phone=document.getElementById("phoneInput").value;
    registrationObject.cardNumber=document.getElementById("creditCardInput").value;
    registrationObject.securityQuesAnswer=document.getElementById("securityQuesValue").value;
    return registrationObject
}
function validateEmail(value){
    var emailRegex= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!emailRegex.test(value)){
        document.getElementById("emailIdValidation").style.display="block";
    }else{
        document.getElementById("emailIdValidation").style.display="none";

    }

}


function validatePassword(value){
    var valid=false;

    var uppercaseRegex = /^((.*[A-Z]){3,})/;
    var lowerCaseRegex = /^((.*[a-z]){2,})/;
    var specialCharacterRegex =/(?:[^`!@#$%^&*\-_=+'\/.,]*[`!@#$%^&*\-_=+'\/.,]){2}/;
    var elem = document.getElementById("lengthHelper");
    var upperCaseElem = document.getElementById("caseHelper");
    var lowerCaseElem = document.getElementById("lowerCase");
    var specialCaseElem = document.getElementById("specialCase");

    document.getElementById("passwordValidation").style.display="block";

    value.length >= 8 ? (elem.className="helper",valid = true,changeMeter(lengthVal),lengthVal=false):
        (elem.className="errorClass",valid=false);
    uppercaseRegex.test(value) ? (upperCaseElem.className = "helper",valid = true,changeMeter(ucaseValue),ucaseValue=false) :
        (upperCaseElem.className="errorClass",valid=false);
    lowerCaseRegex.test(value) ? (lowerCaseElem.className = "helper",valid = true,changeMeter(lcaseValue),lcaseValue=false ):
        (lowerCaseElem.className="errorClass",valid=false);
    specialCharacterRegex.test(value) ? (specialCaseElem.className = "helper",valid=true,changeMeter(scaseValue),scaseValue=false) :
        (specialCaseElem.className="errorClass",valid=false);
        if(valid){
            passwordValidated = true;
        }

}

function changeMeter(bool){
    var meterElem = document.getElementById("passwordMeter");
    if(bool){
        meterElem.value= meterElem.value + 25;
    }

}

function confirmPassword(value){
var passwordInput = document.getElementById("passwordInput").value;
    if(passwordInput === value){document.getElementById("confirmPasswordHelper").style.display="none";confirmPasswordValidated=true;}
    else{document.getElementById("confirmPasswordHelper").style.display="block"}
}

function validateSSN(value){
    value = parseInt(value);
    var numberCase = /^((.*[0-9]){9,})/;
    var elem = document.getElementById("ssnInput");
    numberCase.test(value) ? (elem.style.display = "none",ssnValidated=true) : elem.style.display = "block";
}

function validatePhoneNumber(value){
    value=parseInt(value);
    var numberCase = /^((.*[0-9]){10,})/;
    var elem=document.getElementById("phoneNumberValidation");
    numberCase.test(value) ? (elem.style.display="none",phoneNumberValidated=true) :
       elem.style.display="block";

}

function validateCardNumber(value){
    value.match(/\d/g).length===16 ? (document.getElementById("cardNumberValidation").style.display="none",cardNumberValidated=true) :
        document.getElementById("cardNumberValidation").style.display="block";

}

function captureSecurityQues(value){
    document.getElementById("securityQuesValue").value=value;
}

function showSecurityField(){
    document.getElementById("securityQuesWrapper").style.display="block";
}

function getLocalObject(){
    var storedObject= localStorage.getItem("registrationLocalObject");

    document.getElementById("localObject").innerHTML = storedObject;
}