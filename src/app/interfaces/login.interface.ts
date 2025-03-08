export interface HttpLoginResponse {
  token: string,
  expiracion: number,
  rol: string
}

export interface RegistroUsuario {
  username: string,
  password: string,
  nombre: string,
  email: string,
  rol: string
}

export interface LoginUsuario {
  username: string,
  password: string
}