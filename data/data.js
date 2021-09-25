/*Archivo encargado de contener logica de negocio*/
import { createClient } from '@supabase/supabase-js';

export default class Usuario {    

    _email;
    _password;
    _supabase;
    
    constructor(_email = String.empty, _password = String.empty){
        this._email = _email;
        this._password = _password;
        this._supabase = createClient('https://gpbgkbmdqgrllxvlvied.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMjU0MTE2MywiZXhwIjoxOTQ4MTE3MTYzfQ.JOi4i6QPjBYYGkKs1VDfYXm0JjctwBwJK1SM2xdPHTg');
    }

    // Metodo encargado de registrar un usuario en BD
    async Register(){
        
        var email = this._email;
        var password = this._password;
        const { user, session, error } = await this._supabase.auth.signUp({
            email: email,
            password: password,
        });

        //Validaciones de respuesta
        if(user != null)
            return {
                'status':200,
                'data': user
            };
        else if(error != null)
            return {
                'status':500,
                'message':error.message
            };
        else
            return {
                'status':401,
                'message':'Error no previsto'
            };
    }


    // Metodo encargado de realizar login de Usuario en BD
    async Login(){
        
        var email = this._email;
        var password = this._password;
        const { user, session, error } = await this._supabase.auth.signIn({
            email: email,
            password: password,
        });

        //Validaciones de respuesta
        if(user != null)
            return {
                'status':200,
                'data': user
            };
        else if(error != null)
            return {
                'status':500,
                'message':error.message
            };
        else
            return {
                'status':401,
                'message':'Error no previsto'
            };
    }

    // Metodo encargado de realizar logout de Usuario en BD
    async Logout(){
        const { error } = await this._supabase.auth.signOut();
        //Validaciones de respuesta
        if(error == null)
            return {
                'status':200,
                'message':'Sesión cerrada'
            };
        else
            return {
                'status':500,
                'message':error.message
            };
    }

    // Metodo encargado de obtener información de Usuario autenticado
    GetUsuario(){
        const user = this._supabase.auth.user()
        //Validaciones de respuesta
        if(user != null)
            return {
                'status':200,
                'data':user
            };
        else
            return {
                'status':500,
                'message':'No hay usuarios autenticados'
            };
    }

    setToken(response) {
        if (response.data.confirmation_sent_at && !response.data.access_token) {
            return ('Se ha enviado un mensaje de verificacion por parte del servidor al correo '+response.user.email)
        } else {
            return ('Logged in as ' + response.user.email)
        }
    }

    errorMessage(response) {
        return ('Error ' + response.error.message);
    }
}