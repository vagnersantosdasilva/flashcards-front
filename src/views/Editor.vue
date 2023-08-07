<template>
  <div>
    <b-button v-b-toggle.sidebar-1 >
      Toggle Sidebar
    </b-button>

    <b-sidebar
        id="sidebar-1"  shadow
        :class="{ 'sidebar-open': isSidebarOpen }"
    >
      <div class="px-4 py-2">
        <h4>Elabore o flashcard</h4>
        <div class="flashcard-editor">
          <ckeditor
              :editor="editor"
              v-model="htmlCard"
              @ready="onReady"
              :config="editorConfig"
          >
          </ckeditor>
        </div>
        <div>
          <b-button variant="primary" class="w-100" @click="verConteudo">
              Teste de conteúdo
          </b-button>
        </div>
      </div>


    </b-sidebar>
  </div>
</template>

<script>
import CKEditor from "@ckeditor/ckeditor5-vue2";
import DecoupledDocumentEditor from "ckeditor5-build-decoupled-document-base64-imageresize"
export default {
  components:{
    ckeditor: CKEditor.component,
  },
  data() {

    return {
      htmlCard:'',
      isSidebarOpen: false,
      editor: DecoupledDocumentEditor,
      editorConfig: {

        toolbar: [
          'fontSize',
          'fontFamily',
          'fontBackgroundColor',
          'fontColor',
          'alignment',
          '|',
          'bold',
          'italic',
          '|',
          'bulletedList',
          'numberedList',
          '|',
          'imageUpload',
          'imageStyle:alignLeft',
          'imageStyle:alignCenter',
          'imageStyle:alignRight',
          '|',
          'undo',
          'redo'

        ],
        fontSize: {
          options: [9, 10, 11, 12, 14, 'default', 18, 24, 36],
        },
        fontFamily: {
          options: [
            'default',
            'Arial, Helvetica, sans-serif',
            'Georgia, serif',
            'Impact, Charcoal, sans-serif',
            'Tahoma, Geneva, sans-serif',
            // Adicione mais opções de fonte conforme necessário
          ],
        },
        alignment: {
          options: ['left', 'center', 'right', 'justify'],
        },
        fontColor: {
          colors: [
            {
              color: 'black',
              label: 'Black',
            },
            {
              color: 'red',
              label: 'Red',
            },
            {
              color: 'blue',
              label: 'Blue',
            },
            // Adicione mais cores conforme necessário
          ],
        },
        fontBackgroundColor: {
          colors: [
            {
              color: '#FFFF00',
              label: 'Yellow',
            },
            {
              color: '#FF0000',
              label: 'Red',
            },
            {
              color: '#00FF00',
              label: 'Green',
            },
            // Adicione mais cores de fundo de texto conforme necessário
          ],
        },
        table: {
          contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'image'],
        },
        image: {
          toolbar: ['imageTextAlternative', '|', 'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight'],
          styles: ['alignLeft', 'alignCenter', 'alignRight'],
        },

      },
    };
  },
  methods: {

    verConteudo(){
      console.log(this.htmlCard);
    },

    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    onReady(editor) {
      editor.ui.getEditableElement().parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
      );
      console.log(editor);
      console.log(editor.config._config)

    },
  }
};
</script>

<style>
.ck-content {
  display: block;
  border: 1px solid #cfdccf;
  align-content: center;
  background-color: white;

  height: 90%;
  border-radius: 0;
  margin-right: 0;


}
.flashcard-editor {
  padding: 30px;
  display: block;
  border: 1px solid #cfdccf;
  align-content: center;
  background-color: white;
  cursor:pointer;
  margin: 1px;
  max-width: 414px;
  min-width: 414px;

  height: 400px;
  border-radius: 0;
  font-family: 'Open Sans', sans-serif;
}
.ck-toolbar{
  width: 100%;
}


.sidebar-open {
  transform: translateX(0); /* Slide para a direita ao abrir */
}

.shadow {
  /* Suas outras propriedades ... */
  transition: box-shadow 0.3s ease-out;
}

.b-sidebar-outer{
  position:fixed;
  top:0;
  left:0;
  right: 0;
  overflow: visible;
  z-index: 1035;
}
.b-sidebar{
  display: flex;
  flex-direction: column;
  width: 485px;
  max-width: 100%;
  max-height: 100%;
  margin:0;
  outline: 0;
  transform: translateX(0);
}

.b-sidebar{
  position:fixed;
  top:0;
  height: 100vh;
  transition: transform 0.3s ease-out;

}
.shadow{
  box-shadow: 0 .5rem 1rem rgb(0,0,0,.15)!important;
  transition: transform 0.3s ease-out;
}

.b-sidebar>.b-sidebar-body{
  flex-grow:1;
  height: 100%;
  overflow-y: auto;
}
.b-sidebar>.b-sidebar-header{
  font-size: 1.5rem;
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: row;
  flex-grow: 0;
  align-items: center;
}
.b-sidebar:not(.b-sidebar-right)>.b-sidebar-header .close{
  margin-left: auto;
}

.b-sidebar>.b-sidebar-header .close{
  float: none;
  font-size: 1.5rem;
}

button.close{
  padding: 0;
  background-color: transparent;
  border:0;
}

.close{
  float: right;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  color:#000;
  text-shadow: 0 1px 0 #fff;
  opacity: .5;
}
/* Você pode adicionar estilos personalizados aqui, se necessário */
</style>
