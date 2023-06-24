import axios from "axios"

export default class UserController {

  constructor() { }

  static baseUrl = "http://localhost:3000/leitor"



  static login = async (login) => {
    let res;
    console.log(login)
    try {
      res = await axios.post(this.baseUrl + "/login", login).then((res) => {
        if(res.data == "") return res.status(400)
        return res
      })
    } catch (error) {
      return false
    }
    return res
  }




}