<template>
  <form @submit.prevent="submitForm">
    <div>
      <h2>Seja bem vindo(a)</h2>
      <label>Endereço de e-mail</label>
      <div>
        <input type="text" v-model="formData.email" />
      </div>
      <div>
        <input type="radio" value="0" v-model="formData.ind_pessoa" />
        <label for="1">Pessoa física</label>
        <input type="radio" value="1" v-model="formData.ind_pessoa" />
        <label for="0">Pessoa jurídica</label>
      </div>
      <div>
        <button class="button" type="submit">Continuar</button>
      </div>
      <Message :msg="msg" v-show="msg" />
    </div>
  </form>
</template>

<script setup>
import { reactive, ref } from "vue";
import router from "../router";
import Message from "./Message.vue";

const formData = reactive({
  email: "",
  ind_pessoa: "0",
});

const msg = ref("");

const msgForm = (value) => {
  msg.value = value;
  setTimeout(() => (msg.value = ""), 3000);
};

const submitForm = () => {
  if (formData.email == "") {
    msgForm("E-mail não informado!");
  } else {
    router.push({
      name: "cadastro",
      params: {
        email: formData.email,
        indpessoa: formData.ind_pessoa,
      },
    });
  }
};
</script>

<style></style>
