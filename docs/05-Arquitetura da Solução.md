# Arquitetura da Solução

<span style="color:red">Pré-requisitos: <a href="3-Projeto de Interface.md"> Projeto de Interface</a></span>

Definição de como o software é estruturado em termos dos componentes que fazem parte da solução e do ambiente de hospedagem da aplicação.

## Diagrama de componentes

Diagrama que permite a modelagem física de um sistema, através da visão dos seus componentes e relacionamentos entre os mesmos.

Exemplo: 

Os componentes que fazem parte da solução são apresentados na Figura XX.

![Diagrama de Componentes](img/componentes.PNG)
<center>Figura XX - Arquitetura da Solução</center>

A solução implementada conta com os seguintes módulos:
- **Navegador** - Interface básica do sistema  
  - **Páginas Web** - Conjunto de arquivos HTML, CSS, JavaScript e imagens que implementam as funcionalidades do sistema.
   - **Local Storage** - armazenamento mantido no Navegador, onde são implementados bancos de dados baseados em JSON. São eles: 
     - **Artigos** - seções de notícias apresentadas 
      - **Favortitos** - Usuario pode favoritar
     

> **Links Úteis**:
>
> - [Whimsical](https://whimsical.com/)



Usuario entra na home
Abre menu lateral - pode fazer login , cadastrar , ir aos artigos , e ir aos favoritos.
Da tela de cadastro pode fazer login se ja tiver conta.

![Exemplo de UserFlow](img/diagramadcomp.PNG)


## Tecnologias Utilizadas

Visual Studio Code , JS , HTML , CSS, Local Storage.

figura explicando como as tecnologias estão relacionadas ou como uma interação do usuário com o sistema vai ser conduzida, por onde ela passa até retornar uma resposta ao usuário.

![Tecnologia usada](img/tecnologiasrela.PNG)

## Hospedagem

Foi feita utilizando local storage

> **Links Úteis**:
>
> - [Website com GitHub Pages](https://pages.github.com/)
> - [Programação colaborativa com Repl.it](https://repl.it/)
> - [Getting Started with Heroku](https://devcenter.heroku.com/start)
> - [Publicando Seu Site No Heroku](http://pythonclub.com.br/publicando-seu-hello-world-no-heroku.html)
