<template>
  <div>
    <div>
      <ValuationTable/>
    </div>
  </div>

</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import ValuationTable from '@/components/ValuationTable.vue';

@Options({
  components: {
    ValuationTable,
  },
})
export default class Home extends Vue {
}
</script>
