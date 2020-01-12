
document.getElementById("signup-login-button").addEventListener("click", e => 
{
	e.preventDefault();
	document.getElementById("login").style.left = "-100vw";
	document.getElementById("signup").style.left = "0";
	document.getElementById("signup").className = "right-shift";
	document.getElementById("login").className = "right-shift";
});

let loginPage = document.querySelector('#login')

login.addEventListener('click', e =>{
	
	if(e.target.className === 'sign-up'){
		e.preventDefault();
	document.getElementById("login").style.left = "0";
	document.getElementById("signup").style.left = "100vw";
	document.getElementById("login").className = "left-shift";
	document.getElementById("signup").className = "left-shift"
	}
})



let validName = /^([a-zA-Z]{3,})\s([a-zA-Z]{3,})$/
let validEmail = /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9\.-]+)\.([a-zA-Z]{2,3})(.[a-zA-Z]{2})?$/
let pwdComplexity =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
let body = document.querySelector('body');
let name = document.querySelector('#signup-name')
let emails = document.querySelectorAll('input[type="email"]');
let loginPwd = document.querySelectorAll('input[type="password"]')[0]
let signUpPwd = document.querySelectorAll('input[type="password"]')[1];
let errorMessage = document.querySelectorAll('.error-message');
let showOrHide = document.querySelectorAll('#showHide');
let loginEmail = document.querySelectorAll('input[type="email"]')[0];
let signUpEmail = document.querySelectorAll('input[type="email"]')[1];
let signUpName = document.querySelector('#signup-name');
let signUpButton = document.querySelector('#signup-signup-button');
let loginButton = document.querySelector('#login-login-button');


const validUsers = JSON.parse(localStorage.getItem('userData'))||[];
let userCount = localStorage.getItem('count') || 0;
let nameOk = false;
let emailOk = false;
let pwdOk = false;

const dashboard =(name)=>{
let firstname = name.split(' ')[0]

	body.innerHTML = `<div class="navbar">
						<h1>LudyByte</h1>
						<h3><a href="index.html">Logout</a></h3>
						</div>
						<h1 class="text-center">Hello ${firstname}!!</h1>`
}

const addUserInfo =()=>{
	
	validUsers[userCount] = {};
	validUsers[userCount].name = signUpName.value;
	validUsers[userCount].email = signUpEmail.value;
	validUsers[userCount].password = signUpPwd.value;
	
	userCount++;
	localStorage.setItem('userData', JSON.stringify(validUsers))
	localStorage.setItem('count', userCount)
	if (confirm("Welcome On Board! Click OK to proceed to site")) {
		dashboard(signUpName.value);
	  } 
		
}

const userFeedback =(num)=>{
	switch(num){
		case 1:
			errorMessage[2].innerHTML = `<p style="color:red; font-weight:bold;">*Password must contain at a least 1 number, 1 lowercase & 1 uppercase character<p>`;
			break;
		case 2:
			errorMessage[0].innerHTML = `<p style="color:black; font-weight:bold;">Invalid Password</p>`;
			break;
		case 3:
			errorMessage[0].innerHTML = `<p style="color:black; font-weight:bold;">User not found <a style="color:green; cursor: pointer;" class="sign-up" >Sign up?</a></p>`;
			break;
		case 4:
			errorMessage[1].innerHTML = `<p style="color:red; font-weight:bold;">Email address already exists<p>`;
			break;
		case 5:
			errorMessage[1].innerHTML = `<p style="color:red; font-weight:bold;">*Firstname & Lastname should be separated by a space and &#x2265; 3 characters<p>`;
			break;
		case 6:
			errorMessage[1].innerHTML = `<p style="color:red; font-weight:bold;">*Please fill blank field<p>`;
			break;
	}
}



signUpButton.addEventListener('click', (e)=>{
	e.preventDefault()
	let notExisting = true;

	if (!nameOk || !emailOk || !pwdOk) return
	
	if(validUsers.length !== 0){
		validUsers.forEach((validUser)=>{
			if (validUser.email.toLowerCase() === signUpEmail.value.toLowerCase()) {
				notExisting = false;
				userFeedback(4)
			 }
		 })
		 if(notExisting){
			addUserInfo()
				
		 }			
	}else{
		addUserInfo()
		
	}
})

loginButton.addEventListener('click', (e)=>{
	e.preventDefault()
	let userNotFound = true;
	validUsers.forEach((validUser, index)=>{
		if (validUser.email.toLowerCase() === loginEmail.value.toLowerCase()){
			userNotFound = false;
			if(validUser.password === loginPwd.value){
				
				dashboard(validUser.name)
			}else{
				
				userFeedback(2)
			}
		}
	})
	if(userNotFound){
		
		userFeedback(3)
	}
})


const validity = (regx, event) =>{
	let valid = regx.test(event.target.value)
	if(valid){
		event.target.classList.remove('invalid');
		event.target.previousElementSibling.children[0].classList.remove('invalid');
		event.target.previousElementSibling.children[0].style.display = "block";
	}else{
		event.target.classList.add('invalid');
		event.target.previousElementSibling.children[0].classList.add('invalid');
		event.target.previousElementSibling.children[0].style.display = "block";
	}
	
	return valid
}

name.addEventListener('blur', e =>{
	nameOk = validity(validName, e)
	
	if(!nameOk){userFeedback(5)}
})

emails.forEach((email)=>{
	email.addEventListener('blur', e =>{
		emailOk = validity(validEmail, e)
	})
})

signUpPwd.addEventListener('blur', e=>{
	
	pwdOk = validity(pwdComplexity, e)
	if(!pwdOk){userFeedback(1);}
})

showOrHide.forEach((elem)=>{
	elem.addEventListener('click', (e)=>{
		
		let input = e.target.parentElement.nextElementSibling;
		e.target.classList.toggle('view');
		if(input.getAttribute("type") == "password"){
			input.setAttribute("type", "text");
		}else{
			input.setAttribute("type", "password");
		}
	} )
})


