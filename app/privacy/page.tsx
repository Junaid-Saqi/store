
export default function PrivacyPage() {
    const sections = [
        {
            title: "Data Collection",
            content: "We collect information you provide directly to us when you create an account, make a purchase, or communicate with us. This includes your name, email, shipping address, and phone number."
        },
        {
            title: "How We Use Data",
            content: "Your data is used specifically to process your 10% advance payment, verify your order, and coordinate shipping. We do not sell your data to third parties. We use industry-standard encryption to protect your sensitive information."
        },
        {
            title: "Advance Policy Security",
            content: "Since our business relies on a 10% advance payment model, we take financial data security with extreme seriousness. Payment information is handled through encrypted gateways and is never stored on our servers."
        },
        {
            title: "Your Rights",
            content: "You have the right to request a copy of the data we hold about you, or to request that we delete your personal information from our active records at any time."
        }
    ];

    return (
        <div className="container mx-auto px-4 py-20 min-h-screen max-w-4xl">
            <div className="space-y-16">
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
                        PRIVACY <br /><span className="text-accent underline decoration-4 underline-offset-8">PROTOCOL</span>.
                    </h1>
                    <p className="text-xl text-muted-foreground italic">
                        How we protect your data in the innovation era.
                    </p>
                </div>

                <div className="space-y-12">
                    {sections.map((section, i) => (
                        <div key={i} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${i * 100}ms` }}>
                            <div className="flex items-center space-x-4">
                                <span className="text-accent font-black tracking-widest text-xs uppercase">0{i + 1}</span>
                                <div className="h-px flex-grow bg-black/5 dark:bg-white/5" />
                            </div>
                            <h2 className="text-3xl font-black tracking-tight uppercase">{section.title}</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {section.content}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="p-8 bg-accent/5 rounded-3xl border border-accent/10">
                    <p className="text-sm text-center text-muted-foreground">
                        Last Updated: February 19, 2026. For any questions regarding this protocol, contact <span className="text-accent font-bold">privacy@volt.tech</span>.
                    </p>
                </div>
            </div>
        </div>
    );
}
