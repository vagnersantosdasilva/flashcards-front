<template>
    <div class="container">
      <div class="section" style="margin-top: 130px;">
        <h1>Política de Privacidade e Termos de Uso</h1>
        <p><strong>Última atualização:</strong> [19/09/2023]</p>
        <p>Esta Política de Privacidade descreve como o <em>Memo Beam</em>, usa e compartilha informações pessoais quando você utiliza
          nosso serviço. Ao utilizar o Serviço, você concorda com as práticas de privacidade descritas nesta política.
        </p>

        <h2>Coleta de Informações</h2>
        <p><strong>Informações Pessoais:</strong></p>
        <ul>
          <li>No momento do registro, coletamos informações pessoais, como seu nome, endereço de e-mail e outras
            informações de contato.
          </li>
        </ul>

        <p><strong>Informações de Uso:</strong></p>
        <ul>
          <li>Coletamos informações sobre como você utiliza o Serviço, incluindo dados sobre os flashcards criados,
            atividades e interações no aplicativo.
          </li>
        </ul>

        <p><strong>Informações de Pagamento:</strong></p>
        <ul>
          <li>Quando você optar por atualizar para planos pagos, podemos coletar informações de pagamento, como
            informações de cartão de crédito, para processar as transações.
          </li>
        </ul>

        <h2>Uso das Informações</h2>
        <p><strong>Fornecimento do Serviço:</strong></p>
        <ul>
          <li>Usamos as informações coletadas para fornecer, manter e melhorar o Serviço.</li>
        </ul>

        <p><strong>Comunicações:</strong></p>
        <ul>
          <li>Podemos usar seu endereço de e-mail para enviar informações importantes sobre sua conta, atualizações do
            Serviço ou outras comunicações relacionadas ao Serviço.
          </li>
        </ul>

        <p><strong>Análises e Personalização:</strong></p>
        <ul>
          <li>Utilizamos informações para analisar o uso do aplicativo e personalizar sua experiência, incluindo o
            fornecimento de recomendações de estudo.
          </li>
        </ul>

        <p><strong>Publicidade:</strong></p>
        <ul>
          <li>Podemos exibir anúncios em nosso Serviço. Não compartilhamos informações pessoais com anunciantes.</li>
        </ul>

        <h2>Compartilhamento de Informações</h2>
        <p><strong>Com Terceiros:</strong></p>
        <ul>
          <li>Não compartilhamos informações pessoais com terceiros sem seu consentimento, exceto quando exigido por
            lei.
          </li>
        </ul>

        <h2>Sua Responsabilidade</h2>
        <p><strong>Conteúdo dos Flashcards:</strong></p>
        <ul>
          <li>Você é responsável pelo conteúdo criado em seus flashcards, incluindo imagens e textos.</li>
        </ul>

        <p><strong>Compartilhamento de Flashcards:</strong></p>
        <ul>
          <li>Você pode compartilhar seus flashcards com terceiros, mas é responsável pela veracidade e originalidade do
            conteúdo.
          </li>
        </ul>

        <p><strong>Material Ofensivo:</strong></p>
        <ul>
          <li>Conteúdo ofensivo pode ser removido, e sua conta pode ser bloqueada, de acordo com nossas políticas.</li>
        </ul>

        <h2>Planos Pagos</h2>
        <p><strong>Planos Futuros:</strong></p>
        <ul>
          <li>No futuro, podemos oferecer planos pagos com recursos adicionais. Os usuários gratuitos podem optar por
            atualizar, se desejarem.
          </li>
        </ul>

        <h2>Remoção de Conteúdo por Inatividade</h2>
        <p>Em casos de inatividade do usuário, onde não houve login ou atividade na conta por um período de três meses
          consecutivos, reservamos o direito de remover ou arquivar o conteúdo associado à conta. Essa medida é tomada
          levando em consideração dois fatores críticos para o funcionamento do nosso serviço:</p>

        <ol>
          <li>A renda do nosso site é proveniente de anúncios exibidos no serviço. A inatividade prolongada de usuários
            pode reduzir a qualidade da experiência do usuário e a eficácia dos anúncios exibidos, o que afeta
            diretamente nossa capacidade de manter o serviço gratuito.
          </li>
          <li>O custo operacional do serviço está diretamente relacionado à quantidade de informações armazenadas.
            Manter grandes volumes de dados de contas inativas pode aumentar significativamente nossos custos de
            armazenamento e manutenção de servidores, impactando a viabilidade do serviço como um todo.
          </li>
        </ol>

        <p>Portanto, a remoção ou arquivamento de conteúdo após um período de inatividade é uma medida necessária para
          garantir a sustentabilidade do serviço e sua disponibilidade para todos os usuários ativos.</p>

        <h2>Alterações na Política de Privacidade</h2>
        <p>Reservamo-nos o direito de atualizar esta política periodicamente. Quaisquer alterações significativas serão
          notificadas aos usuários por meio do Serviço.</p>
      
        <b-row class="d-flex justify-content-center mt-4 mb-4">
          <b-button variant="primary" @click="voltar" >Voltar a tela inicial</b-button>
        </b-row>
      </div>
    </div>
</template>

<script>
export default {
  methods:{
    voltar(){
      this.$router.push("/")
    },
  },
}
</script>

<style scoped>
 .btn {
    width: 230px; /* Tamanho padrão */
}

/* Media query para telas com largura máxima de 767px (considerado como mobile) */
@media only screen and (max-width: 767px) {
    .btn {
        width: 100%; /* Tamanho 100% para telas menores (mobile) */
    }
}
</style>