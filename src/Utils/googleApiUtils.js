import axios from "axios"

const cheerio = require('cheerio');

export const pesquisarImagemNoGoogle = async (pesquisa) => {

  const pesquisaFormatada = pesquisa.replace(' ', '+');
  const url = `https://www.google.com/search?q=${pesquisaFormatada}&tbm=isch`;

  try {
    const resposta = await axios.get(url);
    const $ = cheerio.load(resposta.data);
    const linksImagens = [];

    $('img').each((index, elemento) => {
      const link = $(elemento).attr('src');
      if (link) {
        linksImagens.push(link);
      }
    });

    if (linksImagens.length > 0) {
      return linksImagens;
    } else {
      return null; // Nenhuma imagem encontrada
    }
  } catch (erro) {
    console.log('Erro na busca de imagem:', erro);
    return null;
  }

}