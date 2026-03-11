import { useMemo, useState } from 'react';
import { Card, PageHeader, Button, Badge } from '@/design/ui';
import { aiService } from '@/services/aiService';

export const AIAssistantPage = () => {
  const [text, setText] = useState('Χρειάζομαι ηλεκτρολόγο, κάηκε η ασφάλεια.');
  const parsed = useMemo(() => aiService.parseDispatcherRequest(text), [text]);

  return (
    <div className="space-y-4">
      <PageHeader title="AI Assistant / Dispatcher" subtitle="Natural language parsing για category, urgency, area, Erasmus/investment intent." />
      <Card>
        <textarea className="h-28 w-full rounded-xl border p-3 text-sm" value={text} onChange={(e) => setText(e.target.value)} />
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge tone="brand">Category: {parsed.category}</Badge>
          <Badge tone={parsed.urgency === 'urgent' ? 'warning' : 'neutral'}>Urgency: {parsed.urgency}</Badge>
          <Badge>Area: {parsed.city}</Badge>
          {parsed.erasmus ? <Badge tone="success">Erasmus relevant</Badge> : null}
          {parsed.investmentIntent ? <Badge tone="success">Investment intent</Badge> : null}
        </div>
        <div className="mt-4 flex gap-2"><Button>Generate request draft</Button><Button variant="secondary">Match professionals</Button></div>
      </Card>
      <Card>
        <h3 className="font-semibold">Structured payload preview</h3>
        <pre className="mt-2 overflow-auto rounded-xl bg-slate-50 p-3 text-xs">{JSON.stringify(parsed, null, 2)}</pre>
      </Card>
      <Card>
        <h3 className="font-semibold">AI Property Tools</h3>
        <ul className="mt-2 list-disc pl-5 text-sm text-slate-600">
          <li>Listing generator (EL/EN, portal/social/premium variants)</li>
          <li>Guest messages (check-in/check-out/welcome/issues)</li>
          <li>Captions, hooks, reel scripts and CTA</li>
          <li>House manual generator with bilingual export</li>
        </ul>
      </Card>
    </div>
  );
};
