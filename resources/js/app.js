/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import VueRouter from 'vue-router';
import {
    Form,
    HasError,
    AlertError
} from 'vform';
import moment from 'moment';
import VueProgressBar from 'vue-progressbar';
import swal from 'sweetalert2';

window.Form = Form;

Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);
Vue.use(VueRouter);
Vue.filter('upText',(text)=>{
    // return text.toUpperCase();
    return text.charAt(0).toUpperCase() + text.slice(1); 
});
Vue.filter('myDate',(created)=>{
    return moment(created).format(' Do MMMM YYYY');
})
Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '5px'
});

window.swal = swal;
const toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});
window.toast = toast;
window.Fire = new Vue();

let routes = [{
        path: '/dashboard',
        component: require('./components/Dashboard.vue')
    },
    {
        path: '/users',
        component: require('./components/Users.vue')
    },
    {
        path: '/developer',
        component: require('./components/Developer.vue')
    },
    {
        path: '/profile',
        component: require('./components/Profile.vue')
    }
]

Vue.component(
    'passport-clients',
    require('./components/passport/Clients.vue')
);

Vue.component(
    'passport-authorized-clients',
    require('./components/passport/AuthorizedClients.vue')
);

Vue.component(
    'passport-personal-access-tokens',
    require('./components/passport/PersonalAccessTokens.vue')
);

const router = new VueRouter({
    routes, // short for `routes: routes`,
    mode: 'history'
})


const app = new Vue({
    el: '#app',
    router
});
