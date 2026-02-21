import {
    Users,
    Search,
    Filter,
    MoreVertical,
    Mail,
    Phone,
    Calendar,
    ArrowUpRight
} from "lucide-react";

const CUSTOMERS = [
    { id: "CUST-1001", name: "John Doe", email: "john@example.com", phone: "+92 300 1234567", orders: 12, spent: "$4,230.00", joined: "2024-01-15", status: "Active" },
    { id: "CUST-1002", name: "Alice Smith", email: "alice@example.com", phone: "+92 301 7654321", orders: 5, spent: "$1,120.50", joined: "2024-02-01", status: "Active" },
    { id: "CUST-1003", name: "Bob Wilson", email: "bob@example.com", phone: "+92 333 9876543", orders: 1, spent: "$399.00", joined: "2024-03-10", status: "New" },
    { id: "CUST-1004", name: "Emma Davis", email: "emma@example.com", phone: "+92 345 1112223", orders: 0, spent: "$0.00", joined: "2024-03-12", status: "Inactive" },
];

export default function AdminCustomers() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black tracking-tight uppercase">Customers</h1>
                    <p className="text-muted-foreground">Manage your customer database and relationship.</p>
                </div>
                <button className="bg-accent text-white px-6 py-3 rounded-2xl font-bold flex items-center justify-center space-x-2 hover:scale-105 transition-all shadow-lg shadow-accent/20">
                    <Mail size={20} />
                    <span>Broadcast Message</span>
                </button>
            </div>

            <div className="bg-card rounded-[2.5rem] overflow-hidden shadow-sm">
                <div className="p-6 bg-muted/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center bg-background rounded-2xl px-4 py-2 w-full max-w-md">
                        <Search size={18} className="text-muted-foreground mr-2" />
                        <input
                            type="text"
                            placeholder="Search by name, email, or ID..."
                            className="bg-transparent border-none outline-none text-sm w-full py-1"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="flex items-center space-x-2 px-4 py-2 bg-background rounded-xl text-sm font-bold hover:bg-muted/50 transition-colors">
                            <Filter size={16} />
                            <span>Segment</span>
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b bg-muted/10">
                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground">Customer</th>
                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground">Contact</th>
                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground text-center">Orders</th>
                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground">Total Spent</th>
                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground">Status</th>
                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {CUSTOMERS.map((cust) => (
                                <tr key={cust.id} className="hover:bg-accent/5 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-black text-xs">
                                                {cust.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm">{cust.name}</p>
                                                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{cust.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center text-xs text-muted-foreground">
                                                <Mail size={10} className="mr-1.5" />
                                                {cust.email}
                                            </div>
                                            <div className="flex items-center text-xs text-muted-foreground">
                                                <Phone size={10} className="mr-1.5" />
                                                {cust.phone}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center font-bold text-sm">
                                        {cust.orders}
                                    </td>
                                    <td className="px-6 py-4 font-black text-sm">
                                        {cust.spent}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${cust.status === 'Active' ? 'text-green-500 bg-green-500/10 border-green-500/20' :
                                                cust.status === 'New' ? 'text-blue-500 bg-blue-500/10 border-blue-500/20' :
                                                    'text-red-500 bg-red-500/10 border-red-500/20'
                                            }`}>
                                            {cust.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 text-muted-foreground hover:text-accent hover:bg-accent/5 rounded-lg transition-colors">
                                            <ArrowUpRight size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
