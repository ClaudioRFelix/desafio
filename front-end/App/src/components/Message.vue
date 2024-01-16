<template>
  <div class="message">
    <p>{{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: "Message",
  props: {
    msg: String,
  },
};
</script>

<style scoped>
.message {
  color: #004085;
  background-color: #cce5ff;
  border: 2px solid #88daff;
  border-radius: 3px;
  padding: 1px;
  max-width: 250px;
  margin-top: 20px;
  text-align: center;
}
</style>
