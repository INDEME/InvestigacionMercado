import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ToastController } from 'ionic-angular';
import { FormBuilder} from '@angular/forms';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  tabBarElement: any;
  email: string;
  contrasena: string;
  contrasena2: string;
  nombre: string;

  resultado: any;

  constructor(public navCtrl: NavController , private toastCtrl:ToastController, public http:Http,  
    public formBuilder: FormBuilder) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }
 
  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }
 
  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }
  takeMeBack() {
    this.navCtrl.parent.select(0);
  }

  loginCuenta(){
    this.navCtrl.push(LoginPage);
  }

  register(){
    if(this.email != null && this.nombre != null && this.contrasena != null && this.contrasena2 != null){
        this.http.post('https://apex.oracle.com/pls/apex/indeme/INcreate/', {
          'correo': this.email,
          'nombres': this.nombre,
          'contrasena': this.contrasena
        }).map((response:Response)=>{
          return response.json();
        }).subscribe(
          ()=> {console.log("Success");},
          (error)=>{
            console.log('erro');
          }
        )
  }
    else{
    this.presentToast();
  }
}


  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Rellena todos los campos de manera correcta.' ,
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }


}