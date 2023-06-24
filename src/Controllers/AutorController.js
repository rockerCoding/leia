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
    try {
      res = await axios.post(this.baseUrl + "/cadastrar", livro).then((res) => {
        return true
      })
    } catch (error) {
      return false
    }
    return res
  }

  static deletarAutor = async (autor) => {
    return await axios.delete(this.baseUrl + "/deletar", {data: autor}).then((res) => {
      return true
    }).catch(erro => {
      return false
    })
  }


}