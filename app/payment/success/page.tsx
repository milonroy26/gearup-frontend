import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, ClipboardList, PackageSearch } from "lucide-react";
import Link from "next/link";

type PaymentSuccessPageProps = {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getParam(searchParams: Record<string, string | string[] | undefined>, key: string) {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
}

export default async function PaymentSuccessPage({ searchParams }: PaymentSuccessPageProps) {
    const params = await searchParams;
    const paymentDetails = [
        { label: "Transaction ID", value: getParam(params, "tran_id") },
        { label: "Validation ID", value: getParam(params, "val_id") },
        { label: "Order ID", value: getParam(params, "rentalOrderId") || getParam(params, "orderId") },
        { label: "Amount", value: getParam(params, "amount") },
        { label: "Status", value: getParam(params, "status") },
    ].filter((item) => item.value);

    return (
        <section className="px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl">
                <Card>
                    <CardHeader className="text-center">
                        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-md border border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
                            <CheckCircle2 className="size-8" strokeWidth={1.8} />
                        </div>
                        <CardTitle className="font-heading text-3xl">Payment successful</CardTitle>
                        <CardDescription>
                            Your SSLCommerz payment was completed. Your rental order will reflect the latest payment status shortly.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {paymentDetails.length > 0 ? (
                            <div className="mb-6 divide-y divide-border rounded-md border border-border">
                                {paymentDetails.map((item) => (
                                    <div key={item.label} className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                                        <span className="text-xs font-semibold uppercase text-muted-foreground">{item.label}</span>
                                        <span className="break-all text-sm font-medium text-foreground">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="mb-6 rounded-md border border-dashed border-border px-4 py-5 text-center text-sm text-muted-foreground">
                                No transaction reference was returned in the payment URL.
                            </div>
                        )}

                        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                            <Button asChild variant="flag" className="rounded-md">
                                <Link href="/dashboard/customer/orders">
                                    <ClipboardList className="size-4" strokeWidth={1.8} />
                                    My Orders
                                </Link>
                            </Button>
                            <Button asChild variant="outline" className="rounded-md">
                                <Link href="/gear">
                                    <PackageSearch className="size-4" strokeWidth={1.8} />
                                    Browse Gear
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
