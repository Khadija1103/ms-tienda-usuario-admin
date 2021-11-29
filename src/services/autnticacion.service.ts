import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {repository } from'@loopback/repository';
import {usuarioadmin} from'../models';
import {usuarioadminRepository} from '../repositories';
import {Llaves} from '../config/llaves';
const generator = require("password-generator");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");




@injectable({scope: BindingScope.TRANSIENT})
export class AutnticacionService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */



    GenerarClave(){
      let clave = generator(8,false);
      return clave;
    }

    CifrarClave(clave:string){
    let claveCifrada = cryptoJS.MD5(clave).toString();
      return claveCifrada;
    }

    identificarUsuario(usuarioadmin: string, clave:string){
      try{
        let p = this.usuarioadminRepository.findOne({where:{correo:usuarioadmin, clave: clave}});
        if(p){
          return p;
        }
        return false;
      }catch{
        return false;
      }
    }

      GenerarTokenJWT(usuarioadmin: usuarioadmin){
        let token = jwt.sign({
          data: usuarioadmin.id,
          correo: usuarioadmin.correo,
          nombre: usuarioadmin.nombre + "  " usuarioadmin.apellidos
          }

        },
        Llaves.claveJWT);
        return token;
      }

      ValidarTokenJWT(token: string){
        try{
          let datos = jwt.verify(token,llaves.claveJWT);
          return datos;
        }catch{
          return false;
        }
      }

    }



