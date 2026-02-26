import { Tag, CreditCard, Percent, Gift } from "lucide-react";

const offers = [
  { icon: CreditCard, title: "Bank Offer", desc: "10% instant discount on HDFC Bank Credit Cards, up to $25" },
  { icon: Percent, title: "No Cost EMI", desc: "EMI starting from $21/mo on select cards" },
  { icon: Tag, title: "Partner Offer", desc: "Buy 2 items, get 5% off (limited period)" },
  { icon: Gift, title: "Cashback", desc: "Get $10 cashback on orders above $200 via wallet" },
];

export function ProductOffers() {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold flex items-center gap-2">
        <Tag className="h-4 w-4 text-primary" /> Available Offers
      </p>
      <div className="space-y-2">
        {offers.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-start gap-3 p-2.5 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
            <Icon className="h-4 w-4 text-primary mt-0.5 shrink-0" />
            <div>
              <span className="text-xs font-semibold text-foreground">{title}: </span>
              <span className="text-xs text-muted-foreground">{desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
