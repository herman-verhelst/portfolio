<script setup lang="ts">
import transitionConfig from "~/helpers/transition-config";
import middleware from "~/helpers/middleware";

definePageMeta({
  pageTransition: transitionConfig,
  middleware: middleware
})
</script>

<template>
  <main>
    <div class="page page--large-top-padding">
      <h1 class="title">
        {{ $t('contact.title1') }}<br/>
        <b>{{ $t('contact.title2') }}?</b>
      </h1>
      <form>
        <label for="name">
          <span>{{ $t('contact.name')}}</span>
          <input id="name" type="text">
        </label>
        <label for="email">
          <span>{{ $t('contact.email')}}</span>
          <input id="email" type="email">
        </label>
        <label class="textarea__container" for="message">
          <span>{{ $t('contact.message')}}</span>
          <textarea id="message"/>
        </label>
        <button class="button button--primary button--l">
          {{ $t('contact.send')}}
        </button>
      </form>
    </div>

    <footer-comp></footer-comp>
  </main>
</template>

<style scoped lang="scss">

</style>