import axios from "axios"

export default class EmprestimoController {

  constructor() { }

  static baseUrl = "http://localhost:3000/emprestimo"

  static getBuscarPorId = async (id) => {
    return await axios.get(this.baseUrl + "/" + id).then((res) => {
      return res.data
    }).catch(erro => {
      return erro.response.data
    })
  }

  static getBuscarTodos = async () => {
    return await axios.get(this.baseUrl + "/obterTodos").then((res) => {
      return res.data
    }).catch(erro => {
      return erro.response.data
    })
  }

  static novoEmprestimo = async (emprestimo) => {
    let res;
    res = await axios.post(this.baseUrl + "/cadastrar", emprestimo).then((res) => {
      return true
    }).catch(error => {
      return false
    })
    return res
  }

  static cancelarEmprestimo = async (emprestimo) => {
    let res;
    res = await axios.put(this.baseUrl + "/cancelar", emprestimo).then((res) => {
      return res.status == 200 ? true : false
    }).catch(error => {
      return false
    })
    return res
  }


}