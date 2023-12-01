import {AbstractControl} from "@angular/forms";

 export function PasswordValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const password = control.get('password');
  const confirmationPassword = control.get('confirmationPassword');

  if(password?.pristine || confirmationPassword?.pristine){
    return null
  }
  return password && confirmationPassword && password.value != confirmationPassword.value ?
    {'misMatch': true} : null;
}
