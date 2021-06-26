<template>
  <div class="columns is-3">
    <div class="column">
    <table class="table m-3">
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
        <td>{{formatFloat(compound(1))}}</td>
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
        <td>&nbsp;</td>
        <td>{{formatFloat(presentValue(1)) }}</td>
        <td>{{formatFloat(presentValue(2)) }}</td>
        <td>{{formatFloat(presentValue(3)) }}</td>
        <td>{{formatFloat(presentValue(4)) }}</td>
        <td>{{formatFloat(presentValue(5)) }}</td>
        <td>{{formatFloat(presentValue(6)) }}</td>
        <td>{{formatFloat(presentValue(7)) }}</td>
        <td>{{formatFloat(presentValue(8)) }}</td>
        <td>{{formatFloat(presentValue(9)) }}</td>
        <td>{{formatFloat(presentValue(10)) }}</td>
        <td>{{formatFloat(presentValueTerminal())}}</td>
      </tr>
      <tr><b>&nbsp;&nbsp;INTRINSIC VALUE : {{formatFloat(intrinsicValue())}}</b></tr>
      </tbody>
    </table>
    </div>
    <div class="column is-one-fifth" id="test">
      <div class="field">
        <label class="label">Growth rate yr 1-5</label>
        <div class="control">
          <input
              class="input is-small"
              type="text"
              v-model="growth_rate_first_five"
          >
        </div>
      </div>

      <div class="field">
        <label class="label">Growth rate yr 6-10</label>
        <div class="control">
          <input
              class="input is-small"
              type="text"
              v-model="growth_rate_year_last_five"
          >
        </div>
      </div>

      <div class="field">
        <label class="label">Terminal multiple</label>
        <div class="control">
          <input
              class="input is-small"
              type="text"
              v-model="terminal_multiple"
          >
        </div>
      </div>
      <div class="field">
        <label class="label">Discount rate</label>
        <div class="control">
          <input
              class="input is-small"
              type="text"
              v-model="discount_rate"
          >
        </div>
      </div>


      <div class="field">
        <label class="checkbox" disabled>
          <input type="checkbox" v-model="includePresentValue">
          Include Present value sum
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { compounds } from '@/utils'
import { round } from 'lodash'

@Options({
  props: {}
})
export default class ValuationTable extends Vue {
  discount_rate: number = 10
  terminal_multiple: number = 20
  growth_rate_first_five: number = 5
  growth_rate_year_last_five: number = 5
  start_value: number = 0
  includePresentValue: boolean = false

  presentValueTerminal (): number {
    return this.terminalValue() * (1 + this.discount_rate/100) ** -10
  }

  terminalValue (): number {
    return this.compound(9) * this.terminal_multiple
  }

  intrinsicValue(): number {
    if (!this.includePresentValue) {
      return this.presentValueTerminal()
    }

    let sum = this.presentValueTerminal()
    for (let i = 1; i <= 10; i++) {
      sum += this.presentValue(i)
    }

    return sum
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

  presentValue (year: number) {
    if (!this.includePresentValue) {
      return 0
    }

    let compounded = this.compound(year)
    return compounds(compounded, - year, this.discount_rate)
  }

  formatFloat (value: number) {
    return round(value,2)
  }
}
</script>

<style scoped>
#test{
  padding-right: 3em;
}
</style>
