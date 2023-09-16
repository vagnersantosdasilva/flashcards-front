<template>
  <section>
    <div v-if="!isMobile">
      <b-card no-body >
        <b-tabs pills card vertical  style="height: 100vh;" >
          <b-tab v-for="(item,index) in itens" :key="index" :title="item.titulo" >
            <b-card-text style="padding: 30px;" >
              <div v-html="item.texto"></div>
            </b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
    <div v-else>
      <div class="accordion" role="tablist">
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-1 variant="primary">{{ itens[0].titulo }}</b-button>
          </b-card-header>
          <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text><div v-html="itens[0].texto"></div></b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-2 variant="primary">{{ itens[1].titulo }}</b-button>
          </b-card-header>
          <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text><div v-html="itens[1].texto"></div></b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-3 variant="primary">{{ itens[2].titulo }}</b-button>
          </b-card-header>
          <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text><div v-html="itens[2].texto"></div></b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-4 variant="primary">{{ itens[3].titulo }}</b-button>
          </b-card-header>
          <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text><div v-html="itens[3].texto"></div></b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-5 variant="primary">{{ itens[4].titulo }}</b-button>
          </b-card-header>
          <b-collapse id="accordion-5" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text><div v-html="itens[4].texto"></div></b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>


      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isMobile: false,
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
      itens:[
        {
          titulo:'Criar um novo Assunto',
          texto:'<p>\n' +
              '              Se você está acostumado com outras ferramentas, pode ter se deparado com termos diferentes, como baralho, termo, etc.\n' +
              '              Neste contexto, um "assunto" se refere a um conjunto de flashcards, ou seja, a uma matéria de estudos.\n' +
              '            </p>\n' +
              '            <ul>\n' +
              '              <li>Para criar um novo assunto, siga estas etapas simples:\n' +
              '                <ol>\n' +
              '                  <li>Clique no ícone de usuário no canto superior direito da tela. Esse ícone é representado por um círculo contendo a primeira letra do seu nome de usuário.</li>\n' +
              '                  <li>Em seguida, clique em "Meus Cartões".</li>\n' +
              '                  <li>Na tela seguinte, logo abaixo de "Assuntos de Estudo", clique em "NOVO ASSUNTO". Isso abrirá um campo de texto onde você deve inserir o nome do assunto desejado.</li>\n' +
              '                  <li>Após escrever o nome do assunto, clique no ícone de salvar que fica ao lado do campo de texto.</li>\n' +
              '                  <li>Para voltar a tela principal, no menu, clique em \'Simples Flashcards\' </li>\n' +
              '                </ol>\n' +
              '              </li>\n' +
              '              <li>Ótimo! Agora você criou um novo assunto. O próximo passo é começar a criar novos flashcards.</li>\n' +
              '            </ul>'
        },
        {
          titulo:'Criar Novos Flashcards',
          texto:'<p></p>\n' +
              '      <ul>\n' +
              '        <li>Para criar novos Flashcards, siga estas etapas simples:\n' +
              '          <ol>\n' +
              '            <li>Clique no ícone de usuário no canto superior direito da tela. Esse ícone é representado por um círculo contendo a primeira letra do seu nome de usuário.</li>\n' +
              '            <li>Em seguida, clique em "Meus Cartões".</li>\n' +
              '            <li>Na tela seguinte, escolha o \'Assunto\' ao qual você deseja adicionar flashcards.</li>\n' +
              '            <li>Será exibida uma nova tela com o nome do assunto que você selecionou. Clique em "NOVO FLASHCARD".</li>\n' +
              '            <li>Uma barra lateral aparecerá no canto esquerdo da tela, contendo campos de texto para criar a frente e o verso do flashcard. Complete os campos conforme sua preferência e clique no botão de salvar.</li>\n' +
              '            <li>Repita o processo até concluir o seu conjunto de flashcards para este assunto.</li>\n' +
              '            <li>Para voltar a tela principal, no menu, clique em \'Simples Flashcards\' </li>\n' +
              '          </ol>\n' +
              '        </li>\n' +
              '        <li>Excelente! Agora você criou novos flashcards e está pronto para começar a estudá-los.</li>\n' +
              '      </ul>'
        },
        {
          titulo:'Modificar um Assunto',
          texto:'<p></p>\n' +
              '      <ul>\n' +
              '        <li>Para modifcar o nome do assunto, siga estas etapas simples:\n' +
              '          <ol>\n' +
              '            <li>Clique no ícone de usuário localizado no canto superior direito da tela. Esse ícone é representado por um círculo contendo a primeira letra do seu nome de usuário.</li>\n' +
              '            <li>Em seguida, clique em "Meus Cartões".</li>\n' +
              '            <li>Na próxima tela, clique sobre o \'Assunto\' ao qual você deseja modificar.</li>\n' +
              '            <li>Uma nova tela será exibida com o nome do assunto que você selecionou, juntamente com uma lista de cartões contendo primaryrmações sobre os flashcards. Clique no nome do Assunto no canto esquerdo da tela.</li>\n' +
              '            <li>Ao clicar sobre o Assunto será ativado um campo de texto,tornando possível a edição </li>\n' +
              '            <li>Faça a edição conforme você desejar </li>\n' +
              '            <li>Clique no ícone \'salvar\' que fica ao lado do nome do assunto, no canto direito da tela.</li>\n' +
              '            <li>Para voltar a tela principal, no menu, clique em \'Simples Flashcards\' </li>\n' +
              '          </ol>\n' +
              '        </li>\n' +
              '        <li>Pronto! Você conseguiu modificar o nome do assunto.</li>\n' +
              '      </ul>'
        },
        {
          titulo:'Modificar Flashcards',
          texto:'<p></p>\n' +
              '      <ul>\n' +
              '        <li>Para fazer modificações nos Flashcards, siga estas etapas simples:\n' +
              '          <ol>\n' +
              '            <li>Clique no ícone de usuário localizado no canto superior direito da tela. Esse ícone é representado por um círculo contendo a primeira letra do seu nome de usuário.</li>\n' +
              '            <li>Em seguida, clique em "Meus Cartões".</li>\n' +
              '            <li>Na próxima tela, escolha o \'Assunto\' ao qual você deseja realizar modificações em algum flashcard.</li>\n' +
              '            <li>Uma nova tela será exibida com o nome do assunto que você selecionou, juntamente com uma lista de cartões. Cada cartão contém o conteúdo de um flashcard. No canto superior direito de cada cartão, existem dois ícones: uma lixeira e uma caneta. Clique no ícone da caneta.</li>\n' +
              '            <li>Uma barra lateral aparecerá no canto esquerdo da tela, apresentando campos de texto para que você possa modificar a frente e o verso do flashcard. Faça as alterações nos campos de acordo com sua preferência e clique no botão de salvar.</li>\n' +
              '          </ol>\n' +
              '        </li>\n' +
              '        <li>Pronto! No entanto, é importante observar que ao fazer alterações em um flashcard, toda a progressão das etapas de estudo será apagada  para este flashcard, e você precisará recomeçar as repetições espaçadas desde o início.</li>\n' +
              '      </ul>'
        },
        {
          titulo:'Verificar Datas de Revisões',
          texto:'<p></p>\n' +
              '      <ul>\n' +
              '        <li>Para verificar datas de revisões de um assunto siga estas etapas simples:\n' +
              '          <ol>\n' +
              '            <li>Clique no ícone de usuário localizado no canto superior direito da tela. Esse ícone é representado por um círculo contendo a primeira letra do seu nome de usuário.</li>\n' +
              '            <li>Em seguida, clique em "Meus Cartões".</li>\n' +
              '            <li>Na próxima tela, escolha o \'Assunto\' ao qual você deseja verificar datas de próximas revisões.</li>\n' +
              '            <li>Uma nova tela será exibida com o nome do assunto que você selecionou,juntamente com uma lista de cartões.Clique no ícone de calendário no canto superior direito da tela.</li>\n' +
              '            <li>Um banner será exibido contendo a lista de datas de liberção de suas próximas revisões</li>\n' +
              '          </ol>\n' +
              '        </li>\n' +
              '        <li>Pronto! </li>\n' +
              '      </ul>'
        },
      ]
    };
  },
  methods: {
    showHelpContent(item) {
      this.selectedHelpItem = item;
    },
    checkMobile() {
      // Verificar o tamanho da tela e atualizar isMobile
      this.isMobile = window.innerWidth <= 768; // 768px é um ponto de quebra comum para dispositivos móveis
    },
  },
  created() {
    // Verificar se o usuário está em um dispositivo móvel
    this.checkMobile();
    // Adicionar um ouvinte de redimensionamento para verificar continuamente
    window.addEventListener('resize', this.checkMobile);
  },
  beforeDestroy() {
    // Remover o ouvinte de redimensionamento ao destruir o componente
    window.removeEventListener('resize', this.checkMobile);
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

@media screen and (max-width: 960px) {
  .btn{
    width: 100%;
    border-radius: 0;
  }
}
</style>




