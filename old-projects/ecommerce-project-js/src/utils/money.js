export function formatMoney(amountCents){
  if(amountCents < 0){
    return null
  }
  return `$${(amountCents / 100).toFixed(2)}`
}