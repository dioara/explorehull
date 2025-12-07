import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DollarSign, ArrowLeftRight, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";

const POPULAR_CURRENCIES = [
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "CHF", symbol: "Fr", name: "Swiss Franc" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "KRW", symbol: "₩", name: "South Korean Won" },
];

interface ExchangeRates {
  [key: string]: number;
}

export function CurrencyConverter() {
  const [amount, setAmount] = useState<string>("100");
  const [fromCurrency, setFromCurrency] = useState<string>("GBP");
  const [toCurrency, setToCurrency] = useState<string>("USD");
  const [convertedAmount, setConvertedAmount] = useState<string>("0");
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Fetch live exchange rates
  const fetchExchangeRates = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/GBP`);
      if (!response.ok) throw new Error("Failed to fetch rates");
      
      const data = await response.json();
      setExchangeRates(data.rates);
      setLastUpdated(new Date(data.date).toLocaleDateString('en-GB', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      }));
    } catch (err) {
      setError("Unable to load live rates");
      // Fallback to approximate rates
      setExchangeRates({
        GBP: 1,
        USD: 1.27,
        EUR: 1.17,
        JPY: 188.5,
        CNY: 9.12,
        AUD: 1.98,
        CAD: 1.77,
        CHF: 1.12,
        INR: 106.5,
        KRW: 1685,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  useEffect(() => {
    if (Object.keys(exchangeRates).length === 0) return;
    
    const numAmount = parseFloat(amount) || 0;
    const fromRate = exchangeRates[fromCurrency] || 1;
    const toRate = exchangeRates[toCurrency] || 1;
    
    // Convert to GBP first, then to target currency
    const gbpAmount = numAmount / fromRate;
    const result = gbpAmount * toRate;
    
    setConvertedAmount(result.toFixed(2));
  }, [amount, fromCurrency, toCurrency, exchangeRates]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const getExchangeRate = () => {
    if (Object.keys(exchangeRates).length === 0) return "0";
    const fromRate = exchangeRates[fromCurrency] || 1;
    const toRate = exchangeRates[toCurrency] || 1;
    const rate = toRate / fromRate;
    return rate.toFixed(4);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-primary" />
            Currency Converter
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={fetchExchangeRates}
            disabled={isLoading}
            className="h-8"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        {/* Amount Input */}
        <div className="space-y-2">
          <Label htmlFor="amount" className="text-sm font-medium">Amount</Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="text-lg h-12"
            min="0"
            step="0.01"
          />
        </div>

        {/* Currency Selection with Swap Button */}
        <div className="relative">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="from" className="text-sm font-medium">From</Label>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger id="from" className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {POPULAR_CURRENCIES.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{currency.symbol}</span>
                        <span>{currency.code}</span>
                        <span className="text-xs text-muted-foreground">- {currency.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="to" className="text-sm font-medium">To</Label>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger id="to" className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {POPULAR_CURRENCIES.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{currency.symbol}</span>
                        <span>{currency.code}</span>
                        <span className="text-xs text-muted-foreground">- {currency.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Swap Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={swapCurrencies}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-10 h-10 bg-background shadow-md hover:shadow-lg transition-shadow"
            title="Swap currencies"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Exchange Rate Info */}
        <div className="text-center text-sm text-muted-foreground py-2">
          1 {fromCurrency} = {getExchangeRate()} {toCurrency}
        </div>

        {/* Result Display */}
        <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 rounded-xl border border-primary/20">
          <div className="text-sm text-muted-foreground mb-2 font-medium">Converted Amount</div>
          <div className="text-4xl font-bold text-primary flex items-baseline gap-2">
            <span className="text-2xl">{POPULAR_CURRENCIES.find((c) => c.code === toCurrency)?.symbol}</span>
            <span>{convertedAmount}</span>
            <span className="text-lg font-normal text-muted-foreground">{toCurrency}</span>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="space-y-2 pt-2 border-t">
          <div className="flex items-start gap-2 text-xs text-muted-foreground">
            <div className="w-1 h-1 rounded-full bg-muted-foreground mt-1.5 flex-shrink-0" />
            <p>
              Exchange rates are provided by{" "}
              <a 
                href="https://www.exchangerate-api.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-foreground"
              >
                ExchangeRate-API
              </a>
              {lastUpdated && ` and updated on ${lastUpdated}`}.
            </p>
          </div>
          <div className="flex items-start gap-2 text-xs text-muted-foreground">
            <div className="w-1 h-1 rounded-full bg-muted-foreground mt-1.5 flex-shrink-0" />
            <p>
              Rates are for reference only. Actual rates may vary depending on your bank or payment provider.
            </p>
          </div>
          {error && (
            <div className="flex items-start gap-2 text-xs text-amber-600">
              <div className="w-1 h-1 rounded-full bg-amber-600 mt-1.5 flex-shrink-0" />
              <p>{error}. Showing approximate rates.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
