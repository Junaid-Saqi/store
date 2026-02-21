import {
    Settings,
    Bell,
    Shield,
    CreditCard,
    Globe,
    Database,
    Save,
    Trash2
} from "lucide-react";

export default function AdminSettings() {
    return (
        <div className="max-w-4xl space-y-8">
            <div>
                <h1 className="text-4xl font-black tracking-tight uppercase">Settings</h1>
                <p className="text-muted-foreground">Configure your store&apos;s global preferences and security.</p>
            </div>

            <div className="grid gap-8">
                {/* General Settings */}
                <div className="bg-card rounded-[2.5rem] p-8 shadow-sm space-y-6">
                    <div className="flex items-center space-x-3 text-accent">
                        <Globe size={24} />
                        <h3 className="text-xl font-bold">General Store Info</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Store Name</label>
                            <input
                                type="text"
                                defaultValue="VOLT E-COMMERCE"
                                className="w-full bg-background rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Support Email</label>
                            <input
                                type="email"
                                defaultValue="support@volt.com"
                                className="w-full bg-background rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Security Settings */}
                <div className="bg-card rounded-[2.5rem] p-8 shadow-sm space-y-6">
                    <div className="flex items-center space-x-3 text-accent">
                        <Shield size={24} />
                        <h3 className="text-xl font-bold">Security & Access</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl">
                            <div>
                                <p className="font-bold">Two-Factor Authentication</p>
                                <p className="text-xs text-muted-foreground">Secure your account with 2FA protection.</p>
                            </div>
                            <button className="w-12 h-6 bg-accent rounded-full relative">
                                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                            </button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl">
                            <div>
                                <p className="font-bold">Advanced Firewall</p>
                                <p className="text-xs text-muted-foreground">Strict brute-force protection and IP blocking.</p>
                            </div>
                            <button className="w-12 h-6 bg-muted rounded-full relative">
                                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end space-x-4">
                    <button className="px-8 py-3 rounded-2xl font-bold hover:bg-destructive/5 hover:text-destructive hover:border-destructive/20 transition-all flex items-center space-x-2">
                        <Trash2 size={18} />
                        <span>Factory Reset</span>
                    </button>
                    <button className="px-8 py-3 bg-accent text-white rounded-2xl font-bold hover:scale-105 transition-all shadow-lg shadow-accent/20 flex items-center space-x-2">
                        <Save size={18} />
                        <span>Save Changes</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
