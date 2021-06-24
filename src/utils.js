export function compounds(value, years, growth_rate) {
    return value * (1 + growth_rate / 100) ** years
}
