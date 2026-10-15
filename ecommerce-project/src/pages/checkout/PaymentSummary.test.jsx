import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { PaymentSummary } from './PaymentSummary';

vi.mock('axios');

function Location() {
  const location = useLocation();
  return <div data-testid="url-path">{location.pathname}</div>;
}

describe('PaymentSummary component', () => {
  let loadCart;
  let user;

  beforeEach(() => {
    vi.clearAllMocks();
    user = userEvent.setup();
    loadCart = vi.fn();
  });

  it('displays the payment summary rows with the correct amounts', () => {
    const paymentSummary = {
      totalItems: 3,
      productCostCents: 2000,
      shippingCostCents: 300,
      totalCostBeforeTaxCents: 2300,
      taxCents: 230,
      totalCostCents: 2530,
    };

    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
      </MemoryRouter>
    );

    const rows = screen.getAllByTestId('payment-summary-row');

    expect(rows).toHaveLength(5);
    expect(within(rows[0]).getByText('Items (3):')).toBeInTheDocument();
    expect(within(rows[0]).getByText('$20.00')).toBeInTheDocument();

    expect(within(rows[1]).getByText('Shipping & handling:')).toBeInTheDocument();
    expect(within(rows[1]).getByText('$3.00')).toBeInTheDocument();

    expect(within(rows[2]).getByText('Total before tax:')).toBeInTheDocument();
    expect(within(rows[2]).getByText('$23.00')).toBeInTheDocument();

    expect(within(rows[3]).getByText('Estimated tax (10%):')).toBeInTheDocument();
    expect(within(rows[3]).getByText('$2.30')).toBeInTheDocument();

    expect(within(rows[4]).getByText('Order total:')).toBeInTheDocument();
    expect(within(rows[4]).getByText('$25.30')).toBeInTheDocument();
  });

  it('creates an order, reloads the cart, and navigates to the orders page', async () => {
    const paymentSummary = {
      totalItems: 1,
      productCostCents: 500,
      shippingCostCents: 100,
      totalCostBeforeTaxCents: 600,
      taxCents: 60,
      totalCostCents: 660,
    };

    render(
      <MemoryRouter initialEntries={['/checkout']}>
        <Location />
        <Routes>
          <Route path="/checkout" element={
            <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
          } />
          <Route path="/orders" element={<div>Orders</div>} />
        </Routes>
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button', { name: /place your order/i }));

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith('/api/orders');
    expect(loadCart).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('url-path')).toHaveTextContent('/orders');
  });
});
