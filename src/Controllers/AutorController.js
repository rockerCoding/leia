import axios from "axios"

export default class AutorController {

  constructor() { }

  static baseUrl = "http://localhost:3000/autor"

  static getBuscarTodos = async () => {
    return await axios.get(this.baseUrl + "/obterTodos").then((res) => {
      return res.data
    }).catch(erro => {
      return erro.response.data
    })
  }

  static novoAutor = async (livro) => {
    let res;
    console.log(livro)
    try {
      res = await axios.post(this.baseUrl + "/cadastrar", livro).then((res) => {
        console.log(res)
        return res
      })
    } catch (error) {

    }
    return res
  }


}