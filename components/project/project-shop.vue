<script setup lang="ts">
import {toCamelCase} from "~/utils/string-utils";

const props = defineProps({
  products: {
    required: true
  },
  page: {
    type: String,
    required: true
  },
  projectId: {
    type: Number,
    required: true
  }
})

</script>
<template>
  <section>
    <h2 class="mb-4" data-scrolltrigger>{{ $t(`projects.${toCamelCase(page)}.titles.shop`) }}</h2>
    <p data-scrolltrigger>{{ $t(`projects.${toCamelCase(page)}.text.shop1`) }}
      <a v-cursor class="project__discover__link" href="mailto:mail@herman-verhelst.be">mail@herman-verhelst.be</a>
      {{ $t(`projects.${toCamelCase(page)}.text.shop2`) }}
    </p>

    <div class="project__product__container">
      <div class="project__product" v-for="(product, index) in products">
        <div :data-scrolltrigger="index % 2" class="project__product__image">
          <img :src="`/images/projects/${page}/${product.image}`" alt="">
        </div>
        <div :data-scrolltrigger="index % 2" class="project__product__info">
          <div class="project__product__text">
            <h3>{{ $t(`projects.${toCamelCase(page)}.shop.${product.product}`) }}</h3>
            <div v-if="!product.options" class="project__product__details">
              <p class="project__product__dimensions">{{ product.dimensions }}</p>
              <p class="project__product__price">{{ product.price }}</p>
            </div>
            <div v-else v-for="option in product.options" class="project__product__details project__product__details--multiple">
              <div>
                <p class="project__product__size">{{ option.size }}</p>
                <p class="project__product__dimensions">{{ option.dimensions }}</p>
              </div>
              <p class="project__product__price">{{ option.price }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>
