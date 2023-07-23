<template>
<transition name="fade">
    <div class="login-alert" v-if="displayAlert && this.$store.state.userModule.username">{{ this.$store.state.userModule.username }} 님, 환영해요!</div>
</transition>
</template>

<script>
export default {
    data() {
        return {
            displayAlert: true,
        };
    },
    methods: {
        hideAlert() {
            setTimeout(() => {
                this.displayAlert = false;
            }, 1400);
        },
    },
    mounted() {
        this.hideAlert();
    },
};
</script> 
<style scoped>
@keyframes fadeInDown {
    0% {
        opacity: 0;
        transform: translate3d(0, -100%, 0);
    }

    to {
        opacity: 1;
        transform: translateZ(0);
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.login-alert {
    position: relative;
    animation: fadeInDown 0.6s;
    /* opacity: 0.9; */
    margin: 0 auto;
    z-index: 1000;
    color: #ececec;
    width: 80%;
    text-align: center;
    padding: 16px;
    box-sizing: border-box;
    font-size: 18px;
    font-family: Montserrat;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5;
    /* letter-spacing: 1px; */
    transition: 300ms;

    /* background-color: rgb(84, 84, 84); */
    /* border-radius: 20px; */
}
</style>
