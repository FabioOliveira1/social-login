<template>
  <div id="app">
    <main class="container">
      <button class="btn">Button</button>
    </main>
  </div>
</template>

<script>

export default {
}
</script>

<style>
  html {
   font-family: Arial, Helvetica, sans-serif; 
  }

  .container  {
    min-height: 100vh;
    min-width: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .btn {
    padding: 10px 15px;
    background-color: #26a69a;
    color: #fff;
    font-weight: 100;
    border: none;
    border-radius: 3px;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
  }
  .btn:hover {
    opacity: .85;
  }
</style>
