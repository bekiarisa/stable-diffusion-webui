import { useState } from 'react';
import { Badge, Button, Card, PageHeader } from '@/design/ui';
import { OneOffListingOrderInput, OneOffListingOrderResult } from '@/core/types/domain';
import { paymentService } from '@/services/paymentService';

export const OneOffListingsPage = () => {
  const [input, setInput] = useState<OneOffListingOrderInput>({ listingType: 'long_term' });
  const [result, setResult] = useState<OneOffListingOrderResult | null>(null);

  const calculate = async () => {
    const response = await paymentService.startOneOffListingPayment(input);
    setResult(response);
  };

  return (
    <div className="space-y-4">
      <PageHeader title="One-off Paid Listings" subtitle="Δημοσίευση χωρίς συνδρομή για long-term ή sale, με προαιρετικό featured pin 3/7/14 ημερών." />
      <Card className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <Button variant={input.listingType === 'long_term' ? 'primary' : 'secondary'} onClick={() => setInput((p) => ({ ...p, listingType: 'long_term' }))}>Long-term (€5.90)</Button>
          <Button variant={input.listingType === 'sale' ? 'primary' : 'secondary'} onClick={() => setInput((p) => ({ ...p, listingType: 'sale' }))}>Sale (€8.90)</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant={!input.pinDays ? 'primary' : 'secondary'} onClick={() => setInput((p) => ({ ...p, pinDays: undefined }))}>No pin</Button>
          {[3, 7, 14].map((d) => (
            <Button key={d} variant={input.pinDays === d ? 'primary' : 'secondary'} onClick={() => setInput((p) => ({ ...p, pinDays: d as 3 | 7 | 14 }))}>
              Pin {d} ημέρες
            </Button>
          ))}
        </div>
        <Button onClick={() => void calculate()}>Υπολογισμός checkout</Button>
      </Card>

      {result ? (
        <Card>
          <h3 className="font-semibold">Checkout preview</h3>
          <p className="mt-2 text-sm">Listing fee: €{result.listingFee.toFixed(2)}</p>
          <p className="text-sm">Pin fee: €{result.pinFee.toFixed(2)}</p>
          <p className="text-sm">Total: <strong>€{result.total.toFixed(2)}</strong></p>
          <div className="mt-2 flex gap-2">
            <Badge tone="brand">{result.currency}</Badge>
            <Badge tone="success">{result.checkoutRef}</Badge>
          </div>
        </Card>
      ) : null}
    </div>
  );
};
