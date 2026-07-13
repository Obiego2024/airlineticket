// components/PaymentForm.tsx
import { DollarSign, AlertCircle, Coins,  } from 'lucide-react'

// Explicit TypeScript type boundaries for the component props
interface PaymentFormProps {
  totalPrice: number;
  paymentData: {
    method: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    cardholderName: string;
    paypalEmail: string;
    flexPayPlan: string;
    agreedToTerms: boolean;
    cryptoCurrency: string;
    walletConnected: boolean;
  };
  setPaymentData: React.Dispatch<React.SetStateAction<any>>;
}

export default function PaymentForm({ totalPrice, paymentData, setPaymentData }: PaymentFormProps) {
  const paymentMethods = [
    { id: 'card', label: 'Credit Card' },
    { id: 'paypal', label: 'PayPal Gateway' },
    { id: 'flexpay', label: 'Flex Pay' },
    { id: 'crypto', label: 'Crypto (Optional)' },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    setPaymentData((prev: any) => ({ ...prev, [name]: val }))
  }

  const toggleWalletConnection = () => {
    setPaymentData((prev: any) => ({ ...prev, walletConnected: !prev.walletConnected }))
  }

  const calculateInstallment = (plan: string) => {
    const splitCount = plan === '3_months' ? 3 : 6;
    return ((totalPrice * 1.04) / splitCount).toFixed(2);
  }

  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Secure Settlement Engine</h2>

      {/* Gateway Selection Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {paymentMethods.map((pm) => (
          <button
            key={pm.id}
            type="button"
            onClick={() => setPaymentData((prev: any) => ({ ...prev, method: pm.id }))}
            className={`py-3 px-2 rounded-xl border-2 text-xs font-bold text-center transition-all ${
              paymentData.method === pm.id
                ? 'border-sky-500 bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600'
            }`}
          >
            {pm.label}
          </button>
        ))}
      </div>

      {/* Card UI Layout */}
      {paymentData.method === 'card' && (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Cardholder Name</label>
            <input
              type="text"
              name="cardholderName"
              value={paymentData.cardholderName}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm outline-none focus:border-sky-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={paymentData.cardNumber}
              onChange={handleChange}
              placeholder="4111 2222 3333 4444"
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm outline-none focus:border-sky-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Expiration</label>
              <input
                type="text"
                name="expiryDate"
                value={paymentData.expiryDate}
                onChange={handleChange}
                placeholder="MM/YY"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm outline-none focus:border-sky-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">CVV</label>
              <input
                type="text"
                name="cvv"
                value={paymentData.cvv}
                onChange={handleChange}
                placeholder="321"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm outline-none focus:border-sky-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* PayPal UI Layout */}
      {paymentData.method === 'paypal' && (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 space-y-4 text-center">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mx-auto"><DollarSign className="w-6 h-6" /></div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">PayPal Access Node Connection</h4>
            <p className="text-xs text-slate-500 mt-1">Specify your registered portal address token context below.</p>
          </div>
          <input
            type="email"
            name="paypalEmail"
            value={paymentData.paypalEmail}
            onChange={handleChange}
            placeholder="billing@paypal-account.com"
            className="w-full max-w-md mx-auto block px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm outline-none focus:border-sky-500 text-center font-mono"
          />
        </div>
      )}

      {/* Flex Pay UI Layout */}
      {paymentData.method === 'flexpay' && (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-sky-600"><AlertCircle className="w-5 h-5" /><h4 className="text-sm font-semibold uppercase">Installment Financing Engine</h4></div>
          <select
            name="flexPayPlan"
            value={paymentData.flexPayPlan}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm outline-none focus:border-sky-500"
          >
            <option value="3_months">3 Installment cycles (+4% Processing)</option>
            <option value="6_months">6 Installment cycles (+4% Processing)</option>
          </select>
          <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl grid grid-cols-2 gap-4 text-sm font-mono">
            <div><p className="text-xs text-slate-400">Recurrent Installment</p><p className="font-bold">${calculateInstallment(paymentData.flexPayPlan)} / mo</p></div>
            <div><p className="text-xs text-slate-400">Immediate Initiation Fee</p><p className="font-bold text-emerald-600">${calculateInstallment(paymentData.flexPayPlan)}</p></div>
          </div>
          <label className="flex items-start gap-2 cursor-pointer pt-1">
            <input type="checkbox" name="agreedToTerms" checked={paymentData.agreedToTerms} onChange={handleChange} className="mt-0.5 rounded border-slate-300" />
            <span className="text-xs text-slate-400">Authorize recurrent installment program pulling cycles matching the schedule framework.</span>
          </label>
        </div>
      )}

      {/* Crypto UI Layout */}
      {paymentData.method === 'crypto' && (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mx-auto"><Coins className="w-6 h-6" /></div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Optional Web3 Payment Protocol</h4>
            <p className="text-xs text-slate-500 mt-1">Settle invoices directly over decentralized ledgers via wallet execution bindings.</p>
          </div>
          <div className="flex justify-center gap-2 max-w-xs mx-auto">
            {['USDT', 'ETH', 'BTC'].map((token) => (
              <button
                key={token}
                type="button"
                onClick={() => setPaymentData((prev: any) => ({ ...prev, cryptoCurrency: token }))}
                className={`flex-1 py-1.5 border text-xs font-mono font-bold rounded-lg ${paymentData.cryptoCurrency === token ? 'border-amber-500 bg-amber-500/10 text-amber-600' : 'border-slate-200 text-slate-500'}`}
              >
                {token}
              </button>
            ))}
          </div>
          <div className="pt-2">
            <button
              type="button"
              onClick={toggleWalletConnection}
              className={`px-6 py-2 rounded-xl text-xs font-mono font-bold transition-all ${paymentData.walletConnected ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
            >
              {paymentData.walletConnected ? '✓ Web3 Provider Linked' : 'Link Web3 Browser Wallet'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}