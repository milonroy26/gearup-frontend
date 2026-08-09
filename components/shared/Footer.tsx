import { Backpack, Mail, MapPin, MessageCircle, Send, Share2 } from "lucide-react";
import Link from "next/link";

const footerLinks = [
    { label: "Browse Gear", href: "/gear" },
    { label: "About GearUp", href: "/about" },
    { label: "Become a Provider", href: "/register" },
    { label: "Login", href: "/login" },
];

const Footer = () => {
    return (
        <footer className="border-t border-border bg-card text-card-foreground">
            <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
                <div>
                    <Link href="/" className="inline-flex items-center gap-2 font-heading text-xl font-bold">
                        <span className="flex size-10 items-center justify-center rounded-md border border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
                            <Backpack className="size-5" strokeWidth={1.8} />
                        </span>
                        GearUp
                    </Link>
                    <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
                        Sports gear rental for players, teams, weekend travelers, and providers who want their equipment earning between games.
                    </p>
                </div>

                <div>
                    <h2 className="text-sm font-semibold uppercase text-foreground">Explore</h2>
                    <div className="mt-4 flex flex-col gap-3">
                        {footerLinks.map((link) => (
                            <Link key={link.href} href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-sm font-semibold uppercase text-foreground">Contact</h2>
                    <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                        <p className="flex items-center gap-2">
                            <Mail className="size-4" strokeWidth={1.8} />
                            hello@gearup.local
                        </p>
                        <p className="flex items-center gap-2">
                            <MapPin className="size-4" strokeWidth={1.8} />
                            Dhaka, Bangladesh
                        </p>
                    </div>
                    <div className="mt-5 flex gap-2">
                        {[Share2, MessageCircle, Send].map((Icon, index) => (
                            <span key={index} className="flex size-9 items-center justify-center rounded-md border border-border text-muted-foreground">
                                <Icon className="size-4" strokeWidth={1.8} />
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            {/* <div className="border-t border-border px-5 py-5 text-center text-xs text-muted-foreground">
                (c) {new Date().getFullYear()} GearUp. Rent better, play more.
            </div> */}
        </footer>
    );
};

export default Footer;
