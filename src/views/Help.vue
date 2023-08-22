<template>
  <section>
    <div >
    <b-card no-body >
      <b-tabs pills card vertical  style="height: 100vh;">
        <b-tab title="Criar um Novo Assunto (Baralho) " active >
          <b-card-text style="padding: 30px;">
            <p>
              Se você está acostumado com outras ferramentas, pode ter se deparado com termos diferentes, como baralho, termo, etc.
              Neste contexto, um "assunto" se refere a um conjunto de flashcards, ou seja, a uma matéria de estudos.
            </p>
            <ul>
              <li>Para criar um novo assunto, siga estas etapas simples:
                <ol>
                  <li>Clique no ícone de usuário no canto superior direito da tela. Esse ícone é representado por um círculo contendo a primeira letra do seu nome de usuário.</li>
                  <li>Em seguida, clique em "Meus Cartões".</li>
                  <li>Na tela seguinte, logo abaixo de "Assuntos de Estudo", clique em "NOVO ASSUNTO". Isso abrirá um campo de texto onde você deve inserir o nome do assunto desejado.</li>
                  <li>Após escrever o nome do assunto, clique no ícone de salvar que fica ao lado do campo de texto.</li>
                  <li>Para voltar a tela principal, no menu, clique em 'Simples Flashcards' </li>
                </ol>
              </li>
              <li>Ótimo! Agora você criou um novo assunto. O próximo passo é começar a criar novos flashcards.</li>
            </ul>
          </b-card-text>
        </b-tab>
        <b-tab title="Criar novos Flashcards">
          <b-card-text>
            <p></p>
            <ul>
              <li>Para criar novos Flashcards, siga estas etapas simples:
                <ol>
                  <li>Clique no ícone de usuário no canto superior direito da tela. Esse ícone é representado por um círculo contendo a primeira letra do seu nome de usuário.</li>
                  <li>Em seguida, clique em "Meus Cartões".</li>
                  <li>Na tela seguinte, escolha o 'Assunto' ao qual você deseja adicionar flashcards.</li>
                  <li>Será exibida uma nova tela com o nome do assunto que você selecionou. Clique em "NOVO FLASHCARD".</li>
                  <li>Uma barra lateral aparecerá no canto esquerdo da tela, contendo campos de texto para criar a frente e o verso do flashcard. Complete os campos conforme sua preferência e clique no botão de salvar.</li>
                  <li>Repita o processo até concluir o seu conjunto de flashcards para este assunto.</li>
                  <li>Para voltar a tela principal, no menu, clique em 'Simples Flashcards' </li>
                </ol>
              </li>
              <li>Excelente! Agora você criou novos flashcards e está pronto para começar a estudá-los.</li>
            </ul>
          </b-card-text>
        </b-tab>
        <b-tab title="Modificar um Assunto">
          <b-card-text>
            <p></p>
            <ul>
              <li>Para modifcar o nome do assunto, siga estas etapas simples:
                <ol>
                  <li>Clique no ícone de usuário localizado no canto superior direito da tela. Esse ícone é representado por um círculo contendo a primeira letra do seu nome de usuário.</li>
                  <li>Em seguida, clique em "Meus Cartões".</li>
                  <li>Na próxima tela, clique sobre o 'Assunto' ao qual você deseja modificar.</li>
                  <li>Uma nova tela será exibida com o nome do assunto que você selecionou, juntamente com uma lista de cartões contendo informações sobre os flashcards. Clique no nome do Assunto no canto esquerdo da tela.</li>
                  <li>Ao clicar sobre o Assunto será ativado um campo de texto,tornando possível a edição </li>
                  <li>Faça a edição conforme você desejar </li>
                  <li>Clique no ícone 'salvar' que fica ao lado do nome do assunto, no canto direito da tela.</li>
                  <li>Para voltar a tela principal, no menu, clique em 'Simples Flashcards' </li>
                </ol>
              </li>
              <li>Pronto! Você conseguiu modificar o nome do assunto.</li>
            </ul>
          </b-card-text>
        </b-tab>
        <b-tab title="Modificar Flashcards">
          <b-card-text>
            <p></p>
            <ul>
              <li>Para fazer modificações nos Flashcards, siga estas etapas simples:
                <ol>
                  <li>Clique no ícone de usuário localizado no canto superior direito da tela. Esse ícone é representado por um círculo contendo a primeira letra do seu nome de usuário.</li>
                  <li>Em seguida, clique em "Meus Cartões".</li>
                  <li>Na próxima tela, escolha o 'Assunto' ao qual você deseja realizar modificações em algum flashcard.</li>
                  <li>Uma nova tela será exibida com o nome do assunto que você selecionou, juntamente com uma lista de cartões. Cada cartão contém o conteúdo de um flashcard. No canto superior direito de cada cartão, existem dois ícones: uma lixeira e uma caneta. Clique no ícone da caneta.</li>
                  <li>Uma barra lateral aparecerá no canto esquerdo da tela, apresentando campos de texto para que você possa modificar a frente e o verso do flashcard. Faça as alterações nos campos de acordo com sua preferência e clique no botão de salvar.</li>
                </ol>
              </li>
              <li>Pronto! No entanto, é importante observar que ao fazer alterações em um flashcard, toda a progressão das etapas de estudo será apagada  para este flashcard, e você precisará recomeçar as repetições espaçadas desde o início.</li>
            </ul>
          </b-card-text>
        </b-tab>
        <b-tab title="Verificar dadas de revisões">
          <b-card-text>
            Revisões
          </b-card-text>
        </b-tab>

      </b-tabs>
    </b-card>
  </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      helpItems: [
        {title: 'Como criar um novo assunto de estudo', content: 'Instruções para criar um novo assunto...'},
        {title: 'Como criar um flashcard', content: 'Passos para criar um novo flashcard...'},
        {
          title: 'Como verificar as datas das próximas revisões',
          content: 'Como visualizar as datas das próximas revisões...'
        },
        {title: 'Como exportar baralhos (Assuntos)', content: 'Instruções para exportar seus baralhos...'},
      ],
      selectedHelpItem: null,
    };
  },
  methods: {
    showHelpContent(item) {
      this.selectedHelpItem = item;
    },
  },
};
</script>

<style scoped>
.col {border: 1px solid gray}
section{
  padding-top: 77px;
  padding-bottom: 100px;
  max-height: 100vh;
}
/* Estilos do seu índice de ajuda aqui */
</style>