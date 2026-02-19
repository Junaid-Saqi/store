
export default function TermsPage() {
    const terms = [
        {
            title: "Operating Principle",
            content: "By using ElectroWave, you agree to our 10% advance payment model. All trending and premium tech requires a verified commitment via advance payment before priority dispatch."
        },
        {
            title: "Payment Obligations",
            content: "The remaining 90% of the product cost is due strictly upon delivery. Payments must be made in full to the courier before the final handover of the verified innovation."
        },
        {
            title: "Delivery & Inspection",
            content: "We provide a 7-day replacement window. You are encouraged to inspect the product packaging and seal at the time of delivery before paying the remaining balance."
        },
        {
            title: "Order Cancellation",
            content: "Cancellations made within 12 hours of order placement are eligible for a full refund of the advance payment. Beyond this period, the advance is utilized for priority logistics and is non-refundable."
        }
    ];

    return (
        <div className="container mx-auto px-4 py-20 min-h-screen max-w-4xl">
            <div className="space-y-16">
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
                        TERMS OF <br /><span className="text-accent underline decoration-4 underline-offset-8">ENGAGEMENT</span>.
                    </h1>
                    <p className="text-xl text-muted-foreground italic">
                        The rules of our mutual trust bridge.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    {terms.map((term, i) => (
                        <div key={i} className="group p-8 md:p-12 bg-black/5 dark:bg-white/5 rounded-[3rem] border border-transparent hover:border-accent/20 transition-all duration-500">
                            <div className="flex items-start justify-between mb-6">
                                <h3 className="text-2xl font-black uppercase tracking-tight group-hover:text-accent transition-colors">{term.title}</h3>
                                <span className="text-accent/30 font-black text-4xl">0{i + 1}</span>
                            </div>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {term.content}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="text-center text-muted-foreground text-xs uppercase tracking-[0.2em] py-12">
                    © 2026 ElectroWave Innovation Group. All Rights Reserved.
                </div>
            </div>
        </div>
    );
}
