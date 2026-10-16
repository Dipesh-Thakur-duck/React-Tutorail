import { it, expect, describe } from 'vitest';
import { formatMoney } from './money';


describe('formatMoney', ()=>{
  it('formats 1999 cents as $19.99', ()=>{
  expect(formatMoney(1999)).toBe('$19.99');
});

  it('displays 2 decimals', ()=>{
    expect(formatMoney(1090)).toBe('$10.90');
  });

  it('displays $0.00 from 0', ()=>{
    expect(formatMoney(0)).toBe('$0.00');
  });

  it('returns null for numbers less than 0', ()=>{
    expect(formatMoney(-1)).toBe(null);
  })
});