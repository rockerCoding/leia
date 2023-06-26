import axios from "axios"

export default class ObraController {

  constructor(){}

  static baseUrl = "http://localhost:3000/obra"

  static getBuscarTodos = async () => {
    let res;
    try {
      res = await axios.get(this.baseUrl + "/obterTodos").then((res) => {
        return res.data
      })  
    } catch (error) {
    }

    return res 
  }

  static getBuscarTodosDisponiveis = async () => {
    let res;
    try {
      res = await axios.get(this.baseUrl + "/obterTodos/disponivel").then((res) => {
        return res.data
      })  
    } catch (error) {
    }

    return res 
  }

  static novaObra = async (livro) => {
    let res = false
    try {
      res = await axios.post(this.baseUrl + "/cadastrar", livro).then((res) => {
        return res.status === 200 ? true : false 
      })
    } catch (error) {
      return ("Erro em cadastrar nova obra")      
    }
    return res
  }

  static deletarObra = async (obra) => {
    return await axios.delete(this.baseUrl + "/deletar", {data: obra}).then((res) => {
      return true
    }).catch(erro => {
      return false
    })
  }

}