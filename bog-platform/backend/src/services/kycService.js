import axios from 'axios';

export async function initiateKyc(wallet) {
  if (!wallet) {
    throw new Error('Wallet address is required to initiate KYC.');
  }

  if (!process.env.ONFIDO_TOKEN) {
    return {
      applicantId: `SIM-${wallet.slice(2, 8).toUpperCase()}`,
      status: 'pending-verification',
      message:
        'KYC provider not configured in this environment. Use the dashboard link to upload your ID once onboarding opens.'
    };
  }

  const { data } = await axios.post(
    'https://api.onfido.com/v3/applicants',
    {
      first_name: 'B.O.G',
      last_name: 'Investor',
      location: { country_of_residence: 'CYP' },
      id_numbers: [{ type: 'wallet', value: wallet }]
    },
    {
      headers: {
        Authorization: `Token token=${process.env.ONFIDO_TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  );

  return {
    applicantId: data.id,
    status: data.status,
    message: 'KYC initiated. Check your email to continue verification.'
  };
}

export async function processKycWebhook(payload) {
  return {
    receivedAt: new Date().toISOString(),
    payload
  };
}
