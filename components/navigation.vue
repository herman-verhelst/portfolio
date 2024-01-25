<script setup lang="ts">

</script>

<template>
  <nav id="nav">
    <div>
      <div class="logo__container">
        <button aria-hidden="true" class="button" id="back-button" title="Pagina terug">
          <svg viewBox="0 0 48 48"
               xmlns="http://www.w3.org/2000/svg">
            <polygon points="12,23 18.2,17.3 16.8,15.8 8,24 16.8,32.2 18.2,30.7 12,25 22,25 22,23 "/>
            <polygon points="30,23 36.2,17.3 34.8,15.8 26,24 34.8,32.2 36.2,30.7 30,25 40,25 40,23 "/>
          </svg>
        </button>

        <a aria-hidden="true" class="logo button">
          <img alt="Logo Herman Verhelst" src="~/assets/icons/logo_color.svg">
        </a>
      </div>
      <div class="links__container">
        <ul>
          <li class="button"><a>Wie ben ik?</a></li>
          <li class="button"></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss">

</style>