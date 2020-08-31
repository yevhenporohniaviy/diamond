import Vue from 'vue'

Vue.filter('toDecimalNumber', val =>  parseFloat(val).toFixed(2));
