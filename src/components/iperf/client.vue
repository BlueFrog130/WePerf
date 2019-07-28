<template>
    <div>
        
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Iperf } from '@/models/Iperf';
export default Vue.extend({
    props:{
        preset:{
            type: Object as () => Iperf
        }
    }
})
</script>
