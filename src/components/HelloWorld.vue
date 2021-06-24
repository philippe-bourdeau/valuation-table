<template>
  <div>
    <table class="table">
      <thead>
      <tr>
        <th>Starting number</th>
        <th>2021</th>
        <th>2022</th>
        <th>2023</th>
        <th>2024</th>
        <th>2025</th>
        <th>2026</th>
        <th>2027</th>
        <th>2028</th>
        <th>2029</th>
        <th>2030</th>
        <th>Terminal value</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>
          <input
              class="input"
              type="text"
              v-model="start_value"
          >
        </td>
        <td>{{ formatFloat(compound(1))}}</td>
        <td>{{formatFloat(compound(2)) }}</td>
        <td>{{formatFloat(compound(3)) }}</td>
        <td>{{formatFloat(compound(4)) }}</td>
        <td>{{formatFloat(compound(5)) }}</td>
        <td>{{formatFloat(compound(6)) }}</td>
        <td>{{formatFloat(compound(7)) }}</td>
        <td>{{formatFloat(compound(8)) }}</td>
        <td>{{formatFloat(compound(9)) }}</td>
        <td>{{formatFloat(compound(10)) }}</td>
        <td>{{formatFloat(terminalValue()) }}</td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>{{formatFloat(presentValueTerminal())}}</td>
      </tr>
      </tbody>
    </table>
    <div>
      <div class="field">
        <label class="label">Growth rate yr 1-5</label>
        <div class="control">
          <input
              class="input"
              type="text"
              v-model="growth_rate_first_five"
          >
        </div>
      </div>

      <div class="field">
        <label class="label">Growth rate yr 6-10</label>
        <div class="control">
          <input
              class="input"
              type="text"
              v-model="growth_rate_year_last_five"
          >
        </div>
      </div>

      <div class="field">
        <label class="label">Terminal multiple</label>
        <div class="control">
          <input
              class="input"
              type="text"
              v-model="terminal_multiple"
          >
        </div>
      </div>
      <div class="field">
        <label class="label">Discount rate</label>
        <div class="control">
          <input
              class="input"
              type="text"
              v-model="discount_rate"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { compounds } from '@/utils'
import { round } from 'lodash'

@Options({
  props: {
    msg: String
  }
})
export default class HelloWorld extends Vue {
  discount_rate: number = 10
  terminal_value: number = 0
  terminal_multiple: number = 20
  growth_rate_first_five: number = 5
  growth_rate_year_last_five: number = 5
  start_value: number = 0
  growth_series: number[] = []
  present_values: number[] = []
  intrinsic_value: number = 0

  presentValueTerminal (): number {
    return this.terminalValue() * (1 + this.discount_rate/100) ** -10
  }

  terminalValue (): number {
    return this.compound(9) * this.terminal_multiple
  }

  compound (year: number) {
    if (year == 1) {
      return compounds(this.start_value, 1, this.growth_rate_first_five)
    } else {
      if (year <= 5) {
        return compounds(this.start_value, year, this.growth_rate_first_five)
      }

      let base = compounds(this.start_value, 5, this.growth_rate_first_five)

      return compounds(base, year - 5, this.growth_rate_year_last_five)
    }
  }

  formatFloat (value: number) {
    return round(value,2)
  }
}
</script>

<style scoped>
</style>
