import { useMemo, useState } from 'react';
import { Badge, Button, Card, PageHeader } from '@/design/ui';
import { aiService } from '@/services/aiService';
import { useI18n } from '@/i18n/i18nContext';

export const AIAssistantPage = () => {
  const { dict, lang } = useI18n();
  const [conversation, setConversation] = useState('Χρειάζομαι καθαρισμό Airbnb αύριο στις 12:00.');
  const parsed = useMemo(() => aiService.parseDispatcherRequest(conversation), [conversation]);

  const actions = lang === 'el'
    ? ['Δημιουργία lead request', 'Αυτόματη πρόταση επαγγελματιών', 'Σύνδεση με σχετικό ακίνητο', 'Σχέδιο μηνύματος προς επαγγελματία']
    : ['Create lead request', 'Auto-match professionals', 'Link related property', 'Draft professional message'];

  return (
    <div className="space-y-4">
      <PageHeader title={dict.ai.title} subtitle={dict.ai.subtitle} />
      <div className="grid gap-4 xl:grid-cols-2">
        <Card className="space-y-3">
          <h3 className="font-semibold">{dict.ai.input}</h3>
          <textarea value={conversation} onChange={(e) => setConversation(e.target.value)} className="h-56 w-full rounded-xl border p-3 text-sm" />
          <div className="flex gap-2">
            <Button>{lang === 'el' ? 'Αποστολή' : 'Send'}</Button>
            <Button variant="secondary">{lang === 'el' ? 'Νέο αίτημα' : 'New request'}</Button>
          </div>
        </Card>

        <Card className="space-y-3">
          <h3 className="font-semibold">{lang === 'el' ? 'Δομημένη ερμηνεία' : 'Structured interpretation'}</h3>
          <div className="flex flex-wrap gap-2">
            <Badge tone="brand">category: {parsed.category}</Badge>
            <Badge tone={parsed.urgency === 'urgent' ? 'warning' : 'neutral'}>urgency: {parsed.urgency}</Badge>
            <Badge>area: {parsed.city}</Badge>
            {parsed.erasmus ? <Badge tone="success">erasmus</Badge> : null}
            {parsed.investmentIntent ? <Badge tone="success">investment</Badge> : null}
          </div>
          <h4 className="font-medium">{dict.ai.suggestions}</h4>
          <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600">
            {actions.map((a) => <li key={a}>{a}</li>)}
          </ul>
        </Card>
      </div>
    </div>
  );
};
