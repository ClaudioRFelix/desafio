<template>
  <form @submit.prevent="submitForm">
    <div>
      <div v-if="formEtapa == 'pessoa'">
        <div v-if="formData.ind_pessoa == '0'">
          <h2>Pessoa Física</h2>
        </div>
        <div v-else>
          <h2>Pessoa Jurídica</h2>
        </div>
        <label>Nome</label>
        <div>
          <input type="text" v-model="formData.nome" />
        </div>
        <div v-if="formData.ind_pessoa == '0'">
          <label>CPF</label>
          <div>
            <input type="text" v-model="formData.cpf" />
          </div>
        </div>
        <div v-else>
          <label>CNPJ</label>
          <div>
            <input type="text" v-model="formData.cnpj" />
          </div>
        </div>
        <div v-if="formData.ind_pessoa == '0'">
          <label>Data de nascimento</label>
          <div>
            <input type="text" v-model="formData.nascimento" />
          </div>
        </div>
        <div v-else>
          <label>Data de abertura</label>
          <div>
            <input type="text" v-model="formData.abertura" />
          </div>
        </div>
        <label>Telefone</label>
        <div>
          <input type="text" v-model="formData.telefone" />
        </div>
        <div>
          <button class="button button2" @click="homeForm()">Voltar</button>
          <button class="button button1" type="submit" :disabled="disabled">
            Continuar
          </button>
        </div>
      </div>
      <div v-else-if="formEtapa == 'senha'">
        <h2>Senha de acesso</h2>
        <label>Sua senha</label>
        <div>
          <input type="text" v-model="formData.senha" />
        </div>
        <div>
          <button class="button button2" @click="etapaForm('pessoa')">Voltar</button>
          <button class="button button1" type="submit">Continuar</button>
        </div>
      </div>
      <div v-else>
        <h2>Revise suas informações</h2>
        <label>Endereço de e-mail</label>
        <div>
          <input type="text" v-model="formData.email" />
        </div>
        <label>Nome</label>
        <div>
          <input type="text" v-model="formData.nome" />
        </div>
        <div v-if="formData.ind_pessoa == '0'">
          <label>CPF</label>
          <div>
            <input type="text" v-model="formData.cpf" />
          </div>
        </div>
        <div v-else>
          <label>CNPJ</label>
          <div>
            <input type="text" v-model="formData.cnpj" />
          </div>
        </div>
        <div v-if="formData.ind_pessoa == '0'">
          <label>Data de nascimento</label>
          <div>
            <input type="text" v-model="formData.nascimento" />
          </div>
        </div>
        <div v-else>
          <label>Data de abertura</label>
          <div>
            <input type="text" v-model="formData.abertura" />
          </div>
        </div>
        <label>Telefone</label>
        <div>
          <input type="text" v-model="formData.telefone" />
        </div>
        <label>Senha</label>
        <div>
          <input type="text" v-model="formData.senha" />
        </div>
        <div>
          <button class="button button2" @click="etapaForm('senha')">Voltar</button>
          <button class="button button1" type="submit" :disabled="disabled">
            Cadastrar
          </button>
        </div>
      </div>
      <Message :msg="msg" v-show="msg" />
    </div>
  </form>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import router from "../router";
import { login, cadastrar } from "../helpers/registration";
import Message from "./Message.vue";

const route = useRoute();

const formData = reactive({
  email: "",
  senha: "",
  ind_pessoa: "0",
  nome: "",
  cpf: "",
  nascimento: "",
  cnpj: "",
  abertura: "",
  telefone: "",
});

const formEtapa = ref("pessoa");
const disabled = ref(false);
const msg = ref("");

const etapaForm = (value) => {
  formEtapa.value = value;
};

const homeForm = () => {
  router.push("/");
};

const msgForm = (value) => {
  msg.value = value;
  setTimeout(() => (msg.value = ""), 3000);
};

const submitForm = () => {
  if (formEtapa.value == "validar" && formData.email == "") {
    msgForm("E-mail não informado!");
  } else if (
    (formEtapa.value == "pessoa" || formEtapa.value == "validar") &&
    formData.nome == ""
  ) {
    msgForm("Nome não informado!");
  } else if (
    (formEtapa.value == "pessoa" || formEtapa.value == "validar") &&
    formData.ind_pessoa == "0" &&
    formData.cpf == ""
  ) {
    msgForm("CPF não informado!");
  } else if (
    (formEtapa.value == "pessoa" || formEtapa.value == "validar") &&
    formData.ind_pessoa == "1" &&
    formData.cnpj == ""
  ) {
    msgForm("CNPJ não informado!");
  } else if (
    (formEtapa.value == "pessoa" || formEtapa.value == "validar") &&
    formData.ind_pessoa == "0" &&
    formData.nascimento == ""
  ) {
    msgForm("Data de nascimento não informada!");
  } else if (
    (formEtapa.value == "pessoa" || formEtapa.value == "validar") &&
    formData.ind_pessoa == "1" &&
    formData.abertura == ""
  ) {
    msgForm("Data de abertura não informada!");
  } else if (
    (formEtapa.value == "pessoa" || formEtapa.value == "validar") &&
    formData.telefone == ""
  ) {
    msgForm("Data de abertura não informada!");
  } else if (
    (formEtapa.value == "senha" || formEtapa.value == "validar") &&
    formData.senha == ""
  ) {
    msgForm("Senha não informada!");
  } else if (formEtapa.value == "pessoa") {
    etapaForm("senha");
  } else if (formEtapa.value == "senha") {
    etapaForm("validar");
  } else if (formEtapa.value == "validar") {
    cadastrar(formData).then((resp) => {
      if (resp.status == "OK") {
        msgForm("Pessoa cadastrada com sucesso!");
        disabled.value = true;
      }
    });
  }
};

onMounted(async () => {
  login(route.params.email).then((resp) => {
    if (resp.status == "NO") {
      formData.email = route.params.email;
      formData.ind_pessoa = resp.record.ind_pessoa;
      formData.nome = resp.record.nome;
      formData.cpf = resp.record.cpf;
      formData.nascimento = resp.record.nascimento;
      formData.cnpj = resp.record.cnpj;
      formData.abertura = resp.record.abertura;
      formData.telefone = resp.record.telefone;
      formData.senha = resp.record.senha;
      disabled.value = true;
      msgForm("E-mail já cadastrado");
    } else {
      formData.email = route.params.email;
      formData.ind_pessoa = route.params.indpessoa;
      disabled.value = false;
    }
  });
});
</script>

<style></style>
