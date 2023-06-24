import axios from "axios"

export default class ObraController {

  constructor(){}

  static baseUrl = "http://localhost:3000/obra"

  static getBuscarTodos = async () => {
    let res;
    try {
      res = await axios.get(this.baseUrl + "/obterTodos").then((res) => {
        console.log(res)
        retu
        return res.data
      })  
    } catch (error) {
    }

    return res 
  }

  static novaObra = async (livro) => {

    //return await axios.post(this.baseUrl + "/cadastrar", livro).then(res => res.status == 200)

    


    try {
      await axios.post(this.baseUrl + "/cadastrar", livro).then((res) => {
        //console.log(res.status == 200 ? true : false)
        return res.status == 200 ? true : false
      })
    } catch (error) {
      return ("Erro em")      
    }
  }


}