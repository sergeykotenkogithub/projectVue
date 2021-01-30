<template>
    <div id="basket">
        <Item 
            v-for="item of items"
            type="basket"
            :item="item"
            @del="remove"
            :key="item.id"            
        />            
        <!-- :key="item" не нужен -->   
    </div>
</template>

<script>

import Item from './Item.vue';
import { get } from '@/core/requests';
import { mapGetters } from 'vuex'

export default {
    components: {Item },  
    data() {
        return {
            url:
            "https://raw.githubusercontent.com/kellolo/static/master/JSON/basket.json",
        }
    },
    async mounted() {
        try {
            this.$store.dispatch('loadBasket', this.url) // вызывается actions в index.js c помощью dispatch
        } catch (err) { 
        console.log(err);
        }
    },
    methods: {
        add(product) {
            let find = this.items.find(
                (el) => el.productId == product.productId
            );

            if (!find) {
                let newItem = Object.assign({}, product, { amount: 1 });
                // this.items.push(newItem);
                this.$store.dispatch('changeBasketItems', {item: newItem, action: 1})
            } else {
                // find.amount++;
                this.$store.dispatch('changeBasketItems', {item: find, action: 3, amount: 1})
            }
            this._render();
        },
        remove(id) {
            let find = this.items.find((el) => el.productId == id);

            if (find.amount > 1) {
                // find.amount--;
                 this.$store.dispatch('changeBasketItems', {item: find, action: 3, amount: -1})
            } else {
                // this.items.splice(this.items.indexOf(find), 1);
                 this.$store.dispatch('changeBasketItems', {item: find, action: 2})
            }
            this._render();
        }
    },
    computed: {
        ...mapGetters({ items: 'basket_getter' })
    }
}
</script>

<style>

</style>