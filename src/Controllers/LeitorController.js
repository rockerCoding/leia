import axios from "axios"

export default class LeitorController {

  constructor(){}

  static baseUrl = "http://localhost:3000/leitor"

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

  /* static novoLivro = async (livro) => {
    let res;
    console.log(livro)
    try {
      res = await axios.post(this.baseUrl + "/leitor/cadastrar", livro).then((res) => {
        return res.data
      })
    } catch (error) {
      
    }
    return res
  } */


}