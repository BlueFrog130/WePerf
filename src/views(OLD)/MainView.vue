<template>
    <div class="columns is-desktop is-vcentered fullheight" id="main-view">
        <link href="https://fonts.googleapis.com/css?family=Archivo+Black&display=swap" rel="stylesheet">
        <div class="column is-marginless is-paddingless" id="text-column">
            <div class="wrapper">            
                <span class="main subtitle has-text-vue-blue">We</span>
                <span class="main subtitle has-text-vue-green">Perf</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            
        }
    },
    created(){
        
    }
}
</script>

<style>
#text-column{
    height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
.wrapper{
    width: 50%;
    text-align: center;
    opacity: 0.75;
}
.main{
    font-size: 10vw;
    font-family: "Archivo Black", sans-serif;
}
#main-view{
    -webkit-user-select: none;
}
</style>
